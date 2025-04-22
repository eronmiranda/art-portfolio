import React from 'react'

function About() {
  return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <img
                src="/src/assets/morty2.png"
                alt=""
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover shadow-xl"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Hey, I'm Marave. I create digital art and stickers that tell stories.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-700">
              <p>
                My journey began in 2020 with a simple drawing app on my phone. What started as
                casual experimentation quickly became a passion. I was captivated by the endless
                possibilities of digital art and spent countless hours honing my craft.
              </p>
              <p>
                Today, I explore both digital and traditional mediums, always pushing creative
                boundaries. My work is a blend of styles and techniques, each piece a story waiting
                to be told.
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default About
