const person = {
  firstName: 'Marave',
  lastName: "Bautista",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  location: 'Edmonton, Canada',
}

const about = {
  title: 'About me',
  description: `Meet ${person.name} from ${person.location}`,
  avatar: {
    display: true,
    src: '/src/assets/morty2.png',
    alt: `${person.name} avatar`,
  },
  altText: 'A digital artwork of a character with a colorful background',
  intro: {
    display: true,
    headline: `Hey, I'm ${person.firstName}. I create digital art and stickers that tell stories.`,
    subline: [
      "My journey began in 2020 with a simple drawing app on my phone. What started as casual experimentation quickly became a passion. I was captivated by the endless possibilities of digital art and spent countless hours honing my craft.",
      "Today, I explore both digital and traditional mediums, always pushing creative boundaries. My work is a blend of styles and techniques, each piece a story waiting to be told."
    ]
  },
  cta: {
    display: false,
    text: 'See my work',
    link: '/gallery'
  },
  // calendar: {
  //   display: false,
  //   link: "https://cal.com",
  // },
}

export { person, about };
