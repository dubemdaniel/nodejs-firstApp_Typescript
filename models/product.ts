import rootDir from "../util/path.js";
import path from "path";
import fs from "fs/promises";

const filePath = path.join(rootDir, "Data", "product.json");

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
    const data = await fs.readFile(filePath, "utf-8");
    const products: Product[] = JSON.parse(data);
    const id = Date.now().toString() + Math.random().toString(36);
    products.push({
      id,
      title,
      imageUrl,
      price,
      description,
    });
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
  } catch (error) {
    await fs.writeFile(
      filePath,
      JSON.stringify(
        [
          {
            title,
            imageUrl,
            price,
            description,
          },
        ],
        null,
        2
      )
    );
  }
  // products.push({title})
};

// this is for getting or retrieving products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
  // return products
};

// this is for updating product that has been saved before
export const updateProduct = async (
  id: string,
  updatedProduct: { title: string; imageUrl: string; price: number; description: string }
): Promise<void> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const products: Product[] = JSON.parse(data);
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    products[productIndex] = { id, ...updatedProduct };
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};


// this is for getting product detail, by getting product by their ID
export const getProductById = async (id?: string): Promise<Product | null> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const products: Product[] = JSON.parse(data);

    
    const product = products.find((product) => product.id === id);

    // Return the product if found, otherwise return null
    // console.log(product);
    return product || null;
  } catch (error) {
    console.error("Error reading products file:", error);
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const products: Product[] = JSON.parse(data);
    const updatedProducts = products.filter((product) => product.id !== id);
    if (products.length === updatedProducts.length) {
      throw new Error(`Product with ID ${id} not found`);
    }
    await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};