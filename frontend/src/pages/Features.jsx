import React from 'react';
import './Features.css';

const featuresData = [
  {
    title: 'Summary',
    description: 'Generate a concise summary of any book to quickly understand the core ideas and save reading time.',
    icon: 'fa-solid fa-file-lines',
  },
  {
    title: 'Key Points',
    description: 'Convert summaries into clear bullet-point key ideas for faster reading and better understanding.',
    icon: 'fa-solid fa-list-ul',
  },
  {
    title: 'Mindmap',
    description: 'Visualize the book’s concepts with an interactive mindmap to improve learning and memory retention.',
    icon: 'fa-solid fa-diagram-project',
  },
  {
    title: 'Quiz',
    description: 'Test your understanding with automatically generated MCQ quizzes based on the summary.',
    icon: 'fa-solid fa-question-circle',
  },
  {
    title: 'Export PDF',
    description: 'Download the generated summary and key points as a PDF for offline reading.',
    icon: 'fa-solid fa-file-pdf',
  },
  {
    title: 'History',
    description: 'Access previously summarized books anytime through the history panel.',
    icon: 'fa-solid fa-clock-rotate-left',
  },
  {
    title: 'Multiple Summary Types',
    description: 'Choose between short, detailed, or default summaries based on your preference.',
    icon: 'fa-solid fa-layer-group',
  },
  {
    title: 'File Upload',
    description: 'Upload PDF or text files directly and generate summaries automatically.',
    icon: 'fa-solid fa-upload',
  }
];

const Features = () => {
  return (
    <div className="features-page">
      <h2>Our Features</h2>

      <div className="features-grid">
        {featuresData.map((feature, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon-wrapper">
              <i className={`${feature.icon} feature-icon`}></i>
            </div>

            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;