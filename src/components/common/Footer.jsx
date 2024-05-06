import logo from "../../assets/logo.jpg";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" mb-8 bg-[#030317] mt-40">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-10 rounded" src={logo} alt="lws" />
          <h2 className="text-2xl font-bold font-serif">Blogify</h2>
        </Link>
        <ul className="flex items-center space-x-5 text-xl">
          <li className="text-center">
            <Link
              className="text-white/50 hover:text-white transition-all duration-200"
              to="#"
            >
              <FaFacebook />
            </Link>
          </li>
          <li className="text-center">
            <Link
              className="text-white/50 hover:text-white transition-all duration-200"
              to="#"
            >
              <FaInstagramSquare />
            </Link>
          </li>
          <li className="text-center">
            <Link
              className="text-white/50 hover:text-white transition-all duration-200"
              to="#"
            >
              <FaTwitter />
            </Link>
          </li>
          <li className="text-center">
            <Link
              className="text-white/50 hover:text-white transition-all duration-200"
              to="#"
            >
              <IoLogoYoutube />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
