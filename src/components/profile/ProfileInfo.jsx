import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
export default function ProfileInfo() {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      {/* avatar / profile image */}
      <ProfileAvatar />
      {/* name , email and  bio  */}
      <ProfileDetails />
    </div>
  );
}
