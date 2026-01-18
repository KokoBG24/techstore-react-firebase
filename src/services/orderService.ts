import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export type OrderStatus = "new" | "processing" | "shipped" | "cancelled";

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type Order = {
  id: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
};

export const createOrder = async (payload: Omit<Order, "id">) => {
  const ref = await addDoc(collection(db, "orders"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

export const getMyOrders = async (uid: string): Promise<Order[]> => {
  const q = query(collection(db, "orders"), where("userId", "==", uid), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
};

export const getAllOrders = async (): Promise<Order[]> => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  await updateDoc(doc(db, "orders", orderId), { status });
};
