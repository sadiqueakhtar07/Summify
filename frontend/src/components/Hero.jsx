import React, { useContext, useEffect, useState } from 'react';
import './Hero.css';
import { MyContext } from '../contextAPI/contextAPI';
import { ScaleLoader } from 'react-spinners';
import MindMap from './MindMap';

const API_URL=import.meta.env.VITE_API_URL;

const Hero = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [type, setType] = useState("Default");
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);

    const [summaryResult, setSummaryResult] = useState("");
    const [pdfData, setPdfData] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadingFileName, setUploadingFileName] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [displayedSummary, setDisplayedSummary] = useState("");
    const [viewMode, setViewMode] = useState("summary");

    const [showMindMap, setShowMindMap] = useState(false);
    const [quizData, setQuizData] = useState([]);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizLoading, setQuizLoading] = useState(false);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const { token, selectedHistory } = useContext(MyContext);

    // Typing effect for summary
    useEffect(() => {
        if (!isTyping || !summaryResult) return;
        const words = summaryResult.split(" ");
        let index = 0;

        setDisplayedSummary("");
        const interval = setInterval(() => {
            if (index < words.length) {
                setDisplayedSummary(prev =>
                    prev ? prev + " " + words[index] : words[index]
                );
                index++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 60);
        return () => clearInterval(interval);
    }, [summaryResult, isTyping]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSummaryResult("");
        setPdfData("");
        setShowMindMap(false);
        setShowQuiz(false);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("type", type);

        if (file) {
            formData.append("file", file);
            setUploadingFileName(file.name);
        } else {
            formData.append("text", text);
        }

        try {
            const res = await fetch(`${API_URL}/api/upload`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });
            const content = await res.json();
            if (res.ok) {
                const summary = content.summary;
                setSummaryResult(summary);
                setPdfData(content.pdfDownload);
                setViewMode("summary");
                setIsTyping(true);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            setUploadingFileName("");
        }
    };

    const handleDownload = () => {
        if (!pdfData) return;
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${pdfData}`;
        link.download = `${title || 'summary'}.pdf`;
        link.click();
    };

    const renderBullets = () => {
        return summaryResult
            .split('. ')
            .filter(line => line.trim())
            .map((line, i) => <li key={i}>{line}</li>);
    };

    // Quiz answer selection
    const handleOptionClick = (option) => {
        if (selectedOption) return;
        setSelectedOption(option);
        if (option === quizData[currentQuestion].answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        setSelectedOption(null);
        if (currentQuestion + 1 < quizData.length) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    // Generate Quiz
    const handleGenerateQuiz = async () => {
        const textForQuiz = summaryResult || text;
        if (!textForQuiz) return;

        setQuizLoading(true);
        setShowQuiz(true);
        setShowMindMap(false);
        setScore(0);
        setCurrentQuestion(0);
        setShowResult(false);

        try {
            const response = await fetch(`${API_URL}/api/generate-quiz`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ text: textForQuiz })
            });

            if (response.ok) {
                const data = await response.json();
                setQuizData(data);
            } else {
                console.error("Quiz generation failed", response.status);
            }
        } catch (err) {
            console.error("Quiz Error:", err);
        } finally {
            setQuizLoading(false);
        }
    };

    // Load selected history
    useEffect(() => {
        if (!selectedHistory) {
            setTitle("");
            setAuthor("");
            setText("");
            setFile(null);
            setSummaryResult("");
            setDisplayedSummary("");
            setPdfData("");
            setQuizData([]);
            return;
        }

        setTitle(selectedHistory.title || "");
        setAuthor(selectedHistory.author || "");
        setSummaryResult(selectedHistory.summary || "");
        setDisplayedSummary(selectedHistory.summary || "");
        setPdfData(selectedHistory.pdfDownload || "");
        setType(selectedHistory.summaryType || "Default");
        setText(selectedHistory.text || "");
        setFile(null);
        setShowMindMap(false);
        setShowQuiz(false);
        setViewMode("summary");       
    }, [selectedHistory]);

    return (
        <div className="hero-container">
            <form onSubmit={handleSubmit}>
                <div className="top-controls">
                    <input
                        type="text"
                        placeholder="Book Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Default">Default</option>
                        <option value="Short">Short</option>
                        <option value="Detailed">Detailed</option>
                    </select>
                </div>

                <div className="text-editor">
                    <label className="upload-btn">
                        Upload
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
                    {file && !loading && <div className="file-name">{file.name}</div>}
                    <textarea
                        placeholder="Enter or paste your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="summary-panel">
                    <div className="summary-header">
                        <h3>Summary</h3>
                        <div className="summary-modes">
                            <button
                                type="button"
                                className={viewMode === "summary" ? "active" : ""}
                                onClick={() => setViewMode("summary")}
                            >
                                Summary
                            </button>
                            <button
                                type="button"
                                className={viewMode === "bullets" ? "active" : ""}
                                onClick={() => setViewMode("bullets")}
                            >
                                Bullets
                            </button>
                        </div>
                    </div>

                    <div className="summary-box">
                        {loading ? (
                            <ScaleLoader color='#fff' />
                        ) : (
                            <>
                                {viewMode === "summary" && (
                                    <p>{isTyping ? displayedSummary : (displayedSummary || summaryResult || "No summary yet")}</p>
                                )}
                                {viewMode === "bullets" && (
                                    summaryResult ? <ul>{renderBullets()}</ul> : "No summary yet"
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="summarize-section">
                    <button className="summarize-btn" type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Summarize"}
                    </button>
                    <button type="button" className="download-btn" onClick={handleDownload}>
                        Download PDF
                    </button>
                    <button
                        type="button"
                        className="mindmap-btn"
                        onClick={() => {
                            setShowMindMap(prev => !prev);
                            setShowQuiz(false);
                        }}
                    >
                        MindMap
                    </button>
                    <button
                        type="button"
                        className="quiz-btn"
                        onClick={handleGenerateQuiz}
                        disabled={loading || (!summaryResult && !text)}
                    >
                        {quizLoading ? "Generating Quiz..." : "Generate Quiz"}
                    </button>
                </div>

                {showMindMap && summaryResult && (
                    <div className="quiz-panel">
                        <h3>MindMap</h3>
                        <div className="quiz-card">
                            <MindMap summary={summaryResult} />
                        </div>
                    </div>
                )}

                {showQuiz && quizData.length > 0 && (
                    <div className="quiz-panel">
                        <h3>Quiz</h3>
                        {quizLoading && <ScaleLoader color="#fff" />}
                        {!quizLoading && (showResult ? (
                            <div className="quiz-result">
                                <h2>Your Score: {score} / {quizData.length}</h2>
                            </div>
                        ) : (
                            <div className="quiz-card">
                                <p className="question">
                                    {currentQuestion + 1}. {quizData[currentQuestion].question}
                                </p>
                                <ul className="options">
                                    {quizData[currentQuestion].options.map((opt, i) => (
                                        <li
                                            key={i}
                                            className={`option ${selectedOption === opt ? "selected" : ""}`}
                                            onClick={() => handleOptionClick(opt)}
                                        >
                                            {opt}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="next-btn"
                                    onClick={handleNext}
                                    disabled={!selectedOption}
                                >
                                    Next
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Hero;