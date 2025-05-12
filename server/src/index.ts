import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import listRouter from "./routes/properties";
import InquiryRouter from "./routes/inquiries";
import FavoriteRouter from "./routes/favourite";
import http from "http"; // Import http to create a custom server

dotenv.config();

const app = express();
const port = 3000;

// Create an HTTP server from Express app
const server = http.createServer(app);

// Middleware
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Express server with WebSockets!");
});

app.use("/api/v1", userRoute);
app.use("/api/v1", listRouter);
app.use("/api/v1", InquiryRouter);
app.use("/api/v1", FavoriteRouter);
// Start the server (this now starts both HTTP and WebSocket)
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
