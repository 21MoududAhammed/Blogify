import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProfileBlogsProvider from "../../provider/ProfileBlogsProvider";

export default function PrivateRoute() {
  const { auth } = useAuth();
  if (!auth?.authToken) return <Navigate to={"/login"} />;
  return (
    <>
      <ProfileBlogsProvider>
        <Outlet />
      </ProfileBlogsProvider>
    </>
  );
}
