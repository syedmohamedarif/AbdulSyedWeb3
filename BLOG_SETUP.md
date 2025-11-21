# Blog CRUD Setup Guide

## Overview
The blog system allows you to create, read, update, and delete blog posts through an admin panel. All blog posts are stored in Supabase.

## Database Setup

### 1. Create Blog Posts Table in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the following SQL to create the `blog_posts` table:

```sql
-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  author TEXT DEFAULT 'Mr Abdul Syed',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Create index on published for filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published posts
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

-- Policy: Only authenticated users can insert
CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

### 2. Verify Table Creation

1. Go to **Table Editor** in Supabase
2. You should see the `blog_posts` table
3. Check that all columns are created correctly

## Features

### Admin Panel Features
- **Create Blog Posts**: Add new blog posts with title, slug, excerpt, content, featured image, and author
- **Edit Blog Posts**: Update any existing blog post
- **Delete Blog Posts**: Remove blog posts permanently
- **Publish/Unpublish**: Toggle visibility of blog posts on the website
- **Auto-generate Slug**: Slug is automatically generated from title (can be manually edited)

### Public Features
- **Blog List Page**: View all published blog posts at `/blog`
- **Individual Blog Post**: Read full blog post at `/blog/:slug`
- **Responsive Design**: Works on all devices

## Usage

### Creating a Blog Post

1. Log in to admin panel: `/admin/login`
2. Click **"Blog Management"** button
3. Fill in the form:
   - **Title**: The blog post title
   - **Slug**: URL-friendly version (auto-generated from title)
   - **Excerpt**: Short description (shown in blog list)
   - **Featured Image URL**: Optional image URL
   - **Author**: Defaults to "Mr Abdul Syed"
   - **Content**: Full blog post content (HTML supported)
   - **Published**: Check to make it visible on website
4. Click **"Create Post"**

### Editing a Blog Post

1. Go to Blog Admin Panel: `/admin/blog`
2. Find the post you want to edit
3. Click **"Edit"** button
4. Make your changes
5. Click **"Update Post"**

### Publishing/Unpublishing

- Click **"Publish"** to make a post visible on the website
- Click **"Unpublish"** to hide it (draft mode)

### Deleting a Blog Post

1. Click **"Delete"** button on the post
2. Confirm deletion
3. Post is permanently removed

## Content Guidelines

### Slug Format
- Use lowercase letters, numbers, and hyphens only
- Example: `understanding-breast-cancer-treatment`
- Auto-generated from title, but can be edited

### HTML Content
- The content field supports HTML
- You can use tags like `<p>`, `<h2>`, `<ul>`, `<li>`, `<strong>`, `<em>`, etc.
- Example:
```html
<p>This is a paragraph.</p>
<h2>This is a heading</h2>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
```

### Featured Images
- Use full URLs to images
- Recommended size: 1200x630px for best display
- Can be hosted on Supabase Storage, Imgur, or any image hosting service

## Navigation

- **Blog Link**: Added to main navigation menu
- **Admin Access**: 
  - Reviews: `/admin`
  - Blog: `/admin/blog`
  - Switch between them using the buttons in the admin panel

## Troubleshooting

### "Table doesn't exist"
- Make sure you ran the SQL script in Supabase SQL Editor
- Check that the table name is exactly `blog_posts`

### "Permission denied"
- Verify RLS policies are set up correctly
- Make sure you're logged in as an authenticated user

### "Slug already exists"
- Each blog post needs a unique slug
- Edit the slug to make it unique

### Posts not showing on website
- Check that `published` is set to `true`
- Verify the post exists in Supabase database

## Next Steps

1. Create your first blog post
2. Test the publish/unpublish functionality
3. View your blog posts on the public website
4. Customize the blog styling if needed

