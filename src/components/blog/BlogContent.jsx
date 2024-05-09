import { useEffect, useReducer, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import api from "../../api";
import useFetchData from "../../hooks/useFetchData";
import { BlogReducer, initialState } from "../../reducer/BlogsReducer";
import actions from "../../actions";
import useBlogs from "../../hooks/useBlogs";

export default function BlogContent() {
  const {state, dispatch} = useBlogs()
  const targetRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch({
          type: actions.blogs.FETCHING_START,
        });
        const response = await api.get(`/blogs?page=${state?.page}`);

        if (response.status === 200) {
          // console.log(response.data.blogs);
          if (response?.data?.blogs.length > 0) {
            dispatch({
              type: actions.blogs.FETCHED_BLOGS,
              payload: response?.data?.blogs,
            });
          } else {
            dispatch({
              type: actions.blogs.FETCHED_EMPTY_BLOGS,
            });
          }
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: actions.blogs.FETCHING_ERROR,
          payload: err.message,
        });
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
  }, [state?.page]);

  if (state?.loading)
    return <div className="space-y-3 md:col-span-5">Blogs fetching....</div>;
  if (state?.error)
    return <div className="space-y-3 md:col-span-5">{state?.error}</div>;
  return (
    <>
      <div className="space-y-3 md:col-span-5">
        {state?.blogs?.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
        {state?.isMorePage ? (
          <p ref={targetRef}>Loading....</p>
        ) : (
          <p>No More Data</p>
        )}
      </div>
    </>
  );
}
