import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, default: "../static/images/minecraft.jpg" },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
