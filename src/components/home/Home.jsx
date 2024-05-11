import useAuth from "../../hooks/useAuth";
import BlogContent from "../blog/BlogContent";
import MostPopularBlogs from "./MostPopularBlogs";
import YourFavorite from "./YourFavorite";
export default function Home() {
  const { auth } = useAuth();
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      
      {/* blog content  */}
      <BlogContent />

      {/* sidebar  */}
      <div className="md:col-span-2 h-full w-full space-y-5">
        <MostPopularBlogs />
        {auth?.user && <YourFavorite />}
      </div>
    </div>
  );
}
