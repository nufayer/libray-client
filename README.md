# LibRay Client

The frontend application for **LibRay** — a full-stack online bookstore built with Next.js 16, React 19, and TypeScript. Features a dark-themed responsive UI with role-based access (User/Admin), dynamic data from MongoDB, and a complete shopping experience.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS v4
- **Language:** TypeScript 5
- **State:** Zustand, React Context (Cart, Auth)
- **Forms:** React Hook Form + Zod validation
- **Data Fetching:** TanStack Query, Axios
- **Auth:** Better Auth (client SDK)
- **Charts:** Recharts (admin dashboard)
- **Icons:** Lucide React
- **Notifications:** Sonner (toast)
- **Theme:** Dark mode with custom CSS variables

## Getting Started

### Prerequisites

- Node.js 18+
- A running [LibRay Server](https://github.com/nufayer/libray-server) instance

### Installation

```bash
git clone https://github.com/nufayer/libray-client.git
cd libray-client
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production (Vercel), set this in your project settings:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://libray-server-six.vercel.app` |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Homepage (hero, featured books, categories)
│   ├── not-found.tsx            # Custom 404 page
│   ├── login/page.tsx           # Login
│   ├── register/page.tsx        # Registration
│   ├── books/
│   │   ├── page.tsx             # Books listing (search, filter, sort)
│   │   └── [id]/page.tsx        # Book details
│   ├── categories/
│   │   ├── page.tsx             # All categories
│   │   └── [slug]/page.tsx      # Books by category
│   ├── cart/page.tsx            # Shopping cart
│   ├── orders/page.tsx          # Order history
│   ├── wishlist/page.tsx        # Wishlist
│   ├── profile/
│   │   ├── page.tsx             # Profile
│   │   └── settings/page.tsx    # Profile settings
│   ├── admin/
│   │   ├── layout.tsx           # Admin sidebar layout
│   │   ├── dashboard/page.tsx   # Overview (stats, charts)
│   │   ├── books/
│   │   │   ├── page.tsx         # Add book
│   │   │   └── manage/page.tsx  # Manage books (CRUD)
│   │   ├── categories/page.tsx  # Manage categories
│   │   ├── orders/page.tsx      # Manage orders
│   │   └── users/page.tsx       # Manage users
│   ├── about/page.tsx           # Static pages...
│   ├── careers/page.tsx
│   ├── blog/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── help/page.tsx
│   ├── shipping/page.tsx
│   ├── returns/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── cookies/page.tsx
│   └── accessibility/page.tsx
├── components/
│   ├── navbar.tsx               # Auth-aware navbar with cart
│   ├── BookCard.tsx             # Reusable book card
│   ├── Footer.tsx               # Site footer
│   └── providers.tsx            # Auth, cart, and toast providers
└── lib/
    ├── auth/
    │   ├── client.ts            # Better Auth client config
    │   └── AuthProvider.tsx      # Auth context with role support
    └── CartContext.tsx           # Cart context (server-synced)
```

## Features

### Public
- Homepage with featured books, categories, and newsletter section
- Book catalog with search, category filter, and sort options
- Category browsing with dynamic book counts
- Book detail pages with descriptions and reviews

### Authenticated Users
- Email + password authentication (sign up / sign in)
- Shopping cart (add, update quantity, remove, select items for checkout)
- Order placement and order history with status tracking
- Profile settings (name, email, password)
- Wishlist

### Admin Panel
- Dashboard with sales stats and charts (Recharts)
- Full book management (CRUD with image upload)
- Category management
- Order management (approve/reject)
- User management (block/unblock, role assignment)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import the repository on [vercel.com/new](https://vercel.com/new)
3. Set the environment variable `NEXT_PUBLIC_API_URL` to your server URL
4. Deploy

The client is configured for zero-config Vercel deployment.

## License

Private project.
