# How to Create Admin User for Login

Follow these simple steps to create an admin user that can log into the admin panel.

## Step 1: Open Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (the one you just created)

## Step 2: Navigate to Authentication

1. In the left sidebar, click **Authentication** (or the 🔒 icon)
2. If you see "Get started", click it to enable Authentication
3. You should now see tabs: **Users**, **Sign-in method**, **Templates**, **Usage**

## Step 3: Enable Email/Password Sign-in

1. Click on the **Sign-in method** tab (at the top)
2. Find **Email/Password** in the list of providers
3. Click on **Email/Password**
4. Toggle **Enable** to **ON** (if not already enabled)
5. Click **Save**

## Step 4: Create Admin User

1. Go back to the **Users** tab (click "Users" at the top)
2. Click the **Add user** button (usually at the top right, or a "+" button)
3. A popup/form will appear with two fields:
   - **Email**: Enter your admin email
     - Example: `admin@mrabdulsyed.com`
     - Or use: `syedmohamedarif03@gmail.com`
   - **Password**: Enter a strong password (at least 6 characters)
     - Make it secure! This is your admin password.
4. Click **Add user** (or **Create user**)

## Step 5: Verify User Creation

- You should see a success message
- The new user will appear in the Users list with:
  - Email address
  - User UID (a long string - this is the unique ID)
  - Creation date
  - Provider: "password"

## Step 6: Test Login

1. Go to your website: `http://localhost:5173/admin/login` (if running locally)
   - Or: `https://mrabdulsyed.com/admin/login` (if deployed)
2. Enter the **email** and **password** you just created
3. Click **Sign in**
4. You should be redirected to `/admin` panel

## Troubleshooting

### "Authentication is not enabled"
- Make sure you completed Step 3 and enabled Email/Password provider

### "Email/Password provider is not enabled"
- Go to **Sign-in method** tab
- Enable **Email/Password** provider (Step 3)

### "Invalid credentials" when logging in
- Double-check the email and password are correct
- Make sure there are no extra spaces
- Try resetting the password in Firebase Console if needed

### Can't see "Add user" button
- Make sure you're on the **Users** tab
- Check that Authentication is enabled
- Try refreshing the page

## Security Tips

1. **Use a strong password** - Mix of letters, numbers, and symbols
2. **Don't share your admin credentials** - Keep them private
3. **Consider using a dedicated admin email** - Not your personal email
4. **Enable 2FA later** (optional) - For extra security

## Multiple Admin Users

You can create multiple admin users:
- Just repeat Steps 4-5 for each user
- Each user will have their own email/password
- All authenticated users can access the admin panel

That's it! Your admin user is now ready to use. 🎉

