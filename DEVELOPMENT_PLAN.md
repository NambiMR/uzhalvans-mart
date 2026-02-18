# Uzhavan Mart: Development Roadmap & Suggestions

This document tracks our collective ideas, UI/UX improvements, and technical plans for the Uzhavan Mart project.

---

## 📂 Project Structure (Client-Server Split)
- **`/frontend`**: All React, Vite, and UI logic.
- **`/backend`**: Node.js, Express, and MongoDB logic.
- **Root**: Documentation and project-wide configuration.

---

## 🎨 UI & UX Improvements

### 1. Shopping & Conversion
- **Shopping Cart System**:
    - Add a cart icon with a numerical badge to the `NavBar`.
    - Implement a slide-out "Cart Drawer" for quick item management.
- **Product Interaction**:
    - **Quick View**: A modal popup on the `ProductGrid` to see details without full page transitions.
    - **Interactive Feedback**: Use toast notifications (e.g., `react-hot-toast`) when items are added to the cart.
- **Wishlist**: A dedicated section for users to save seasonal favorites for later.

### 2. Agricultural Niche Features
- **Trust & Transparency**:
    - **Farmer Bio**: Expand the farmer section on `ProductDetail` with "About the Farmer" or "Sourcing History."
    - **Verification Badges**: Add "Organic," "Farm Fresh," or "Verified Source" labels.
- **Freshness Indicators**:
    - **Seasonal Badges**: "In Season," "Last Harvest," or "Pre-order."
    - **Unit Flexibility**: Dynamic selectors for Kg, Bunch, Box, or Bag.

- **Direct Communication**: Add a "Order via WhatsApp" button on the `ProductDetail` page. This will use the farmer's contact details for bulk inquiries or negotiations outside the platform.

---

## 🛠️ Technical Refinement

### 1. Architecture & Performance
- **Feature-Based Development (Vertical Slice)**: We will build one feature at a time (Backend + Frontend) to ensure the project is always functional and easier to learn.
- **Global State Management**: Transition from local state to **React Context** (CartContext & AuthContext) to support the MERN transition.
- **Lazy Loading**: Implement `React.lazy()` for routes to optimize page load speeds.
- **Cleanup**: Remove legacy/commented-out blocks in `ProductGrid.jsx` and `ProductDetail.jsx` once features are finalized.

### 2. Mobile Optimization
- **Bottom Navigation**: Consider a persistent bottom bar for mobile users (Home, Search, Cart, Account) to align with modern mobile commerce standards.

---

## 🎨 Phase 2.2: UI/UX & Shopping Experience (Complete ✅)
- **Status**: Global Cart, Wishlist, and Notifications implemented.
- **Next**: Vertical Slice 2 - Farmer Product Management & API.
- [x] **Database**: Design MongoDB schemas and connect via Atlas. (Complete ✅)
- [x] **Authentication (Vertical Slice 1)**: Farmer & Buyer Login/Signup API + UI connection. (Complete ✅)
- [x] **Shopping Experience**: Global Cart & Wishlist using React Context + Toasts. (Complete ✅)
- [ ] **Farmer Dashboard (Vertical Slice 2)**: Product Upload (Cloudinary), Pricing, and Inventory. (Tomorrow's Priority)
- [ ] **Mobile Optimization**: Refine NavBar and drawer for small screens. (Upcoming)
- [ ] **Global State**: Transition to React Context for Auth & Cart management. (Complete ✅)
- [ ] **Payment Integration (Final Phase)**: Implementing Stripe/Razorpay for a complete learning experience.

---

## 📝 Project Decisions (Finalized)

1. **Farmer Autonomy**: Farmers will have full control over their products, prices, and discounts via a dashboard.
2. **Fixed Pricing**: In-app prices are fixed. Direct contact (WhatsApp) is provided for bulk order discussions.
3. **Payment Goal**: Secure online payment is a primary learning objective and will be integrated clearly at the final stage.
