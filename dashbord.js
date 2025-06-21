document.addEventListener("DOMContentLoaded", function(){
    const username = localStorage.getItem("loggedInUser");
    const WelcomeText = document.getElementById("welcomeUser");

    if (username){
        WelcomeText.textContent = `Welcome, ${username}`;

    }
    else{
        window.location.href = "index.html";
    }
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", function(){
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
});


// Function to handle order submission
function submitOrder() {
    const items = [
        { name: 'Latte', quantity: 2, price: 5 },
        { name: 'Espresso', quantity: 3, price: 3 },
        { name: 'Cappuccino', quantity: 2, price: 4 }
    ];
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    fetch('/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Order created') {
            alert(`Order placed successfully! Total: $${total}`);
        } else {
            alert('Error placing order');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Add event listener to order button
const orderBtn = document.getElementById('orderBtn');
if (orderBtn) {
    orderBtn.addEventListener('click', submitOrder);
}


// Sample products
// Initialize products with quantity
const products = [
    { id: 1, name: 'Latte', price: 5, quantity: 0 },
    { id: 2, name: 'Espresso', price: 3, quantity: 0 },
    { id: 3, name: 'Cappuccino', price: 4, quantity: 0 }
];

// Function to update cart display
function updateCartDisplay() {
    const cartList = document.getElementById('cartList');
    const cartItems = products.filter(p => p.quantity > 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartList.innerHTML = cartItems.map(item => `
        <li>
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </li>
    `).join('');

    document.getElementById('totalPrice').textContent = `Total: $${totalPrice}`;
}

// Function to change quantity
function changeQuantity(productId, delta) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.quantity = Math.max(0, product.quantity + delta);
        updateCartDisplay();
    }
}

// Function to handle order payment
function orderPay() {
    const cartItems = products.filter(p => p.quantity > 0);
    if (cartItems.length > 0) {
        alert('Order placed successfully!');
        products.forEach(p => p.quantity = 0);
        updateCartDisplay();
    } else {
        alert('Cart is empty!');
    }
}

// Add event listeners to product buttons
products.forEach(product => {
    const button = document.getElementById(`add${product.id}`);
    if (button) {
        button.addEventListener('click', () => {
            changeQuantity(product.id, 1);
        });
    }
});

// Add event listener to order pay button
const payBtn = document.getElementById('payBtn');
if (payBtn) {
    payBtn.addEventListener('click', orderPay);
}

// Initialize cart display
updateCartDisplay();