import { useState, lazy } from "react";
import { about } from "../resources/content";
import LazyImage from "../components/LazyImage";

const CTASection = lazy(() => import("../components/CTASection"));

function AvatarSection({ src, alt }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative flex flex-shrink-0 justify-center md:justify-end">
      <div className="relative max-w-sm lg:max-w-md">
        {/* Background decoration */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 opacity-30 blur-2xl dark:from-pink-900/20 dark:via-purple-900/20 dark:to-cyan-900/20" />

        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="relative aspect-square rotate-2 animate-pulse rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl dark:from-gray-700 dark:to-gray-800" />
        )}

        {/* Main avatar image */}
        <LazyImage
          src={src}
          alt={alt}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
          animate={
            imageLoaded
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 1.1, filter: "blur(12px)" }
          }
          className="relative aspect-square h-auto w-full rotate-2 rounded-2xl object-cover shadow-2xl ring-1 ring-white/20 dark:ring-zinc-800/50"
          onLoad={() => setImageLoaded(true)}
          fetchPriority="high"
        />
      </div>
    </div>
  );
}

function IntroSection({ headline, subline }) {
  return (
    <div className="flex flex-col space-y-8">
      <div className="relative">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-100">
          {headline}
        </h1>
        <div className="mt-4 h-1 w-20 rounded-full bg-pink-500/20" />
      </div>

      <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
        <div className="space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          {subline.map((line, index) => (
            <p key={index} className="relative">
              {index === 0 && (
                <span className="absolute top-0 -left-6 text-4xl font-bold text-pink-500/20 dark:text-pink-400/20">
                  "
                </span>
              )}
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function About() {
  const { avatar, intro } = about;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-24">
        {avatar.display && (
          <div className="order-1 lg:order-2">
            <AvatarSection src={avatar.src} alt={avatar.alt} />
          </div>
        )}

        {intro.display && (
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <IntroSection headline={intro.headline} subline={intro.subline} />
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
