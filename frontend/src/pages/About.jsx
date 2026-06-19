import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-section">     
      <div className="about-hero">
        <h2>About Summify</h2>
        <p>
          Transform the way you learn with AI-powered book summarization.
          Summify helps you extract key ideas, insights, and structured
          knowledge — in minutes, not hours.
        </p>
      </div>

     
      <div className="about-highlights">
        <div className="highlight-card">
          <h3>⚡ Faster Learning</h3>
          <p>
            Get concise summaries and focus only on what truly matters.
          </p>
        </div>

        <div className="highlight-card">
          <h3>🧠 Smart AI Engine</h3>
          <p>
            Advanced AI analyzes content deeply while preserving meaning
            and context.
          </p>
        </div>

        <div className="highlight-card">
          <h3>📚 Multiple Formats</h3>
          <p>
            Access summaries, bullet points, and structured roadmaps —
            all in one place.
          </p>
        </div>
      </div>

      <div className="about-mission">
        <h3>Our Mission</h3>
        <p>
          We believe knowledge should be accessible and efficient.
          Summify empowers students, professionals, and lifelong learners
          to absorb more information in less time — without losing depth
          or clarity.
        </p>
      </div>

    </section>
  );
};

export default AboutUs;