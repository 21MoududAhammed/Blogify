import useFetchData from "../../hooks/useFetchData";
import PopularBlog from "./PopularBlog";

export default function MostPopularBlogs() {
  const { data, loading, error } = useFetchData("/blogs/popular");
  const blogs = data?.blogs;

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="space-y-5 my-5">
          {blogs?.length > 0 &&
            blogs.map((blog) => <PopularBlog key={blog?.id} blog={blog} />)}
        </ul>
      )}
    </div>
  );
}
