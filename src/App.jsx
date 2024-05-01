import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BlogDetails from "./components/blogDetails/BlogDetails";
import CreateBlog from "./components/blog/CreateBlog";
import Profile from "./components/profile/Profile";
export default function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/me" element={<Profile />} />
      </Route>
    </Routes>
  );
}
