import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../contextAPI/contextAPI";
import "./AdminDashboard.css";
import { FaUsers, FaBook, FaFileAlt, FaChartLine } from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line
} from "recharts";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800"];

const AdminDashboard = () => {

  const { userRole, setToken, setUserRole } = useContext(MyContext);

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [summaries, setSummaries] = useState([]);

  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user"
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginate = (data) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalPages = (data) => {
    return Math.ceil(data.length / itemsPerPage);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection]);


  if (userRole !== "admin") {
    return <p className="admin-access-denied">Access Denied</p>
  }

  const fetchData = async () => {

    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      const [usersRes, booksRes, summariesRes] = await Promise.all([
        fetch("http://localhost:3000/api/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("http://localhost:3000/api/admin/books", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("http://localhost:3000/api/admin/summaries", { headers: { Authorization: `Bearer ${token}` } })
      ]);

      setUsers(await usersRes.json());
      setBooks(await booksRes.json());
      setSummaries(await summariesRes.json());

    } catch (err) {
      alert("Error loading data");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {

    setToken("");
    setUserRole("");
    localStorage.clear();
    window.location.href = "/";

  };

  const handleDelete = async (id, type) => {

    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/admin/${type}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {

        if (type === "users") {
          setUsers(users.filter(u => u._id !== id));
        }

        if (type === "books") {
          setBooks(books.filter(b => b._id !== id));
        }

        if (type === "summaries") {
          setSummaries(summaries.filter(s => s._id !== id));
        }

      } else {
        alert("Delete failed");
      }

    } catch (err) {
      alert("Error deleting item");
    }
  };

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:3000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newUser)
        }
      );

      const data = await res.json();
      if (data.success) {
        alert("User created");
        setNewUser({
          username: "",
          email: "",
          password: "",
          role: "user"
        });
        fetchData();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error creating user");
    }
  };


  if (loading) return <p className="admin-loading">Loading...</p>;
  const totalAdmins = users.filter(u => u.role === "admin").length;
  const totalUsers = users.filter(u => u.role === "user").length;

  const roleData = [
    { name: "Admins", value: totalAdmins },
    { name: "Users", value: totalUsers }
  ];

  const systemData = [
    { name: "Users", value: users.length },
    { name: "Books", value: books.length },
    { name: "Summaries", value: summaries.length }
  ];



  const userGrowth = Array(12).fill(0);

  users.forEach(user => {
    if (user.createdAt) {
      const m = new Date(user.createdAt).getMonth();
      userGrowth[m]++;
    }
  });

  const userGrowthData = userGrowth.map((v, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    users: v
  }));



  const usage = Array(12).fill(0);
  summaries.forEach(s => {
    if (s.createdAt) {
      const m = new Date(s.createdAt).getMonth();
      usage[m]++;
    }
  });

  const usageData = usage.map((v, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    summaries: v
  }));


  const performance = Math.round(
    (summaries.length * 2 + books.length + users.length) / 3
  );


  return (

    <div className="admin-dashboard">
      <aside className="admin-sidebar">

        <h2>Admin Panel</h2>

        <button onClick={() => setActiveSection("dashboard")}>
          <FaChartLine /> Dashboard
        </button>

        <button onClick={() => setActiveSection("users")}>
          <FaUsers /> Users
        </button>

        <button onClick={() => setActiveSection("books")}>
          <FaBook /> Books
        </button>

        <button onClick={() => setActiveSection("summaries")}>
          <FaFileAlt /> Summaries
        </button>

        <button onClick={() => setActiveSection("createUser")}>
          <FaUsers /> Create User/Admin
        </button>

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>

      </aside>

      <main className="admin-main">
        {activeSection === "dashboard" && (

          <>
            <div className="admin-cards">

              <div className="card">
                <FaUsers size={30} />
                <h3>{users.length}</h3>
                <p>Total Users</p>
              </div>

              <div className="card">
                <FaBook size={30} />
                <h3>{books.length}</h3>
                <p>Total Books</p>
              </div>

              <div className="card">
                <FaFileAlt size={30} />
                <h3>{summaries.length}</h3>
                <p>Total Summaries</p>
              </div>

              <div className="card">
                <FaChartLine size={30} />
                <h3>{performance}%</h3>
                <p>Performance</p>
              </div>

            </div>

            <div className="charts-grid">
              <div className="chart-box">
                <h3>User Roles</h3>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={roleData} dataKey="value" outerRadius={120} label>
                      {roleData.map((e, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-box">
                <h3>Platform Data</h3>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={systemData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-box">
                <h3>User Growth</h3>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#00C49F" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-box">
                <h3>Monthly Summary Usage</h3>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="summaries" stroke="#FF8042" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>
          </>
        )}

        {activeSection === "users" && (

          <div className="admin-table">

            <h2>All Users</h2>

            <table>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {paginate(users).map(user => (

                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(user._id, "users")}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
            <div className="pagination">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>

              <span>
                Page {currentPage} / {totalPages(users)}
              </span>

              <button
                disabled={currentPage === totalPages(users)}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>

            </div>

          </div>
        )}

        {activeSection === "books" && (

          <div className="admin-table">

            <h2>All Books</h2>

            <table>

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Uploaded By</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {paginate(books).map(book => (

                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.uploadedBy?.name || "Unknown"}</td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(book._id, "books")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                ))}

              </tbody>

            </table>
            <div className="pagination">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>

              <span>
                Page {currentPage} / {totalPages(books)}
              </span>

              <button
                disabled={currentPage === totalPages(books)}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}


        {activeSection === "summaries" && (

          <div className="admin-table">

            <h2>All Summaries</h2>

            <table>

              <thead>
                <tr>
                  <th>Book</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {paginate(summaries).map(sum => (

                  <tr key={sum._id}>

                    <td>{sum.bookId?.title || "Unknown"}</td>

                    <td>{sum.bookId?.uploadedBy?.name || "Unknown"}</td>

                    <td>{sum.summaryType}</td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(sum._id, "summaries")}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
            <div className="pagination">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>

              <span>
                Page {currentPage} / {totalPages(summaries)}
              </span>

              <button
                disabled={currentPage === totalPages(summaries)}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>

            </div>


          </div>
        )}
        {activeSection === "createUser" && (

          <div className="create-user">

            <h2>Create User / Admin</h2>

            <input
              type="text"
              placeholder="Name"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />

            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button onClick={handleCreateUser}>
              Create
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;