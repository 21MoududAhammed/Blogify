import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoute() {
  const { auth } = useAuth();
  if (!auth?.authToken) return <Navigate to={"/login"} />;
  return (
    <>
      <Outlet />
    </>
  );
}
