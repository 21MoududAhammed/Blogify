import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import BlogCard from "../blog/BlogCard";

export default function () {
  const { auth } = useAuth();
  const userId = auth?.user?.id;
  const { data, loading, error } = useFetchData(`/profile/${userId}`);
  const blogs = data?.blogs;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <div className="my-6 space-y-4">
        {blogs?.length > 0 && blogs.map((blog) => <BlogCard blog={blog} />)}
      </div>
    </>
  );
}
