import { Link } from "react-router-dom";

export default function PopularBlog({ blog }) {
 
  return (
    <li>
      <Link to={`/blog-details/${blog?.id}`}>
        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
          {blog?.title}
        </h3>
      </Link>

      <p className="text-slate-600 text-sm">
        by
        <Link to="/me">
          {" "}
          {blog?.author?.firstName} {blog?.author?.lastName}
        </Link>
        <span>·</span> {blog?.likes?.length} Likes
      </p>
    </li>
  );
}
