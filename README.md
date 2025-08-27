# Forever Scribbles Website

A beautiful, child-friendly website for Forever Scribbles - a custom coloring book printing service that transforms children's artwork into professional coloring books.

## 🎨 Features

- **Playful Design**: Inspired by Couplet Coffee's bold aesthetic with child-friendly colors and animations
- **Two-Step Order Process**: Payment first, then artwork upload (simulated with JotForm integration)
- **Responsive Design**: Works perfectly on all devices
- **Admin Dashboard**: Edit website content, view orders, and manage settings
- **Interactive Elements**: Smooth animations, hover effects, and micro-interactions
- **Accessibility**: WCAG compliant with proper focus management and screen reader support
- **FAQ System**: Expandable questions and answers
- **Contact Form**: Quick contact form for customer inquiries
- **Gallery Showcase**: Before/after examples of transformed artwork

## 🚀 Quick Start

### Local Development

1. **Clone or download** the project files to your local machine
2. **Open terminal** and navigate to the project directory
3. **Start a local server**:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Python 2
   python -m SimpleHTTPServer 8000
   
   # Or using Node.js (if you have it installed)
   npx http-server -p 8000
   ```
4. **Open your browser** and go to `http://localhost:8000`

### File Structure

```
forever_scribbles_site/
├── index.html          # Main website file
├── style.css           # All styles and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🎯 Key Sections

### 1. Hero Section
- Eye-catching headline with gradient text
- Call-to-action buttons
- Trust badges (free shipping, satisfaction guarantee, kid-safe materials)
- Animated floating elements

### 2. How It Works
- 4-step process explanation
- Interactive step cards with hover effects
- Clear, simple language for parents

### 3. Gallery
- Before/after examples of artwork transformations
- Placeholder images for demonstration
- Hover animations and potential lightbox functionality

### 4. Pricing
- Three package options: Digital, Printed, Premium
- Featured "Most Popular" package
- Interactive package selection

### 5. Order Forms
- Step-by-step process indicator
- Embedded JotForm iframes for actual form functionality
- Payment simulation for testing
- Upload form unlocked after payment

### 6. FAQ Section
- Expandable questions and answers
- Common concerns addressed
- Smooth animations

### 7. Contact Section
- Quick contact form
- Contact information
- Social media links

## 🔧 Admin Dashboard

Access the admin dashboard by clicking the "Admin" link in the footer.

**Default Password**: `foreverscribbles2024`

### Admin Features:
- **Content Tab**: Edit hero title and subtitle
- **Orders Tab**: View recent orders (placeholder data)
- **Settings Tab**: Update contact email and Facebook URL

### Admin Functions:
- Content changes are saved to localStorage
- Changes apply immediately to the website
- Secure password protection

## 🎨 Design System

### Colors
- **Primary**: `#FF6B9D` (Bright Pink)
- **Secondary**: `#7B68EE` (Medium Slate Blue)
- **Accent**: `#FFD93D` (Bright Yellow)
- **Success**: `#4ECDC4` (Teal)
- **Warning**: `#FF8C42` (Orange)

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body Text**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Spacing
- Consistent spacing scale using CSS custom properties
- Responsive spacing that adapts to screen size

## 📱 Responsive Design

- **Desktop**: Full-featured layout with side-by-side content
- **Tablet**: Adjusted grid layouts and spacing
- **Mobile**: Single-column layout with mobile-optimized navigation

### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

## 🔗 Form Integration

The website integrates with JotForm for the two-step order process:

### Form 1: Payment & Details
- **URL**: `https://form.jotform.com/252193946303054`
- Collects customer information and payment
- Must be completed before Form 2 access

### Form 2: Upload Artwork
- **URL**: `https://form.jotform.com/252193255747059`
- Only accessible after payment completion
- Allows artwork upload and project details

### Testing the Form Flow
Use the browser console to simulate payment completion:
```javascript
simulatePaymentSuccess(); // Simulates successful payment
resetPaymentStatus();     // Resets for testing
```

## 🎭 Interactive Features

### Animations
- Floating shapes in hero section
- Hover effects on cards and buttons
- Smooth scroll animations
- Loading animations

### Navigation
- Sticky header with blur effect
- Mobile hamburger menu
- Smooth scroll to sections
- Active state indicators

### Notifications
- Success, error, warning, and info notifications
- Auto-dismiss after 5 seconds
- Smooth slide-in animations

## 🔧 Recent Improvements (August 2025)

This version of the site includes a handful of refinements based on user feedback and testing:

- **Trust badges updated** – The generic “Placeholder” labels in the hero section have been replaced with clear value propositions: free shipping on all orders, a 100 % satisfaction guarantee, and the use of kid‑safe materials.
- **Responsive hero imagery** – The hero illustration now scales fluidly without hard‑coded dimensions, preventing awkward cropping on smaller screens and ensuring the artwork preview remains fully visible.
- **Centered navigation** – On larger screens the navigation links are centered between the logo and the hamburger menu. The menu still collapses into a slide‑out panel on mobile devices, but remains balanced and easy to tap.
- **Gallery revamp** – The before/after gallery now uses an interactive component that allows visitors to toggle between the original artwork and the outlined coloring page. Images can be opened in a built‑in lightbox when clicked, and cards are constrained to their parent grid cell so they don’t overflow on mobile.
- **Contact form integration** – The contact form submits directly to our Formspree endpoint (`https://formspree.io/f/myzdgllv`) and shows a success notification upon completion. All fields are required and error handling has been improved.

These changes are meant to improve usability and polish while keeping the whimsical spirit of the original design.

## ♿ Accessibility Features

- **Skip Link**: Jump to main content
- **Focus Management**: Proper tab order and focus indicators
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects user's motion preferences

## 🛠️ Customization

### Changing Colors
Edit the CSS custom properties in `style.css`:
```css
:root {
    --primary-color: #FF6B9D;
    --secondary-color: #7B68EE;
    --accent-color: #FFD93D;
    /* ... */
}
```

### Adding Content
- **Hero Section**: Edit the HTML in the `.hero` section
- **Gallery**: Add new `.gallery-item` elements
- **FAQ**: Add new `.faq-item` elements
- **Admin Dashboard**: Extend the admin functions in `script.js`

### Adding Images
Replace placeholder images by:
1. Adding image files to the project directory
2. Updating `src` attributes in HTML
3. Implementing lazy loading for performance

## 🚀 Deployment

### Static Hosting (Recommended)
Deploy to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect to Git repository
- **GitHub Pages**: Upload to GitHub repository
- **Firebase Hosting**: Use Firebase CLI

### Traditional Web Hosting
Upload all files to your web server's public directory (usually `public_html` or `www`).

### Custom Domain
Point your domain (`foreverscribbles.com`) to your hosting provider's servers.

## 🔍 SEO Optimization

The website includes:
- **Meta Tags**: Title, description, keywords
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: For all images (when added)
- **Open Graph**: For social media sharing
- **Structured Data**: Ready for implementation

## 📊 Analytics

To add analytics:
1. **Google Analytics**: Add tracking code to `<head>`
2. **Facebook Pixel**: Add pixel code for ad tracking
3. **Hotjar**: Add for user behavior analysis

## 🐛 Troubleshooting

### Common Issues

**Forms not loading?**
- Check internet connection
- Verify JotForm URLs are correct
- Check browser console for errors

**Admin dashboard not working?**
- Clear browser cache and localStorage
- Check browser console for JavaScript errors
- Verify password is correct

**Styling issues?**
- Hard refresh with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Check if CSS file is loading properly
- Verify no browser extensions are interfering

### Browser Support
- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **IE11**: Basic support (no CSS Grid)

## 📞 Support

For technical support or questions about the website:
- **Email**: hello@foreverscribbles.com
- **Facebook**: facebook.com/foreverscribbles

## 📄 License

This website is created for Forever Scribbles. All rights reserved.

---

**Made with ❤️ for creative families**

*Turn your kid's art into real coloring books!*
