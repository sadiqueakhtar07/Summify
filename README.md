# 📚 Summify – AI-Powered Book Summarization Platform

> **Read Less. Learn More.**

**Summify** is an AI-powered book summarization platform designed to help students, researchers, and professionals quickly understand lengthy books, articles, and documents. It uses **NLP and transformer-based AI models** to generate concise summaries while preserving important ideas and context.

## ✨ Features

- 🤖 **AI Book Summarization** – Generate concise summaries from large text.
- 📄 **File Upload** – Upload book/document content for processing.
- ✍️ **Text Input** – Paste text directly into the application.
- 📝 **Key Points / Bullet Summary** – Convert summaries into easy-to-read bullet points.
- 🗺️ **Interactive MindMap** – Visualize important concepts and relationships.
- ❓ **Quiz Generation** – Generate MCQ-based quizzes from the generated summary.
- 📥 **PDF Export** – Download generated summaries and key points as PDF.
- 🕘 **History** – Access previously generated summaries.
- 🔐 **Authentication** – User registration and login.
- 👨‍💼 **Admin Dashboard** – Manage users, books, summaries, and platform analytics.
- 🔎 **Search & Filter** – Find previously summarized books by title or author.

## 🖥️ Application Screenshots

### 🏠 Home / Landing Page

<img src="screenshots/screenshot-5.png" alt="Summify Home" width="100%">

### 📖 Summarization Dashboard

<img src="screenshots/screenshot-1.png" alt="Summify Dashboard" width="100%">

### 🗺️ Interactive MindMap

<img src="screenshots/screenshot-2.png" alt="Interactive MindMap" width="100%">

### 🕘 Summary History

<img src="screenshots/screenshot-3.png" alt="Summary History" width="100%">

### 👨‍💼 Admin Dashboard

<img src="screenshots/screenshot-4.png" alt="Admin Dashboard" width="100%">

### ⭐ Features

<img src="screenshots/screenshot-6.png" alt="Summify Features" width="100%">

### ℹ️ About Summify

<img src="screenshots/screenshot-7.png" alt="About Summify" width="100%">

### 🔐 User Registration

<img src="screenshots/screenshot-8.png" alt="Sign Up" width="100%">

## 🧠 How Summify Works

```text
          Book / Text Input
                  │
                  ▼
          Text Extraction
                  │
                  ▼
        NLP Preprocessing
                  │
                  ▼
        Text Chunking
                  │
                  ▼
       Transformer AI Model
                  │
                  ▼
        Summary Generation
                  │
          ┌───────┼────────┐
          ▼       ▼        ▼
       Summary  Bullets  MindMap
                          │
                          ▼
                       Quiz
                          │
                          ▼
                     PDF Export
```

For large documents, the text is divided into manageable chunks with contextual overlap before summarization. Chunk-level results are then combined into a coherent final summary.

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt Password Hashing

### Database
- MongoDB
- Mongoose
- MongoDB Atlas

### AI / NLP
- Python
- Flask
- Hugging Face Transformers
- BART-based summarization
- spaCy
- NLP preprocessing

### Additional Libraries / Tools
- PDF processing
- PDF export
- React Flow for MindMap visualization
- Charting for admin analytics

## 📊 Main Modules

| Module | Description |
|---|---|
| Authentication | User registration, login and protected access |
| Book Upload | Upload and process document content |
| NLP Processing | Clean, normalize and prepare text |
| Summarization | Generate AI-powered summaries |
| Bullet Points | Extract important points from the summary |
| MindMap | Visualize concepts and relationships |
| Quiz | Generate questions from generated summaries |
| PDF Export | Download summaries as PDF |
| History | Store and access previous summaries |
| Admin Panel | Manage platform data and view analytics |

## 🔒 Security

Summify uses authentication and role-based authorization to protect user and administrative functionality.

- JWT-based authentication
- Password hashing with bcrypt
- Protected backend routes
- Role-based access control
- Environment variables for sensitive configuration
- Input validation

## 🧪 Testing

The project can be tested at different levels:

- Unit testing for preprocessing and utility functions
- API endpoint testing
- Authentication testing
- Summarization workflow testing
- PDF generation testing
- MindMap and quiz functionality testing
- End-to-end application testing

## 🔮 Future Enhancements

- 🌍 Multi-language summarization
- 🎙️ Voice-based summaries
- 💬 AI question answering over books
- 🔍 Semantic search
- 🧠 Advanced key concept extraction
- 📱 Mobile application
- ☁️ Cloud deployment
- 📈 Advanced user analytics
- 🤖 Support for additional LLMs

## 👨‍💻 Author

**Md Sadique Akhtar**

- GitHub: `https://github.com/sadiqueakhtar07`
- LinkedIn: `www.linkedin.com/in/md-sadique-akhtar-22641a306`

## 📄 License

This project is developed for educational and research purposes.

---

⭐ **If you like Summify, consider giving this repository a star!**

**Summify — Read Less. Learn More. 🚀**
