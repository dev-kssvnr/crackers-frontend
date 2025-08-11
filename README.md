# Bala Sankar Crackers - Premium Fireworks Website

A modern, responsive single-page website for Bala Sankar Crackers, featuring an enhanced checkout flow and beautiful design for both web and mobile devices.

## 🎆 Features

### Core Functionality
- **Fixed Top Navigation** - Smooth scrolling to sections
- **Attractive Banner** - Animated hero section with call-to-action
- **About Us Section** - Company information and history
- **Product Catalog** - Filterable product grid with categories
- **Shopping Cart** - Real-time cart summary with minimum order validation
- **Order Management** - Complete checkout flow with customer details
- **Payment Integration** - Bank transfer and UPI payment options
- **Contact Information** - Multiple contact methods and business hours

### Advanced Features
- **Product Filtering** - Filter by categories with real-time stock information
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Real-time Updates** - Cart updates instantly as items are added
- **Form Validation** - Comprehensive validation for customer details
- **Minimum Order Validation** - Different thresholds for Tamil Nadu vs other states
- **Payment Instructions** - Clear guidance for payment completion

### User Experience
- **Single Page Application** - Smooth navigation without page reloads
- **Modal-based Checkout** - Non-disruptive ordering experience
- **Visual Feedback** - Loading states, animations, and success messages
- **Accessibility** - Keyboard navigation and screen reader support
- **Mobile-First** - Touch-friendly interface for mobile devices

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks
- **API Integration**: RESTful API with fallback data
- **Build Tool**: Next.js built-in bundler

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+): Full layout with sidebar filters
- **Tablet** (768px - 1199px): Adaptive grid layout
- **Mobile** (320px - 767px): Stacked layout with mobile filters

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API server (optional - fallback data available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bala-sankar-crackers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API (Optional)**
   
   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_USE_API=true
   NEXT_PUBLIC_ENABLE_FALLBACK=true
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
bala-sankar-crackers/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── Navigation.tsx       # Fixed top navigation
│   ├── Banner.tsx           # Hero section
│   ├── AboutUs.tsx          # About section
│   ├── CartSummary.tsx      # Shopping cart summary
│   ├── ProductFilters.tsx   # Product filtering
│   ├── ProductCard.tsx      # Individual product card
│   ├── OrderModal.tsx       # Order placement modal
│   ├── PaymentModal.tsx     # Payment details modal
│   ├── ProductsLoading.tsx  # Loading skeleton
│   ├── ProductsError.tsx    # Error component
│   └── Contact.tsx          # Contact information
├── services/
│   └── api.ts               # API service layer
├── hooks/
│   └── useProducts.ts       # Custom hook for products
├── data/
│   └── products.ts          # Static product data (legacy)
├── config/
│   └── environment.ts       # Environment configuration
├── types/
│   └── index.ts             # TypeScript type definitions
├── public/                  # Static assets
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Red gradient (#ef4444 to #dc2626)
- **Secondary**: Yellow gradient (#facc15 to #eab308)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with gradient text effects
- **Body**: Regular weight for readability

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Modals**: Centered overlays with smooth animations
- **Forms**: Clean inputs with validation states

## 📋 Business Logic

### Minimum Order Requirements
- **Tamil Nadu**: ₹2,500 minimum order
- **Other South Indian States**: ₹5,000 minimum order

### Payment Methods
- **Bank Transfer**: SBI account details provided
- **UPI**: QR code and UPI ID available
- **Confirmation**: Screenshot required via WhatsApp

### Contact Information
- **WhatsApp**: 7395899600
- **Phone 1**: 9952240135
- **Phone 2**: 9943861641
- **Email**: sivakasikargilcrackers@gmail.com

## 🔧 Customization

### API Integration

The website now supports dynamic product loading from a backend API:

- **API Endpoint**: `GET /api/public/products`
- **Real-time Stock**: Uses `current_stock` field for inventory management
- **Environment Configuration**: Via `.env.local` file

For detailed API integration guide, see [API_INTEGRATION.md](./API_INTEGRATION.md)

### Adding Products

**Via API (Recommended):**
Add products through your backend API endpoint.

**Via Static Data (Legacy):**
Edit `data/products.ts` to add new products:
```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 150,
  originalPrice: 200,
  category: 'Sparklers',
  timePeriod: 'Night',
  image: '/images/product.jpg',
  inStock: true,
}
```

### Modifying Bank Details
Update bank details in `components/PaymentModal.tsx` and `components/Contact.tsx`:
```typescript
const bankDetails = {
  accountName: 'Your Company Name',
  accountNumber: 'Your Account Number',
  ifscCode: 'Your IFSC Code',
  bankName: 'Your Bank Name',
  upiId: 'your-upi-id@bank',
};
```

### Styling Changes
Modify `tailwind.config.js` for color scheme changes:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

## 📱 Mobile Optimization

- **Touch Targets**: Minimum 44px for buttons
- **Swipe Gestures**: Smooth scrolling between sections
- **Mobile Filters**: Slide-out filter panel
- **Responsive Images**: Optimized for different screen sizes
- **Performance**: Lazy loading and optimized animations

## 🔒 Security & Compliance

- **Form Validation**: Client-side validation for all inputs
- **Data Protection**: No sensitive data stored in localStorage
- **Payment Security**: Bank transfer instructions only
- **Legal Compliance**: Minimum order requirements clearly displayed

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with one click

### Other Platforms
```bash
npm run build
npm start
```

## 📞 Support

For technical support or questions about the website:
- **Email**: sivakasikargilcrackers@gmail.com
- **WhatsApp**: 7395899600

## 📄 License

This project is proprietary software developed for Bala Sankar Crackers.

---

**Built with ❤️ for Bala Sankar Crackers** 