import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getDate, getFirstLetter } from "../../utils";
import Tags from "./Tags";

export default function BlogInfo({ blog, likeQuantity }) {
  const { auth } = useAuth();

  return (
    <div className=" text-center py-8">
      <h1 className="font-bold text-3xl md:text-5xl">{blog.title}</h1>
      <div className="flex justify-center items-center my-4 gap-4">
        <div className="flex items-center capitalize space-x-2">
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
          {auth?.user?.id === blog?.author?.id ? (
            <Link to={"/me"}>
              <h5 className="text-slate-500 text-sm">
                {blog?.author?.firstName} {blog?.author?.lastName}
              </h5>
            </Link>
          ) : (
            <h5 className="text-slate-500 text-sm">
              {blog?.author?.firstName} {blog?.author?.lastName}
            </h5>
          )}
        </div>
        <span className="text-sm text-slate-700 dot">
          {getDate(blog?.createdAt)}
        </span>
        <span className="text-sm text-slate-700 dot">{likeQuantity} Likes</span>
      </div>
      <img
        className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
        src={`${import.meta.env.VITE_BASE_SERVER_URL}/uploads/blog/${
          blog?.thumbnail
        }`}
        alt=""
      />
      {/* Tags */}
      <Tags tags={blog?.tags} />
      {/* Content */}
      <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
        {blog?.content}
      </div>
    </div>
  );
}
