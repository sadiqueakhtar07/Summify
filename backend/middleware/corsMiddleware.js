const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://summify-frontend.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

export default corsOptions;