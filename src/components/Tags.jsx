import { MotionSpan } from "./Motion";
import { cx } from "../lib/utils";

function TagButton({ tag, selected, onClick }) {
  return (
    <button
      className={cx(
        "md:text-md relative overflow-hidden rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 outline-none",
        selected || "hover:border-teal-500",
      )}
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
        className={cx(
          "relative z-10",
          selected
            ? "text-white"
            : "text-zinc-700 hover:text-teal-700 dark:text-zinc-100",
        )}
      >
        {tag}
      </span>
    </button>
  );
}

function Tags({ tags, selectedTag, onSelectTag }) {
  if (!tags || tags.length === 0) {
    return null;
  }
  const allTags = ["All", ...tags.sort()];
  return (
    <div className="my-4 flex flex-wrap gap-2">
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
