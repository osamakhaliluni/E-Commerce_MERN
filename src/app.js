import express from "express";
import mongoose from "mongoose";
import userRoute from "../src/routes/userRoute.js";
import { initialize } from "./services/productServices.js";
import productRoute from "../src/routes/productRoute.js";
import cartRoute from "../src/routes/cartRoute.js";

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

app.use("/products", productRoute);

app.use("/cart", cartRoute);

initialize();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
