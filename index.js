import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";

dotenv.config();
connectDB();


const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("server running successfully");
});

app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);

app.listen(port, () => {
  console.log("Server running on the Port : " + port);
});