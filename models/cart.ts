import rootDir from "../util/path.js";
import path from "path";
import fs from "fs/promises";

const filePath = path.join(rootDir, "Data", "cart.json");

import mongoose, { Schema, Document } from "mongoose";
import ProductModel, {Product} from "./product.js";

interface CartItem extends Document {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  title: string;
  price: number;
}

const cartItemSchema = new Schema<CartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  title: { type: String, required: true, maxlength: 255 },
  price: { type: Number, required: true },
}, { timestamps: false });


const CartItemModel = mongoose.model<CartItem>('CartItem', cartItemSchema);

export const addToCart = async (productId: string, product: Product): Promise<void> => {
  try {
    const existingItem = await CartItemModel.findOne({ productId }).exec();
    if (existingItem) {
      await existingItem.updateOne({ quantity: existingItem.quantity + 1 });
    } else {
      await CartItemModel.create({ productId, quantity: 1, title: product.title, price: product.price });
    }
    console.log('Added to cart:', productId);
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const deleteFromCart = async (productId: string): Promise<void> => {
  try {
    const result = await CartItemModel.deleteOne({ productId }).exec();
    if (result.deletedCount === 0) {
      throw new Error(`Cart item with productId ${productId} not found`);
    }
    console.log('Deleted cart item:', productId);
  } catch (error) {
    console.error('Error deleting from cart:', error);
    throw error;
  }
};

export const getCartData = async (): Promise<CartItem[]> => {
  try {
    const items = await CartItemModel.find().exec();
    return items;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
};

// Cascade delete cart items when a product is deleted
export const deleteCartItemsByProductId = async (productId: string): Promise<void> => {
  try {
    await CartItemModel.deleteMany({ productId }).exec();
    console.log('Deleted cart items for product:', productId);
  } catch (error) {
    console.error('Error deleting cart items:', error);
    throw error;
  }
};

export default CartItemModel;