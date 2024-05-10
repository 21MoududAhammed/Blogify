import { getFirstLetter } from "../../utils";

export default function Comment({ comment }) {
  return (
    <div className="flex items-start space-x-4 my-8">
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
    </div>
  );
}
