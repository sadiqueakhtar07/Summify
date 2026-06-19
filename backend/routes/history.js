import express from "express";
import Book from "../models/book.js";
import Summaries from "../models/summaries.js";
import authMiddleware from "../middleware/authMiddleware.js";
import rawData from "../models/rawData.js";

const router = express.Router();

router.get("/history", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const books = await Book.find({ uploadedBy: userId })
            .sort({ uploadedDate: -1 });

      
        const historyData = await Promise.all(
            books.map(async (book) => {
                const summary = await Summaries.findOne({
                    bookId: book._id
                });

                const raw = await rawData.findOne({
                    bookId: book._id
                });

                return {
                    _id: book._id,
                    title: book.title,
                    author: book.author,
                    createdAt: book.uploadedDate,
                    text: raw?.fullText || "",
                    summary: summary?.summaryText || "No summary found",
                    summaryType: summary?.summaryType || "Unknown"
                };
            })
        );

        res.json({
            success: true,
            history: historyData
        });

    } catch (err) {
        console.log("HISTORY ERROR:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

router.delete('/history/:id', authMiddleware, async (req, res) => {
    try {
        const bookId = req.params.id;

        if (!bookId) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        await rawData.deleteOne({ bookId });
        await Summaries.deleteOne({ bookId });
        await Book.findByIdAndDelete(bookId);

        res.status(200).json({
            success: true,
            message: "Deleted successfully"
        });

    } catch (err) {
        console.log("DELETE ERROR:", err);
        res.status(500).json({ error: "Delete failed" });
    }
});

export default router;