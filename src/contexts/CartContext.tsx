// src/contexts/CartContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { CartItem, Product } from "../types";
import { useAuth } from "./AuthContext";
import { getCart, saveCart, CartItem as DbCartItem } from "../services/cartService";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const GUEST_KEY = "guest_cart";
  const suppressGuestWriteRef = useRef(false);
  const prevUidRef = useRef<string | null>(null);

  // ✅ Guest cart from localStorage (only guest key)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(GUEST_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  // --- converters between your CartItem and Firestore cart items ---
  const toDbItems = (items: CartItem[]): DbCartItem[] =>
    items.map((i) => ({
      productId: i.product.id,
      name: i.product.name,
      price: i.product.price,
      image: (i.product as any).image,
      quantity: i.quantity,
    }));

  const fromDbItems = (items: DbCartItem[]): CartItem[] =>
    items.map((i) => ({
      product: {
        id: i.productId,
        name: i.name,
        price: i.price,
        image: i.image,
        // placeholders (if Product requires these fields)
        description: "",
        category: "unknown",
        inStock: true,
        features: [],
      } as any,
      quantity: i.quantity,
    }));

  // ✅ When user logs in -> load Firestore cart
  useEffect(() => {
    const load = async () => {
      if (!user) return;

      try {
        const dbItems = await getCart(user.uid);

        // If Firestore empty but guest/local has items -> upload guest/local to Firestore
        if (dbItems.length === 0 && cartItems.length > 0) {
          await saveCart(user.uid, toDbItems(cartItems));
          return;
        }

        setCartItems(fromDbItems(dbItems));
      } catch (e) {
        console.error("getCart error:", e);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  // ✅ Detect logout and restore guest cart (do NOT overwrite guest cart with previous user cart)
  useEffect(() => {
    const prev = prevUidRef.current;
    const curr = user?.uid ?? null;

    // logout: had user before, now null
    if (prev && !curr) {
      suppressGuestWriteRef.current = true;

      try {
        const raw = localStorage.getItem(GUEST_KEY);
        setCartItems(raw ? JSON.parse(raw) : []);
      } catch {
        setCartItems([]);
      }
    }

    prevUidRef.current = curr;
  }, [user]);

  // ✅ Persist changes
  useEffect(() => {
    // Guest -> localStorage (guest key only)
    if (!user) {
      // skip 1 write right after logout so we don't save previous user's cart as guest cart
      if (suppressGuestWriteRef.current) {
        suppressGuestWriteRef.current = false;
        return;
      }

      try {
        localStorage.setItem(GUEST_KEY, JSON.stringify(cartItems));
      } catch {}
      return;
    }

    // Logged-in -> Firestore (debounce)
    const t = setTimeout(() => {
      saveCart(user.uid, toDbItems(cartItems)).catch((e) =>
        console.error("saveCart error:", e)
      );
    }, 300);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, user?.uid]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { product, quantity: 1 }];
    });

    toast.success(`"${product.name}" е добавен в количката!`);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    toast.success("Продуктът е премахнат от количката!");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
