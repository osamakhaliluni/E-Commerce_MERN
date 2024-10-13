import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import userRoute from "../src/routes/userRoute.js";
import { initialize } from "./services/productServices.js";
import productRoute from "../src/routes/productRoute.js";
import cartRoute from "../src/routes/cartRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => console.log(err));

app.use("/user", userRoute);

app.use("/products", productRoute);

app.use("/cart", cartRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

initialize();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
