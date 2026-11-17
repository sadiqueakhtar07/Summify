import express from "express";
import multer from "multer";
import fs from 'fs';
import { DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas';
// import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import {PDFDocument, StandardFonts} from 'pdf-lib';

import rawData from "../models/rawData.js";
import Book from "../models/book.js";
import Summaries from "../models/summaries.js";

import getResponse from "../utils/summaryAPI.js";
import authMiddleware from "../middleware/authMiddleware.js";

globalThis.DOMMatrix = DOMMatrix;
globalThis.ImageData = ImageData;
globalThis.Path2D = Path2D;

const router = express.Router();
const upload = multer({ dest: "/tmp/uploads/" });

async function extractText(path){
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const data=new Uint8Array(fs.readFileSync(path));
    const loadingTask = pdfjs.getDocument({data});
    const pdf= await loadingTask.promise;
    let fullText="";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        fullText += pageText + "\n";
    }
    return fullText;
}

async function createSummaryPDF(title, summary) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    page.drawText(`Book Summary: ${title}`, { x: 50, y: 350, size: 18 });
    page.drawText(summary.substring(0, 1000), { 
        x: 50, y: 320, size: 12, maxWidth: 500, lineHeight: 15 
    });

    return await pdfDoc.saveAsBase64();
}



router.post('/upload', authMiddleware, upload.single("file"), async (req, res) => {
    try {
        const { title, author, type, text } = req.body;

        let contentToProcess = "";
        
        if (req.file) {
            contentToProcess = await extractText(req.file.path);
            fs.unlinkSync(req.file.path);
        } else {
            contentToProcess = text;
        }

        if (!contentToProcess) {
            return res.status(400).json({ error: "Please provide a PDF or paste text." });
        }
        
        const nlpSummary = await getResponse(contentToProcess, type);

        if (!nlpSummary || !nlpSummary.summary) {
            return res.status(500).json({ error: "Summary generation failed. Try again." });
        }

        const actualSummary = nlpSummary.summary;
        
        const newBook = await Book.create({
            title,
            author,
            uploadedBy: req.user.id
        });

        
        await rawData.create({
            bookId: newBook._id,
            fullText: contentToProcess
        });

        
        await Summaries.create({
            bookId: newBook._id,
            summaryText: actualSummary,
            summaryType: type
        });

        
        const pdfBase64 = await createSummaryPDF(title || "Untitled", actualSummary);

        res.status(200).json({
            message: "Summary ready to display",
            summary: actualSummary,
            fullText: contentToProcess,
            pdfDownload: pdfBase64
        });

    } catch (err) {
        console.log(err);

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            error: "Failed to generate summary"
        });
    }
});

export default router;
