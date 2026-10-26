import { useAuthStore } from "@/hooks/auth/useAuthStore";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}:PropsWithChildren){
  const user = useAuthStore((state) => state.user);

  if(!user){
    return <Navigate to= "/login" replace/>;
  }
  return children;
}