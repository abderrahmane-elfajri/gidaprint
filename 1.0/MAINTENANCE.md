# GIDAPRINT Website - Maintenance Guide

Complete guide for maintaining and updating your website.

## 🔧 Regular Maintenance Tasks

### Weekly Tasks
- [ ] Check website uptime
- [ ] Monitor error logs
- [ ] Review analytics
- [ ] Check contact form submissions
- [ ] Test WhatsApp button functionality

### Monthly Tasks
- [ ] Update portfolio with new projects
- [ ] Review testimonials
- [ ] Update service descriptions if needed
- [ ] Check external links
- [ ] Review SEO performance
- [ ] Backup website files

### Quarterly Tasks
- [ ] Security audit
- [ ] Update SSL certificate (auto-renewal)
- [ ] Review and update pricing
- [ ] Check compatibility with new browsers
- [ ] Update dependencies (if using npm)
- [ ] Review and optimize images

### Annually Tasks
- [ ] Full security audit
- [ ] Update contact information
- [ ] Review brand colors and design
- [ ] Update company information
- [ ] Renew domain registration
- [ ] Full backup storage
- [ ] Performance optimization review

## 📝 Content Updates

### Updating Company Information

**Phone Number**
1. Open `index.html`
2. Find: `+212 7 86 62 07 20`
3. Replace with new number (appears in multiple places)
4. Update in `config.json` as well

**Email Address**
1. Search for: `gidaprint84@gmail.com`
2. Replace in `index.html`
3. Update in `config.json` and footer

**Responsible Person**
1. Find: `Yassine Elfajri`
2. Replace with new name in contact section

**Location**
1. Update: `Casablanca, Maroc` if needed
2. Update in footer and contact section

### Adding New Services

1. **Locate Service Section** in `index.html`
2. **Copy Service Card HTML**:
```html
<div class="service-card">
    <div class="service-icon">🎯</div>
    <h5>Service Name</h5>
    <p>Service Description</p>
</div>
```
3. **Paste in appropriate category**
4. **Update icon, name, and description**
5. **Save and test**

### Adding Portfolio Items

1. **Find Portfolio Section** in `index.html`
2. **Add New Item**:
```html
<div class="portfolio-item">
    <div class="portfolio-image" style="background: linear-gradient(135deg, #1E2A44 0%, #00AEEF 100%);"></div>
    <div class="portfolio-overlay">
        <h3>Project Title</h3>
        <p>Project Description</p>
    </div>
</div>
```
3. **Update gradient colors**
4. **Update title and description**
5. **Save and refresh**

### Adding Testimonials

1. **Find Testimonials Section**
2. **Add New Card**:
```html
<div class="testimonial-card">
    <div class="stars">⭐⭐⭐⭐⭐</div>
    <p>"Your testimonial text here"</p>
    <h4>Person Name</h4>
    <p class="testimonial-role">Job Title</p>
</div>
```
3. **Update all text fields**
4. **Save changes**

## 🎨 Design Updates

### Changing Colors

**Primary Color (Dark Blue)**
- Open `assets/css/styles.css`
- Find: `--primary: #1E2A44`
- Change to new color hex code

**Secondary Color (Cyan)**
- Find: `--secondary: #00AEEF`
- Change to new color hex code

**All Color Variables**:
```css
:root {
    --primary: #1E2A44;           /* Main color */
    --secondary: #00AEEF;         /* Accent */
    --accent-magenta: #EC008C;    /* Magenta */
    --accent-yellow: #FFC20E;     /* Yellow */
    --white: #FFFFFF;             /* White */
    --light-gray: #F5F7FA;        /* Light bg */
}
```

### Updating Fonts

Current fonts (from Google Fonts):
- **Headings**: Poppins
- **Body**: Inter

To change:
1. Open `index.html`
2. Update fonts link in `<head>`
3. Update font-family in CSS

```css
/* For headings */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Your Font Name', sans-serif;
}

/* For body text */
body {
    font-family: 'Your Font Name', sans-serif;
}
```

### Modifying Layout

**Section Spacing**
- Find: `section { padding: 80px 0; }`
- Adjust pixel values for more/less spacing

**Container Width**
- Find: `.container { max-width: 1200px; }`
- Change 1200px to desired width

**Card Gaps**
- Find: `.service-grid { gap: 1.5rem; }`
- Adjust for more/less spacing between items

## 🔐 Security Updates

### Regular Security Checklist

- [ ] Update HTTP headers in .htaccess
- [ ] Check for outdated dependencies
- [ ] Review file permissions
- [ ] Verify SSL certificate validity
- [ ] Check for unauthorized file uploads
- [ ] Review access logs
- [ ] Update .htaccess security rules

### Protecting Sensitive Files

Ensure these files are NOT publicly accessible:
- `config.json` - Add to .htaccess `FilesMatch`
- `.env` - Never commit to repository
- `backup/` - Keep in secure location
- Admin files - Keep outside public directory

### Adding Security Headers

In `.htaccess`, these headers are already configured:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

## 📈 Performance Optimization

### Image Optimization

**Tools to Use**:
- TinyPNG (tinypng.com) - PNG/JPG compression
- ImageOptim (imageoptim.com) - Mac optimization
- Squoosh (squoosh.app) - Online tool

**Recommended Sizes**:
- Hero images: 1200x800px (max 200KB)
- Portfolio images: 600x600px (max 100KB)
- Icons: 64x64px (max 10KB)
- Thumbnails: 300x300px (max 50KB)

### Enabling Compression

**In Apache (.htaccess)**:
Already configured with:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### Caching Strategy

**Browser Cache** - Already configured:
- CSS/JS: 1 year
- Images: 1 year
- Default: 2 weeks

**CDN Cache** - If using Cloudflare:
- Set page cache level to "Cache Everything"
- Configure cache TTL

### Lazy Loading

To enable lazy loading on images:
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

## 🐛 Troubleshooting Guide

### Website Not Updating After Changes

**Solution**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check file permissions
4. Verify file was actually saved
5. Check for syntax errors (browser console)

### Broken Links

**Check and Fix**:
1. Use online link checker
2. Open browser console (F12)
3. Look for 404 errors
4. Verify file paths are correct
5. Check URL structure

### Slow Loading

**Optimization Steps**:
1. Enable gzip compression (done)
2. Optimize images
3. Minify CSS/JS
4. Use CDN
5. Check server response time
6. Reduce redirects

### Contact Form Not Working

**Troubleshooting**:
1. Check browser console for errors
2. Verify phone number format
3. Test WhatsApp link manually
4. Check JavaScript is enabled
5. Verify form fields have correct IDs

### Mobile Display Issues

**Solutions**:
1. Test on actual devices
2. Check viewport meta tag
3. Test media queries
4. Verify flexible images
5. Test touch interactions

## 📱 Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

### Testing
Use BrowserStack or similar service to test:
- Different screen sizes
- Touch interactions
- Form submissions
- Video playback

### Known Issues & Fixes

**Safari iOS - SVG scaling**
```css
svg {
    width: 100%;
    height: auto;
}
```

**Firefox - Radio button styling**
- Already handled with custom styling

**IE11 - Not supported**
- Modern features require IE11 polyfills if needed

## 🔄 Version Control with Git

### Basic Git Commands

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Update: Added new portfolio items"

# Push to repository
git push origin main

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feature/new-section

# Merge branch
git checkout main
git merge feature/new-section
```

### Commit Message Format
```
Type: Brief description (50 chars max)

Detailed explanation (optional)
- Bullet point 1
- Bullet point 2

Closes #issue-number
```

**Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - CSS/styling
- `refactor:` - Code restructure
- `perf:` - Performance

## 📊 Analytics Setup & Monitoring

### Google Analytics Reports to Monitor

1. **User Engagement**
   - Page views
   - Time on page
   - Bounce rate
   - Click tracking

2. **Conversion Tracking**
   - Form submissions
   - Button clicks
   - Service views
   - WhatsApp clicks

3. **Traffic Sources**
   - Organic search
   - Direct visits
   - Referrals
   - Social media

### Setting Up Goals

In Google Analytics:
```
1. Go to Admin > Goals
2. Create new goal
3. Examples:
   - Form submission
   - WhatsApp click
   - Service view
   - Scroll depth
```

## 🚀 Feature Enhancement Ideas

### Phase 2 Features
- [ ] Multi-language support (EN/FR/AR)
- [ ] Blog/News section
- [ ] Client login portal
- [ ] Live chat support
- [ ] Appointment booking
- [ ] Video testimonials
- [ ] Service comparison tool
- [ ] Pricing calculator

### Phase 3 Features
- [ ] AI-powered chatbot
- [ ] AR product preview
- [ ] Mobile app
- [ ] API integration
- [ ] Advanced CRM
- [ ] Inventory management
- [ ] Project tracking

## 📞 Support & Troubleshooting

### Getting Help

**GIDAPRINT Support**:
- Email: gidaprint84@gmail.com
- Phone: +212 7 86 62 07 20
- WhatsApp: +212 7 86 62 07 20

**Technical Resources**:
- MDN Web Docs: developer.mozilla.org
- W3Schools: w3schools.com
- CSS Tricks: css-tricks.com
- Stack Overflow: stackoverflow.com

## 📋 Maintenance Checklist Template

Print or save this template for regular maintenance:

```
Date: _______________

Weekly:
[ ] Uptime check
[ ] Analytics review
[ ] Contact form check

Monthly:
[ ] Content update
[ ] Link verification
[ ] SEO performance
[ ] Backup created

Quarterly:
[ ] Security audit
[ ] Performance review
[ ] Browser testing
[ ] Mobile testing

Issues Found:
1. ________________
2. ________________
3. ________________

Actions Taken:
1. ________________
2. ________________
3. ________________

Next Review: _______________
Reviewed By: _______________
```

---

**Last Updated**: May 2026
**Maintenance Status**: Active
**Next Major Update**: To be scheduled

For more information, see:
- README.md - Project overview
- DEPLOYMENT.md - Deployment instructions
- config.json - Configuration settings
