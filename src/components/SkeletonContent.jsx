function SkeletonContent() {
  return (
    <div className="mx-auto mt-15 h-full w-full max-w-2xl rounded-md p-4">
      <div className="flex animate-pulse space-x-4">
        <div className="size-20 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="col-span-1 h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="col-span-1 h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="col-span-1 h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="col-span-1 h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonContent;
