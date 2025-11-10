# Digital Art Portfolio

A modern web portfolio built for a digital artist who needed more than just a gallery. They needed an experience.

[Check it out →](https://www.marave.ca)

---

## Why This Exists

A digital artist came to me with a problem. Their static portfolio wasn't showing off their sticker designs the way they deserved. They wanted something that felt alive and made browsing their work actually enjoyable.

What they needed:

- Smooth animations that make the site feel premium
- Easy updates without needing a developer
- Perfect mobile experience (most visitors browse on phones and safari)
- Something that stands out from other art portfolios

They needed it fast.

---

## What I Built

This portfolio turns browsing art into an interactive experience. You get smooth transitions between images and intuitive category filtering. It feels more like using an app than visiting a website.

## Features That Matter

### Smooth Transitions

I used Motion React to create seamless animations between pages. No jarring jumps, just smooth flows that make the portfolio feel polished.

### Built for Mobile First

Since most people view art portfolios on their phones, I designed everything with touch in mind. Every interaction works perfectly whether you're on a phone, tablet, or desktop.

### Update Anytime

The artist can add new work or change content instantly through Firebase. No code required, no waiting for a developer.

### Smart Theming

The site automatically switches between light and dark modes to show artwork in the best light. Users can override it if they prefer one over the other.

### Fast Loading

Lazy loading with skeleton placeholders keeps the site feeling fast even on slower connections. Images load as you need them, not all at once.

### Accessible to Everyone

Full keyboard navigation and proper ARIA labels mean everyone can use the portfolio, regardless of how they browse the web.

## How It Works

Built with React 19, Vite, Motion React, and Tailwind CSS v4 on the frontend. Firebase handles the backend (Firestore for data, Storage for images).

Why these tools?

- React 19 for the latest features and smooth animations
- Motion React for complex page transitions
- Tailwind v4 for quick prototyping with consistency
- Firebase for real-time updates without backend complexity

## Challenges I Solved

### Turning Vision Into Reality

The artist knew what they wanted but couldn't describe it in technical terms. Built quick prototypes and iterated based on their feedback. By the first major revision, we hit 95% satisfaction.

### Safari Performance

Animations that looked smooth in Firefox were choppy in Safari, affecting half the users. Simplified the animations without losing visual impact and removed Motion from images.

### Making Updates Easy

The artist needed to update their portfolio frequently but didn't know how to code. Built a Firebase-powered system that lets them manage everything through an intuitive interface (still improving this).

### Managing Animation State

Complex transitions between pages caused state conflicts. Wrote custom hooks to orchestrate the animations properly so everything flows smoothly.

---

## What's Done and What's Next

### Completed ✅

- Mobile-responsive navigation
- Category filtering for images
- Optimized animations
- Admin dashboard for managing content
- Social media links

### In Progress 🚧

- Contact form with email integration

### Planned 📋

- Analytics to track user behavior
- Enhanced keyboard shortcuts

## Project Structure

```sh
public/           # Static assets
src/
├── components/   # Reusable UI components
├── contexts/     # Global state management
├── pages/        # Main pages (Home, About, Work, etc.)
├── firebase/     # Firebase configuration
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
├── resources/    # App config and content management
```

## Getting Started

### Clone and Install

```sh
git clone https://github.com/eronmiranda/art-portfolio.git
cd art-portfolio
npm install
```

### Configure and Run

```sh
# Edit these files to customize
src/app/resources/config
src/app/resources/content

# Start the dev server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see it running.

### Deploy to Production

#### Using Docker (Recommended)

```sh
docker compose up -d
# App runs at http://localhost:5030
```

#### Manual Build

```sh
npm run build
npm run format  # Optional: format your code
```

## Results

The portfolio delivers a smooth, professional experience across all devices. The artist can update their work independently, and visitors get an engaging way to browse their collection.

Performance:

- 95% client satisfaction on first major revision
- 30% faster animations in Safari after optimization
- Mobile-first design serving 70% of traffic

---

**Built with ☕️ by [@eronmiranda](https://github.com/eronmiranda)**
