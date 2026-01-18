import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

export const getCart = async (uid: string): Promise<CartItem[]> => {
  const ref = doc(db, "carts", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return [];
  }

  return (snap.data().items ?? []) as CartItem[];
};

export const saveCart = async (uid: string, items: CartItem[]) => {
  const ref = doc(db, "carts", uid);

  await setDoc(
    ref,
    {
      uid,
      items,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
