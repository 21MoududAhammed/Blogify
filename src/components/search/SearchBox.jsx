import { useState } from "react";

export default function SearchBox() {
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <div>
      <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
        Search for Your Desire Blogs
      </h3>
      <input
        type="text"
        placeholder="Start Typing to Search"
        className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
        value={value}
        onChange={handleOnChange}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
