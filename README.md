# BAMSense Works - Official Website

An advanced, AI-powered website for BAMSense Works, an education-focused AI technology company.

## 🌟 Features

### Design & User Experience
- **Modern Dark Theme** with gradient accents and glassmorphism effects
- **Fully Responsive** design for all devices (mobile, tablet, desktop)
- **Smooth Animations** including parallax effects, 3D card tilts, and scroll animations
- **Interactive Product Demos** with tabbed interface and mockup previews
- **Animated Statistics Counter** with intersection observer
- **Scroll Progress Indicator** at the top of the page
- **Custom Logo Animation** with floating effect

### Sections
1. **Hero Section** with animated dashboard visual and statistics
2. **Floating Features Marquee** showcasing key capabilities
3. **About Section** with company information and value propositions
4. **Mission & Vision Cards** with hover effects
5. **Products Section** featuring all 6 BAMSense solutions with demo links
6. **Interactive Product Demos** with browser mockups for each product
7. **Why Choose Us** section highlighting competitive advantages
8. **Brand Story** narrative section
9. **Contact Section** with Google Maps integration
10. **Comprehensive Footer** with links and social media placeholders

### AI Chatbot
- **Floating AI Chat Widget** powered by Google Gemini 2.5 Flash
- **Company Knowledge Base** with comprehensive information about products and services
- **Intelligent Responses** about products, pricing, demos, and contact information
- **Fallback System** with rule-based responses when API is not configured
- **Suggestion Chips** for quick interactions
- **Smooth Chat Interface** with typing indicators and animations

### Technical Features
- **Intersection Observer API** for scroll animations
- **Performance Monitoring** with console logging
- **Accessibility Enhancements** including skip links
- **Lazy Loading** for images (when implemented)
- **Keyboard Navigation** support
- **SEO Optimized** with meta tags and semantic HTML
- **Custom Scrollbar** styling

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) A Google Gemini API key for AI chatbot functionality

### Installation

1. **Clone or Download** the repository to your local machine

2. **Open the website**
   ```
   Simply open index.html in your web browser
   ```

3. **For Local Development Server** (recommended)
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

4. **Configure Gemini API (Optional)**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Open `chat.js`
   - Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
     ```javascript
     const GEMINI_API_KEY = 'your-actual-api-key-here';
     ```

   **Note**: For production, implement a backend proxy to keep your API key secure. Never expose API keys in client-side code in production.

## 📁 File Structure

```
/
├── index.html          # Main HTML file with all content
├── styles.css          # Comprehensive CSS with animations and responsive design
├── script.js           # Main JavaScript for interactions and animations
├── chat.js             # AI chatbot with Gemini API integration
└── README.md           # This file
```

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-blue: #0066FF;
    --accent-blue: #00BFFF;
    --dark-bg: #0A0F1E;
    --dark-card: #131B2E;
    /* ... more variables */
}
```

### Content
- Edit text directly in `index.html`
- Update product information in the Products section
- Modify contact information in the Contact section

### AI Chatbot Knowledge
Update the company knowledge base in `chat.js`:
```javascript
const COMPANY_KNOWLEDGE = `
    // Your custom company information
`;
```

## 🔧 Configuration

### Contact Information
Current contact details (update as needed):
- **Email**: bamsense.works@gmail.com
- **Address**: Vyas Building, Shilpa Housing Society, Rambaug Colony, Kothrud, Pune, Maharashtra 411038
- **Google Maps**: https://maps.app.goo.gl/DhrmqyqrymeT7oGC6

### Google Maps Integration
The contact section includes an embedded Google Map. The current coordinates point to the address above. To update:
1. Find your location on Google Maps
2. Get the embed code
3. Replace the `<iframe>` src in index.html

### Social Media Links
Update social media links in the footer section of `index.html` (currently placeholder `#` links):
```html
<div class="footer-social">
    <a href="your-linkedin-url" class="social-link"><i class="fab fa-linkedin"></i></a>
    <a href="your-twitter-url" class="social-link"><i class="fab fa-twitter"></i></a>
    <!-- ... more social links -->
</div>
```

## 🌐 Deployment

### Static Hosting Platforms
This website can be deployed to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to `gh-pages` branch
- **Cloudflare Pages**: Connect your repository
- **AWS S3 + CloudFront**: For enterprise hosting

### Backend Integration for Chat
For production use of the AI chatbot:

1. Create a backend API endpoint (Node.js/Python/PHP)
2. Store the Gemini API key securely on the server
3. Proxy chat requests through your backend
4. Update `chat.js` to call your backend API instead of Gemini directly

Example backend structure:
```javascript
// Backend endpoint
POST /api/chat
Body: { message: "user message" }
Response: { response: "AI response" }
```

## 📊 Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Load Time**: < 2 seconds on fast connections
- **Animation Performance**: 60fps smooth animations
- **Mobile Friendly**: Fully responsive and touch-optimized

## 🛠️ Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Opera: ✅ Full support
- IE11: ❌ Not supported (uses modern CSS and JS features)

## 📝 API Integration

### Gemini API Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to `chat.js`
4. Test the chatbot

### API Rate Limits
- Free tier: 60 requests per minute
- Consider implementing rate limiting on your backend

### Alternative: Fallback Responses
The chatbot includes comprehensive fallback responses that work without an API key. These cover:
- Product inquiries
- Pricing questions
- Contact information
- Demo requests
- General company information

## 🔐 Security Notes

- **Never commit API keys** to version control
- **Use environment variables** for sensitive data
- **Implement backend proxy** for production API calls
- **Add CORS protection** if needed
- **Sanitize user input** before displaying in chat

## 📞 Support

For questions or issues:
- **Email**: bamsense.works@gmail.com
- **Location**: Pune, Maharashtra, India

## 📄 License

Copyright © 2025 BAMSense Works. All rights reserved.

## 🚀 Future Enhancements

Potential additions:
- Blog section
- Case studies page
- Customer testimonials
- Video demonstrations
- Live chat with human support
- Multi-language support
- Dark/Light theme toggle
- Product comparison tool
- ROI calculator
- Newsletter subscription

## 🙏 Credits

- **Design & Development**: Custom design for BAMSense Works
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter, Space Grotesk)
- **AI**: Google Gemini 2.5 Flash API

---

**Built with ❤️ for the future of education**

*Intelligence that powers education*
