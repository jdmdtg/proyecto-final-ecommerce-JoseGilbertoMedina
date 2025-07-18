import { Router } from "express";

const router = Router();

// const products = [
//   { id: 1, name: "Camiseta Deportiva", price: 150 },
//   { id: 2, name: "Zapatos Running", price: 1200 },
//   { id: 3, name: "Mochila Escolar", price: 350 },
//   { id: 4, name: "Auriculares Bluetooth", price: 800 },
//   { id: 5, name: "Botella Térmica", price: 220 },
// ];

import {
  getAllProducts,
  searchProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProducts,
  updatePartProducts,
} from "../controllers/products.controller.js";

//logueo
import { auth } from "../middleware/auth.middleware.js";

router.get("/products", getAllProducts);
router.get("/products/search/:tipo", searchProducts);
router.get("/products/:id", getProductById);
router.post("/products", auth, createProduct);
router.put("/products/:id", auth, updateProducts);
router.patch("/products/:id", auth, updatePartProducts);
router.delete("/products/:id", auth, deleteProduct);

export default router;