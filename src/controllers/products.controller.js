import * as model from "../models/products.model.js";
import path from "path";

const __dirname = import.meta.dirname;

const jsonPath = path.join(__dirname, "./products.json");
// const json = fs.readFileSync(jsonPath, "utf-8");
// const products = JSON.parse(json);

export const getAllProducts_controller = (req, res) => {
  res.json(model.getAllProducts_model());
};

export const searchProduct_controller = (req, res) => {
  const { name } = req.query;
  const products = model.getAllProducts_model();
  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
  res.json(filteredProducts);
};

export const getProductById_controller = (req, res) => {
  const { id } = req.params;
  const product = model.getProductById_model(id);
  if (!product) {
    res.status(404).json({ error: "No existe el producto" });
  }
  res.json(product);
};

export const createProduct_controller = (req, res) => {
  const { name, price } = req.params;

  const newProduct = model.createProduct_model({ name, price });
  res.status(201).json(newProduct);
};

// const { name, price, anio, categories, marca } = req.body;
//   const newProduct = model.createProduct_model({ name, price, anio, categories, marca });

export const deleteProduct_controller = (req, res) => {
  //const {Id} = req.params;
  //const product = model.deleteProduct_model(Id);
  const productId = parseInt(req.params.id, 10);
  const product = model.deleteProduct_model(productId);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.status(204).send();
};
export const putProduct_controller= (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = model.putProduct_model(productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
//   const { name, price } = req.body;

//   products[productIndex] = { id: productId, name, price };
//   res.json(products[productIndex]);
    res.status(204).send();
  };