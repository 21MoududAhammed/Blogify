import { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import api from "../../api";
import useFetchData from "../../hooks/useFetchData";

export default function BlogContent() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);

  const targetRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await api.get(`/blogs?page=${page}`);
        
        if (response.status === 200) {
          console.log(response.data.blogs);
          if (response?.data?.blogs.length > 0) {
            setBlogs([...blogs, ...response.data.blogs]);
            setPage((prevPage) => prevPage + 1);
          } else {
            setLoadMore(false);
          }
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchBlogs();
      }
    });
    // set the target to observe or watch
    observer.observe(targetRef.current);

    // clean up
    return () => {
      observer.disconnect();
    };
  }, [page]);

  if (loading)
    return <div className="space-y-3 md:col-span-5">Blogs fetching....</div>;
  if (error) return <div className="space-y-3 md:col-span-5">{error}</div>;
  return (
    <>
      <div className="space-y-3 md:col-span-5">
        {blogs?.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
        {loadMore ? <p ref={targetRef}>Loading....</p> : <p>No More Data</p>}
      </div>
    </>
  );
}
