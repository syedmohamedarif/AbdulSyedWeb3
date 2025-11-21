# Firestore Security Rules - Fix "Missing or insufficient permissions"

## The Problem
You're seeing: `FirebaseError: Missing or insufficient permissions`

This means your Firestore security rules are too restrictive or not set up correctly.

## Solution: Update Security Rules

### Step 1: Open Firestore Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Firestore Database** (left sidebar)
4. Click **Rules** tab (at the top)

### Step 2: Copy and Paste These Rules

Replace ALL the existing rules with this code:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reviews collection
    match /reviews/{reviewId} {
      // Public users can read approved reviews OR authenticated users can read all
      allow read: if resource.data.approved == true || request.auth != null;
      // Anyone can create reviews (for public review form)
      allow create: if true;
      // Only authenticated users can update/delete
      allow update, delete: if request.auth != null;
    }
    
    // Blog posts collection
    match /blog_posts/{postId} {
      // Public users can read published posts OR authenticated users can read all
      allow read: if resource.data.published == true || request.auth != null;
      // Only authenticated users can create/update/delete
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### Step 3: Publish Rules

1. Click **Publish** button (top right)
2. Wait for confirmation: "Rules published successfully"

### Step 4: Test Again

1. Refresh your website
2. Try logging into admin panel again
3. The errors should be gone!

## What These Rules Do

### Reviews Collection:
- ✅ **Public users** can read approved reviews (for website display)
- ✅ **Public users** can create reviews (for review form)
- ✅ **Authenticated users** (admins) can read ALL reviews (for admin panel)
- ✅ **Authenticated users** can update/delete reviews

### Blog Posts Collection:
- ✅ **Public users** can read published posts (for website)
- ✅ **Authenticated users** can read ALL posts (for admin panel)
- ✅ **Authenticated users** can create/update/delete posts

## Alternative: Test Mode (Temporary - NOT for Production)

If you want to test quickly (NOT recommended for production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **WARNING**: This allows anyone to read/write everything. Only use for testing!

## Troubleshooting

### "Rules published successfully" but still getting errors
- Wait 1-2 minutes for rules to propagate
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check that you're logged in as admin

### Still getting permission errors
- Verify you're logged in: Check Firebase Console → Authentication → Users
- Check browser console for specific error messages
- Make sure rules are published (not just saved)

### Rules won't publish
- Check for syntax errors (missing semicolons, brackets)
- Make sure `rules_version = '2';` is at the top
- Try copying the rules again

## Quick Check

After updating rules, you should be able to:
1. ✅ View reviews in admin panel
2. ✅ Submit reviews from website
3. ✅ Approve/reject reviews
4. ✅ Manage blog posts

If all of these work, your rules are correct! 🎉

