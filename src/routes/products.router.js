import { Router } from "express";
const router = Router();
import {
  getAllProducts_controller,
  searchProduct_controller,
  getProductById_controller,
  createProduct_controller,
  deleteProduct_controller,
  putProduct_controller,
} from "../controllers/products.controller.js";

router.get("/products", getAllProducts_controller);
router.get("/products/search", searchProduct_controller);
router.get("/products/:id", getProductById_controller);
router.post("/products", createProduct_controller);
router.put("/products/:id", putProduct_controller);
 router.delete("/products/:id", deleteProduct_controller);

export default router;