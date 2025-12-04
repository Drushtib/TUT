# Step-by-Step: New Sanity Backend Setup

## Prerequisites
- Node.js installed
- npm or pnpm installed
- Sanity account (create at sanity.io if you don't have one)

---

## Step 1: Create New Sanity Project Online

1. Go to [https://www.sanity.io](https://www.sanity.io)
2. Sign up or log in
3. Click **"Create new project"**
4. Fill in:
   - **Project name**: (e.g., "New Magazine Project")
   - **Dataset name**: `production` (or your choice)
5. **IMPORTANT**: Copy your **Project ID** (you'll see it in the project dashboard)
   - It looks like: `abc123xy` (8 characters)
   - You'll need this in Step 3

---

## Step 2: Install Sanity CLI (if not already installed)

Open terminal/command prompt and run:

```bash
npm install -g @sanity/cli
```

Verify installation:
```bash
sanity --version
```

---

## Step 3: Login to Sanity CLI

```bash
sanity login
```

This will open a browser window for authentication. Complete the login process.

---

## Step 4: Navigate to Your Project

From your project root directory:

```bash
cd sanity_backend
```

---

## Step 5: Initialize Sanity (This Creates New Backend)

**Option A: Manual Setup (Recommended - Keeps Your Schema Files)**

Since you already have schema files, we'll initialize but keep your existing structure:

```bash
# This will ask you questions - answer them:
sanity init

# When prompted:
# - Select your project (the one you created in Step 1)
# - Dataset: production (or your choice)
# - Output path: . (current directory)
# - Template: Clean project with no predefined schemas
```

**Option B: Quick Setup (If Option A doesn't work)**

If the above doesn't work, you can manually create the connection:

1. Update `sanity.config.js` with your new project ID
2. Update `sanity.cli.js` with your new project ID
3. Run `npm install` in the sanity_backend directory

---

## Step 6: Update Configuration Files with New Project ID

Now you need to update the config files with your NEW project ID from Step 1.

### 6a. Update `sanity_backend/sanity.config.js`

Find this line:
```javascript
projectId: 'gaa41xdq',  // OLD PROJECT ID
```

Change to:
```javascript
projectId: 'YOUR_NEW_PROJECT_ID',  // Replace with your new project ID
```

### 6b. Update `sanity_backend/sanity.cli.js`

Find this line:
```javascript
projectId: 'gaa41xdq',  // OLD PROJECT ID
```

Change to:
```javascript
projectId: 'YOUR_NEW_PROJECT_ID',  // Replace with your new project ID
```

### 6c. Update `src/config/sanity.js`

Find this line:
```javascript
projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gaa41xdq",
```

Change to:
```javascript
projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "YOUR_NEW_PROJECT_ID",
```

### 6d. Create/Update `.env.local` in Root Directory

Create a file named `.env.local` in the root directory (same level as `package.json`):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_NEW_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
NEXT_PUBLIC_SANITY_USE_CDN=false
```

Replace `YOUR_NEW_PROJECT_ID` with your actual project ID.

---

## Step 7: Install Dependencies

In the `sanity_backend` directory:

```bash
npm install
```

This will install all Sanity packages and create `node_modules` and `package-lock.json`.

---

## Step 8: Deploy Schema to New Sanity Project

This pushes your schema structure (Post, Magazine, Category, etc.) to your new Sanity project:

```bash
# Make sure you're in sanity_backend directory
sanity deploy
```

When prompted:
- **Studio hostname**: Choose a name (e.g., `new-magazine-studio`)
- This will create a URL like: `https://new-magazine-studio.sanity.studio`

**OR** if you want to run locally first:

```bash
npm run dev
```

This starts Sanity Studio locally at `http://localhost:3333`

---

## Step 9: Verify Schema is Deployed

1. Go to your Sanity Studio URL (from Step 8) or `http://localhost:3333`
2. You should see all your content types:
   - ✅ Post
   - ✅ Magazine
   - ✅ Category
   - ✅ Author
   - ✅ YouTube Video
   - ✅ Brand Logo

If you see these, your schema is successfully deployed!

---

## Step 10: Test Frontend Connection

1. Go back to project root directory:
```bash
cd ..
```

2. Install frontend dependencies (if not already done):
```bash
npm install
```

3. Start Next.js dev server:
```bash
npm run dev
```

4. Open browser to `http://localhost:3000`
5. Check browser console (F12) for any Sanity connection errors
6. If no errors, your frontend is connected to the new Sanity project!

---

## Step 11: Create Initial Content

Now you can start adding content to your new Sanity project:

1. **First, create Categories** (required for posts):
   - Go to Sanity Studio
   - Click "Category"
   - Create categories like "Business Bulletin", "Blogs", etc.

2. **Then create Posts**:
   - Click "Post"
   - Fill in title, image, category, etc.

3. **Create Magazines**:
   - Click "Magazine"
   - Upload magazine cover, add Issuu link, etc.

---

## Summary: When to Copy Files

### ✅ **COPY BEFORE Step 5** (Schema Files - Already in Place):
- `sanity_backend/schemaTypes/` - All files (post.js, magazine.js, etc.)
- These define your content structure
- **Status**: Already in your project, no action needed!

### 🔧 **UPDATE in Step 6** (Configuration Files):
- `sanity_backend/sanity.config.js` - Update projectId
- `sanity_backend/sanity.cli.js` - Update projectId
- `src/config/sanity.js` - Update projectId
- `.env.local` - Create with new project ID

### ❌ **DON'T COPY** (Auto-generated):
- `node_modules/` - Generated by `npm install` (Step 7)
- `package-lock.json` - Generated by `npm install` (Step 7)
- `.sanity/` - Generated by Sanity CLI (Step 5/8)

---

## Quick Command Reference

```bash
# 1. Login to Sanity
sanity login

# 2. Navigate to backend
cd sanity_backend

# 3. Install dependencies
npm install

# 4. Deploy schema (or run locally)
sanity deploy
# OR
npm run dev

# 5. Test frontend (from root)
cd ..
npm run dev
```

---

## Troubleshooting

### "Project not found" error
- Double-check your project ID in all config files
- Make sure you're logged in: `sanity login`
- Verify project exists in Sanity dashboard

### "Cannot connect" in frontend
- Check `.env.local` file exists and has correct values
- Restart Next.js server after creating `.env.local`
- Clear browser cache

### Schema not showing in Studio
- Make sure `sanity deploy` completed successfully
- Check that all schema files are in `sanity_backend/schemaTypes/`
- Verify `schemaTypes/index.js` exports all schemas

---

## Next Steps After Setup

1. ✅ Create categories in Sanity Studio
2. ✅ Upload test post to verify structure
3. ✅ Upload test magazine
4. ✅ Verify content displays on frontend
5. ✅ Configure CORS in Sanity dashboard (if needed for production)

