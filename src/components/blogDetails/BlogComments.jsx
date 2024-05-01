import { getFirstLetter } from "../../utils";
import Comment from "./Comment";

export default function BlogComments({ blog }) {
  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments{" "}
          {blog?.comments?.length > 0 && (
            <span>({blog?.comments?.length})</span>
          )}{" "}
        </h2>
        <div className="flex items -center space-x-4">
          <div className="avater-img bg-indigo-600 text-white">
            {blog?.author?.avatar ? (
              <img
                className="rounded-full"
                src={`${import.meta.env.VITE_BASE_SERVER_URL}/uploads/avatar/${
                  blog?.author?.avatar
                }`}
              />
            ) : (
              <span className="">
                {getFirstLetter(blog?.author?.firstName)}
              </span>
            )}
          </div>
          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"
              defaultValue={""}
            />
            <div className="flex justify-end mt-4">
              <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                Comment
              </button>
            </div>
          </div>
        </div>
        {blog?.comments?.length > 0 &&
          blog?.comments?.map((comment) => (
            <Comment key={comment?.id} comment={comment} />
          ))}
      </div>
    </section>
  );
}
