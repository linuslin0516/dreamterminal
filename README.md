# DREAM_TERMINAL - Deployment Guide

## 📁 Files Overview

Your website consists of:
- `index.html` - Homepage
- `about.html` - About page with detailed information
- `archive.html` - Full dream archive with search
- `submit.html` - Dream submission form (Netlify Forms ready)
- `dream.html` - Individual dream detail page
- `style.css` - All CSS styles
- `matrix.js` - Matrix rain background animation
- `dreams-data.js` - Sample dreams data

## 🚀 Deployment Options

### Option 1: Netlify (RECOMMENDED for form submissions)

#### Why Netlify?
- ✅ Built-in form handling (perfect for dream submissions!)
- ✅ Free tier is generous
- ✅ Automatic HTTPS
- ✅ Easy custom domain setup

#### Steps:
1. Go to https://netlify.com and sign up
2. Drag and drop the entire `dream_terminal_site` folder
3. Your site is live! (e.g., `your-site.netlify.app`)
4. To add custom domain:
   - Site Settings > Domain Management > Add custom domain
   - Follow DNS instructions from Netlify
5. View form submissions in: Site > Forms tab

#### Form Submissions on Netlify:
- The `submit.html` file is already configured for Netlify Forms
- All submissions appear in your Netlify dashboard
- You can export as CSV
- Set up email notifications

---

### Option 2: Vercel

#### Steps:
1. Go to https://vercel.com and sign up
2. Install Vercel CLI: `npm i -g vercel`
3. In terminal, navigate to `dream_terminal_site` folder
4. Run: `vercel`
5. Follow prompts
6. To add custom domain: Project Settings > Domains

**Note:** Vercel doesn't have built-in form handling. You'll need to:
- Use a service like Formspree, or
- Create a serverless function, or
- Use Google Forms

---

### Option 3: GitHub Pages

#### Steps:
1. Create GitHub account if you don't have one
2. Create new repository (name it anything)
3. Upload all files from `dream_terminal_site`
4. Go to Settings > Pages
5. Source: Deploy from main branch
6. Your site will be at: `username.github.io/repository-name`

**Note:** GitHub Pages doesn't support form submissions. Use alternative form service.

---

## 📝 Form Submission Alternatives

If you're not using Netlify, here are alternatives:

### 1. Formspree (Easiest)
1. Sign up at https://formspree.io
2. Get your form endpoint
3. Replace the form in `submit.html`:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### 2. Google Forms (Free)
1. Create a Google Form
2. Get the form action URL
3. Update `submit.html` to point to Google Form

### 3. EmailJS
1. Sign up at https://emailjs.com
2. Set up email service
3. Add EmailJS SDK to `submit.html`

---

## 🌐 Custom Domain Setup

### If you bought domain from Namecheap:

#### For Netlify:
1. In Netlify: Add custom domain
2. In Namecheap: Advanced DNS
3. Add these records:
   ```
   Type: A Record
   Host: @
   Value: 75.2.60.5

   Type: CNAME
   Host: www
   Value: YOUR-SITE.netlify.app
   ```

#### For Vercel:
1. In Vercel: Add domain
2. In Namecheap: Advanced DNS
3. Add these records:
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21

   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   ```

Wait 5-30 minutes for DNS to propagate.

---

## 🔧 Customization

### Update Dreams Data
Edit `dreams-data.js` to add/modify dreams:
```javascript
{
    id: 'DRM-XXXX',
    content: 'Your dream description...',
    tags: ['tag1', 'tag2'],
    date: '2024-XX-XX'
}
```

### Change Colors
Edit `:root` variables in `style.css`:
```css
:root {
    --primary: #fff;  /* Main color */
    --bg: #000;       /* Background */
    --gray: #666;     /* Secondary */
}
```

### Add Your Social Links
In `about.html`, find the CONTACT section and add your links.

---

## 📊 Viewing Form Submissions

### On Netlify:
1. Go to your site dashboard
2. Click "Forms" tab
3. See all submissions
4. Download as CSV
5. Set up email notifications

### On Formspree:
1. Log into Formspree
2. View submissions in dashboard
3. Export as needed

---

## 🐛 Troubleshooting

**Forms not working:**
- Make sure you're using Netlify OR have configured alternative form service
- Check console for errors

**Matrix background not showing:**
- Check if `matrix.js` is loaded
- Check browser console for errors

**Styles broken:**
- Verify `style.css` path is correct
- Check if all files are in same directory

**Custom domain not working:**
- Wait 24 hours for DNS propagation
- Check DNS records are correct
- Try clearing browser cache

---

## 📈 Next Steps

1. **Set up analytics:** Add Google Analytics or Plausible
2. **Add real database:** Connect to Firebase, Supabase, or Airtable
3. **AI Integration:** Add dream interpretation using OpenAI API
4. **Image generation:** Generate dream art using DALL-E or Midjourney
5. **Social features:** Add dream sharing to Twitter

---

## 💡 Tips

- Test form submissions before going live
- Check mobile responsiveness
- Set up email notifications for new dreams
- Consider adding reCAPTCHA to prevent spam
- Back up submissions regularly

---

## Need Help?

If you run into issues:
1. Check browser console for errors
2. Verify all files are uploaded
3. Check form configuration
4. Test on different browsers

Good luck with your dream terminal! 🌙
