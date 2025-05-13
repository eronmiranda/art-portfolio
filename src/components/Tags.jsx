import { MotionSpan } from "./Motion";

function TagButton({ tag, selected, onClick }) {
  return (
    <button
      className={`md:text-md relative overflow-hidden rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 outline-none ${selected || "hover:border-teal-500"}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {selected && (
        <MotionSpan
          layoutId="tag-active-bg"
          className="absolute inset-0 z-0 rounded-full bg-teal-700"
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      )}
      <span
        className={`relative z-10 ${selected ? "text-white" : "text-zinc-700 hover:text-teal-700 dark:text-zinc-100"}`}
      >
        {tag}
      </span>
    </button>
  );
}

function Tags({ allTags, selectedTag, onSelectTag, display }) {
  if (!display) {
    return null;
  }
  return (
    <div className="my-4 flex flex-wrap gap-2">
      <TagButton
        tag="All"
        selected={selectedTag === "All"}
        onClick={() => onSelectTag("All")}
      />
      {allTags.map((tag) => (
        <TagButton
          key={tag}
          tag={tag}
          selected={selectedTag === tag}
          onClick={() => onSelectTag(tag)}
        />
      ))}
    </div>
  );
}

export default Tags;
