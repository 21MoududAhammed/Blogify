import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getFirstLetter } from "../../utils";
import Comment from "./Comment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export default function BlogComments({ blog, blogComments, setBlogComments }) {
  const [comment, setComment] = useState("");
  const { auth } = useAuth();
  const { api } = useAxios();
  const navigate = useNavigate();

  const handleComment = async () => {
    if (!auth?.user) {
      toast.warning("Please Login to comment.");
      navigate("/login");
    } else {
      try {
        const response = await api.post(`/blogs/${blog?.id}/comment`, {
          content: comment,
        });
        if (response?.status === 200) {
          setBlogComments(response?.data?.comments);
          setComment("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments{" "}
          {blogComments?.length > 0 && <span>({blogComments?.length})</span>}{" "}
        </h2>
        <div className="flex items -center space-x-4">
          {auth?.user?.avatar && (
            <div className="avater-img bg-indigo-600 text-white">
              <img
                className="rounded-full"
                src={`${import.meta.env.VITE_BASE_SERVER_URL}/uploads/avatar/${
                  auth?.user?.avatar
                }`}
              />
            </div>
          )}
          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                onClick={handleComment}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
        {blogComments?.length > 0 &&
          blogComments?.map((comment) => (
            <Comment key={comment?.id} comment={comment} />
          ))}
      </div>
    </section>
  );
}
