# Architecture Documentation

## Overview

This document describes the improved architecture of The Entrepreneurial Chronicles website. The codebase has been restructured to follow best practices for maintainability, scalability, and developer experience.

## Directory Structure

```
src/
├── config/                 # Configuration files
│   ├── constants.js        # Application-wide constants
│   ├── routes.js           # Route definitions
│   ├── sanity.js           # Sanity CMS configuration
│   └── site.js             # Site-wide configuration
├── constants/              # Constants
│   └── queryKeys.js        # React Query key constants
├── lib/                    # Library code
│   ├── sanity/
│   │   ├── client.js       # Sanity client (re-export)
│   │   └── queries/        # Centralized Sanity queries
│   │       ├── posts.js
│   │       ├── magazines.js
│   │       ├── categories.js
│   │       ├── videos.js
│   │       └── index.js
│   └── utils/              # Utility functions
│       ├── date.js
│       ├── string.js
│       ├── array.js
│       ├── sitemap.js
│       └── index.js
├── hooks/                  # Custom React hooks
│   ├── usePosts.js
│   ├── useMagazines.js
│   ├── useCategories.js
│   ├── useVideos.js
│   └── index.js
├── components/             # React components
│   ├── common/             # Shared components
│   │   ├── ErrorBoundary.jsx
│   │   └── ErrorFallback.jsx
│   └── ...
├── pages/                  # Next.js pages
└── utils/                  # Legacy utilities (deprecated)
```

## Key Architectural Improvements

### 1. Configuration Management

All configuration is now centralized in the `src/config/` directory:

- **constants.js**: Application-wide constants (pagination, query limits, etc.)
- **routes.js**: Route definitions and category slugs
- **sanity.js**: Sanity CMS configuration (now uses environment variables)
- **site.js**: Site-wide configuration (URLs, meta tags, sitemap, RSS)

**Benefits:**
- Single source of truth for configuration
- Easy to update values across the application
- Environment variable support

### 2. Centralized Data Queries

All Sanity queries are now in `src/lib/sanity/queries/`:

- **posts.js**: All post-related queries
- **magazines.js**: All magazine-related queries
- **categories.js**: All category-related queries
- **videos.js**: All video-related queries

**Benefits:**
- No query duplication
- Easy to maintain and update queries
- Consistent query structure
- Reusable query builders

### 3. Custom Hooks

Data fetching logic is extracted into reusable hooks in `src/hooks/`:

- **usePosts.js**: Hooks for posts data
- **useMagazines.js**: Hooks for magazines data
- **useCategories.js**: Hooks for categories data
- **useVideos.js**: Hooks for videos data

**Benefits:**
- Reusable data fetching logic
- Consistent error handling
- Built-in caching with React Query
- Cleaner component code

### 4. Utility Functions

Utilities are organized by concern in `src/lib/utils/`:

- **date.js**: Date formatting and manipulation
- **string.js**: String utilities (slugify, truncate, etc.)
- **array.js**: Array utilities (removeDuplicates, shuffle, etc.)
- **sitemap.js**: Sitemap generation utilities

**Benefits:**
- Better code organization
- Easier to find and maintain utilities
- Clear separation of concerns

### 5. Constants

- **queryKeys.js**: Centralized React Query keys for better cache management

**Benefits:**
- Consistent query key structure
- Easier cache invalidation
- Better TypeScript support (future)

### 6. Error Handling

- **ErrorBoundary.jsx**: React error boundary component
- **ErrorFallback.jsx**: Reusable error fallback UI

**Benefits:**
- Graceful error handling
- Better user experience
- Development error details

## Migration Guide

### For Components

**Before:**
```jsx
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";

const query = `*[_type == "post"] { ... }`;

const { data, isLoading, error } = useQuery({
  queryKey: ["posts"],
  queryFn: async () => {
    return await client.fetch(query);
  },
});
```

**After:**
```jsx
import { usePosts } from "../../hooks/usePosts";

const { data, isLoading, error } = usePosts();
```

### For Pages

**Before:**
```jsx
const POSTS_PER_PAGE = 6;
const query = `*[_type == "post"]...`;
```

**After:**
```jsx
import { PAGINATION } from "../config/constants";
import { usePaginatedPostsByCategory } from "../hooks/usePosts";
import { CATEGORY_SLUGS } from "../config/routes";

const { data } = usePaginatedPostsByCategory(
  CATEGORY_SLUGS.BLOGS_AND_ARTICLES,
  page,
  PAGINATION.POSTS_PER_PAGE
);
```

### For Utilities

**Before:**
```jsx
import { slugify, dateFormate } from "../utils";
```

**After:**
```jsx
import { slugify } from "../lib/utils/string";
import { formatDate } from "../lib/utils/date";
```

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=gaa41xdq
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
NEXT_PUBLIC_SANITY_USE_CDN=false
NEXT_PUBLIC_SITE_URL=https://theentrepreneurialchronicles.com
```

## Best Practices

1. **Always use hooks** instead of direct `client.fetch()` calls
2. **Use constants** from `config/` instead of hardcoded values
3. **Use route constants** from `config/routes.js` for navigation
4. **Import utilities** from `lib/utils/` instead of `utils/`
5. **Wrap components** in ErrorBoundary for better error handling
6. **Use query keys** from `constants/queryKeys.js` for consistency

## Backward Compatibility

Legacy files are kept for backward compatibility:
- `src/utils/index.js` - Re-exports from new structure
- `src/api/useFetchCategories.js` - Re-exports from new hooks

These will be removed in a future version.

## Future Improvements

1. **TypeScript Migration**: Add TypeScript for type safety
2. **Testing**: Add unit and integration tests
3. **Component Documentation**: Add JSDoc comments
4. **Performance**: Further optimize queries and caching
5. **Accessibility**: Improve accessibility features

## Questions?

Refer to the main README.md or contact the development team.