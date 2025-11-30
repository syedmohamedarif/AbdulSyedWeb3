# Debugging Blog Posts Not Appearing

## Quick Checks

### 1. Check Browser Console
Open your browser's developer console (F12) and look for:
- ✅ `✅ Loaded X published blog posts` - This means posts were found
- ❌ `❌ Error loading blog posts` - This indicates an error
- ⚠️ `⚠️ Composite index may be missing` - Index needs to be created

### 2. Verify Post is Published in Firestore

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Firestore Database** → **Data** tab
4. Click on the `blog_posts` collection
5. Check your blog post document:
   - ✅ `published` field should be `true` (boolean, not string)
   - ✅ `created_at` field should exist (string in ISO format)
   - ✅ `slug` field should match the URL

### 3. Check Firestore Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Make sure you have this rule for `blog_posts`:

```javascript
match /blog_posts/{postId} {
  // Public users can read published posts OR authenticated users can read all
  allow read: if resource.data.published == true || request.auth != null;
  // Only authenticated users can create/update/delete
  allow create, update, delete: if request.auth != null;
}
```

3. Click **Publish** if you made changes

### 4. Create Composite Index (If Needed)

If you see an error about a missing index:

1. The error message will include a link like:
   ```
   https://console.firebase.google.com/v1/r/project/.../firestore/indexes?create_composite=...
   ```
2. Click that link OR manually create the index:
   - Go to **Firestore Database** → **Indexes** tab
   - Click **Create Index**
   - Collection ID: `blog_posts`
   - Fields to index:
     - Field: `published`, Order: Ascending
     - Field: `created_at`, Order: Descending
   - Click **Create**

### 5. Test the Query

After fixing issues:
1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check the console for the debug messages
3. Visit `/blog` page to see if posts appear

## Common Issues

### Issue: "Missing or insufficient permissions"
**Solution**: Check Firestore security rules (Step 3 above)

### Issue: "The query requires an index"
**Solution**: Create the composite index (Step 4 above)

### Issue: Posts show in admin but not on website
**Possible causes**:
- `published` field is `false` - Click "Publish" button in admin panel
- `published` field is missing - Edit the post and check "Published" checkbox
- `published` is a string `"true"` instead of boolean `true` - This is a data issue

### Issue: Toggle Publish doesn't work
**Check**:
1. Open browser console
2. Click "Publish" button
3. Look for: `✅ Successfully published blog post`
4. If you see an error, check the error message

## Manual Fix: Set Published to True

If the toggle isn't working, you can manually fix in Firestore:

1. Go to **Firestore Database** → **Data** tab
2. Click on `blog_posts` collection
3. Click on your blog post document
4. Find the `published` field
5. Click the edit icon
6. Change value to `true` (make sure it's a boolean, not a string)
7. Click **Update**

## Still Not Working?

1. Check browser console for specific error messages
2. Verify Firebase environment variables are set correctly
3. Try logging out and back into admin panel
4. Clear browser cache and cookies
5. Check if other Firebase operations work (e.g., reviews)

