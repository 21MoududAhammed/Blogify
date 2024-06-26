import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import useAuth from "../../hooks/useAuth";
import { getFirstLetter } from "../../utils";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import Search from "../search/Search";
export default function Header() {
  const { auth } = useAuth();
  const user = auth?.user;
  return (
    <header>
      <nav className="container">
        {/* Logo */}
        <div>
          <Link to="/" className="flex gap-2 items-center">
            <img className="w-10 rounded" src={logo} alt="lws" />
            <h2 className="text-2xl font-bold font-serif">Blogify</h2>
          </Link>
        </div>
        {/* Actions - Login, Write, Home, Search */}
        {/* Notes for Developers */}
        {/* For Logged in User - Write, Profile, Logout Menu */}
        {/* For Not Logged in User - Login Menu */}
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/create-blog"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            {user && (
              <li>
                <Search />
              </li>
            )}
            <li>
              {!auth?.user ? (
                <Link
                  to="/login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
              ) : (
                <Logout />
              )}
            </li>
            {user && (
              <li className="flex items-center">
                {/* Circular Div with background color */}
                <Link
                  to={"/me"}
                  className="avater-img bg-orange-600 text-white"
                >
                  {user?.avatar ? (
                    <img
                      className=" w-8 h-8 md:w-10 md:h-10 rounded-full"
                      src={`${
                        import.meta.env.VITE_BASE_SERVER_URL
                      }/uploads/avatar/${user?.avatar}`}
                      alt="avatar"
                    />
                  ) : (
                    <span className="">{getFirstLetter(user?.firstName)}</span>
                  )}

                  {/* User's first name initial */}
                </Link>
                {/* Logged-in user's name */}
                <Link to="/me">
                  <span className="text-white ml-2">{user?.firstName}</span>
                </Link>
                {/* Profile Image */}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
