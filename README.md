• Shopping Demo (client + server)

• Overview
   • This repository contains a small demo e-commerce app (React frontend + Express backend) that demonstrates a shopping flow with a cart and Stripe checkout integration.
   • The README shows how to install, configure environment variables, run locally on Windows (PowerShell), and verify main flows.

• Shopping Demo (client + server)

• Overview
   • Small demo app with a React frontend and Express backend. The backend supports Stripe Checkout and webhooks and stores orders in MongoDB.

• What is present in this repo (confirmed from code)
   • `client/` — React app (CRA) using `react-router-dom`, `react-icons`, and a `CartContext` for state.
   • `client/src/mockData.js` — local product data used by the ProductList.
   • `server/` — Express server with routes for checkout and webhooks, and a Mongoose `Order` model.
   • Scripts: `server` has `npm run dev` (nodemon); `client` uses `npm start` (CRA).

• Prerequisites
   • Node.js (v16+ recommended)
   • npm
   • MongoDB (Atlas or local) — required for order persistence

• Environment variables (server)
   • Create `server/.env` with at least the following:
      • MONGO_URI — MongoDB connection string
      • STRIPE_SECRET_KEY — Stripe secret key (server)
      • STRIPE_PUBLISHABLE_KEY — Stripe publishable key (optional; put in `client/.env` if needed)
      • STRIPE_WEBHOOK_SECRET — optional (for verifying webhooks)
      • CLIENT_URL — URL of frontend (e.g. `http://localhost:3000`)
      • PORT — optional (default 5000)

• Install dependencies (PowerShell)

```powershell
cd 'C:\Users\Megnet Brains\Desktop\task1\client'
npm install

cd '..\server'
npm install
```

• Run the app (development)
   • Server (Terminal 1):

```powershell
cd 'C:\Users\Megnet Brains\Desktop\task1\server'
npm run dev
```

   • Client (Terminal 2):

```powershell
cd 'C:\Users\Megnet Brains\Desktop\task1\client'
npm start
```

• Default URLs
   • Frontend (CRA): `http://localhost:3000`
   • Backend: `http://localhost:5000` (or `process.env.PORT`)

• Main features (what you can test)
   • Product listing from `client/src/mockData.js` (Home page)
   • Category pages (`/category/:category`)
   • Sidebar cart and full cart page (`/cart`) maintained via React Context
   • Stripe Checkout integration (server route: `/api/checkout/create-checkout-session`)
   • Stripe webhook receiver (server route: `/api/webhook/webhook`) that updates order status
   • Orders persisted in MongoDB via `server/models/Order.js`

• API endpoints (confirmed)
   • POST `/api/checkout/create-checkout-session` — create Stripe checkout session. Body: `{ cartItems, email }`.
   • POST `/api/webhook/webhook` — Stripe webhook endpoint (expects raw body for signature verification).
   • GET `/api/webhook/order/:sessionId` — find order by Stripe session ID.
   • GET `/api/webhook/orders` — list all orders (admin/testing).

• Quick verification steps
   1. Start server and client as shown above.
   2. Open `http://localhost:3000` and add a product to the cart — the sidebar should update.
   3. Click "Go to Cart" to view the cart page — cart contents are managed in React Context and should persist while navigating.

• Notes & troubleshooting
   • The webhook route is registered before body-parser in `server/server.js` (required because it uses `express.raw`). Keep `STRIPE_WEBHOOK_SECRET` up-to-date when using Stripe CLI.
   • If images don't load, consider placing images in `client/public/images/` and update `client/src/mockData.js` to point to local paths.
   • If the server fails to connect to MongoDB, verify `MONGO_URI` and network access in Atlas.
   • If ports are in use, stop the conflicting process or change `PORT` in `server/.env`.

• Want me to run the dev servers here?
   • I can start both servers, capture logs, and verify the cart and checkout flows. Say "Run servers and verify" and I'll do that next.


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

##  Database Schema

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

##  Application Flow

1. **Product Browsing**
   - User views 12 products on homepage
   - Products display with images, names, and prices

2. **Add to Cart**
   - User clicks "Add to Cart" on products
   - Cart indicator updates with item count

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

## Troubleshooting

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

##  Assignment Requirements Checklist

All 25 requirements from the task assignment have been implemented:

✅ **Requirements 1-11:** Application Features  
✅ **Requirements 12-15:** Backend & Database  
✅ **Requirements 16-20:** Code Quality  
✅ **Requirements 21-25:** Documentation & Deliverables  

##  Security Notes

- Never commit `.env` file to Git
- Use environment variables for all sensitive data
- Stripe webhook signature verification enabled
- CORS configured for specific client URL
- Input validation on email field
- MongoDB connection uses secure credentials

##  Future Enhancements
Potential improvements for production:
- User authentication and login
- Product management admin panel
- Order history for customers
- Email notifications for orders
- Product search and filters
- Multiple payment methods
- Inventory management
- Shipping address collection

## License

This project is created for assignment purposes.

# Author

**Akash Singh**
- GitHub:(https://github.com/Akash-singh2684)
- Repository: (https://github.com/Akash-singh2684/stripe-checkout-fullstack)

# Acknowledgments

- Stripe for payment processing
- MongoDB Atlas for database hosting
- Unsplash for product images
- React Icons for UI elements

---

**Note:** This is a test mode application. For production deployment, update Stripe keys to live mode and configure production webhook endpoints.


- Ensure webhook secret is correctly set in `.env`
- Check if webhook endpoint is registered in Stripe Dashboard
- Use Stripe CLI for local testing
- Verify webhook route is before body-parser middleware in `server.js`

### CORS Errors
- Ensure `CLIENT_URL` in `.env` matches your frontend URL
- Check CORS middleware is properly configured

## License

MIT

## Author

AKASH - MERN Stack Developer
