# Step-by-Step: Create Admin User in Firebase

## Step 1: Access Firebase Console
1. Go to: https://console.firebase.google.com/
2. Sign in with your Google account (the one that has access to the project)

## Step 2: Select Your Project
1. In the Firebase Console, you'll see a list of projects
2. Click on the project: **appointmentdata-c72d6**
   - If you don't see it, make sure you're using the correct Google account

## Step 3: Enable Authentication (If Not Already Enabled)
1. In the left sidebar, click on **"Authentication"** (or the 🔒 icon)
2. If you see a "Get Started" button, click it to enable Authentication
3. You should see tabs: Users, Sign-in method, Templates, Usage

## Step 4: Enable Email/Password Sign-in Method
1. Click on the **"Sign-in method"** tab (at the top)
2. Find **"Email/Password"** in the list of providers
3. Click on it
4. Toggle **"Enable"** to ON (if not already enabled)
5. Click **"Save"**

## Step 5: Create Admin User
1. Go back to the **"Users"** tab (click "Users" at the top)
2. Click the **"Add user"** button (usually at the top right)
3. A popup will appear with two fields:
   - **Email**: Enter your admin email (e.g., `admin@mrabdulsyed.com` or `syedmohamedarif03@gmail.com`)
   - **Password**: Enter a strong password (at least 6 characters)
4. Click **"Add user"**
5. You should see a success message and the new user will appear in the users list

## Step 6: Verify User Creation
- You should see your new admin user in the Users list with:
  - Email address
  - User UID (a long string)
  - Creation date

## Step 7: Test Login
1. Go to your website: `http://localhost:5173/admin/login` (or your live domain)
2. Enter the email and password you just created
3. Click "Sign in"
4. You should be redirected to `/admin` panel

## Troubleshooting

### "Authentication is not enabled"
- Make sure you completed Step 3 and enabled Authentication

### "Email/Password provider is not enabled"
- Go to Sign-in method tab and enable Email/Password provider (Step 4)

### "Can't find the project"
- Make sure you're logged in with the correct Google account
- Check that the project ID matches: `appointmentdata-c72d6`

### "Password too weak"
- Use at least 6 characters
- Include letters and numbers for better security

### "User already exists"
- If the email is already in use, you can either:
  - Use a different email
  - Or reset the password for the existing user

## Security Best Practices
- Use a strong, unique password for the admin account
- Don't share admin credentials
- Consider using a dedicated admin email (not your personal email)

## Quick Reference
- **Project ID**: appointmentdata-c72d6
- **Admin Login URL**: `/admin/login`
- **Admin Panel URL**: `/admin`
- **Email for Reviews**: syedmohamedarif03@gmail.com

