import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "../static/images/minecraft.jpg" },
  quantity: { type: Number, default: 0 },
  description: { type: String, required: false },
  category: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
