import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import BlogInfo from "./BlogInfo";
import BlogComments from "./BlogComments";
import FloatingActions from "./FloatingActons";
export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        setError(null);
        const response = await api.get(`/blogs/${id}`);
        if (response.status === 200) {
          setBlog(response.data);
        }
      } catch (err) {
        console.log(err);
        setError(err.message)
      }finally{
        setLoading(false)
      }
    };
    fetchBlog();
  }, []);

  if(loading) return <div>Loading....</div>
  if(error) return <div>{error}</div>

  return (
    <>
      <BlogInfo blog={blog} />
      <BlogComments blog={blog} />
      <FloatingActions  blog={blog}/>
    </>
  );
}
