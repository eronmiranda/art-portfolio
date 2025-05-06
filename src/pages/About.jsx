import { useState } from "react";
import { about } from "../resources/content";
import { motion } from "motion/react";

function Avatar({ src, display, onLoad, loaded }) {
  if (!display) return null;
  return (
    <div className="flex flex-shrink-0 justify-center md:pl-8 lg:justify-end lg:pl-15">
      <div className="max-w-xs px-2.5 lg:max-w-md">
        {!loaded && (
          <div className="animate-pulse">
            <div className="h-full w-full aspect-square rotate-3 rounded-2xl bg-gray-300 shadow-xl" />
          </div>
        )}
        <motion.img
          src={src}
          alt=""
          initial={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
          animate={
            loaded
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 1.1, filter: "blur(12px)" }
          }
          className="aspect-square h-auto w-full rotate-3 rounded-2xl object-cover shadow-xl"
          loading="lazy"
          decoding="async"
          onLoad={onLoad}
          fetchPriority="high"
        />
      </div>
    </div>
  );
}

function Intro({ display, headline, subline }) {
  if (!display) return null;
  return (
    <div className="flex-1">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
        {headline}
      </h1>
      <div className="mt-6 space-y-7 text-base text-zinc-700">
        {subline.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function About() {
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 sm:mt-32 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-y-16 md:flex-row-reverse md:items-start">
        <Avatar
          src={about.avatar.src}
          display={about.avatar.display}
          loaded={avatarLoaded}
          onLoad={() => setAvatarLoaded(true)}
        />
        <Intro
          display={about.intro.display}
          headline={about.intro.headline}
          subline={about.intro.subline}
        />
      </div>
    </div>
  );
}

export default About;
