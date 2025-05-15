# Digital Stickers Portfolio 🎨

Welcome! This is a digital art portfolio I built for my friend—an artist who wanted a modern, animated space to showcase their creative sticker designs. This case study documents the process, challenges, and features that went into making a portfolio that truly reflects their style and vision.

View the [Live Site Here](https://www.marave.ca) 🔗

**Disclaimer:** Since this project is still in development, all artwork and images featured in this project are drafts or old sample pieces only. They do not represent the actual digital stickers currently being sold by the artist.

## Project Motivation 🎯

My friend is passionate about digital arts and needed a portfolio that was more than just a static gallery. The goal was to create an interactive, visually engaging site that would make their work stand out and be easy to update as their collection grows.

My friend, a passionate digital artist, wanted a portfolio that was more than just a static gallery. The challenge was to create an interactive, visually engaging site that would make their work stand out, feel personal, and be easy to update as their collection grows. Collaborating closely, I aimed to turn their creative vision into a modern web experience that truly reflects their unique style.

## Features ✨

- **Interactive Elements**: Smooth, shared-element transitions using Motion React to enhance user experience.
- **Content**: Render sections conditionally based on the content file. Allows enabling or disabling pages.
- **Image categories**: Browse stickers by category, making navigation intuitive even as the collection grows.
- **Mobile-First Design**: Fully responsive and touch-friendly, so you can browse on any device.
- **Firebase Integration**: Artwork and data are managed via Firebase for easy updates and scalability.
- **Light/dark mode theme toggle**: Easily switch between light and dark themes to match your preference, ensuring the artwork always looks its best.
- **Lazy Loading & Skeletons**: Images load efficiently, with skeleton placeholders for a polished feel.
- **Accessible UI**: Keyboard navigation and ARIA best practices for inclusivity.

## Tech Stack 🛠️

- **React v19** (with Vite for lightning-fast dev)
- **Motion React** (for animation magic)
- **Tailwind CSS v4** (for rapid, modern styling)
- **Firebase** (for storage and data)

## What I Learned 📚

- Translating an artist’s vision into a web experience: Learned to collaborate closely and iterate on design feedback.
- Achieving seamless shared layout animations: Gained practical skills with Motion React and animation debugging.
- Balancing accessibility and performance: Discovered best practices for making interactive UIs inclusive and fast.
- Integrating Firebase for dynamic content: Learned to connect and sync real-time data with a React frontend.
- Performance optimization: Faced slow image transitions and modal animations on Safari, which taught me how to profile, debug, and improve performance across browsers.

## Future Improvements 🚧

- [ ] Minified navigation menu bar for mobile
- [ ] Make the contact page functional (WIP)
- [ ] Add social icons
- [ ] Image filtering
- [ ] Admin dashboard for uploading new stickers
- [ ] Enhanced accessibility and keyboard shortcuts
- [ ] Analytics for portfolio views

## Challenges & Ongoing Fixes 🐞

- This project works best when viewed in Firefox browsers but a bit laggy/janky on Safari for some reason. So I'm currently researching for what causes it. My assumption is that Safari has the reduced animation function on default, or it doesn't take a huge CSS animations from Motion React too well.
- Contact page is not functional yet. I'm still figuring out which email client I would use for it.

## Project Structure 📁

```sh
public/           # Static assets
src/
├── components/   # Reusable UI building blocks
├── pages/        # Main pages (Home, About, Work, etc.)
├── firebase/     # Firebase config
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
├── resources/    # Customizable config and content
```

## Getting Started 🚀

1. **Clone the repository**

   ```sh
   git clone https://github.com/eronmiranda/art-portfolio.git
   cd art-portfolio
   ```

2. **Install dependencies**

   ```sh
   npm install
   # or
   bun install
   ```

3. **Run locally**

   ```sh
   npm run dev
   # or
   bun run dev
   ```

4. **Edit config**

   ```sh
   src/app/resources/config
   ```

5. **Edit content**

   ```sh
   src/app/resources/content
   ```

6. **Visit:** [http://localhost:5173](http://localhost:5173)

7. **(OPTIONAL) Run prettier to format code**

   ```sh
   npm run format
   # or
   bun run dev
   ```

8. **(OPTIONAL) Build for production**

   ```sh
   npm run build
   # or
   bun run build
   ```

## Docker Setup 🐳

The project includes Docker support for easy deployment. You can run the project using either Docker directly or Docker Compose.

### Using Docker Compose (Recommended)

```sh
# Build and start the container
docker compose up -d

# Stop the container
docker compose down
```

### Using Docker Directly

```sh
# Build the Docker image
docker build -t art-portfolio .

# Run the container
docker run -d -p 5030:80 --name art-portfolio art-portfolio

# Stop the container
docker stop art-portfolio
```

The app will be available at `http://localhost:5030`

## Conclusion 💬

Building this project was a rewarding experience. It challenged me to think about user experience from an artist's perspective and to deliver a product that is both beautiful and functional. It also served as a playground for experimenting with animation, performance, and design. I learned a lot about the nuances of user experience and the power of small details.

If you have feedback or want to collaborate, feel free to reach out!

---

Built with ☕️ by [@eronmiranda](https://github.com/eronmiranda)
