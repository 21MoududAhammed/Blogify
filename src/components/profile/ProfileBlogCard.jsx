import { Link, useBlocker } from "react-router-dom";
import { getDate, getFirstLetter } from "../../utils";
import threeDotsIcon from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import useBlogs from "../../hooks/useBlogs";
import actions from "../../actions";

export default function ProfileBlogCard({
  blog,
  profileBlogs,
  setProfileBlogs,
}) {
  const [isShow, setIsShow] = useState(false);
  const { api } = useAxios();

  // to toggle the edit and delete bar with clicking on three dots
  const handleToggleActions = () => {
    setIsShow(!isShow);
  };

  // to delete a blog
  const handleDeleteBlog = async (blogId) => {
    try {
      const response = await api.delete(`/blogs/${blogId}`);
      if (response.status === 200) {
        setProfileBlogs(() =>
          profileBlogs?.filter((item) => item?.id !== blogId)
        );
        setIsShow(false);
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.warning(err.message);
    }
  };

  return (
    <div className="blog-card">
      <Link to={`/blog-details/${blog?.id}`}>
        <img
          className="blog-thumb"
          src={`${import.meta.env.VITE_BASE_SERVER_URL}/uploads/blog/${
            blog?.thumbnail
          }`}
          alt=""
        />
      </Link>
      <div className="mt-2 relative">
        <Link to={`/blog-details/${blog?.id}`}>
          <h3 className="text-slate-300 text-xl lg:text-2xl">{blog?.title}</h3>
          <p className="mb-6 text-base text-slate-500 mt-1">{blog?.content}</p>
        </Link>
        {/* Meta Informations */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <Link to="/me" className="avater-img bg-indigo-600 text-white">
              {blog?.author?.avatar ? (
                <img
                  className="rounded-full"
                  src={`${
                    import.meta.env.VITE_BASE_SERVER_URL
                  }/uploads/avatar/${blog?.author?.avatar}`}
                />
              ) : (
                <span className="">
                  {getFirstLetter(blog?.author?.firstName)}
                </span>
              )}
            </Link>
            <div>
              <Link to={"/me"}>
                <h5 className="text-slate-500 text-sm">
                  {blog?.author?.firstName} {blog?.author?.lastName}
                </h5>
              </Link>

              <div className="flex items-center text-xs text-slate-700">
                <span>{getDate(blog?.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{blog?.likes?.length} Likes</span>
          </div>
        </div>
        {/* action dot */}
        <div className="absolute right-0 top-0 ">
          <button onClick={handleToggleActions}>
            <img src={threeDotsIcon} alt="3dots of Action" />
          </button>
          {/* Action Menus Popup */}
          {isShow && (
            <div className="action-modal-container">
              <Link to={`/create-blog/${blog?.id}`}>
                <button className="action-menu-item hover:text-lwsGreen">
                  <img src={editIcon} alt="Edit" />
                  Edit
                </button>
              </Link>

              <button
                className="action-menu-item hover:text-red-500"
                onClick={() => handleDeleteBlog(blog?.id)}
              >
                <img src={deleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* action dot ends */}
      </div>
    </div>
  );
}
