import { useState, lazy } from "react";
import { about } from "../resources/content";
import LazyImage from "../components/LazyImage";

const CTAButton = lazy(() => import("../components/CTAButton"));

function Avatar({ src }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="flex flex-shrink-0 justify-center md:pl-8 lg:justify-end lg:pl-15">
      <div className="max-w-xs px-2.5 lg:max-w-md">
        {!imageLoaded && (
          <div className="aspect-square rotate-3 animate-pulse rounded-2xl bg-gray-300 shadow-xl" />
        )}
        <LazyImage
          src={src}
          alt=""
          initial={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
          animate={
            imageLoaded
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 1.1, filter: "blur(12px)" }
          }
          className="aspect-square h-auto w-full rotate-3 rounded-2xl object-cover shadow-xl"
          onLoad={() => setImageLoaded(true)}
          fetchPriority="high"
        />
      </div>
    </div>
  );
}

function Intro({ headline, subline }) {
  const { cta } = about;
  return (
    <div className="flex flex-col">
      <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
        {headline}
      </h2>
      <div className="mt-6 space-y-7 text-lg text-zinc-700 dark:text-zinc-400">
        {subline.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {cta.display && (
          <div className="mx-auto max-w-5xl px-4 py-8">
            <p className="mb-4 text-center text-lg text-zinc-700 dark:text-zinc-300">
              {cta.description ?? "Ready to see more?"}
            </p>
            <div className="flex justify-center">
              <CTAButton to={cta.link}>
                {cta.label ?? "Explore my Portfolio"}
              </CTAButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function About() {
  const { avatar, intro } = about;
  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 sm:mt-32 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-y-16 md:flex-row-reverse md:items-start">
        {avatar.display && <Avatar src={avatar.src} />}
        {intro.display && (
          <Intro headline={intro.headline} subline={intro.subline} />
        )}
      </div>
    </div>
  );
}

export default About;
