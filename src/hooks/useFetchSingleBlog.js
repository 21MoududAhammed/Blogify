import axios from "axios";
import { useEffect, useState } from "react";

const useFetchSingleBlog = (blogId) => {
    
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_SERVER_URL}/blogs/${blogId}`
        );
        if (response.status === 200) {
          setBlog(response.data);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  return { blog, loading, error };
};

export default useFetchSingleBlog;
