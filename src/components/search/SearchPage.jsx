import SearchBlogCard from "./SearchBlogCard";
import SearchBox from "./SearchBox";
import closeIcon from "../../assets/icons/close.svg";

export default function SearchPage({ onToggleSearchPage }) {
  return (
    <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
      {/* Search Container */}
      <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
        {/* Search box */}
        <SearchBox />
        {/* Search Result */}
        <div className="">
          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            <SearchBlogCard />
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
