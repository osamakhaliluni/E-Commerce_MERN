import mongoose, { Schema } from "mongoose";

const cartStatusEnum = ["active", "complete"];

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: cartStatusEnum, default: "active" },
  totalPrice: { type: Number, default: 0 },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      title: { type: String, required: true },
      image: { type: String, default: "../static/images/minecraft.jpg" },
      description: { type: String, required: false },
      category: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ],
});

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
