import { useSelector } from "react-redux";
import type { ReactElement } from "react";
import type { RootState } from "../app/store";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? children : <Navigate to="/login" />;
}