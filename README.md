# Digital Art Portfolio

A portfolio site for a digital artist, built to actually show off their work instead of just listing it.

[See it live →](https://www.marave.ca)

---

## Background

A digital artist came to me with a portfolio that wasn't keeping up with their work. Static images on a flat page. No flow, no feel. They wanted something that made browsing their work genuinely enjoyable, and they needed to be able to update it themselves without calling me every time they dropped new work.

The main constraints: smooth on mobile (most of their audience is on iPhone/Safari), easy content updates, and fast enough that people don't bounce.

---

## What's in here

React 19 + Vite on the frontend, Motion React for animations, Tailwind v4 for styling, and Firebase for the backend (Firestore + Storage). The artist manages content through an admin dashboard. No code, no deploy pipeline, just upload and done.

Notable details:

- **Page transitions:** Motion React handles the animation choreography. Pages slide and fade instead of hard-cutting.
- **Category filtering:** work is grouped by type; filtering is instant and animated.
- **Dark/light mode:** auto-detects system preference, user can override. Matters more for art than most sites.
- **Lazy loading:** skeleton placeholders while images load. Feels faster than it is.
- **Keyboard nav + ARIA:** full accessibility support throughout.

---

## What actually took time

**Safari.** Animations that were smooth in every other browser turned choppy on Safari, which is most of the traffic. Ended up stripping Motion from image elements and simplifying some transitions. Still looks good, just less ambitious.

**Translating creative feedback into code.** "It should feel more floaty" is not a spec. Did a few rapid prototypes early on to establish a shared visual language. By the first real revision we were mostly aligned.

**Animation state.** Complex page transitions caused state conflicts, things animating out while new content was already animating in. Wrote some custom hooks to sequence everything properly.

---

## Status

Done:

- Mobile navigation
- Category filtering
- Optimized animations
- Admin dashboard
- Social links

In progress:

- Contact form with email

Planned:

- Analytics
- Enhanced keyboard shortcuts

---

## Project structure

```text
public/           # Static assets
src/
├── components/   # Reusable UI components
├── contexts/     # Global state
├── pages/        # Home, About, Work, etc.
├── firebase/     # Firebase config
├── hooks/        # Custom hooks
├── lib/          # Utilities
├── resources/    # App config and content
```

---

## Running it locally

```sh
git clone https://github.com/eronmiranda/art-portfolio.git
cd art-portfolio
bun install
bun dev
```

Runs at [http://localhost:5173](http://localhost:5173). To customize content, edit `src/app/resources/config` and `src/app/resources/content`.

**Docker:**

```sh
docker compose up -d
# http://localhost:5030
```

**Production build:**

```sh
bun run build
```

---

**Built with ☕️ by [@eronmiranda](https://github.com/eronmiranda)**
