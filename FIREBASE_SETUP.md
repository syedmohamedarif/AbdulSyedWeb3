# Firebase Setup Guide

This project uses Firebase for authentication and Firestore database.

## Environment Variables

Create a `.env` file in the project root with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon ⚙️ → **Project settings**
4. Scroll down to **Your apps** section
5. If you don't have a web app, click **Add app** → **Web** (</> icon)
6. Copy the configuration values from the `firebaseConfig` object

## Firebase Setup Steps

### 1. Enable Authentication

1. Go to **Authentication** in Firebase Console
2. Click **Get started** (if not already enabled)
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. Click **Save**

### 2. Create Admin User

1. Go to **Authentication** → **Users** tab
2. Click **Add user**
3. Enter admin email and password
4. Click **Add user**

### 3. Set Up Firestore Database

1. Go to **Firestore Database** in Firebase Console
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location for your database
5. Click **Enable**

### 4. Set Up Security Rules

Go to **Firestore Database** → **Rules** tab and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reviews collection
    match /reviews/{reviewId} {
      // Anyone can read approved reviews
      allow read: if resource.data.approved == true;
      // Anyone can create reviews
      allow create: if true;
      // Only authenticated users can update/delete
      allow update, delete: if request.auth != null;
    }
    
    // Blog posts collection
    match /blog_posts/{postId} {
      // Anyone can read published posts
      allow read: if resource.data.published == true;
      // Only authenticated users can create/update/delete
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### 5. Set Up Collections

The following collections will be created automatically when you first use them:
- `reviews` - For patient reviews
- `blog_posts` - For blog posts

## Netlify Deployment

1. Go to **Netlify Dashboard** → Your site
2. Go to **Site settings** → **Environment variables**
3. Add all the Firebase environment variables (with `VITE_` prefix)
4. Click **Save**
5. **Redeploy** your site

## Testing

1. Run `npm run dev` locally
2. Visit `http://localhost:5173/admin/login`
3. Log in with your admin credentials
4. Test creating, editing, and approving reviews

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check that all environment variables are set correctly
- Make sure variables start with `VITE_` prefix
- Restart the dev server after adding variables

### "Permission denied" errors
- Check Firestore security rules
- Make sure rules allow the operations you're trying to perform
- Verify you're logged in for admin operations

### Reviews not appearing
- Check Firestore console to see if data is being saved
- Verify security rules allow reading approved reviews
- Check browser console for errors

