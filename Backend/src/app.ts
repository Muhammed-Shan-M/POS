import express from "express";
import cors from "cors";
import posRout from './routes/pos.route'

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());


app.use('/api',posRout)


export default app;
