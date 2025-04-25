import { about } from '../resources/content.js'

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-32">
      <div className="flex flex-col lg:flex-row-reverse lg:items-start gap-y-16">
        {about.avatar.display && (
          <div className="flex-shrink-0 lg:pl-15 flex justify-center lg:justify-end">
            <div className="max-w-xs px-2.5 lg:max-w-md">
              <img
                src={about.avatar.src}
                alt={about.avatar.alt}
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover shadow-xl w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        )}
        {about.intro.display && (<div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {about.intro.headline}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-700">
            {about.intro.subline.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>)}
      </div>
    </div>
  )
}

export default About
