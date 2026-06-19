import './App.css'
import MyContextProvider from './contextAPI/contextAPI.jsx'
import { MyContext } from './contextAPI/contextAPI.jsx'

import { Routes, Route, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'

import Navbar from './pages/Navbar.jsx';
import Sign from './components/Sign.jsx'

import LandingPage from './pages/LandingPage.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './components/Dashboard.jsx'
import AdminDashboard from './components/AdminDashboard.jsx';
import Features from './pages/Features.jsx'

function App() {
  return (
    <MyContextProvider>
      <MainApp />
    </MyContextProvider>
  )
}

function MainApp() {
  const { showSignup, token, setToken, userRole, setUserRole } = useContext(MyContext)
  const navigate = useNavigate()

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role"); 

    if (savedToken) {
        setToken(savedToken);
        setUserRole(savedRole || "user"); 

        
        if (window.location.pathname === "/") {
            if (savedRole === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }
        }
    }
}, []);

  return (
    <div className="app">
      <Routes>       
        <Route path="/" element={<><Navbar /><LandingPage /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        <Route path="/features" element={<><Navbar /><Features/></>} />

        {/*user dashboard */}
        <Route
          path="/dashboard"
          element={
            token && userRole === "user"
              ? <Dashboard />
              : <><Navbar /><LandingPage /></>
          }
        />

        {/* Protected admin dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            token && userRole === "admin"
              ? <AdminDashboard />
              : <><Navbar /><LandingPage /></>
          }
        />

      </Routes>

      {showSignup && <Sign />}
    </div>
  )
}

export default App;