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
    headline: `Hey, I'm ${person.firstName}. I draw weird little things that somehow make people happy.`,
    subline: [
      "Back in 2020, I downloaded a drawing app on my iPad just to mess around. Turns out I couldn't stop. What started as doodling during lunch breaks turned into staying up way too late creating characters and weird little designs.",
      "Now I'm constantly experimenting with new styles and techniques. Some pieces work, some don't, but that's the fun part. Each one feels like a little experiment that might surprise me.",
    ],
  },
  cta: {
    display: true,
    description: "Wanna check out my work?",
    label: "Visit Portfolio",
    link: "/work",
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
    "I make digital stickers that live somewhere between cute and chaotic. Perfect for anyone who wants their laptop to have more personality than they do.",
  cta: {
    display: true,
    description: "Want to see what else I've been up to?",
    label: "Check out more stuff",
    link: "/work",
  },
};

const contact = {
  title: "Contact | Stickers by Marave",
  description:
    "Drop me a line about stickers, commissions, or just to chat about art and creativity.",
  headline: "Want to chat?",
  subline:
    "Shoot me a message if you want some stickers, have a project idea, or just want to say hey! 👋🏼",
  submitLabel: "Send it over",
};
export { person, about, home, contact };
