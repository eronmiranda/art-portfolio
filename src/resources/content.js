const person = {
  firstName: "Marave",
  lastName: "Bautista",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  location: "Edmonton, Canada",
};

const about = {
  title: "About me",
  description: `Meet ${person.name} from ${person.location}`,
  avatar: {
    display: true,
    src: "/assets/avatar.png",
    alt: `${person.name} avatar`,
  },
  altText: "A digital artwork of a character with a colorful background",
  intro: {
    display: true,
    headline: `Hey, I'm ${person.firstName}. I create digital art and stickers that tell stories.`,
    subline: [
      "My journey began in 2020 with a simple drawing app on my phone. What started as casual experimentation quickly became a passion. I was captivated by the endless possibilities of digital art and spent countless hours honing my craft.",
      "Today, I explore both digital and traditional mediums, always pushing creative boundaries. My work is a blend of styles and techniques, each piece a story waiting to be told.",
    ],
  },
  cta: {
    display: false,
    text: "See my work",
    link: "/gallery",
  },
  // calendar: {
  //   display: false,
  //   link: "https://cal.com",
  // },
};

const home = {
  title: "Home | Stickers by Marave",
  description:
    "Stickers by Marave - A digital artist creating unique stickers and illustrations.",
  headline: "Stickers by Marave",
  subline:
    "Discover vibrant digital art and stickers that capture stories, emotions, and imagination.",
  cta: {
    display: true,
    text: "See my work",
    link: "/work",
  },
  // cta: {
  //   display: false,
  //   text: "Contact me",
  //   link: "/contact",
  // },
};

const contact = {
  title: "Contact | Stickers by Marave",
  description:
    "Get in touch with Marave for collaborations, commissions, or inquiries about stickers and digital art.",
  headline: "Let's connect",
  subline: "Get in touch for buying sticker or just to say hi! 👋🏼",
  submitLabel: "Let's talk",
};
export { person, about, home, contact };
