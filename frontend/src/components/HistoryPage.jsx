import React, { useContext, useEffect, useState } from 'react';
import './HistoryPage.css';
import { MyContext } from '../contextAPI/contextAPI';
import { FaTrash, FaEye } from "react-icons/fa";

const HistoryPage = () => {

  const { token, setSelectedHistory, setActivePage } = useContext(MyContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [search, setSearch] = useState("");



  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          'http://localhost:3000/api/history',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (res.ok) {
          const sorted = data.history.sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          );
          setHistory(sorted);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchHistory();
  }, [token]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const openHistory = (item) => {
    setSelectedHistory(item);
    setActivePage("historyDetail");
  };

  const confirmDelete = (id) => {
    setSelectedDeleteId(id);
    setShowModal(true);
  };

  const deleteHistory = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/history/${selectedDeleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.ok) {
        setHistory(prev =>
          prev.filter(
            item =>
              item._id !== selectedDeleteId
          )
        );
      }
      setShowModal(false);
      setSelectedDeleteId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredHistory = history.filter(item =>
    item.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
    ||
    item.author
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const indexOfLast =
    currentPage * itemsPerPage;

  const indexOfFirst =
    indexOfLast - itemsPerPage;

  const currentHistory =
    filteredHistory.slice(
      indexOfFirst,
      indexOfLast
    );

  const totalPages =
    Math.ceil(
      filteredHistory.length /
      itemsPerPage
    );


  const changePage = (page) => {
    setCurrentPage(page);
  };

  const emptySlots =
    itemsPerPage -
    currentHistory.length;

  return (
    <div className="history-page">
      <button
        className="back-btn"
        onClick={() =>
          setActivePage("home")
        }
      >
        ← Back
      </button>


      <h2>All History</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {loading ? (
        <p>Loading history...</p>
      ) : (
        <>
          <div className="history-grid">
            {currentHistory.map(
              (item, index) => (
                <div
                  key={item._id}
                  className="history-card"
                  style={{
                    animationDelay:
                      `${index * 0.1}s`
                  }}
                >
                  <div className="card-header">
                    <h3
                      onClick={() =>
                        openHistory(item)
                      }
                    >
                      {item.title}
                    </h3>

                    <div className="card-icons">
                      <FaEye
                        className="icon view"
                        onClick={() =>
                          openHistory(item)
                        }
                      />

                      <FaTrash
                        className="icon delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete(
                            item._id
                          );
                        }}
                      />
                    </div>
                  </div>

                  <p>
                    <strong>Author:</strong>
                    {" "}
                    {item.author ||
                      "Unknown Author"}
                  </p>


                  <p>
                    <strong>Type:</strong>
                    {" "}
                    {item.summaryType}
                  </p>


                  <p className="date">
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString()

                      : "No Date"}

                  </p>

                </div>

              )
            )}


            {Array
              .from({
                length: emptySlots
              })
              .map((_, i) => (

                <div
                  key={"empty" + i}
                  className="history-card empty"
                />
              ))}

          </div>

          <div className="pagination">
            {Array
              .from({
                length: totalPages
              },
              (_, i) => (

                <button
                  key={i}

                  className={
                    currentPage === i + 1
                      ? "active-page"
                      : ""
                  }

                  onClick={() =>
                    changePage(i + 1)
                  }
                >
                  {i + 1}
                </button>

              ))}

          </div>

        </>

      )}



      {showModal && (

        <div className="modal-overlay">
          <div className="modal-box">
            <h3>
              Delete Confirmation
            </h3>

            <p>
              Are you sure you want
              to delete this history?
            </p>


            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>


              <button
                className="confirm-btn"
                onClick={deleteHistory}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;