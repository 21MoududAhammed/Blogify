import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import ProfileBlogCard from "./ProfileBlogCard";

export default function () {
  const { auth } = useAuth();
  const userId = auth?.user?.id;
  const [profileBlogs, setProfileBlogs] = useState([]);
  const { data, loading, error } = useFetchData(`/profile/${userId}`);

  useEffect(() => {
    setProfileBlogs(() =>
      data?.blogs?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <div className="my-6 space-y-4">
        {profileBlogs?.length > 0 &&
          profileBlogs.map((blog) => (
            <ProfileBlogCard
              key={blog?.id}
              blog={blog}
              profileBlogs={profileBlogs}
              setProfileBlogs={setProfileBlogs}
            />
          ))}
      </div>
    </>
  );
}
