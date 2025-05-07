import { useState } from "react";
import { about } from "../resources/content";
import { motion } from "motion/react";

function Avatar({ src }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="flex flex-shrink-0 justify-center md:pl-8 lg:justify-end lg:pl-15">
      <div className="max-w-xs px-2.5 lg:max-w-md">
        {!imageLoaded && (
          <div className="aspect-square rotate-3 animate-pulse rounded-2xl bg-gray-300 shadow-xl" />
        )}
        <motion.img
          src={src}
          alt=""
          initial={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
          animate={
            imageLoaded
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 1.1, filter: "blur(12px)" }
          }
          className="aspect-square h-auto w-full rotate-3 rounded-2xl object-cover shadow-xl"
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          fetchPriority="high"
        />
      </div>
    </div>
  );
}

function Intro({ headline, subline }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
        {headline}
      </h2>
      <div className="mt-6 space-y-7 text-base text-zinc-700">
        {subline.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function About() {
  const { avatar, intro } = about;
  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 sm:mt-32 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-y-16 md:flex-row-reverse md:items-start">
        {avatar.display && ( <Avatar src={avatar.src} /> )}
        {intro.display && (
          <Intro
            headline={intro.headline}
            subline={intro.subline}
          />
        )}
      </div>
    </div>
  );
}

export default About;
