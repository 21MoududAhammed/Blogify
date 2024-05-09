import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import editIcon from "../../assets/icons/edit.svg";
import saveIcon from "../../assets/icons/save.svg";
import { toast } from "react-toastify";

export default function ProfileDetails() {
  
  const { auth, setAuth } = useAuth();
  const user = auth?.user;
  const { api } = useAxios();
  // state to toggle the input filed and text area 
  const [inputField, setInputField] = useState({
    bio: false,
    name: false,
  });
  // state to manage the user's profile information 
  const [profileInfo, setProfileInfo] = useState({
    bio: user.bio ? user.bio : "",
    firstName: user.firstName ? user.firstName : "",
    lastName: user.lastName ? user.lastName : "",
  });
//  after clicking add bio or edit icon to open a textarea 
  const handleBioInputField = () => {
    setInputField({ ...inputField, bio: true });
  };

// after clicking edit icon to open two text area for firstName and lastName 
  const handleNameInputField = () => {
    setInputField({ ...inputField, name: true });
  };
//  to update / edit bio 
  const handleUpdateBio = async () => {
    try {
      const item = { bio: profileInfo.bio };
      const response = await api.patch(`/profile`, item);
      if (response.status === 200) {
        setAuth({ ...auth, user: response?.data?.user });
        setInputField({ ...inputField, bio: false });
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.warning(err.message);
    }
  };

  //to update name 
  const handleUpdateName = async (name) => {
    try {
      const item = {
        firstName: profileInfo.firstName,
        lastName: profileInfo.lastName,
      };
      const response = await api.patch(`/profile`, item);
      if (response.status === 200) {
        setAuth({ ...auth, user: response?.data?.user });
        setInputField({ ...inputField, name: false });
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.warning(err.message);
    }
  };

  return (
    <>
      <div>
        {/* Display the user name */}
        {user.firstName && user.lastName && !inputField.name && (
          <div className="relative">
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {user?.firstName} {user?.lastName}
            </h3>
            <button
              className="flex-center h-7 w-7 rounded-full absolute top-0 right-[-30px]"
              onClick={handleNameInputField}
            >
              <img src={editIcon} alt="Edit" />
            </button>
          </div>
        )}
        {/*Editing mode of the user name.*/}
        {inputField.name && (
          <div className="space-y-1">
            <input
              className="rounded text-black px-1"
              type="text"
              name="firstName"
              id="firstName"
              value={profileInfo.firstName}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, firstName: e.target.value })
              }
            />{" "}
            <br />
            <input
              className="rounded text-black px-1"
              type="text"
              name="firstName"
              id="firstName"
              value={profileInfo.lastName}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, lastName: e.target.value })
              }
            />{" "}
            <br />
            <button
              className="border-2 px-3 py-1 rounded-full  "
              onClick={handleUpdateName}
            >
              Save Name
            </button>
          </div>
        )}
        {/* email is not mutable here */}
        <h5 className="leading-[231%] lg:text-lg">{user?.email}</h5>
      </div>

      {/* bio */}
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          {user?.bio && !inputField.bio && (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {user?.bio}
            </p>
          )}
        </div>
        {/* when the user already has bio   */}
        {user?.bio && !inputField.bio && (
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={handleBioInputField}
          >
            <img src={editIcon} alt="Edit" />
          </button>
        )}
        {/* when the user hasn't added bio yet. */}
        {!user?.bio && !inputField.bio && (
          <button onClick={handleBioInputField}>Add Bio</button>
        )}
        {/* When user in bio updating mode. */}
        {inputField.bio && (
          <div className="relative">
            <textarea
              name="bio"
              id="bio"
              className=" text-black rounded px-1"
              value={profileInfo.bio}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, bio: e.target.value })
              }
            ></textarea>
            <button
              className="flex-center h-7 w-7 rounded-full absolute "
              onClick={handleUpdateBio}
            >
              <img src={saveIcon} alt="save" />
            </button>
          </div>
        )}
        {/* end bio  */}
      </div>
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
    </>
  );
}
