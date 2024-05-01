import likeIcon from "../../assets/icons/like.svg";
import filledLikeIcon from "../../assets/icons/fill-like.svg";
import heartIcon from "../../assets/icons/heart.svg";
import filledHeartIcon from "../../assets/icons/heart-filled.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { useState } from "react";
export default function FloatingActions({ blog }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(blog?.isFavourite);

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li onClick={() => setIsLiked(!isLiked)}>
          <img src={isLiked ? filledLikeIcon : likeIcon} alt="like" />
          {blog?.likes?.length > 0 && <span>{blog?.likes?.length}</span>}
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
