import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args) {
  return twMerge(clsx(...args));
}

export const focusInput = [
  // base
  "focus:ring-4",
  // ring color
  "focus:ring-teal-500/10 dark:focus:ring-teal-400/10",
  // outline color
  "focus:outline-teal-500 dark:focus:outline-teal-400",
];

export const inputBaseStyles = [
  // Layout & Sizing
  "w-full",
  "px-3",
  "py-[calc(--spacing(2)-1px)]",
  "text-md md:text-lg",

  // Appearance
  "appearance-none",
  "rounded-[calc(var(--radius-md)-1px)]",
  "bg-white dark:bg-zinc-700/[0.15]",
  "shadow-md",
  "shadow-zinc-800/5",

  // Text
  "text-zinc-900 dark:text-zinc-200",
  "placeholder:italic placeholder:text-zinc-400 dark:placeholder:text-zinc-500",

  // Outline
  "outline",
  "outline-zinc-900/10 dark:outline-zinc-700",
];

export function filterAndMapImages(rawImages) {
  return rawImages
    .filter((image) => image.url !== undefined)
    .filter((image) => image.display === undefined || image.display === true)
    .map((image) => ({
      src: image.url,
      alt: image.title,
      title: image.title,
      tags: image.tags,
    }));
}
