import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args) {
  return twMerge(clsx(...args));
}

export function filterAndMapImages(rawImages) {
  return rawImages
    .filter((image) => image.url !== undefined)
    .filter((image) => image.display === undefined || image.display === true)
    .map((image) => ({
      src: image.url,
      alt: image.title,
      title: image.title,
      tags: image.tags,
      featured: image.featured || false,
    }));
}
