import likeIcon from "../../assets/icons/like.svg";
import filledLikeIcon from "../../assets/icons/fill-like.svg";
import heartIcon from "../../assets/icons/heart.svg";
import filledHeartIcon from "../../assets/icons/heart-filled.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
// import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function FloatingActions({ blog, like, setLike, blogComments }) {
 
  // const { auth } = useAuth();
  const { api } = useAxios();
  // there is a bug in backend. That's why blog?.isFavorite is always false
  const [isFavorite, setIsFavorite] = useState(blog?.isFavourite);

  // there was another way to handle it but this is also not update all the time
  // const [isFavorite, setIsFavorite] = useState(() =>
  //   auth?.user?.favourites?.some((item) => item.id === blog.id)
  // );

  //  to like and unlike a blog
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
  //  to set and reset the favorite
  const handleIsFavorite = async (blogId) => {
    try {
      const response = await api.patch(`/blogs/${blog?.id}/favourite`);
      if (response.status === 200) {
        setIsFavorite(response?.data?.isFavourite);
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
        <li onClick={handleIsFavorite}>
          {/* There is heart-filled.svg in the icons folder */}
          <img src={isFavorite ? filledHeartIcon : heartIcon} alt="Favourite" />
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            {blogComments?.length > 0 && <span>{blogComments?.length}</span>}
          </li>
        </a>
      </ul>
    </div>
  );
}
