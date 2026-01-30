import indexRouter from "./routes/index.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

app.listen(3000, () => console.log("Server started on port 3000"));