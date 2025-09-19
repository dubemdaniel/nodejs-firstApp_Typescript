interface Product {
    title: string
}

let products: Product[] = []

// this is for adding products
export const addProduct = (title: string): void => {
    products.push({title})
} 


// this is for getting or retrieving products
export const getAllProducts = (): Product[] => {
    return products
}