import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
  try {
    const products = await productModel.find();
    return products;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

export const initialize = async () => {
  const products = [
    { title: "samsung", price: 50, category: "Phone" },
    { title: "apple", price: 60, category: "Phone" },
    { title: "xiaomi", price: 40, category: "Phone" },
    { title: "huawei", price: 70, category: "Phone" },
    { title: "nokia", price: 30, category: "Phone" },
    { title: "oneplus", price: 80, category: "Phone" },
    { title: "asus", price: 65, category: "Laptop" },
    { title: "lenovo", price: 75, category: "Laptop" },
    { title: "dell", price: 60, category: "Laptop" },
    { title: "acer", price: 55, category: "Laptop" },
    { title: "toshiba", price: 45, category: "Laptop" },
  ];

  const currentProducts = await getAllProducts();
  if (currentProducts.length === 0) {
    await productModel.insertMany(products);
    console.log("Products initialized successfully.");
  }
};
