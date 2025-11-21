# Firebase Setup - Step by Step Guide

Follow these steps to set up your new Firebase project.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** (or **Create a project**)
3. Enter project name: `mrabdulsyed` (or your preferred name)
4. Click **Continue**
5. **Disable** Google Analytics (optional, you can enable later)
6. Click **Create project**
7. Wait for project creation to complete
8. Click **Continue**

## Step 2: Get Firebase Configuration

1. In your Firebase project, click the **gear icon** ⚙️ (top left)
2. Click **Project settings**
3. Scroll down to **Your apps** section
4. Click the **Web** icon `</>` (or **Add app** → **Web**)
5. Register app:
   - App nickname: `mrabdulsyed-web` (or any name)
   - **Don't** check "Also set up Firebase Hosting"
   - Click **Register app**
6. You'll see a `firebaseConfig` object - **copy these values**:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Create .env File

1. In your project root folder, create a file named `.env`
2. Add these variables with your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

**Important**: Replace the values with your actual Firebase config values!

## Step 4: Enable Authentication

1. In Firebase Console, click **Authentication** (left sidebar)
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Click on **Email/Password**
5. Toggle **Enable** to ON
6. Click **Save**

## Step 5: Create Admin User

1. Still in **Authentication**, go to **Users** tab
2. Click **Add user** button
3. Enter:
   - **Email**: Your admin email (e.g., `admin@mrabdulsyed.com` or `syedmohamedarif03@gmail.com`)
   - **Password**: Create a strong password
4. Click **Add user**
5. **Save these credentials** - you'll need them to log into the admin panel

## Step 6: Set Up Firestore Database

1. In Firebase Console, click **Firestore Database** (left sidebar)
2. Click **Create database**
3. Choose **Start in test mode** (for now - we'll add security rules next)
4. Select a location (choose closest to your users, e.g., `europe-west` for UK)
5. Click **Enable**
6. Wait for database to be created

## Step 7: Set Up Security Rules

1. In **Firestore Database**, click **Rules** tab
2. Replace the default rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reviews collection
    match /reviews/{reviewId} {
      // Anyone can read approved reviews
      allow read: if resource.data.approved == true;
      // Anyone can create reviews (for public review form)
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

3. Click **Publish**

## Step 8: Test Locally

1. In your project, run:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:5173/admin/login`
3. Log in with your admin credentials
4. You should see the admin panel!

## Step 9: Set Up for Production (Netlify)

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add all 6 Firebase variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
5. Click **Save**
6. Go to **Deploys** tab
7. Click **Trigger deploy** → **Deploy site**

## Collections Will Be Created Automatically

When you use the website, these collections will be created automatically:
- `reviews` - For patient reviews
- `blog_posts` - For blog posts

You don't need to create them manually!

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check that `.env` file exists in project root
- Verify all environment variables are set correctly
- Restart `npm run dev` after creating `.env`

### Can't log in to admin panel
- Verify admin user was created in Firebase Authentication
- Check email and password are correct
- Make sure Email/Password provider is enabled

### "Permission denied" errors
- Check Firestore security rules are published
- Verify rules match the code above
- Check browser console for specific error messages

## Next Steps After Setup

1. Test submitting a review from the website
2. Check Firebase Console → Firestore Database to see the review
3. Log into admin panel and approve the review
4. Verify the review appears on the website

Good luck! 🚀

