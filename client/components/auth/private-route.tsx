import { useAuth } from "@/app/context/auth-context";
import { router } from "expo-router";
import { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    router.push("/login");
    return null;
  }

  return children;
}
