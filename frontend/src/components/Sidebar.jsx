import React, { useContext, useState, useEffect } from 'react'
import './Sidebar.css'
import { MyContext } from '../contextAPI/contextAPI';

const API_URL=import.meta.env.VITE_API_URL;

const Sidebar = ({ onHistoryClick }) => {
    const { token, selectedHistory, setSelectedHistory } = useContext(MyContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleNewClick = () => {
        setSelectedHistory(null);
        onHistoryClick?.();
    };

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/history`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setHistory(data.history);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchHistory();
        }
    }, [token]);

    return (
        <section className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            <div className='top'>
                <div className='item logo'>
                    <img src="logo.png" alt="Summify" />
                </div>

                <div className='item' onClick={handleSidebar}>
                    <i className="fa-regular fa-window-maximize"></i>
                </div>
            </div>

            <div className='newChat'>
                <button onClick={handleNewClick}>
                    <i className="fa-regular fa-pen-to-square"></i>
                    <span>New</span>
                </button>
            </div>

            {isSidebarOpen && (
                <ul className="history-list">
                    <li className="history-title">
                        <h4>History</h4>
                    </li>

                    {loading ? (
                        <li><span>Loading...</span></li>
                    ) : history.length === 0 ? (
                        <li><span>No history found</span></li>
                    ) : (
                        history.map((item) => (
                            <li
                                key={item._id}
                                className={selectedHistory?._id === item._id ? "active" : ""}
                                onClick={() => {
                                    setSelectedHistory(item);
                                    onHistoryClick?.();
                                }}
                            >
                                <i className="fa-regular fa-message"></i>
                                <span>{item.title}</span>
                            </li>
                        ))
                    )}
                </ul>
            )}

            <div className='sign'>
                <p>&copy; By BookShortner!</p>
            </div>
        </section>
    )
}

export default Sidebar;