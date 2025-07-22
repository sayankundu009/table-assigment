# 🛒 Shopping Cart Assignment

## 📋 Assignment Overview

This project implements a complete shopping cart system with three main sections: Product Listing, Shopping Cart, and Checkout. The goal is to create a fully functional e-commerce interface with interactive features and form validation.

## 🎯 Core Requirements

### 1. **Section Toggle Functionality**
- Implement smooth navigation between 3 main sections:
  - Product Listing
  - Shopping Cart  
  - Checkout
- Add back buttons for intuitive navigation
- Show/hide sections based on user interaction

### 2. **Product Listing Section**
- **Dynamic Product Display**: Render products from the `products` array in `script.js`
- **Add to Cart**: Implement functionality to add products to cart
- **Search Filter**: Real-time search through product names and descriptions
- **Product Cards**: Display product image, name, description, and price

### 3. **Shopping Cart Section**
- **Cart Management**:
  - Display items added to cart
  - Update quantity with real-time total calculation
  - Remove items from cart
- **Coupon System**:
  - Apply coupon codes with validation
  - Calculate discount amounts
  - Update total with discount applied
- **Order Summary**:
  - Subtotal calculation
  - Tax calculation (8.5%)
  - Shipping cost
  - Discount display
  - Final total

### 4. **Checkout Section**
- **Form Validation**:
  - Required field validation
  - Email format validation
  - ZIP code validation
  - Real-time validation feedback
- **Success Message**: Display confirmation after successful order placement
- **Order Summary**: Show final order details

## 🛠 Technical Implementation

### **Files Structure**
```
table-assigment/
├── index.html          # Main HTML structure with all sections
├── style.css           # Custom styling (minimal)
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

### **Key Features to Implement**

#### **JavaScript Functions Needed**:
```javascript
// Section Navigation
function showSection(sectionName)
function hideAllSections()

// Product Management
function renderProducts()
function addToCart(productId)
function searchProducts(query)

// Cart Management
function updateCart()
function updateQuantity(productId, quantity)
function removeFromCart(productId)
function calculateTotal()

// Coupon System
function applyCoupon(code)
function validateCoupon(code)
function calculateDiscount()

// Checkout
function validateForm()
function submitOrder()
function showSuccessMessage()
```

#### **Data Structures**:
```javascript
// Products Array (already implemented)
const products = [...]

// Cart Array (to be implemented)
let cart = []

// Coupon Codes (to be implemented)
const validCoupons = {
    "SAVE10": 10,
    "WELCOME20": 20,
    "FREESHIP": 0 // Free shipping
}
```

## 🎨 UI/UX Requirements

### **Responsive Design**
- Mobile-first approach
- Bootstrap grid system
- Responsive tables and forms

### **User Experience**
- Smooth transitions between sections
- Real-time feedback for user actions
- Clear error messages and validation
- Loading states for better UX

### **Visual Feedback**
- Success/error messages
- Form validation indicators
- Cart item count updates
- Price calculations in real-time

## 📱 Section Details

### **1. Product Listing**
- Grid layout with product cards
- Search functionality
- Add to cart buttons
- Product images and details

### **2. Shopping Cart**
- Table view of cart items
- Quantity controls
- Remove buttons
- Coupon code input
- Order summary sidebar

### **3. Checkout**
- Billing information form
- Payment method selection
- Form validation
- Order confirmation

## 🚀 Getting Started

1. **Open the project**:
   ```bash
   cd table-assigment
   ```

2. **View the application**:
   - Open `index.html` in a web browser
   - Or use a local server: `python -m http.server 8000`

3. **Current Status**:
   - ✅ HTML structure complete
   - ✅ Bootstrap styling implemented
   - ✅ Products array created
   - ⏳ JavaScript functionality (to be implemented)

## 📝 Implementation Checklist

### **Phase 1: Section Navigation**
- [ ] Implement section toggle functionality
- [ ] Add event listeners to back buttons
- [ ] Create smooth transitions

### **Phase 2: Product Management**
- [ ] Render products dynamically from array
- [ ] Implement search functionality
- [ ] Add to cart functionality

### **Phase 3: Cart Management**
- [ ] Cart data structure
- [ ] Quantity updates
- [ ] Item removal
- [ ] Total calculations

### **Phase 4: Coupon System**
- [ ] Coupon validation
- [ ] Discount calculations
- [ ] Apply/remove coupons

### **Phase 5: Checkout & Validation**
- [ ] Form validation
- [ ] Success message
- [ ] Order submission

## 🎯 Success Criteria

- [ ] All three sections are fully functional
- [ ] Smooth navigation between sections
- [ ] Real-time cart updates
- [ ] Working coupon system
- [ ] Form validation with user feedback
- [ ] Responsive design across devices
- [ ] Clean, professional UI

## 🔧 Technologies Used

- **HTML5**: Structure and semantics
- **CSS3**: Custom styling
- **Bootstrap 5.3.7**: UI framework and components
- **JavaScript (ES6+)**: Interactivity and functionality
- **Bootstrap Icons**: Visual elements

## 📄 License

This is an educational project for learning purposes.
