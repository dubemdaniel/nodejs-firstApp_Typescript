import rootDir from "../util/path.js";
import path from "path";
import fs from "fs/promises";

const filePath = path.join(rootDir, "Data", "cart.json");

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

export const addToCart = async (productId: string, product: Product): Promise<void> => {
  try {
    let cart: Cart = { items: [] };
    try {
      const data = await fs.readFile(filePath, "utf-8");
      cart = JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or is invalid, start with an empty cart
      console.error("Error reading cart file, initializing empty cart:", error);
    }

    const existingItemIndex = cart.items.findIndex((item) => item.productId === productId);

    if (existingItemIndex >= 0) {
      // Product already in cart, increment quantity
      cart.items[existingItemIndex]!.quantity += 1;
    } else {
      // Add new product to cart
      cart.items.push({
        productId,
        quantity: 1,
        title: product.title,
        price: product.price,
      });
    }

    await fs.writeFile(filePath, JSON.stringify(cart, null, 2));
  } catch (error) {
    console.error("Error writing to cart file:", error);
    throw error;
  }
};

export const getCartData = async (): Promise<Cart> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading cart file:", error);
    return { items: [] };
  }
};

export const deleteFromCart = async (productId: string): Promise<void> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const cart: Cart = JSON.parse(data);
    const updatedItems = cart.items.filter((item) => item.productId !== productId);
    if (cart.items.length === updatedItems.length) {
      throw new Error(`Cart item with productId ${productId} not found`);
    }
    cart.items = updatedItems;
    await fs.writeFile(filePath, JSON.stringify(cart, null, 2));
  } catch (error) {
    console.error("Error deleting from cart:", error);
    throw error;
  }
};