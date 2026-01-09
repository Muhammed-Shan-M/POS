import express from "express";
import cors from "cors";
import posRout from './routes/pos.route'

const app = express();

const URL = process.env.FRONTEND_URL

app.use(
  cors({
    origin: URL || "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());


app.use('/api',posRout)


export default app;
