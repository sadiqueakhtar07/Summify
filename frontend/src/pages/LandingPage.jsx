import React, { useContext } from 'react';
import './LandingPage.css';
import photo from '../assets/photo.png';
import { MyContext } from '../contextAPI/contextAPI';
import Features from './Features';
import AboutUs from './About';
import Footer from './Footer';

const LandingPage = () => {
  const { setShowSignup } = useContext(MyContext);

  const handleSummarizeClick = () => {
    setShowSignup(true);
  };

  return (
    <>
    <div className='landing-page'>
      <div className='content'>
        <div className="para">
          <div className='left-side'>
            <h1 className='heading'>Summ<span>ify</span> </h1>
            <p className='dialog'> <span>Read Less.</span> Learn More.</p>
            <p>
              Quickly transform lengthy articles, reports, or documents into concise summaries. 
              The AI intelligently analyzes the text, detects essential information, and produces a 
              readable output without losing important context.
            </p>
          </div>

          <div>
            <img src={photo} alt="photo" />
          </div>
        </div>

        <button
          className='summarize-btn'
          onClick={handleSummarizeClick}
        >
          Summarize
        </button>
      </div>
      
    </div>
    <Features/>
    <AboutUs/>
    <Footer/>
    </>


    
  );
};

export default LandingPage;