import { useState } from "react";
import { getFirstLetter } from "../../utils";
import threeDotsIcon from "../../assets/icons/3dots.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import useAuth from "../../hooks/useAuth";

export default function Comment({ comment, onDeleteComment }) {
  const [isShow, setIsShow] = useState(false);
  const { auth } = useAuth();
  const handleToggleThreeDots = () => {
    setIsShow(!isShow);
  };
  return (
    <div className="flex items-start space-x-4 my-8 relative">
      <div className="avater-img bg-orange-600 text-white">
        {comment?.author?.avatar ? (
          <img
            className="rounded-full max-h-10"
            src={`${import.meta.env.VITE_BASE_SERVER_URL}/uploads/avatar/${
              comment?.author?.avatar
            }`}
          />
        ) : (
          <span className="">{getFirstLetter(comment?.author?.firstName)}</span>
        )}
      </div>
      <div className="w-full">
        <h5 className="text-slate -500 font-bold">
          {comment?.author?.firstName} {comment?.author?.lastName}
        </h5>
        <p className="text-slate-300">{comment?.content}</p>
      </div>
      {auth?.user?.id === comment?.author?.id && (
        <div className="absolute right-0 top-0 ">
          <button onClick={handleToggleThreeDots}>
            <img src={threeDotsIcon} alt="3dots of Action" />
          </button>
          {/* Action Menus Popup */}
          {isShow && (
            <div className="action-modal-container">
              <button
                className="action-menu-item hover:text-red-500"
                onClick={() => onDeleteComment(comment?.id)}
              >
                <img src={deleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
