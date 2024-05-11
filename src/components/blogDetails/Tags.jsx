export default function Tags({ tags }) {
  const tagArray = tags?.split(",").filter((tag) => tag.trim() !== "");
  return (
    <ul className="tags">
      {tagArray && tagArray.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  );
}
