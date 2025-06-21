// Simple cart system
let cart = [];

// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('welcomeUser').textContent = username;
    updateCartDisplay();
});

// Add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
}

// Update quantity
function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartDisplay();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = 'Cart is empty';
        totalElement.textContent = 'Total: $0';
        checkoutBtn.disabled = true;
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${itemTotal}</span>
                <button onclick="updateQuantity('${item.name}', -1)">-</button>
                <button onclick="updateQuantity('${item.name}', 1)">+</button>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
    totalElement.textContent = `Total: $${total}`;
    checkoutBtn.disabled = false;
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderItems = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
    
    alert(`Order placed!\nItems: ${orderItems}\nTotal: $${total}`);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
}

// Logout function
function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
} 