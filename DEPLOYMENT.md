# GIDAPRINT Website - Deployment Guide

Complete guide to deploy your website to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] All content updated with correct company information
- [ ] Phone number and email verified
- [ ] WhatsApp number tested and working
- [ ] Social media links configured
- [ ] Custom domain registered (optional)
- [ ] SSL certificate obtained
- [ ] Backup created locally
- [ ] Browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Contact form tested

## 🚀 Quick Deployment Options

### Option 1: Netlify (Recommended - Free)

#### Steps:
1. **Create Netlify Account**
   - Go to netlify.com
   - Sign up with GitHub, GitLab, Bitbucket, or email

2. **Connect Repository**
   - Click "New site from Git"
   - Select your repository
   - Authorize Netlify

3. **Configure Build Settings**
   - Build command: (leave empty)
   - Publish directory: . (current directory)
   - No environment variables needed

4. **Deploy**
   - Netlify automatically deploys on every push
   - Get automatic HTTPS certificate
   - Custom domain: Go to Settings > Domain Management

5. **Features Included**
   - Free SSL certificate
   - Automatic deployments
   - GitHub integration
   - CDN included
   - Form notifications (premium)

#### Custom Domain Setup:
```
1. Go to your registrar (GoDaddy, Namecheap, etc.)
2. Update DNS records to point to Netlify
3. In Netlify: Settings > Domain Management > Add Custom Domain
4. Verify domain ownership
```

### Option 2: Vercel (Free - Fast)

#### Steps:
1. **Sign Up**
   - Go to vercel.com
   - Sign in with GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your Git repository
   - Import

3. **Deploy**
   - Click Deploy
   - Website available immediately with free SSL

#### Benefits:
- Edge network for fast loading
- Automatic HTTPS
- Instant deployments
- Great performance

### Option 3: GitHub Pages (Free)

#### Setup:
```bash
# 1. Create a repository named username.github.io
# 2. Clone and add your files
git clone https://github.com/yourusername/username.github.io.git
cd username.github.io
cp -r /path/to/gida\ print/* .

# 3. Push to repository
git add .
git commit -m "Initial commit"
git push origin main

# 4. Site live at: https://yourusername.github.io
```

#### Custom Domain:
```
1. Create CNAME file with content: gidaprint.ma
2. Update DNS at domain registrar
3. In repository Settings > Pages > Custom domain
```

### Option 4: Traditional Hosting (GoDaddy, Hostinger, etc.)

#### FTP/SFTP Upload:
```
1. Get FTP credentials from hosting provider
2. Use FTP client (FileZilla, WinSCP, etc.)
3. Connect to server
4. Upload all files to public_html or www folder
5. Set index.html as default document
```

#### File Permissions:
```bash
# Directories: 755
chmod 755 *

# Files: 644
chmod 644 *.html *.css *.js
```

#### .htaccess Deployment:
- Upload .htaccess file to root directory
- Enables HTTPS redirect, compression, caching

### Option 5: AWS S3 + CloudFront (Scalable)

#### Steps:
1. **Create S3 Bucket**
   - S3 Console > Create Bucket
   - Name: gidaprint.ma
   - Properties > Static website hosting
   - Index document: index.html
   - Error document: index.html

2. **Upload Files**
   ```bash
   aws s3 cp . s3://gidaprint.ma --recursive
   ```

3. **Set Permissions**
   - Bucket > Permissions > Bucket Policy
   - Allow public read access

4. **Create CloudFront Distribution**
   - Origin domain: S3 bucket
   - Enable HTTPS
   - Add custom domain

5. **Update DNS**
   - Route 53 > Create alias record
   - Point to CloudFront distribution

### Option 6: Docker Deployment

#### Dockerfile:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY .htaccess /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Deploy:
```bash
# Build image
docker build -t gidaprint .

# Run container
docker run -p 80:80 gidaprint

# Push to Docker Hub
docker tag gidaprint yourusername/gidaprint
docker push yourusername/gidaprint
```

## 🔒 SSL Certificate Setup

### Let's Encrypt (Free)
```bash
# Using certbot
certbot certonly --webroot -w /var/www/gidaprint -d gidaprint.ma -d www.gidaprint.ma

# Auto-renewal
certbot renew --dry-run
```

### Auto-Renewal via Cron
```bash
# Edit crontab
crontab -e

# Add line for monthly renewal
0 0 1 * * certbot renew --quiet
```

## 📊 Post-Deployment Setup

### 1. Google Search Console
```
1. Go to search.google.com/search-console
2. Add property: https://gidaprint.ma
3. Verify ownership (DNS or file upload)
4. Submit sitemap: /sitemap.xml
5. Monitor crawl errors
```

### 2. Google Analytics
```html
<!-- Add to index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Bing Webmaster Tools
```
1. Go to bing.com/webmasters
2. Add website
3. Verify ownership
4. Submit sitemap
```

### 4. Email Configuration

#### Option A: Formspree Integration
```javascript
// In assets/js/main.js
const formspree = async (data) => {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Accept': 'application/json'}
    });
    return response.json();
};
```

#### Option B: EmailJS
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
<script>
    emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

#### Option C: Backend Service
- Use Node.js with Nodemailer
- Use Python Flask with Flask-Mail
- Use PHP with SwiftMailer

### 5. CDN Setup

#### Cloudflare (Free)
```
1. Go to cloudflare.com
2. Add site
3. Change nameservers at registrar
4. Wait 24-48 hours for propagation
5. Enable automatic HTTPS
```

#### MaxCDN (Paid)
```
1. Create account
2. Upload files
3. Update DNS CNAME
4. Configure SSL
```

## 🧪 Testing & Validation

### Performance Testing
- **Google PageSpeed**: pagespeed.web.dev
- **GTmetrix**: gtmetrix.com
- **Pingdom**: pingdom.com

### SEO Testing
- **Mobile-Friendly Test**: search.google.com/test/mobile-friendly
- **Rich Results Test**: search.google.com/test/rich-results
- **Structured Data**: schema.org/validator

### Browser Testing
- **BrowserStack**: browserstack.com
- **LambdaTest**: lambdatest.com
- **Sauce Labs**: saucelabs.com

### Uptime Monitoring
- **Uptime Robot**: uptimerobot.com
- **Pingdom**: pingdom.com
- **Statuscake**: statuscake.com

## 📱 Mobile App Considerations

### Progressive Web App (PWA)
Add manifest.json and service worker for offline support

#### manifest.json:
```json
{
  "name": "GIDAPRINT",
  "short_name": "GIDA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1E2A44",
  "icons": [
    {"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"}
  ]
}
```

## 🔄 Continuous Integration/Deployment

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        run: npm run deploy
```

## 🚨 Troubleshooting Deployment

### Common Issues

**Website shows 404 errors**
- Verify index.html is in root directory
- Check file permissions (644 for files, 755 for directories)
- Ensure .htaccess is uploaded if using Apache

**HTTPS not working**
- Verify SSL certificate is installed
- Check DNS propagation
- Clear browser cache

**Styles/Scripts not loading**
- Verify file paths are correct
- Check browser console for 404 errors
- Clear CDN cache if using one

**Contact form not working**
- Verify backend service is configured
- Check email configuration
- Test WhatsApp integration

**Slow loading times**
- Enable gzip compression
- Enable browser caching
- Use CDN for assets
- Optimize images

## 📧 Support & Maintenance

### Regular Maintenance Tasks
- [ ] Check uptime monitoring weekly
- [ ] Review analytics monthly
- [ ] Update content quarterly
- [ ] Security audit semi-annually
- [ ] Backup website monthly

### Support Contacts
- **GIDAPRINT**: gidaprint84@gmail.com
- **Hosting Support**: Contact your hosting provider
- **DNS Issues**: Contact domain registrar

## 🎯 Next Steps After Deployment

1. **Announce Launch**
   - Social media posts
   - Email to contacts
   - Press release if needed

2. **Monitor Performance**
   - Set up analytics
   - Monitor uptime
   - Track conversions

3. **SEO Optimization**
   - Submit to search engines
   - Build quality backlinks
   - Create content plan

4. **Marketing**
   - Run ads campaigns
   - Email marketing
   - Social media promotion

---

**Deployment Date**: _____________
**Website URL**: https://gidaprint.ma
**Support Contact**: gidaprint84@gmail.com

Questions? Contact GIDAPRINT support for assistance.
