# Test Supabase Connection

## Quick Test Script

Run this in your browser console on your live website (https://mrabdulsyed.com):

```javascript
// Test Supabase connection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('Supabase Key:', supabaseKey ? '✅ Set' : '❌ Missing');

if (supabaseUrl && supabaseKey) {
  // Try to insert a test review
  fetch(`${supabaseUrl}/rest/v1/reviews`, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      rating: 5,
      comment: 'Test review from console',
      approved: false
    })
  })
  .then(response => {
    console.log('Response status:', response.status);
    if (!response.ok) {
      return response.text().then(text => {
        console.error('Error response:', text);
        throw new Error(`HTTP ${response.status}: ${text}`);
      });
    }
    console.log('✅ Test review inserted successfully!');
    return response.json();
  })
  .then(data => console.log('Data:', data))
  .catch(error => {
    console.error('❌ Error:', error);
    console.error('This means Supabase insert is failing. Check:');
    console.error('1. RLS policies are set correctly');
    console.error('2. Environment variables are set in Netlify');
    console.error('3. Supabase project is active');
  });
} else {
  console.error('❌ Supabase environment variables are not set in Netlify!');
  console.error('Go to Netlify → Site settings → Environment variables');
  console.error('Add: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}
```

## What to Look For

### If you see "❌ Missing":
- Environment variables are NOT set in Netlify
- Go to Netlify and add them, then redeploy

### If you see "HTTP 401" or "HTTP 403":
- RLS policy issue
- Run the FIX_REVIEWS_RLS.sql script again

### If you see "HTTP 201" or "✅ Test review inserted":
- Supabase is working!
- The issue is in the React code
- Check browser console for JavaScript errors

### If you see network errors:
- CORS issue or Supabase project is paused
- Check Supabase dashboard to ensure project is active

