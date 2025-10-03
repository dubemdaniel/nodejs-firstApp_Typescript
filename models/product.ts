
// import Pool from "../util/database.js"
import mongoose, { Schema, Document } from "mongoose";

export interface Product extends Document {
  title: string;
  imageUrl: string;
  price: number;
  description: string
}

const productSchema = new Schema<Product>({
  title: { type: String, required: true, maxlength: 255 },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
}, { timestamps: true }
)

const ProductModel = mongoose.model<Product>('product', productSchema)


export const addProduct = async (
  title: string,
  imageUrl: string,
  price: number,
  description: string
): Promise<void> => {
  try {
    await ProductModel.create({ title, imageUrl, price, description });
    console.log('Added product:', title);
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  updatedProduct: { title: string; imageUrl: string; price: number; description: string }
): Promise<void> => {
  try {
    const result = await ProductModel.updateOne(
      { _id: id },
      { $set: updatedProduct }
    );
    if (result.matchedCount === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
    console.log('Updated product:', id);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const result = await ProductModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
    console.log('Deleted product:', id);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products = await ProductModel.find().exec();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const product = await ProductModel.findById(id).exec();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export default ProductModel;