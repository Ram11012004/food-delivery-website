document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const billDetailsContainer = document.getElementById("bill-details");
    const addressSection = document.querySelector(".address-section");
    const paymentSection = document.querySelector(".payment-section");
    const saveAddressBtn = document.getElementById("save-address");
    const placeOrderBtn = document.getElementById("place-order");
    const addressType = document.getElementById("address-type");
    const completeAddress = document.getElementById("complete-address");
    const floor = document.getElementById("floor");
    const landmark = document.getElementById("landmark");

    // Get cart data from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let deliveryAddress = null;

    // Check if cart is empty and redirect if necessary
    function checkCart() {
        if (!cart || cart.length === 0) {
            alert("Your cart is empty! Please add items to your cart first.");
            window.location.href = "index.html";
            return false;
        }
        return true;
    }

    // Render cart summary
    function renderCartSummary() {
        if (!checkCart()) return;

        cartItemsContainer.innerHTML = "";
        let itemTotal = 0;

        // Group items by restaurant
        const itemsByRestaurant = {};
        cart.forEach(item => {
            if (!itemsByRestaurant[item.restaurant]) {
                itemsByRestaurant[item.restaurant] = [];
            }
            itemsByRestaurant[item.restaurant].push(item);
            itemTotal += item.price * item.quantity;
        });

        // Display items grouped by restaurant
        Object.entries(itemsByRestaurant).forEach(([restaurant, items]) => {
            const restaurantDiv = document.createElement("div");
            restaurantDiv.classList.add("restaurant-group");
            restaurantDiv.innerHTML = `
                <div class="restaurant-header">
                    <h4>${restaurant}</h4>
                    <p class="delivery-time">Delivery in 30-35 mins</p>
                </div>
            `;

            const itemsContainer = document.createElement("div");
            itemsContainer.classList.add("restaurant-items");

            items.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("cart-item");
                itemDiv.innerHTML = `
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p class="item-price">₹${item.price} x ${item.quantity}</p>
                    </div>
                    <p class="item-total">₹${(item.price * item.quantity).toFixed(2)}</p>
                `;
                itemsContainer.appendChild(itemDiv);
            });

            restaurantDiv.appendChild(itemsContainer);
            cartItemsContainer.appendChild(restaurantDiv);
        });

        // Calculate and display bill details
        const deliveryFee = 40;
        const platformFee = 5;
        const gst = itemTotal * 0.05;
        const finalTotal = itemTotal + deliveryFee + platformFee + gst;

        billDetailsContainer.innerHTML = `
            <div class="bill-details">
                <div class="bill-row">
                    <span>Item Total</span>
                    <span>₹${itemTotal.toFixed(2)}</span>
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
                    <span>GST (5%)</span>
                    <span>₹${gst.toFixed(2)}</span>
                </div>
                <div class="bill-row total">
                    <span>To Pay</span>
                    <span>₹${finalTotal.toFixed(2)}</span>
                </div>
            </div>
        `;
    }

    // Handle address submission
    saveAddressBtn.addEventListener("click", () => {
        if (!checkCart()) return;

        if (!completeAddress.value.trim()) {
            alert("Please enter your complete address");
            completeAddress.focus();
            return;
        }

        deliveryAddress = {
            type: addressType.value,
            address: completeAddress.value.trim(),
            floor: floor.value.trim(),
            landmark: landmark.value.trim()
        };

        // Save address to localStorage
        localStorage.setItem("deliveryAddress", JSON.stringify(deliveryAddress));

        // Show payment section
        addressSection.style.display = "none";
        paymentSection.style.display = "block";
    });

    // Handle order placement
    placeOrderBtn.addEventListener("click", async () => {
        if (!checkCart()) return;

        if (!deliveryAddress) {
            alert("Please fill in your delivery address");
            addressSection.style.display = "block";
            paymentSection.style.display = "none";
            return;
        }

        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            alert("Please select a payment method");
            return;
        }

        // Calculate final amount with all fees
        const itemTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = 40;
        const platformFee = 5;
        const gst = itemTotal * 0.05;
        const finalTotal = itemTotal + deliveryFee + platformFee + gst;

        try {
            const response = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: cart,
                    address: deliveryAddress,
                    paymentMethod: selectedPayment.value,
                    billing: {
                        itemTotal: itemTotal,
                        deliveryFee: deliveryFee,
                        platformFee: platformFee,
                        gst: gst,
                        finalTotal: finalTotal
                    }
                })
            });

            const data = await response.json();
            
            if (data.success) {
                // Save order details
                const order = {
                    orderId: data.orderId,
                    items: cart,
                    address: deliveryAddress,
                    paymentMethod: selectedPayment.value,
                    orderTime: new Date().toISOString(),
                    status: "Order Placed",
                    billing: {
                        itemTotal: itemTotal,
                        deliveryFee: deliveryFee,
                        platformFee: platformFee,
                        gst: gst,
                        finalTotal: finalTotal
                    }
                };

                localStorage.setItem("lastOrder", JSON.stringify(order));
                localStorage.removeItem("cart");
                localStorage.removeItem("deliveryAddress");

                // Redirect to order confirmation
                window.location.href = "order_confirmation.html";
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    });

    // Check for saved address
    const savedAddress = localStorage.getItem("deliveryAddress");
    if (savedAddress) {
        deliveryAddress = JSON.parse(savedAddress);
        addressType.value = deliveryAddress.type;
        completeAddress.value = deliveryAddress.address;
        floor.value = deliveryAddress.floor || "";
        landmark.value = deliveryAddress.landmark || "";
    }

    // Initialize page
    renderCartSummary();
});