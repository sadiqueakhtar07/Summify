import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SummaryPage.css";

const SummaryPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return <div>No Data Found</div>;

    const { title, author, type, text, summary, pdf } = state;

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${pdf}`;
        link.download = `${title || "summary"}.pdf`;
        link.click();
    };

    return (
        <div className="summary-page">

            <div className="top-bar">
                <button onClick={() => navigate(-1)}>← Back</button>
                <h2>{title}</h2>
                <p>{author}</p>
            </div>

            <div className="summary-layout">
                <div className="text-panel">
                    <h3>Original Text</h3>
                    <p>{text}</p>
                </div>

                <div className="summary-panel">
                    <h3>Generated Summary</h3>
                    <p>{summary}</p>

                    <button onClick={handleDownload}>
                        Download PDF
                    </button>
                </div>
            </div>

        </div>
    );
};

export default SummaryPage;