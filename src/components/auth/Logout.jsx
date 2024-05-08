import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/icons/logout.svg";
import useAuth from "../../hooks/useAuth";
export default function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <div
      className="text-white/50 hover:text-white transition-all duration-200"
      onClick={handleLogout}
    >
      <img src={logoutIcon} alt="" />
    </div>
  );
}
