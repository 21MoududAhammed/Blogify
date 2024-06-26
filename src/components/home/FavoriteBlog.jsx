import { Link } from "react-router-dom";

export default function FavoriteBlog({ blog }) {
  const tags = blog?.tags?.split(",");
  const hashTags = tags?.map((tag) => `#${tag.trim()}`);
  const nextTags = hashTags?.join(" ");
  return (
    <li>
      <Link to={`blog-details/${blog?.id}`}>
        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
          {blog?.title}
        </h3>
      </Link>
      <p className="text-slate-600 text-sm">{nextTags}</p>
    </li>
  );
}
