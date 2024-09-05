import express from "express";
import mongoose from "mongoose";
import userRoute from "../src/routes/userRoute.js";

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => console.log(err));

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
