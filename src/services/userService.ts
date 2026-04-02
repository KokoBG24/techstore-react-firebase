import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { User } from "firebase/auth";

export type UserRole = "admin" | "user";

const ADMIN_EMAILS = ["peichevkonstantin21b@gmail.com"];

export async function ensureUserDocument(user: User): Promise<UserRole> {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data() as any;
    return (data.role as UserRole) ?? "user";
  }

  const role: UserRole = ADMIN_EMAILS.includes((user.email ?? "").toLowerCase()) ? "admin" : "user";

  await setDoc(ref, {
    uid: user.uid,
    email: user.email,
    role,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return role;
}
