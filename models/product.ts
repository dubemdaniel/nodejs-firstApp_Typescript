import rootDir from "../util/path.js";
import path from "path";
import fs from "fs/promises";
import Pool from "../util/database.js"

const filePath = path.join(rootDir, "Data", "product.json");

interface CartItem {
  productId: string;
  quantity: number;
  title: string;
  price: number;
}

interface Cart {
  items: CartItem[];
}
interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
}

// let products: Product[] = []

// this is for adding products
export const addProduct = async (
  title: string,
  imageUrl: string,
  price: number,
  description: string
): Promise<void> => {
  try {
    await Pool.execute(
      "INSERT INTO products (title, imageUrl, price, description) VALUES (?, ?, ?, ?)",
      [title, imageUrl, price, description]
    );
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// this is for getting or retrieving products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const [rows] = await Pool.execute("SELECT * FROM products");
    return rows as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// this is for updating product that has been saved before
export const updateProduct = async (
  id: number,
  updatedProduct: { title: string; imageUrl: string; price: number; description: string }
): Promise<void> => {
  try {
    const [result]: any = await Pool.execute(
      "UPDATE products SET title = ?, imageUrl = ?, price = ?, description = ? WHERE id = ?",
      [updatedProduct.title, updatedProduct.imageUrl, updatedProduct.price, updatedProduct.description, id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
    console.log("Updated product:", id);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};


// this is for getting product detail, by getting product by their ID
export const getProductById = async (id?: string): Promise<Product | null | undefined> => {
  try {
    const [rows] = await Pool.execute("SELECT * FROM products WHERE id = ?", [id]);
    const products = rows as Product[];
    return products.length > 0 ? products[0] : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const [result]: any = await Pool.execute("DELETE FROM products WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
    console.log("Deleted product:", id);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
