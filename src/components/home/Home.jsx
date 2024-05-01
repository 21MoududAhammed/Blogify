import BlogContent from "../blog/BlogContent";
import MostPopular from "./MostPopular";
export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      {/* blog content  */}
      <BlogContent />

      {/* sidebar  */}
      <div className="md:col-span-2 h-full w-full space-y-5">
        <MostPopular/>
      </div>
    </div>
  );
}
