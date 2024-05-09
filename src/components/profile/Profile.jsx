import ProfileBlogs from "./ProfileBlogs";
import ProfileInfo from "./ProfileInfo";

export default function Profile() {
  return (
    <div className="container">
      <ProfileInfo />
      <ProfileBlogs/>
    </div>
  );
}
