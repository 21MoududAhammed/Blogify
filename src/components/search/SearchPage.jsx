import SearchBlogCard from "./SearchBlogCard";
import SearchBox from "./SearchBox";
import closeIcon from "../../assets/icons/close.svg";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";

export default function SearchPage({ onToggleSearchPage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchResult, loading, error } = useDebounce(searchTerm);

  return (
    <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
      {/* Search Container */}
      <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
        {/* Search box */}
        <SearchBox setSearchTerm={setSearchTerm} />
        {/* Search Result */}
        <div className="">
          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {searchResult.length > 0 &&
              searchResult.map((blog) => (
                <SearchBlogCard key={blog?.id} blog={blog} />
              ))}
          </div>
        </div>
        {/* close the modal or SearchPage */}
        <button onClick={onToggleSearchPage}>
          <img
            src={closeIcon}
            alt="Close"
            className="absolute right-2 top-2 cursor-pointer w-8 h-8"
          />
        </button>
      </div>
    </section>
  );
}
