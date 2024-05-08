import { useRef, useState } from "react";
import editIcon from "../../assets/icons/edit.svg";
import useAuth from "../../hooks/useAuth";
import { getFirstLetter } from "../../utils";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

export default function ProfileAvatar() {
  const inputRef = useRef();
  const { auth, setAuth } = useAuth();
  const user = auth?.user;
  const { api } = useAxios();
  const [inputField, setInputField] = useState({ bio: false });

  //   to trigger the input file
  const handleInputRef = () => {
    inputRef.current.click();
  };
  //   get avatar and and post it to server
  const handleUpdateProfileAvatar = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const response = await api.post(`/profile/avatar`, formData);
      if (response?.status === 200) {
        const avatar = response?.data?.user?.avatar;
        setAuth({ ...auth, user: { ...auth?.user, avatar: avatar } });
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.warning(err?.message);
    }
  };
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
        {user?.avatar ? (
          <img
            className="h-[120px] w-[120px]  rounded-full"
            src={`${import.meta.env.VITE_BASE_SERVER_URL}/uploads/avatar/${
              user?.avatar
            }`}
          />
        ) : (
          <span className="">{getFirstLetter(user?.firstName)}</span>
        )}
      </div>
      <button
        className="grid place-items-center absolute bottom-2 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
        onClick={handleInputRef}
      >
        <img src={editIcon} alt="Edit" />
      </button>
      {/* to get avatar image but it will be hidden. It will be clicked after clicking edit icon. */}
      <input
        ref={inputRef}
        onChange={handleUpdateProfileAvatar}
        type="file"
        hidden
      />
    </div>
  );
}
