import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import FavoriteBlog from "./FavoriteBlog";

export default function YourFavorite() {
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { api } = useAxios();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await api.get(`/blogs/favourites`);
        if (response.status === 200) {
          setFavoriteBlogs(response?.data?.blogs);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

 

  if (loading) return <div>Data Fetching...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favorites ❤️
      </h3>
      <ul className="space-y-5 my-5">
        {favoriteBlogs?.length > 0 &&
          favoriteBlogs.map((blog) => (
            <FavoriteBlog key={blog.id} blog={blog} />
          ))}
      </ul>
    </div>
  );
}
