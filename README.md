# Mohammad Ali — Portfolio

The personal portfolio of **Mohammad Ali**, Software Engineer II (Backend & AI Systems). A single-page, design-forward site built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/) — featuring a real-time **3D companion mascot**, dual day/night themes, and a motion system tuned to feel alive without getting in the way.

🔗 **Live:** [mohammadalis.vercel.app](https://mohammadalis.vercel.app)

## 🎨 Design — "Systems Editorial"

A deliberate, single-identity aesthetic that reads like an engineering control room art-directed by a print magazine:

- **Type** — Fraunces (expressive display serif) · Archivo (body) · JetBrains Mono (the "metadata" layer: labels, timestamps, tags)
- **Two faces, one brand** — **Night**: phosphor chartreuse on warm graphite. **Day**: deep olive ink on warm paper. Same hue family, contrast-tuned for readability in both.
- **Texture** — film-grain overlay, dotted engineering grid, hairline rules, zero border-radius.

## ✨ Key Features

- **🤖 3D Mascot Drone** — a [React Three Fiber](https://r3f.docs.pmnd.rs/) robot that flies around the viewport as a real-time cursor companion: banks into turns, tracks your pointer, blinks, falls asleep when idle, and startles when you rush at it. Desktop + non-reduced-motion only.
- **🌌 Whole-page depth** — a WebGL particle field with cursor parallax, perspective tilt-on-hover cards, and a hero masthead that drifts at multiple depths.
- **🌗 Day / Night themes** — instant theme switching via `next-themes`, with every element (including the 3D mascot) re-skinning to the active palette.
- **🎬 Motion system** — boot-sequence intro, scroll-reveal headings and project images, a live status bar, and a section-progress rail.
- **♿ Accessible & resilient** — honors `prefers-reduced-motion`, gracefully degrades on touch devices, and uses a fail-safe scroll-reveal so content can never strand hidden.
- **⚡ Performance-minded** — capped device-pixel-ratio, a render loop that pauses on a hidden tab, and lazy-loaded 3D so the core content paints fast.

## 🛠️ Tech Stack

| Area | Tools |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/), `tw-animate-css` |
| **3D / Motion** | [three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **UI primitives** | [Radix UI](https://www.radix-ui.com/) (via shadcn/ui) |
| **Icons** | [Lucide React](https://lucide.dev/) + brand marks via [Simple Icons](https://simpleicons.org/) CDN |
| **Analytics** | Vercel Analytics + Speed Insights |
| **Deployment** | [Vercel](https://vercel.com/) |

## ⚙️ Getting Started

### Prerequisites

- **Node.js** 18.18+ (Node 20+ recommended)
- **npm** (the repo ships a `package-lock.json`; pnpm also works)

### Installation

```bash
git clone https://github.com/mohammadali83123/Portfolio.git
cd Portfolio
npm install
```

### Running locally

```bash
npm run dev
```

The app runs at **[http://localhost:3001](http://localhost:3001)** (port is fixed to `3001` in the dev/start scripts).

### Production build

```bash
npm run build
npm run start
```

## 📂 Project Structure

```bash
├── app/                # App Router entry (layout, page, global styles, metadata)
├── components/
│   ├── robot3d.tsx     # 3D mascot drone (React Three Fiber scene)
│   ├── mascot.tsx      # Lazy, capability-gated loader for the 3D scene
│   ├── tilt.tsx        # Perspective tilt-on-hover wrapper
│   ├── hero.tsx        # Masthead + production-metrics readout + parallax
│   ├── experience / projects / skills / education / contact
│   ├── boot-screen · status-bar · section-rail · section-heading
│   └── ui/             # Radix-based shadcn/ui primitives
├── hooks/
│   └── use-reveal.ts   # Fail-safe scroll reveal (IO + rAF + timeout fallback)
├── lib/                # Utilities
├── public/             # Images, favicons, profile, project schematics
└── ...config files
```

## 📄 License

Open source under the [MIT License](LICENSE).
