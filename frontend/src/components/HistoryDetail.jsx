import React, { useContext, useRef } from "react";
import { MyContext } from "../contextAPI/contextAPI";
import jsPDF from "jspdf";
import "./HistoryDetail.css";

const HistoryDetail = () => {
  const { selectedHistory, setActivePage } = useContext(MyContext);
  const summaryRef = useRef(null);
  if (!selectedHistory) return null;

  const originalText =
    selectedHistory.text ||
    selectedHistory.originalText ||
    "";

  const summaryText =
    selectedHistory.summary || "";

  const originalWords =
    originalText.split(/\s+/).filter(Boolean).length;

  const summaryWords =
    summaryText.split(/\s+/).filter(Boolean).length;

  const copySummary = () => {
    if (!summaryText) return;
    navigator.clipboard.writeText(summaryText);

    if (summaryRef.current) {
      const range = document.createRange();
      range.selectNodeContents(summaryRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    alert("Summary copied");
  };

  const handleDownload = () => {
    if (!selectedHistory.summary) {
      alert("No summary available.");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(
      selectedHistory.title || "Book Summary",
      10,
      20
    );

    doc.setFontSize(12);

    if (selectedHistory.author) {
      doc.text(
        `Author: ${selectedHistory.author}`,
        10,
        30
      );
    }

    const summaryLines =
      doc.splitTextToSize(
        selectedHistory.summary,
        180
      );

    doc.text(summaryLines, 10, 45);

    doc.save(
      `${selectedHistory.title || "summary"}.pdf`
    );
  };


  return (
    <div className="history-detail">
      <button
        className="back-btn"
        onClick={() => setActivePage("history")}
      >
        ← Back to History
      </button>

      <div className="detail-card">

        <h2 className="title">
          {selectedHistory.title}
        </h2>


        <div className="meta">
          <span>
            <strong>Author:</strong>
            {selectedHistory.author}
          </span>

          <span>
            <strong>Summary Type:</strong>
            {selectedHistory.summaryType}
          </span>

          <span>
            <strong>Date:</strong>{" "}
            {selectedHistory.createdAt
              ? new Date(
                  selectedHistory.createdAt
                ).toLocaleString()
              : "No Date"}
          </span>
        </div>
        
        <div className="content-section">
          <h3>Original Text</h3>
          <div className="text-box">

            {selectedHistory.text ||
              selectedHistory.originalText ||
              "No original text saved."}
          </div>
        </div>

        <div className="content-section">
          <h3>Generated Summary</h3>
          <div className="text-box summary-box">
            <i onClick={copySummary} className="fa-regular fa-copy copy-icon"></i>
            <div ref={summaryRef}>{summaryText}</div>
          </div>
          <div className="word-info">
          <span>
            Original words: {originalWords}
          </span>

          <span>
            Summary words: {summaryWords}
          </span>
        </div>

          <div className="download-section">
            <button
              className="download-btn"
              onClick={handleDownload}
            >
              Download Summary
            </button>
          </div>         
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail;