import likeIcon from "../../assets/icons/like.svg";
import filledLikeIcon from "../../assets/icons/fill-like.svg";
import heartIcon from "../../assets/icons/heart.svg";
import filledHeartIcon from "../../assets/icons/heart-filled.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function FloatingActions({ blog, like, setLike }) {
  const { auth } = useAuth();
  const { api } = useAxios();

  const [isFavorite, setIsFavorite] = useState(blog?.isFavourite);

  const handleLike = async (blogId) => {
    try {
      const response = await api.post(`/blogs/${blogId}/like`);
      if (response.status === 200) {
        setLike({
          ...like,
          isLiked: response?.data?.isLiked,
          likeQuantity: response?.data?.likes?.length,
        });
      }
    } catch (err) {
      console.log(err);
      toast.warning(err.message);
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li
          onClick={() => {
            handleLike(blog?.id);
          }}
        >
          <img src={like.isLiked ? filledLikeIcon : likeIcon} alt="like" />
          {like.likeQuantity > 0 && <span>{like.likeQuantity}</span>}
        </li>
        <li onClick={() => setIsFavorite(!isFavorite)}>
          {/* There is heart-filled.svg in the icons folder */}
          <img src={isFavorite ? filledHeartIcon : heartIcon} alt="Favourite" />
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>3</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
