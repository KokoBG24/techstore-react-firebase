// src/services/productService.ts
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";





import { Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products: Product[] = [];

    querySnapshot.forEach((d) => {
      products.push({ id: d.id, ...(d.data() as Omit<Product, "id">) });
    });

    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};


export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const q = query(collection(db, "products"), where("category", "==", category));
    const querySnapshot = await getDocs(q);

    const products: Product[] = [];
    querySnapshot.forEach((d) => {
      products.push({ id: d.id, ...(d.data() as Omit<Product, "id">) });
    });

    return products;
  } catch (error) {
    console.error("Error getting products by category:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...(docSnap.data() as Omit<Product, "id">) };
  } catch (error) {
    console.error("Error getting product:", error);
    return null;
  }
};

export const addProduct = async (product: Omit<Product, "id">): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<boolean> => {
  try {
    await updateDoc(doc(db, "products", id), product);
    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    return false;
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "products", id));
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};

console.log("Loading products from Firestore...");

