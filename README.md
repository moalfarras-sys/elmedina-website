# El Medina — Shisha Café & Restaurant

Premium restaurant website for **El Medina Shisha Café & Restaurant**, located on Splaiul Unirii 162, București, România.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run lint checks
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── meniu/              # Menu page
│   ├── rezervari/          # Reservations page
│   ├── comanda/            # Online ordering
│   ├── despre-noi/         # About page
│   ├── galerie/            # Gallery page
│   ├── contact/            # Contact page
│   ├── admin/              # Admin dashboard
│   │   ├── meniu/          # Menu management
│   │   ├── rezervari/      # Reservation management
│   │   ├── comenzi/        # Order management
│   │   ├── galerie/        # Gallery management
│   │   └── setari/         # Settings
│   └── api/                # API routes
│       ├── rezervari/      # Reservation endpoint
│       ├── comenzi/        # Orders endpoint
│       └── contact/        # Contact form endpoint
├── components/
│   ├── layout/             # Header, Footer, FloatingActions
│   ├── home/               # Homepage sections
│   ├── menu/               # Menu page components
│   ├── reservation/        # Reservation form
│   ├── order/              # Online order components
│   ├── gallery/            # Gallery components
│   ├── ui/                 # Reusable UI primitives
│   └── admin/              # Admin components
├── data/                   # Static data (menu, business info, SEO)
├── lib/                    # Utilities, store
└── types/                  # TypeScript types
```

## Pages

| Route | Description |
|---|---|
| `/` | Premium homepage with hero, featured items, testimonials |
| `/meniu` | Full restaurant menu with search and category navigation |
| `/rezervari` | Reservation request form |
| `/comanda` | Online order with cart system |
| `/despre-noi` | About page |
| `/galerie` | Photo gallery |
| `/contact` | Contact information and form |
| `/admin` | Admin dashboard protected by server-side credentials |

## Admin Access

Navigate to `/admin` and log in with the credentials configured in `.env.local`.

Default local values are shown in `.env.example`, but you should change them for production:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

## Deployment

The project is ready for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Content Management

Menu items, business info, and SEO settings are managed through structured data files in `src/data/`. The admin dashboard provides a UI for content management, ready to be connected to a database (Supabase recommended).

## License

Private — El Medina Shisha Café & Restaurant. All rights reserved.
