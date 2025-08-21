import { cx } from "../lib/utils";

function TagButton({ tag, selected, onClick }) {
  return (
    <button
      className={cx(
        "inline-flex items-center gap-x-1 rounded-md px-3 py-1.5 text-sm font-medium ring-1 transition-all duration-200 ring-inset focus:ring-2 focus:ring-teal-500/50 focus:outline-none",
        selected
          ? "bg-teal-50 text-teal-900 ring-teal-500/30 dark:bg-teal-400/10 dark:text-teal-400 dark:ring-teal-400/30"
          : "bg-zinc-50 text-zinc-700 ring-zinc-500/20 hover:bg-teal-50 hover:text-teal-700 hover:ring-teal-500/30 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20 dark:hover:bg-teal-400/10 dark:hover:text-teal-400 dark:hover:ring-teal-400/30",
      )}
      aria-pressed={selected}
      onClick={onClick}
    >
      {selected && (
        <div className="h-1.5 w-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
      )}
      {tag}
    </button>
  );
}

function Tags({ tags, selectedTag, setSelectedTag }) {
  const allTags = ["All", ...tags.sort()];

  return (
    <div className="my-4">
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            selected={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          />
        ))}
      </div>
    </div>
  );
}

export default Tags;
