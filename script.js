// Selectors for buttons and content areas
const addCartBtn = document.querySelectorAll('.add-to-cart-btn');
const checkOutBtn = document.querySelector('.checkout-btn');
const purchaseBtn = document.querySelector('.buy-btn');
const cartContent = document.getElementById('cart-items');
const checkOutContent = document.getElementById('checkout-items');
const purchaseContent = document.getElementById('purchased-items');
const cartBadge = document.getElementById('cart-badge'); // Badge for cart count

// Create a product object with necessary details
function createProduct(name, description, quantity, price, image) {
    return {
        name,
        description,
        quantity,
        price: parseFloat(price.replace("$", "")),
        image
    };
}

// Get cart items from localStorage
function getCartFromStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save product to localStorage (with quantity update)
function addCartToStorage(item) {
    let cart = getCartFromStorage();
    let existingProduct = cart.find((p) => p.name === item.name);
    
    if (existingProduct) {  
        existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge(); // Update badge
}

// Function to update the cart badge count
function updateCartBadge() {
    const cart = getCartFromStorage();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.style.visibility = "visible";

        // Add animation effect
        cartBadge.classList.add("updated");
        setTimeout(() => {
            cartBadge.classList.remove("updated");
        }, 200);
    } else {
        cartBadge.style.visibility = "hidden";
    }
}

// Add product to cart (localStorage only)
function onAddItemCart(e) {
    e.preventDefault();
    const parent = e.target.closest('.product');
    const product = createProduct(
        parent.querySelector('h3').textContent,
        parent.querySelector('p').textContent,
        1,
        parent.querySelector('.price').textContent,
        parent.querySelector('img').src
    );

    addCartToStorage(product);
}

// Add product to cart table in DOM (cart.html only)
function addCartToDOM(item) {
    if (!cartContent) return; // Ensure element exists

    const tr = document.createElement('tr');
    const itemTotal = `$${(item.quantity * item.price).toFixed(2)}`;
    const rowData = [item.name, item.quantity, `$${item.price.toFixed(2)}`, itemTotal];

    rowData.forEach(data => {
        const td = document.createElement('td');
        td.textContent = data;
        tr.appendChild(td);
    });

    cartContent.appendChild(tr);
}

// Handle checkout
function onCheckOut(e) {
    e.preventDefault();
    const cart = getCartFromStorage();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    addCheckOutToStorage(cart);
    localStorage.removeItem('cart'); // Clear cart
    updateCartBadge(); // Update badge
    cartContent.innerHTML = ''; // Clear cart table in DOM

    cart.forEach(item => addCheckOutToDOM(item));
}

// Save checkout items to localStorage
function addCheckOutToStorage(cart) {
    localStorage.setItem('checkout', JSON.stringify(cart));
}

// Add product to checkout table in DOM
function addCheckOutToDOM(item) {
    const tr = document.createElement('tr');
    const itemTotal = `$${(item.quantity * item.price).toFixed(2)}`;
    const rowData = [item.name, item.quantity, `$${item.price.toFixed(2)}`, itemTotal];

    rowData.forEach(data => {
        const td = document.createElement('td');
        td.textContent = data;
        tr.appendChild(td);
    });

    checkOutContent.appendChild(tr);
}

// Handle purchase
function onPurchase(e) {
    e.preventDefault();
    const checkout = JSON.parse(localStorage.getItem('checkout')) || [];

    if (checkout.length === 0) {
        alert("Your checkout is empty!");
        return;
    }

    addPurchaseToStorage(checkout);
    localStorage.removeItem('checkout');
    checkOutContent.innerHTML = ''; // Clear checkout table in DOM

    checkout.forEach(item => addPurchaseToDOM(item));
}

// Save purchased items to localStorage
function addPurchaseToStorage(checkout) {
    localStorage.setItem('purchase', JSON.stringify(checkout));
}

// Add product to purchased table in DOM
function addPurchaseToDOM(item) {
    if (!purchaseContent) return;

    const tr = document.createElement('tr');
    const itemTotal = `$${(item.quantity * item.price).toFixed(2)}`;
    const rowData = [item.name, item.quantity, `$${item.price.toFixed(2)}`, itemTotal];

    rowData.forEach(data => {
        const td = document.createElement('td');
        td.textContent = data;
        tr.appendChild(td);
    });

    const statusTd = document.createElement('td');
    const status = document.createElement('span');
    const actionBtn = document.createElement('button');

    actionBtn.innerHTML = "✔";
    actionBtn.classList.add('mark-success-btn');
    status.textContent = "In Transit";

    statusTd.appendChild(status);
    statusTd.appendChild(actionBtn);
    tr.appendChild(statusTd);

    actionBtn.addEventListener('click', () => {
        if (actionBtn.innerHTML === "✔") {
            status.textContent = "Delivered";
            actionBtn.innerHTML = "✖";
            actionBtn.classList.remove('mark-success-btn');
            actionBtn.classList.add('remove-purchase-btn');
        } else {
            tr.remove();
            let purchases = JSON.parse(localStorage.getItem('purchase')) || [];
            purchases = purchases.filter(p => p.name !== item.name);
            localStorage.setItem('purchase', JSON.stringify(purchases));
        }
    });

    purchaseContent.appendChild(tr);
}

// Event listeners and DOMContentLoaded logic
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge(); // Update badge on load

    // Cart Page: Load cart items
    if (cartContent) {
        getCartFromStorage().forEach(addCartToDOM);
    }

    // Checkout Page: Load checkout items
    if (checkOutContent) {
        JSON.parse(localStorage.getItem('checkout') || "[]").forEach(addCheckOutToDOM);
    }

    // Purchased Page: Load purchased items
    if (purchaseContent) {
        JSON.parse(localStorage.getItem('purchase') || "[]").forEach(addPurchaseToDOM);
    }

    // Attach event listeners for buttons
    if (checkOutBtn) {
        checkOutBtn.addEventListener('click', onCheckOut);
    }

    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', onPurchase);
    }

    if (addCartBtn.length > 0) {
        addCartBtn.forEach(btn => btn.addEventListener('click', onAddItemCart));
    }
});
