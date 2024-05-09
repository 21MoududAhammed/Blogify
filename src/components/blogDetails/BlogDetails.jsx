import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogInfo from "./BlogInfo";
import BlogComments from "./BlogComments";
import FloatingActions from "./FloatingActons";
import useFetchData from "../../hooks/useFetchData";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
export default function BlogDetails() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [like, setLike] = useState({
    isLiked: false,
    likeQuantity: 0,
  });

  // load the blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_SERVER_URL}/blogs/${id}`
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
    fetchBlog();
  }, []);

  // to set the initial state of like after getting blog
  useEffect(() => {
    setLike({
      ...like,
      isLiked: blog?.likes?.some((item) => item.id === auth?.user?.id),
      likeQuantity: blog?.likes?.length,
    });
  }, [blog]);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {Object.keys(blog).length !== 0 && (
        <>
          <BlogInfo blog={blog} likeQuantity={like.likeQuantity} />
          <BlogComments blog={blog} />
          {auth?.user && (
            <FloatingActions blog={blog} like={like} setLike={setLike} />
          )}
        </>
      )}
    </>
  );
}
