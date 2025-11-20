# Admin Panel Setup Guide

## Overview
The admin panel allows you to manage patient reviews with full CRUD (Create, Read, Update, Delete) operations.

## Initial Setup

### 1. Create Admin User in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `appointmentdata-c72d6`
3. Navigate to **Authentication** → **Users**
4. Click **Add User**
5. Enter:
   - **Email**: Your admin email (e.g., `admin@mrabdulsyed.com`)
   - **Password**: Create a strong password
6. Click **Add User**

### 2. Access Admin Panel

1. Navigate to: `https://yourdomain.com/admin/login`
2. Enter your admin email and password
3. You'll be redirected to the admin panel at `/admin`

## Features

### Review Management
- **View All Reviews**: See all submitted reviews (approved and pending)
- **Add Reviews**: Manually add reviews through the admin panel
- **Edit Reviews**: Update any review's details
- **Approve/Unapprove**: Toggle review visibility on the website
- **Delete Reviews**: Remove reviews permanently

### Review Form (Public)
- Patients can submit reviews through the website
- Reviews are automatically sent to: `syedmohamedarif03@gmail.com`
- Reviews appear as "Pending" in admin panel until approved
- Only approved reviews are displayed on the website

## Workflow

1. **Patient submits review** → Email sent to admin email
2. **Admin logs in** → Reviews appear in admin panel
3. **Admin approves review** → Review becomes visible on website
4. **Admin can edit/delete** → Full control over all reviews

## Security Notes

- Admin credentials are managed through Firebase Authentication
- Only authenticated users can access `/admin` route
- Unauthenticated users are redirected to `/admin/login`

## Troubleshooting

**Can't log in?**
- Verify the user exists in Firebase Authentication
- Check email and password are correct
- Ensure Firebase Authentication is enabled in Firebase Console

**Reviews not showing?**
- Check that reviews are marked as "Approved" in admin panel
- Verify Firestore database has the `reviews` collection
- Check browser console for errors

