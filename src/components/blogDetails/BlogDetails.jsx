import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import BlogInfo from "./BlogInfo";
import BlogComments from "./BlogComments";
import FloatingActions from "./FloatingActons";
import useFetchData from "../../hooks/useFetchData";
export default function BlogDetails() {
  const { id } = useParams();
  const { data: blog, loading, error } = useFetchData(`/blogs/${id}`);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <BlogInfo blog={blog} />
      <BlogComments blog={blog} />
      <FloatingActions blog={blog} />
    </>
  );
}
