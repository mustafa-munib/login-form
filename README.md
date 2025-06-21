# Simple Coffee Shop App

A beginner-friendly coffee shop application with user login and a simple store.

## Features

### 🔐 Simple Authentication
- User registration and login
- First user becomes admin automatically
- Simple password system

### 🛒 Basic Store
- 3 coffee products (Latte, Espresso, Cappuccino)
- Simple cart system
- Add/remove items
- Basic checkout

### 📱 Easy to Use
- Simple, clean interface
- No complex features
- Perfect for beginners

## Setup

1. Go to the `server` directory:
   ```sh
   cd server
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```
   MONGODB_URL=your_mongodb_connection_string
   ```

4. Start the server:
   ```sh
   npm start
   ```

The app will run on port 5000.

## Pages

- **`index.html`** - Login page
- **`register.html`** - Simple registration (no role selection)
- **`store.html`** - Basic store with 3 products
- **`dashbord.html`** - Admin dashboard
- **`user.html`** - User dashboard

## How It Works

### Registration
- First user to register becomes admin
- All other users are regular users
- No role selection needed

### Store
- Browse 3 coffee products
- Click "Add to Cart" to add items
- Use +/- buttons to change quantities
- Click "Checkout" to place order

### Login
- Admin users go to admin dashboard
- Regular users go to user dashboard
- Both can access the store

## API Endpoints

- `POST /login` — Login
- `POST /register` — Register new user
- `GET /admin/exists` — Check if admin exists

## Usage

1. **First Time**: Register the first user (becomes admin)
2. **Login**: Use username and password
3. **Shop**: Go to store and add items to cart
4. **Checkout**: Place your order

## Technology

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Simple and clean code**