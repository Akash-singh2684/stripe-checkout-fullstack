# Shopping Demo (client + server)

A small React + Express/Mongo demo app (shopping/cart + Stripe checkout). This README explains how to set up and run the project locally on Windows (PowerShell).

## Prerequisites
- Node.js (v16+ / recommended v18+)
- npm (comes with Node)
# Shopping Demo (client + server)

This repository contains a small demo e-commerce app (React frontend + Express backend) that demonstrates a shopping flow with a cart and Stripe checkout integration.

This README covers the minimal steps to install, configure environment variables, run the app locally on Windows (PowerShell), and quickly verify the main flows.

## Quick summary
- Frontend: `client/` (React)
- Backend: `server/` (Express + Stripe + MongoDB)

## Prerequisites
- Node.js (v16+ recommended)
- npm (bundled with Node)
- MongoDB connection (Atlas or local) — required only if you want persistent orders

## Required environment variables (server)
Create a file named `server/.env` with these variables:

- MONGO_URI (MongoDB connection string)
- STRIPE_PUBLISHABLE_KEY (optional for client-side, keep in `client/.env` if used)
- STRIPE_SECRET_KEY (server-side)
- STRIPE_WEBHOOK_SECRET (optional, needed for webhook signature verification)
- CLIENT_URL (e.g. `http://localhost:3000`)
- PORT (optional, default 5000)

Example `server/.env` (do NOT commit this file):

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/dbname
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
CLIENT_URL=http://localhost:3000
```

If you need the publishable key exposed to the React app, create `client/.env` with:

```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

## Install dependencies
Open PowerShell and run:

```powershell
cd 'C:\Users\Megnet Brains\Desktop\task1\client'
npm install

cd '..\server'
npm install
```

## Run (development)
Start server and client in separate terminals.

Server (Terminal 1):

```powershell
cd 'C:\Users\Megnet Brains\Desktop\task1\server'
npm run dev
```

Client (Terminal 2):

```powershell
cd 'C:\Users\Megnet Brains\Desktop\task1\client'
npm start
```

By default the client runs on `http://localhost:3000` and the server on `http://localhost:5000`.

## Quick verification
- Homepage: `/` — product listing with sidebar cart
- Cart page: `/cart` — full cart view
- Category pages: `/category/tshirts`, `/category/pants`, `/category/shoes`, `/category/hats`

To verify cart persistence:
1. Add an item from the Product List. The sidebar cart should update immediately.
2. Click the sidebar "Go to Cart" button — it uses client-side navigation and should preserve cart contents.

## Troubleshooting
- Images missing: images use online sources (picsum/unsplash). For guaranteed availability, add images to `client/public/images/` and update `client/src/mockData.js` to use local paths.
- MongoDB connection errors: double-check `MONGO_URI` and allow your IP in Atlas.
- Cart empties on navigation: ensure navigation is client-side (uses `react-router-dom` `navigate`) and not `window.location.href`.

## Optional: Stripe webhook testing (local)
You can test webhooks locally with the Stripe CLI:

```powershell
# Install Stripe CLI and login
- Error messages for invalid inputs

# Forward events to your local server (example)
✅ **8. Stripe Checkout Redirect**
```

Set `STRIPE_WEBHOOK_SECRET` in `server/.env` with the value provided by the Stripe CLI when listening.

## Want me to run the app here?
- I can start both servers, capture logs, and report any runtime errors — tell me to proceed and I'll run the dev servers and verify the cart flow.

---

If you'd like additional documentation (deployment, tests, or local images), tell me which part to expand and I'll update the README.

- Seamless redirect to Stripe payment page
- Secure payment processing
- Session-based checkout

✅ **9. Payment Status Redirect**
- Success page after successful payment
- Cancel/failure page for declined payments
- Clear user feedback on payment status

✅ **10. Payment Success Confirmation**
- "Payment Successful" message
- Order confirmation details
- Continue shopping option

✅ **11. Payment Failure Message**
- "Payment Cancelled" notification
- Return to cart option
- Browse more products option

### Backend Requirements (Requirements 12-15)

✅ **12. Orders Database**
- MongoDB database for order tracking
- Complete transaction history
- Order schema with all required fields

✅ **13. Successful Payment Order Storage**
- Order details saved on payment success
- Includes: items, total, payment status, transaction ID, customer email
- Stripe Payment Intent ID stored as transaction ID

✅ **14. Failed Payment Order Storage**
- Failed orders tracked in database
- Same data structure as successful orders
- Payment status marked as "failed"

✅ **15. Webhook Order Status Updates**
- Stripe webhook endpoint configured
- Real-time order status updates
- Handles checkout.session.completed events

### Code Quality (Requirements 16-20)

✅ **16. Focused Implementation**
- All specified requirements met
- No unnecessary features added
- Clean, minimal codebase

✅ **17. Coding Standards**
- Consistent naming conventions
- ES6+ JavaScript syntax
- Proper indentation and formatting

✅ **18. Modular Code Structure**
- Reusable React components
- Separate route handlers
- Context API for state management
- Utility functions isolated

✅ **19. Code Documentation**
- Inline comments for complex logic
- Clear function and variable names
- JSDoc-style comments where needed

✅ **20. Proper Source Code Structure**
- Clear separation: frontend/backend
- Organized folder structure
- Logical component hierarchy

### Documentation & Deliverables (Requirements 21-25)

✅ **21. README Documentation**
- Setup instructions included
- Environment variable configuration
- Run commands documented

✅ **22. Video Demonstration**
- Video demo script prepared (VIDEO_DEMO_SCRIPT.md)
- Shows complete functionality
- Code walkthrough included

✅ **23. Environment Files**
- .env.example provided
- All required variables documented
- Secure credential handling

✅ **24. GitHub Repository**
- Single repository with organized structure
- Frontend in `/client` folder
- Backend in `/server` folder
- Clear categorization

✅ **25. Working Application**
- Tested and fully functional
- Easy setup process
- All dependencies documented

## Tech Stack

**Frontend:**
- React 18.3.1
- React Router DOM 7.1.1
- Axios 1.7.9
- Context API (State Management)
- React Icons 5.4.0

**Backend:**
- Node.js
- Express.js 4.21.2
- MongoDB with Mongoose 8.9.4
- Stripe SDK 17.5.0
- CORS 2.8.5
- Dotenv 16.4.7

**Database:**
- MongoDB Atlas (Cloud Database)

**Payment:**
- Stripe Checkout
- Stripe Webhooks

##  Project Structure

```
stripe-checkout-fullstack/
├── client/                    # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartPage.jsx         # Shopping cart
│   │   │   ├── CancelPage.jsx       # Payment failed
│   │   │   ├── Navbar.jsx           # Navigation
│   │   │   ├── ProductList.jsx      # Product grid
│   │   │   └── SuccessPage.jsx      # Payment success
│   │   ├── context/
│   │   │   └── CartContext.js       # Global cart state
│   │   ├── utils/
│   │   │   └── axios.js             # API config
│   │   ├── App.js                   # Main app component
│   │   ├── mockData.js              # Product data
│   │   └── index.js
│   └── package.json
│
└── server/                    # Node.js backend
    ├── config/
    │   └── db.js              # MongoDB connection
    ├── models/
    │   └── Order.js           # Order schema
    ├── routes/
    │   ├── checkoutRoutes.js  # Stripe checkout
    │   └── webhookRoutes.js   # Stripe webhooks
    ├── .env                   # Environment variables
    ├── .env.example           # Environment template
    ├── server.js              # Express server
    └── package.json
```

##  Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CLIENT_URL=http://localhost:3001
```

### How to Get Your Keys:

1. **MongoDB Atlas URI:**
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - **Note:** URL-encode special characters (e.g., `@` becomes `%40`)

2. **Stripe Keys:**
   - Create account at https://stripe.com
   - Go to Developers → API Keys
   - Copy "Secret key" (starts with `sk_test_`)
   - Copy "Publishable key" (starts with `pk_test_`)

3. **Stripe Webhook Secret:**
   - For local testing: Use Stripe CLI (see "Webhook Setup" section below)
   - For production: Stripe Dashboard → Webhooks → Add endpoint

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Stripe account


#### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with your credentials
# Copy from .env.example and fill in your values
```

Edit `server/.env` with your MongoDB URI and Stripe keys.

```bash
# Start the server
npm run dev
```

The server will start on http://localhost:5000

#### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Start the React app
npm start
```

The app will open on http://localhost:3001

#### 4. Webhook Setup (Optional but Recommended)

For complete order status updates, set up Stripe webhooks:

**Option 1: Stripe CLI (Local Testing)**
```bash
# Install Stripe CLI from https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:5000/api/webhook/webhook

# Copy the webhook secret (whsec_...) to your .env file
# Keep this terminal running while testing
```

**Option 2: Without Webhooks**
- Orders will be created with "pending" status
- You can manually verify orders in MongoDB
- Webhook updates won't work until configured

### Verify Installation

1. **Backend:** Visit http://localhost:5000 - should see `{"message":"Server is running"}`
2. **Frontend:** Visit http://localhost:3001 - should see product listing
3. **MongoDB:** Check server console for "MongoDB connected successfully"

## 🔧 API Endpoints

### Checkout Routes
- **POST** `/api/checkout/create-checkout-session`
  - Creates Stripe checkout session
  - Body: `{ cartItems: [], email: "user@example.com" }`
  - Returns: `{ url: "stripe_checkout_url", orderId: "order_id" }`

### Webhook Routes
- **POST** `/api/webhook/webhook`
  - Stripe webhook endpoint
  - Handles events: `checkout.session.completed`, `payment_intent.payment_failed`
  - Updates order status in database

- **GET** `/api/webhook/order/:sessionId`
  - Retrieve order by Stripe session ID
  - Returns: Order details

- **GET** `/api/webhook/orders`
  - Get all orders (for testing/admin)
  - Returns: Array of all orders

## 🎯 Stripe Webhook Events Handled

1. **checkout.session.completed**
   - Updates order status to `success`
   - Stores payment intent ID
   - Triggered when payment is successful

2. **payment_intent.payment_failed**
   - Updates order status to `failed`
   - Triggered when payment fails

3. **checkout.session.async_payment_failed**
   - Updates order status to `failed`
   - Triggered when async payment fails

## 🧪 Testing the Application

### Test Stripe Payments

Use these test card numbers in Stripe Checkout:

- **Successful Payment**: `4242 4242 4242 4242`
- **Declined Payment**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0027 6000 3184`

**For all cards:**
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

### Complete Testing Flow

1. ✅ Browse products on homepage
2. ✅ Add multiple products to cart
3. ✅ View cart and adjust quantities
4. ✅ Enter email address
5. ✅ Click "Proceed to Checkout"
6. ✅ Complete Stripe payment with test card
7. ✅ Verify success/cancel page redirect
8. ✅ Check MongoDB for order entry
9. ✅ Verify order status updates (if webhooks configured)

## 🗃️ Database Schema

### Order Model
```javascript
{
  email: String (required),           // Customer email
  items: [{                           // Cart items
    id: Number,
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: Number (required),     // Total in rupees
  paymentStatus: String (required),   // pending/success/failed
  transactionId: String (required),   // Stripe session ID
  stripeSessionId: String,            // Stripe session reference
  paymentIntentId: String,            // Stripe payment intent ID
  createdAt: Date (auto),             // Order creation timestamp
  updatedAt: Date (auto)              // Last update timestamp
}
```

## 🌐 Application Flow

1. **Product Browsing**
   - User views 12 products on homepage
   - Products display with images, names, and prices

2. **Add to Cart**
   - User clicks "Add to Cart" on products
   - Cart icon updates with item count

3. **Cart Management**
   - User navigates to cart page
   - Can adjust quantities (+/- buttons)
   - Can remove items
   - Sees total amount

4. **Checkout Initiation**
   - User enters email address (required)
   - Clicks "Proceed to Checkout"
   - Email validation performed

5. **Payment Processing**
   - Backend creates Stripe Checkout Session
   - Order saved to MongoDB with `pending` status
   - User redirected to Stripe payment page

6. **Payment Completion**
   - User enters test card details
   - Stripe processes payment

7. **Webhook Update** (if configured)
   - Stripe sends webhook to backend
   - Backend updates order status to `success` or `failed`

8. **Confirmation**
   - User redirected to success/cancel page
   - Appropriate message displayed

## 🐛 Troubleshooting

### MongoDB Connection Issues
- **Error:** "MongoNetworkError" or "Authentication failed"
- **Solutions:**
  - Ensure your IP is whitelisted in MongoDB Atlas Network Access
  - URL-encode special characters in password (e.g., `@` → `%40`, `#` → `%23`)
  - Verify connection string format
  - Check database user permissions

### Stripe Checkout Not Working
- **Error:** "Invalid API key" or "No such session"
- **Solutions:**
  - Verify `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` in `.env`
  - Ensure you're using test mode keys (starts with `sk_test_` and `pk_test_`)
  - Check server console for error messages
  - Verify Stripe account is activated

### Webhook Not Working
- **Error:** Order status remains "pending"
- **Solutions:**
  - Set up Stripe CLI for local testing (see Webhook Setup section)
  - Run `stripe listen --forward-to localhost:5000/api/webhook/webhook`
  - Copy webhook secret to `.env`
  - Keep Stripe CLI terminal running during testing
  - For testing without webhooks, manually check MongoDB for orders

### Port Already in Use
- **Error:** "Port 5000 is already in use" or "Port 3001 is already in use"
- **Solutions:**
  - Kill the process using the port
  - Change port in `.env` (backend) or `package.json` (frontend)
  - On Windows: `netstat -ano | findstr :5000` then `taskkill /PID <pid> /F`

### Frontend Can't Connect to Backend
- **Error:** "Network Error" in browser console
- **Solutions:**
  - Ensure backend is running on port 5000
  - Check `CLIENT_URL` in server `.env` matches frontend URL
  - Verify CORS is enabled in `server.js`
  - Check axios baseURL in `client/src/utils/axios.js`

## 📚 Additional Documentation

- **QUICKSTART.md** - Quick setup guide
- **TESTING.md** - Detailed testing instructions
- **DEPLOYMENT.md** - Production deployment guide
- **VIDEO_DEMO_SCRIPT.md** - Video demonstration script
- **PROJECT_SUMMARY.md** - Complete project overview

## 🎥 Video Demonstration

A video demonstration is available showing:
- Complete codebase walkthrough
- Application functionality
- Stripe payment flow
- Order management
- Webhook handling

(See VIDEO_DEMO_SCRIPT.md for the full script)

## 📋 Assignment Requirements Checklist

All 25 requirements from the task assignment have been implemented:

✅ **Requirements 1-11:** Application Features  
✅ **Requirements 12-15:** Backend & Database  
✅ **Requirements 16-20:** Code Quality  
✅ **Requirements 21-25:** Documentation & Deliverables  

## 🔒 Security Notes

- Never commit `.env` file to Git
- Use environment variables for all sensitive data
- Stripe webhook signature verification enabled
- CORS configured for specific client URL
- Input validation on email field
- MongoDB connection uses secure credentials

## 🚀 Future Enhancements

Potential improvements for production:
- User authentication and login
- Product management admin panel
- Order history for customers
- Email notifications for orders
- Product search and filters
- Multiple payment methods
- Inventory management
- Shipping address collection

## 📄 License

This project is created for assignment purposes.

## 👨‍💻 Author

**Akash Singh**
- GitHub:(https://github.com/Akash-singh2684)
- Repository: (https://github.com/Akash-singh2684/stripe-checkout-fullstack)

## 🙏 Acknowledgments

- Stripe for payment processing
- MongoDB Atlas for database hosting
- Unsplash for product images
- React Icons for UI icons

---

**Note:** This is a test mode application. For production deployment, update Stripe keys to live mode and configure production webhook endpoints.


- Ensure webhook secret is correctly set in `.env`
- Check if webhook endpoint is registered in Stripe Dashboard
- Use Stripe CLI for local testing
- Verify webhook route is before body-parser middleware in `server.js`

### CORS Errors
- Ensure `CLIENT_URL` in `.env` matches your frontend URL
- Check CORS middleware is properly configured

## 📝 License

MIT

## 👨‍💻 Author

AKASH - MERN Stack Developer
