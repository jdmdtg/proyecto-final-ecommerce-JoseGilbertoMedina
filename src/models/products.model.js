import fs from "fs";
import path from "path";
 
const __dirname = import.meta.dirname;

const jsonPath = path.join(__dirname, "./products.json");
const json = fs.readFileSync(jsonPath, "utf-8");
const products = JSON.parse(json);

const Users_jsonPath = path.join(__dirname, "./users.json");
const User_json = fs.readFileSync(Users_jsonPath, "utf-8");
const users = JSON.parse(User_json);
// console.log(Users_jsonPath);

import { db } from "./data.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");
//GET ALL PRODUCTS
export const getAllProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async () => {
  try {
    // const snapshot = await getDocs(users);
    // return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error(error);
  }
};

//GET PRODUCT BY ID 
export const getProductById = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    console.error(error);
  }
};

//POST 
export const createProduct = async (data) => {
  try {
    const docRef = await addDoc(productsCollection, data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(error);
  }
};

// PUT 
export async function updateProduct(id, productData) {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);
    if (!snapshot.exists()) {
      return false;
    }
    await setDoc(productRef, productData); // reemplazo completo
    return { id, ...productData };
  } catch (error) {
    console.error(error);
  }
}
//DELETE 
export const deleteProduct = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);
    if (!snapshot.exists()) {
      return false;
    }
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error(error);
  }
};

//PATCH
export async function updatePartProducts(id, newPrice) {
  try {
    const products = doc(db, "products", id);
    const productData={ price: newPrice,};
    const productDatas = await setDoc(products, productData, { merge: true });
    if (!productDatas) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}
