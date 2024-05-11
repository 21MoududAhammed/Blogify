import { useState } from "react";
import searchIcon from "../../assets/icons/search.svg";
import { createPortal } from "react-dom";
import SearchPage from "./SearchPage";
import usePortal from "../../hooks/usePortal";

export default function Search() {
  const [isShow, setIsShow] = useState(false);
  const { Portal } = usePortal();
  const handleToggleSearchPage = () => {
    setIsShow(!isShow);
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleToggleSearchPage}
    >
      <img src={searchIcon} alt="Search" />
      {/* <span>Search</span> */}
      {isShow && (
        <Portal>
          <SearchPage onToggleSearchPage={handleToggleSearchPage} />
        </Portal>
      )}
    </div>
  );
}
