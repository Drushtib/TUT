# The Entrepreneurial Chronicles

A modern business magazine website built with Next.js and Sanity CMS, dedicated to showcasing inspiring stories of entrepreneurs, innovators, and business leaders.

## 📋 Table of Contents

- [Overview](#overview)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Content Management](#content-management)
- [Build & Deployment](#build--deployment)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [Recommendations](#recommendations)

## 🎯 Overview

**The Entrepreneurial Chronicles** is a professional business magazine platform that celebrates entrepreneurship, innovation, and success stories. The website features:

- **Magazine Issues**: Digital magazine publications with Issuu integration
- **Blog Articles**: Business insights, strategies, and industry news
- **Web Profiles**: Featured entrepreneur profiles and interviews
- **Video Interviews**: YouTube video content integration
- **Market News**: Latest business and market updates
- **Master Talks**: Expert interviews and discussions

The platform is built with modern web technologies and uses Sanity CMS for flexible content management.

## 🛠 Technical Stack

### Frontend Framework
- **Next.js 16.0.1** - React framework with SSR/SSG support
- **React 18.2.0** - UI library
- **Bootstrap 5.3.1** - CSS framework
- **React Bootstrap 2.5.0** - Bootstrap components for React

### Content Management
- **Sanity CMS** - Headless CMS for content management
  - Project ID: `gaa41xdq`
  - Dataset: `production`
  - Portable Text for rich content
  - Sanity Image URL builder

### State Management & Data Fetching
- **TanStack React Query 5.24.1** - Server state management
- **React Query DevTools** - Development tools
- **Axios 1.6.7** - HTTP client

### UI Libraries & Components
- **React Slick** - Carousel/slider components
- **Splide.js** - Advanced slider library
- **Swiper** - Touch slider
- **Font Awesome** - Icon library
- **React Syntax Highlighter** - Code syntax highlighting
- **React Responsive Masonry** - Masonry grid layout

### Additional Dependencies
- **EmailJS** - Contact form email service
- **Luxon** - Date/time manipulation
- **RSS Parser** - RSS feed parsing
- **Sharp** - Image optimization
- **Gray Matter** - Markdown frontmatter parsing

## 📁 Project Structure

```
Magazine/
├── src/
│   ├── config/           # Configuration files
│   │   ├── constants.js  # App-wide constants
│   │   ├── routes.js     # Route definitions
│   │   ├── sanity.js     # Sanity configuration
│   │   └── site.js       # Site configuration
│   ├── constants/        # Constants
│   │   └── queryKeys.js  # React Query keys
│   ├── lib/              # Library code
│   │   ├── sanity/
│   │   │   ├── client.js # Sanity client
│   │   │   └── queries/  # Centralized queries
│   │   └── utils/        # Utility functions
│   ├── hooks/            # Custom React hooks
│   │   ├── usePosts.js
│   │   ├── useMagazines.js
│   │   ├── useCategories.js
│   │   └── useVideos.js
│   ├── api/              # API hooks (legacy)
│   ├── components/       # React components
│   │   ├── common/       # Shared components
│   │   ├── contact/      # Contact form components
│   │   ├── elements/     # UI elements
│   │   ├── FAQ/          # FAQ components
│   │   ├── footer/       # Footer components
│   │   ├── header/       # Header/navigation
│   │   ├── hero/         # Hero sections
│   │   ├── post/         # Post-related components
│   │   ├── slider/       # Slider components
│   │   ├── team/         # Team components
│   │   └── widget/       # Sidebar widgets
│   ├── data/             # Static data files
│   ├── pages/            # Next.js pages
│   │   ├── api/          # API routes
│   │   ├── category/     # Category pages
│   │   ├── magazine/     # Magazine pages
│   │   ├── post/         # Blog post pages
│   │   └── video/        # Video pages
│   ├── styles/           # CSS stylesheets
│   ├── utils/            # Legacy utilities (deprecated)
│   └── client.js         # Sanity client configuration
├── sanity_backend/       # Sanity CMS configuration
│   ├── schemaTypes/      # Content schemas
│   └── sanity.config.js  # Sanity configuration
├── public/               # Static assets
│   ├── images/           # Image assets
│   ├── logos/            # Logo files
│   └── css/              # Global CSS
├── posts/                # Markdown blog posts (legacy)
└── next.config.js        # Next.js configuration
```

> **Note**: See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## ✨ Features

### Content Management
- ✅ Sanity CMS integration for flexible content management
- ✅ Image optimization with Sharp and Next.js Image component
- ✅ Portable Text support for rich content editing
- ✅ Featured content system
- ✅ Category-based content organization
- ✅ Multiple content types (Magazines, Posts, Videos, Categories)

### User Experience
- ✅ Responsive design (mobile-first approach)
- ✅ Dark theme with elegant gold accents
- ✅ Loading states and error handling
- ✅ Scroll to top functionality
- ✅ Pagination (6 items per page)
- ✅ Search functionality (magazines page)
- ✅ Social sharing widgets
- ✅ Newsletter subscription widget

### SEO & Performance
- ✅ Dynamic meta tags per page
- ✅ XML sitemap generation (`/api/sitemap`)
- ✅ RSS feed (`/api/feed`)
- ✅ Static Site Generation (SSG) for optimal performance
- ✅ Image optimization with remote patterns
- ✅ Proper semantic HTML structure

### Content Display
- ✅ Multiple post layout components
- ✅ Video player integration (YouTube)
- ✅ Related articles section
- ✅ Category filtering and navigation
- ✅ Featured content highlighting
- ✅ Logo slider for partners/sponsors

### Contact & Forms
- ✅ Contact form with EmailJS integration
- ✅ Google Maps embed
- ✅ Contact information display

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Sanity account and project setup

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Magazine
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Content Management

### Sanity CMS Setup

The project uses Sanity CMS for content management. The Sanity configuration is located in the `sanity_backend/` directory.

#### Content Types (Schemas)

1. **Magazine** - Digital magazine issues
   - Title, description, slug, keywords
   - Main image with alt text
   - Issuu link for digital viewing
   - Linked articles
   - Published date, featured flag

2. **Post** - Blog articles and posts
   - Title, slug, keywords
   - Main image with alt text
   - Categories (array of references)
   - Published date
   - Description and body (Portable Text)
   - Featured flag

3. **Category** - Content categories
   - Title, slug (read-only)
   - Category image with alt text
   - Description

4. **YouTube Video** - Video interviews
   - Title, slug
   - Video URL
   - Description and body

5. **Author** - Author information
6. **Brand Logo** - Partner/sponsor logos

### Accessing Sanity Studio

To manage content, you need to set up and run Sanity Studio:

```bash
cd sanity_backend
npm install
npm run dev
```

## 🏗 Build & Deployment

### Production Build

Build the application for production:

```bash
npm run build
```

The build process:
- Compiles TypeScript/JavaScript
- Generates static pages (41 pages in current build)
- Optimizes images
- Creates production-ready bundle

### Build Output

The build generates:
- **Static pages (○)** - Pre-rendered static content
- **SSG pages (●)** - Static HTML with `getStaticProps`
- **Dynamic pages (ƒ)** - Server-rendered on demand

### Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

For other platforms, refer to [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## 🔌 API Routes

### `/api/sitemap`
Generates XML sitemap for SEO purposes.

**Access:** `GET /api/sitemap` or `/sitemap.xml` (via rewrite)

### `/api/feed`
Generates RSS feed for content syndication.

**Access:** `GET /api/feed`

**Feed URL:** `https://theentrepreneurialchronicles.com/rss.xml`

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=gaa41xdq
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
NEXT_PUBLIC_SANITY_USE_CDN=false

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://theentrepreneurialchronicles.com

# EmailJS Configuration (for contact forms)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Google Maps API (if needed)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**Note:** Sanity credentials are now configured via environment variables in `src/config/sanity.js`. The application will fall back to default values if environment variables are not set.

## 📄 Pages & Routes

### Main Pages
- `/` - Homepage with featured content
- `/magazines` - All magazine issues
- `/blogs` - Blog articles listing
- `/about-us` - About page
- `/contact` - Contact page with form
- `/advertise-with-us` - Advertising information
- `/guest-post` - Guest post submission

### Dynamic Routes
- `/magazine/[slug]` - Individual magazine article
- `/post/[slug]` - Individual blog post
- `/category/[slug]` - Category-filtered content
- `/video/[slug]` - Individual video interview
- `/category/video-interviews` - Video interviews category

### Static Pages
- `/404` - Error page
- `/coming-soon` - Coming soon page

## 🎨 Design & Styling

### Color Scheme
- **Background:** Black (#000)
- **Text:** White (#fff)
- **Accents:** Gold (#ae8625, #f4d03f)

### Typography
- Custom fonts via Feather icons
- Font Awesome for icons
- Bootstrap typography system

### Layout
- Bootstrap 5 grid system
- Responsive breakpoints
- Custom CSS in `src/styles/`

## 🏗 Architecture

The codebase follows a modern, well-structured architecture:

- **Configuration Management**: Centralized config in `src/config/`
- **Data Layer**: Centralized Sanity queries in `src/lib/sanity/queries/`
- **Custom Hooks**: Reusable data fetching hooks in `src/hooks/`
- **Utilities**: Organized utility functions in `src/lib/utils/`
- **Error Handling**: Error boundaries and fallback components
- **Constants**: Centralized constants and query keys
- **Theme System**: Centralized color and styling configuration in `src/config/theme.js`

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🎨 Theme & Styling

All colors and styling values are centralized in `src/config/theme.js`. Change colors from one place to update the entire application.

### Quick Theme Change

Edit `src/config/theme.js` to change colors:

```javascript
colors: {
  primary: "#ae8625",        // Change primary gold color
  background: "#000000",     // Change background
  text: "#ffffff",           // Change text color
}
```

### Using Theme in Components

```jsx
import { getColor, getSpacing } from "../lib/utils/theme";

<div style={{
  background: getColor("background"),
  color: getColor("text"),
  padding: getSpacing("lg"),
}}>
```

For detailed theme documentation, see [THEME_GUIDE.md](./THEME_GUIDE.md).

## ⚠️ Recommendations

### Security
1. ✅ **Sanity credentials** - Now using environment variables
2. **Use environment variables for all sensitive data** - Continue this practice

### Code Quality
1. **Update ESLint** - Resolve peer dependency warnings (ESLint 8.23.0 vs required 8.57.0+)
2. **Clean up commented code** - Remove unused commented sections
3. **Remove test files** - Consider removing `test-responsive.html` from production
4. **Migrate remaining components** - Update remaining components to use new hooks

### Performance
1. ✅ **Error boundaries** - Implemented
2. **Implement analytics** - Add tracking for user behavior
3. **Optimize images** - Ensure all images are properly optimized

### Development
1. **TypeScript migration** - Consider migrating to TypeScript for better type safety
2. **Component documentation** - Add JSDoc comments to components
3. **Testing** - Add unit and integration tests
4. **Complete migration** - Migrate all components to use new architecture

## 📊 Current Status

- ✅ Next.js upgraded to 16.0.1
- ✅ All security vulnerabilities fixed
- ✅ Production build successful (41 pages)
- ✅ All dependencies up to date
- ✅ Image configuration updated (remotePatterns)

## 📞 Support

For issues, questions, or contributions, please contact the development team or open an issue in the repository.

## 📜 License

[Add your license information here]

---

**Built with ❤️ using Next.js and Sanity CMS**
