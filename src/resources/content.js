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

const home = {
  title: 'Home | Stickers by Marave',
  description: 'Stickers by Marave - A digital artist creating unique stickers and illustrations.',
  headline: 'Stickers by Marave',
  subline: 'A brief introduction about the artist and their work. Keep it simple and elegant.',
  cta: {
    display: false,
    text: 'See my work',
    link: '/gallery'
  },
}

const sampleArtworks = [
  {
    id: 1,
    title: "Artwork 1",
    imageUrl: "https://placeholder.com/800x600",
    description: "Description of artwork 1"
  },
  {
    id: 2,
    title: "Artwork 2",
    imageUrl: "https://placeholder.com/800x600",
    description: "Description of artwork 2"
  },
  {
    id: 3,
    title: "Artwork 3",
    imageUrl: "https://placeholder.com/800x600",
    description: "Description of artwork 3"
  },
  {
    id: 4,
    title: "Artwork 4",
    imageUrl: "https://placeholder.com/800x600",
    description: "Description of artwork 4"
  },
  {
    id: 5,
    title: "Artwork 5",
    imageUrl: "https://placeholder.com/800x600",
    description: "Description of artwork 5"
  },
  {
    id: 6,
    title: "Artwork 6",
    imageUrl: "https://placeholder.com/800x600",
    description: "Description of artwork 6"
  },
];

const artworks = [
  {
    src: "/src/assets/morty2.png",
    alt: "image",
    orientation: "horizontal",
  },
  {
    src: "/src/assets/dogs/kali.png",
    alt: "image",
    orientation: "vertical",
  },
  {
    src: "/src/assets/dogs/koko-morty.png",
    alt: "image",
    orientation: "vertical",
  },
  {
    src: "/src/assets/dogs/morty.png",
    alt: "image",
    orientation: "horizontal",
  },
]

export { person, about, home, sampleArtworks, artworks};
