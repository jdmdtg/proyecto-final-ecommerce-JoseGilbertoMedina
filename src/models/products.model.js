import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;

const jsonPath = path.join(__dirname, "./products.json");
const json = fs.readFileSync(jsonPath, "utf-8");
const products = JSON.parse(json);

export const getAllProducts_model = () => {
  return products;
};

export const getProductById_model = (id) => {
  return products.find((item) => item.id == id);
};

export const createProduct_model = (name, price) => {
  const newProduct = {
    id: products.length + 1,
    name: name,
    price: price,
    // ...data,
  };

  products.push(newProduct);

  fs.writeFileSync(jsonPath, JSON.stringify(products));

  return newProduct;
};

export const deleteProduct_model = (id) => {
  const productIndex = products.findIndex((p) => p.id == id);
    
  // const product = products.splice(productIndex, 10);
  //   fs.writeFileSync(jsonPath, JSON.stringify(products));
  //   return product;

  if (productIndex == -1) {
    return null;
  } else {
    const product = products.splice(productIndex, 1);
    fs.writeFileSync(jsonPath, JSON.stringify(products));
    return product;
  }
};
export const putProduct_model= (id) => {
   const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    return null 
    // return res.status(404).json({ error: "Producto no encontrado" });
  }
  const { name, price, categoria, marca, modelo, anio } = req.body;
  products[productIndex] = { id: productId, name, price, categoria, marca, modelo, anio };
  res.json(products[productIndex]);
};

