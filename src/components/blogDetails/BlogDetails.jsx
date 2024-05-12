import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogInfo from "./BlogInfo";
import BlogComments from "./BlogComments";
import FloatingActions from "./FloatingActons";
import useFetchData from "../../hooks/useFetchData";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useFetchSingleBlog from "../../hooks/useFetchSingleBlog";
import LoadingSpinner from "../common/LoadingSpinner";
export default function BlogDetails() {
  // blogId
  const { id } = useParams();
  const { auth } = useAuth();
  // fetch a blog
  const { blog, loading, error } = useFetchSingleBlog(id);

  // state to handle the like and unlike
  const [like, setLike] = useState({
    isLiked: false,
    likeQuantity: 0,
  });
  // state to handle the comments
  const [blogComments, setBlogComments] = useState([]);

  // to set the initial state of like and comment after getting blog
  // Because it will set unexpected value before getting blog as react never set the initial value twice
  useEffect(() => {
    setLike({
      ...like,
      isLiked: blog?.likes?.some((item) => item.id === auth?.user?.id),
      likeQuantity: blog?.likes?.length,
    });
    setBlogComments(blog?.comments);
  }, [blog]);

  if (loading)
    return (
      <div className="my-5">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Failed to data fetch. Please try again.</div>;

  return (
    <>
      {Object.keys(blog).length !== 0 && (
        <>
          <BlogInfo blog={blog} likeQuantity={like.likeQuantity} />
          <BlogComments
            blog={blog}
            blogComments={blogComments}
            setBlogComments={setBlogComments}
          />

          <FloatingActions
            blog={blog}
            like={like}
            setLike={setLike}
            blogComments={blogComments}
          />
        </>
      )}
    </>
  );
}
