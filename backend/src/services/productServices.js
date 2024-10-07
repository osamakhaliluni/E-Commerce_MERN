import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
  try {
    const products = await productModel.find();
    return products;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

const clearModel = async () => {
  try {
    await productModel.deleteMany({});
    console.log("Collection cleared!");
  } catch (err) {
    console.error(err);
  }
};

const getModel = async () => {
  const pros = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await pros.json();
  const myProducts = [];
  await clearModel();
  data.forEach((element) => {
    myProducts.push({
      title: element.title,
      price: element.price,
      category: element.category.name,
      image: element.images[0],
      description: element.description,
      quantity: 5,
    });
  });
  await productModel.insertMany(myProducts);
};

export const initialize = async () => {
  const currentProducts = await getAllProducts();
  if (currentProducts.length === 0) {
    getModel();
    console.log("Products initialized successfully.");
  }
};
