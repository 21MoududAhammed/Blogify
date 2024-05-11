import { useEffect, useReducer, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import api from "../../api";
import useFetchData from "../../hooks/useFetchData";
import { BlogReducer, initialState } from "../../reducer/BlogsReducer";
import actions from "../../actions";
import useBlogs from "../../hooks/useBlogs";
import LoadingSpinner from "../common/LoadingSpinner";

export default function BlogContent() {
  const { state, dispatch } = useBlogs();
  const targetRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch({
          type: actions.blogs.FETCHING_START,
        });
        const response = await api.get(`/blogs?page=${state?.page}`);

        if (response.status === 200) {
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
          payload: 'Error fetching blogs. Please try again.',
        });
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && state.isMorePage) {
        fetchBlogs();
      }
    });
    // set the target to observe or watch if the targeted element is added in the dom
    if (targetRef.current instanceof Element) {
      observer.observe(targetRef.current);
    }

    // clean up
    return () => {
      if (targetRef.current instanceof Element) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [state?.page]);

  if (state?.loading)
    return <div className="space-y-3 md:col-span-5">Blogs fetching....</div>;
  if (state?.error)
    return <div className="space-y-3 md:col-span-5">{state?.error}</div>;
  return (
    <>
      <div className="space-y-3 md:col-span-5">
        {state?.blogs?.map((blog) => (
          <BlogCard key={blog?.id} blog={blog} />
        ))}
        {state?.isMorePage ? (
          <div ref={targetRef}><LoadingSpinner/></div>
        ) : (
          <p>No more blogs.</p>
        )}
      </div>
    </>
  );
}
