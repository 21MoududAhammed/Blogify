import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import api from "../../api";

export default function BlogContent() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/blogs?page=1`);
        if (response.status === 200) {
          setBlogs(response.data.blogs);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading)
    return <div className="space-y-3 md:col-span-5">Blogs fetching....</div>;
  if (error) return <div className="space-y-3 md:col-span-5">{error}</div>;
  return (
    <div className="space-y-3 md:col-span-5">
      {blogs?.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
