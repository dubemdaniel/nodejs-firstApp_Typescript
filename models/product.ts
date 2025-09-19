import rootDir from '../util/path.js'
import path from 'path'
import fs from "fs/promises"

const filePath = path.join(rootDir, "Data", "product.json")


interface Product {
    title: string
}

// let products: Product[] = []

// this is for adding products
export const addProduct = async (title: string): Promise<void> => {

    try {
        const data = await fs.readFile(filePath, "utf-8");
        const products: Product[] = JSON.parse(data)
        products.push({ title })
        await fs.writeFile(filePath, JSON.stringify(products, null, 2))
    } catch (error) {
        await fs.writeFile(filePath, JSON.stringify([{title}], null, 2))
    }
    // products.push({title})
} 


// this is for getting or retrieving products
export const getAllProducts =  async (): Promise<Product[]> => {

    try {
        const data = await fs.readFile(filePath, "utf-8")
        return JSON.parse(data)
    } catch (error) {
        return []
    }
    // return products
}