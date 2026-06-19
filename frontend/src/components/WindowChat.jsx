import React, { useContext, useState, useRef, useEffect } from 'react';
import './WindowChat.css';
import Hero from './Hero.jsx';
import HistoryPage from './HistoryPage.jsx';
import HistoryDetail from './HistoryDetail.jsx';
import { MyContext } from '../contextAPI/contextAPI.jsx';

const WindowChat = () => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);

   const {
      setSelectedHistory,
      setShowSignup,
      token,
      setToken,
      activePage,
      setActivePage
   } = useContext(MyContext);

   const handleProfile = () => {
      setIsOpen(prev => !prev);
   };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setIsOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      setIsOpen(false);
      setSelectedHistory(null);
      setActivePage("home");
   };

   return (
      <div className='chatWindow'>         
         <div className="chatNavbar">
            <span
               className='logo'
               onClick={() => setActivePage("home")}
            >
               Summify
            </span>

            <div className="navRight">

               {token && (
                  <button
                     className="historyBtn"
                     onClick={() => setActivePage("history")}
                  >
                     <i className="fa-solid fa-clock-rotate-left"></i>
                     History
                  </button>
               )}

               {!token ? (
                  <button
                     className='btn'
                     onClick={() => setShowSignup(true)}
                  >
                     Sign In
                  </button>
               ) : (
                  <div className='userIcon' onClick={handleProfile}>
                     <span className='user'>
                        <i className="fa-regular fa-user"></i>
                     </span>
                  </div>
               )}

            </div>
         </div>

         
         {isOpen && (
            <div className='dropDown' ref={dropdownRef}>

               <div className="dropDownItem">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  Upgrade Plan
               </div>

               <div className="dropDownItem">
                  <i className="fa-regular fa-circle-question"></i>
                  Help Center
               </div>

               <div className="dropDownItem">
                  <i className="fa-regular fa-envelope"></i>
                  Contact Us
               </div>

               <hr />

               <div className="dropDownItem" onClick={logout}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  Logout
               </div>
            </div>
         )}

         
         <div key={activePage} className="pageWrapper">
            {activePage === "home" && <Hero />}
            {activePage === "history" && <HistoryPage />}
            {activePage === "historyDetail" && <HistoryDetail />}
         </div>

      </div>
   );
};

export default WindowChat;