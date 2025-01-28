import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    image: {
      imageUrl: {
        type: String,
        required: true,
      },
      imageId: {
        type: String,
        required: true,
      },
    },
    price: {
      type: String,
      required: [true, "Please provide product price"],
    },
    stock: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
