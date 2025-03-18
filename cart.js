document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartSection = document.getElementById("cart");
    const cartIcon = document.getElementById("cart-icon");
    const checkoutBtn = document.getElementById("checkout-btn");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Cart visibility handlers
    function scrollToCart() {
        console.log("Scrolling to cart...");
        cartSection.scrollIntoView({ behavior: 'smooth' });
        updateCart();
    }

    // Event Listeners
    cartIcon.addEventListener("click", function(e) {
        console.log("Cart icon clicked");
        e.preventDefault();
        e.stopPropagation();
        scrollToCart();
    });

    function updateCart() {
        const cartCount = document.getElementById("cart-count");
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <img src="images/cart.png" alt="Empty Cart">
                    <h3>Your cart is empty</h3>
                    <p>You haven't added any items to your cart yet</p>
                </div>
            `;
            cartTotal.innerHTML = "Total: ₹0.00";
            if (checkoutBtn) {
                checkoutBtn.style.display = "none";
            }
            return;
        }

        if (checkoutBtn) {
            checkoutBtn.style.display = "block";
        }

        cartItemsContainer.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        // Group items by restaurant
        const itemsByRestaurant = {};
        cart.forEach(item => {
            if (!itemsByRestaurant[item.restaurant]) {
                itemsByRestaurant[item.restaurant] = [];
            }
            itemsByRestaurant[item.restaurant].push(item);
        });

        // Display items grouped by restaurant
        Object.entries(itemsByRestaurant).forEach(([restaurant, items]) => {
            const restaurantDiv = document.createElement("div");
            restaurantDiv.classList.add("restaurant-group");
            restaurantDiv.innerHTML = `
                <div class="restaurant-header">
                    <h3 class="restaurant-name">
                        <span class="restaurant-icon">🏪</span>
                        ${restaurant}
                    </h3>
                    <p class="delivery-time">Delivery in 30-35 mins</p>
                </div>
            `;
            
            const itemsContainer = document.createElement("div");
            itemsContainer.classList.add("restaurant-items");
            
            items.forEach(item => {
                total += item.price * item.quantity;
                itemCount += item.quantity;
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <div class="cart-item-details">
                        <div class="veg-badge">🟢</div>
                        <h4>${item.name}</h4>
                        <p class="item-price">₹${item.price}</p>
                        <p class="item-customization">
                            ${item.customization ? `Customization: ${item.customization}` : ''}
                        </p>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-name="${item.name}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-name="${item.name}">+</button>
                        </div>
                        <p class="item-total">₹${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                `;
                itemsContainer.appendChild(cartItem);
            });
            
            restaurantDiv.appendChild(itemsContainer);
            cartItemsContainer.appendChild(restaurantDiv);
        });

        // Add bill details
        const billDetails = document.createElement("div");
        billDetails.classList.add("bill-details");
        const deliveryFee = 40;
        const platformFee = 5;
        const gst = total * 0.05;
        const finalTotal = total + deliveryFee + platformFee + gst;

        billDetails.innerHTML = `
            <h3>Bill Details</h3>
            <div class="bill-row">
                <span>Item Total</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
            <div class="bill-row">
                <span>Delivery Fee</span>
                <span>₹${deliveryFee.toFixed(2)}</span>
            </div>
            <div class="bill-row">
                <span>Platform Fee</span>
                <span>₹${platformFee.toFixed(2)}</span>
            </div>
            <div class="bill-row">
                <span>GST</span>
                <span>₹${gst.toFixed(2)}</span>
            </div>
            <div class="bill-row total">
                <span>To Pay</span>
                <span>₹${finalTotal.toFixed(2)}</span>
            </div>
        `;
        cartItemsContainer.appendChild(billDetails);
        cartTotal.innerHTML = `Total: ₹${finalTotal.toFixed(2)}`;
    }

    // Handle checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length === 0) {
                alert("Your cart is empty! Add some items before checking out.");
                return;
            }
            window.location.href = "checkout.html";
        });
    }

    // Initialize cart
    updateCart();
});