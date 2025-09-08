# AST E-Commerce Frontend

A modern, responsive e-commerce website built with React.js, featuring a clean design, product catalog, and WhatsApp integration for customer inquiries.

## 🚀 Features

- **Product Catalog**: Browse products with grid and list view options
- **Product Details**: Detailed product pages with image galleries
- **Search & Filter**: Advanced filtering by category, country, and price
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **WhatsApp Integration**: Direct contact via WhatsApp for inquiries
- **Loading States**: Skeleton loaders and loading bars
- **Modern UI**: Clean, professional design with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1
- **Routing**: React Router DOM 6.23.1
- **Styling**: Tailwind CSS 3.4.3
- **UI Components**: Flowbite React 0.9.0
- **HTTP Client**: Axios 1.6.8
- **State Management**: React Context API + useReducer
- **Icons**: Font Awesome
- **Build Tool**: Create React App

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm, yarn, or pnpm

### Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd ast-fe
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. Start the development server:
```bash
# Using npm
npm start

# Using yarn
yarn start

# Using pnpm
pnpm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Build & Deployment

### Development Build
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Production Build
```bash
npm run build
# or
yarn build
# or
pnpm build
```

This creates a `build` folder with optimized production files.

### Testing
```bash
npm test
# or
yarn test
# or
pnpm test
```

## 🎨 Customization

### Changing Primary Color

The primary color can be customized in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ef4444', // Change this to your desired color
          light: '#fca5a5',   // Lighter shade for hovers
          dark: '#dc2626',    // Darker shade for active states
        },
        // ... other colors
      }
    }
  }
}
```

**Popular Color Options:**
- Blue: `#3b82f6` (blue-500)
- Green: `#10b981` (emerald-500)
- Purple: `#8b5cf6` (violet-500)
- Orange: `#f59e0b` (amber-500)
- Pink: `#ec4899` (pink-500)

### Customizing Brand Colors

Update the brand colors in the same file:

```javascript
brand: {
  DEFAULT: '#your-brand-color',
  dark: '#your-dark-brand-color',
},
secondary: {
  DEFAULT: '#your-secondary-color',
  dark: '#your-dark-secondary-color',
},
```

### Adding New Colors

Add custom colors to the Tailwind config:

```javascript
colors: {
  // ... existing colors
  custom: {
    DEFAULT: '#your-color',
    light: '#your-light-color',
    dark: '#your-dark-color',
  }
}
```

Then use them in your components:
```jsx
<div className="bg-custom text-custom-light">
  Your content
</div>
```

## 📡 API Integration

### Current API Endpoint
The app currently uses a static JSON file hosted on GitHub:
```
https://raw.githubusercontent.com/GrowinFlow/json/main/data.json
```

### Changing API Endpoint

1. **Update ProductContext.js**:
```javascript
// In src/context/ProductContext.js
const API = "https://your-api-endpoint.com/api/products";
```

2. **Update SingleProduct.js**:
```javascript
// In src/pages/SingleProduct.js
const API = 'https://your-api-endpoint.com/api/products';
```

### API Data Structure

The API should return an array of products with this structure:

```json
[
  {
    "product_id": 1,
    "title": "Product Name",
    "description": "Product description",
    "current_price": 999.99,
    "discount_price": 899.99,
    "discount_percentage": 10,
    "product_feature_img": "https://example.com/image.jpg",
    "product_images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    "product_stock": 150,
    "reviews": 20,
    "ratings": 4.5,
    "category": "Electronics",
    "keywords": ["keyword1", "keyword2"],
    "made_country": "USA",
    "featured": true
  }
]
```

### Connecting to Your Own API

1. **Replace the API URL** in both `ProductContext.js` and `SingleProduct.js`
2. **Update the data fetching logic** if your API structure differs
3. **Add authentication** if required:

```javascript
const getProducts = async (url) => {
  dispatch({ type: "SET_LOADING" });
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${your-token}`,
        'Content-Type': 'application/json'
      }
    });
    const products = await res.data;
    dispatch({ type: "SET_API_DATA", payload: products });
  } catch (error) {
    dispatch({ type: "API_ERROR" });
  }
};
```

## 📱 WhatsApp Integration

### Configuring WhatsApp Number

Update the WhatsApp number in the following files:

1. **Navbar.js** (Desktop and Mobile buttons):
```javascript
onClick={() => window.open('https://wa.me/YOUR_PHONE_NUMBER', '_blank')}
```

2. **AddToCart.js** (Product page button):
```javascript
const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodedMessage}`;
```

### WhatsApp Message Customization

Customize the pre-filled message in `AddToCart.js`:

```javascript
const message = `Hi! I'm interested in this product: ${title}. Can you provide more information?`;
```

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── preComponent/    # Basic components (Logo, NavItem, etc.)
│   ├── Breadcrumb.js    # Navigation breadcrumb
│   ├── Footer.js        # Site footer
│   ├── Navbar.js        # Navigation bar
│   └── ...
├── context/             # React Context providers
│   ├── ProductContext.js    # Product data management
│   └── FilterContext.js     # Filter and search state
├── pages/               # Page components
│   ├── pageComponents/  # Page-specific components
│   ├── Home.js          # Homepage
│   ├── Shop.js          # Product listing page
│   ├── SingleProduct.js # Product detail page
│   └── Contact.js       # Contact page
├── reducer/             # State reducers
│   ├── ProductReducer.js    # Product state logic
│   └── FilterReducer.js     # Filter state logic
├── assets/              # Static assets
│   ├── css/             # Custom CSS files
│   ├── images/          # Image assets
│   └── data/            # Static data files
└── ...
```

## 🎯 Key Components

### State Management
- **ProductContext**: Manages product data, loading states, and API calls
- **FilterContext**: Handles search, filtering, and sorting functionality

### Pages
- **Home**: Landing page with hero section and featured products
- **Shop**: Product catalog with filtering and sorting options
- **SingleProduct**: Detailed product view with image gallery
- **Contact**: Contact form and business information

### Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Graceful error handling for API failures
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🔧 Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

### Code Style

The project uses ESLint with React-specific rules. Key guidelines:
- Use functional components with hooks
- Follow React naming conventions
- Use meaningful variable and function names
- Keep components small and focused

### Adding New Features

1. **New Page**: Create in `src/pages/` and add route in `App.js`
2. **New Component**: Add to `src/components/` or appropriate subfolder
3. **New Context**: Create in `src/context/` and add provider in `index.js`
4. **Styling**: Use Tailwind CSS classes, add custom styles in `tailwind.config.js`

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure redirects for client-side routing

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy
3. Configure environment variables if needed

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/ast-fe",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
3. Deploy: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact via WhatsApp (configured in the app)
- Check the documentation above

## 🔄 Recent Updates

- ✅ Removed cart functionality for simplified user experience
- ✅ Added WhatsApp integration for direct customer contact
- ✅ Updated primary color to red theme
- ✅ Simplified state management
- ✅ Improved responsive design
- ✅ Added comprehensive documentation

---

**Built with ❤️ using React and Tailwind CSS**