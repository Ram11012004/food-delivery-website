document.addEventListener("DOMContentLoaded", () => {
    const restaurantListSection = document.getElementById("restaurants");
    const restaurantList = document.querySelector(".restaurant-list");
    const menuSection = document.getElementById("menu");
    const menuItemsContainer = document.getElementById("menu-items");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const backButton = document.createElement("button");
    backButton.innerText = "⬅ Back to Restaurants";
    backButton.classList.add("back-button");
    backButton.addEventListener("click", () => {
        menuSection.style.display = "none";
        restaurantListSection.style.display = "block";
    });
    menuSection.prepend(backButton);
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let currentRestaurant = null;
    let currentFoodPreference = 'all';

    const restaurants = [
        { 
            id: 0, 
            name: "Meghana Foods", 
            image: "images/restaurant/meghana_foods.png", 
            rating: "4.5", 
            time: "30 mins",
            cuisines: "Andhra, Biryani, North Indian, Seafood",
            location: "Koramangala, Bangalore",
            costForTwo: "₹500 for two",
            description: "Famous for Andhra-style biryanis and spicy seafood",
            isVeg: false,
            isServing: true
        },
        { 
            id: 1, 
            name: "Empire Restaurant", 
            image: "images/restaurant/empire.jpeg", 
            rating: "4.3", 
            time: "25 mins",
            cuisines: "Mughlai, North Indian, Kebabs, Biryani",
            location: "Koramangala, Bangalore",
            costForTwo: "₹400 for two",
            description: "Iconic chain known for late-night dining and butter chicken",
            isVeg: false,
            isServing: true
        },
        { 
            id: 2, 
            name: "Truffles", 
            image: "images/restaurant/truffles.jpeg", 
            rating: "4.7", 
            time: "40 mins",
            cuisines: "American, Continental, Burgers, Steaks",
            location: "Koramangala, Bangalore",
            costForTwo: "₹450 for two",
            description: "Popular for gourmet burgers and steaks",
            isVeg: false,
            isServing: true
        },
        { 
            id: 4, 
            name: "KFC", 
            image: "images/restaurant/kfc.jpeg", 
            rating: "4.3", 
            time: "30 mins",
            cuisines: "Fast Food, Fried Chicken, Burgers",
            location: "Multiple Outlets, Bangalore",
            costForTwo: "₹400 for two",
            description: "World-famous fried chicken and signature burgers",
            isVeg: false,
            isServing: true
        },
        { 
            id: 5, 
            name: "Pizza Hut", 
            image: "images/restaurant/pizza_hut.jpeg", 
            rating: "4.1", 
            time: "35 mins",
            cuisines: "Pizzas, Italian, Fast Food",
            location: "Multiple Outlets, Bangalore",
            costForTwo: "₹450 for two",
            description: "Pan pizzas, stuffed crusts, and Italian-American favorites",
            isVeg: false,
            isServing: true
        },
        { 
            id: 6, 
            name: "Subway", 
            image: "images/restaurant/sub_way.jpeg", 
            rating: "4.0", 
            time: "20 mins",
            cuisines: "Healthy Food, Sandwiches, Salads",
            location: "Multiple Outlets, Bangalore",
            costForTwo: "₹300 for two",
            description: "Fresh and customizable submarine sandwiches",
            isVeg: true,
            isServing: false
        },
        { 
            id: 7, 
            name: "Domino's Pizza", 
            image: "images/restaurant/dominos.jpeg", 
            rating: "4.3", 
            time: "30 mins",
            cuisines: "Pizzas, Italian, Fast Food",
            location: "Multiple Outlets, Bangalore",
            costForTwo: "₹400 for two",
            description: "30-minute delivery guarantee and fresh hand-tossed pizzas",
            isVeg: false,
            isServing: false
        },
        { 
            id: 8, 
            name: "Taco Bell", 
            image: "images/restaurant/taco_bell.jpeg", 
            rating: "4.2", 
            time: "25 mins",
            cuisines: "Mexican, Fast Food, Beverages",
            location: "Multiple Outlets, Bangalore",
            costForTwo: "₹300 for two",
            description: "Mexican-inspired quick-service restaurant favorites",
            isVeg: false,
            isServing: true
        },
        { 
            id: 9, 
            name: "Burger King", 
            image: "images/restaurant/burger_king.jpeg", 
            rating: "4.1", 
            time: "30 mins",
            cuisines: "Burgers, American, Fast Food",
            location: "Multiple Outlets, Bangalore",
            costForTwo: "₹350 for two",
            description: "Home of the Whopper and flame-grilled burgers",
            isVeg: false,
            isServing: true
        },
        { 
            id: 10, 
            name: "Starbucks", 
            image: "images/restaurant/starbucks.jpeg", 
            rating: "4.6", 
            time: "15 mins",
            cuisines: "Beverages, Coffee, Snacks, Desserts",
            location: "Multiple Outlets, Bangalore",
            costForTwo: "₹400 for two",
            description: "Premium coffee, handcrafted beverages, and light bites",
            isVeg: true,
            isServing: true
        }
    ];
	const menus = {
        'meghana-foods': [
            { id: 1, name: 'Chicken Biryani', price: 299, image: 'images/meghana_foods/chicken-biryani.jpeg', bestSeller: true, spicy: true, isVeg: false },
            { id: 2, name: 'Mutton Biryani', price: 349, image: 'images/meghana_foods/mutton-biryani.jpeg', bestSeller: true, spicy: true, isVeg: false },
            { id: 3, name: 'Andhra Chicken Curry', price: 259, image: 'images/meghana_foods/chicken-curry.jpeg', spicy: true, isVeg: false },
            { id: 4, name: 'Paneer 65', price: 229, image: 'images/meghana_foods/paneer-65.jpeg', bestSeller: true, isVeg: true },
            { id: 5, name: 'Apollo Fish', price: 329, image: 'images/meghana_foods/appolo-fish.jpeg', spicy: true, isVeg: false },
            { id: 6, name: 'Chicken 65', price: 249, image: 'images/meghana_foods/chicken-65.jpeg', bestSeller: true, isVeg: false },
            { id: 7, name: 'Veg Biryani', price: 249, image: 'images/meghana_foods/veg-biryani.jpeg', isVeg: true },
            { id: 8, name: 'Butter Naan', price: 49, image: 'images/meghana_foods/butter-naan.jpeg', isVeg: true }
        ],
        'empire-restaurant': [
            { id: 1, name: 'Empire Special Biryani', price: 329, image: 'images/empire/special-biryani.jpeg', bestSeller: true, isVeg: false },
            { id: 2, name: 'Butter Chicken', price: 289, image: 'images/empire/butter-chicken.jpeg', bestSeller: true, isVeg: false },
            { id: 3, name: 'Tandoori Chicken', price: 299, image: 'images/empire/tandoori-chicken.jpeg', bestSeller: true, isVeg: false },
            { id: 4, name: 'Mutton Pepper Dry', price: 319, image: 'images/empire/mutton-pepper.jpeg', spicy: true, isVeg: false },
            { id: 5, name: 'Fish Curry', price: 279, image: 'images/empire/fish-curry.jpeg', isVeg: false },
            { id: 6, name: 'Chicken Kebab', price: 259, image: 'images/empire/chicken-kebab.jpeg', isVeg: false },
            { id: 7, name: 'Paneer Butter Masala', price: 239, image: 'images/empire/panner-butter-masala.jpeg', isVeg: true },
            { id: 8, name: 'Garlic Naan', price: 59, image: 'images/empire/garlic-naan.jpeg', isVeg: true }
        ],
        'truffles': [
            { id: 1, name: 'Classic Burger', price: 199, image: 'images/truffles/classic-burger.jpeg', bestSeller: true, isVeg: false },
            { id: 2, name: 'BBQ Chicken Wings', price: 249, image: 'images/truffles/bbq-wings.jpeg', isVeg: false },
            { id: 3, name: 'Loaded Fries', price: 179, image: 'images/truffles/loaded-fries.jpeg', bestSeller: true, isVeg: true },
            { id: 4, name: 'Mushroom Pasta', price: 239, image: 'images/truffles/mushroom-pasta.jpeg', isVeg: true },
            { id: 5, name: 'Fish & Chips', price: 269, image: 'images/truffles/fish-chips.jpeg', isVeg: false },
            { id: 6, name: 'Chocolate Shake', price: 159, image: 'images/truffles/chocolate-shake.jpeg', isVeg: true },
            { id: 7, name: 'Apple Pie', price: 129, image: 'images/truffles/apple-pie.jpeg', isVeg: true }
        ],
        'kfc': [
            { id: 1, name: 'Bucket of 8 Hot & Crispy', price: 799, image: 'images/kfc/hot-crispy.jpeg', bestSeller: true, isVeg: false },
            { id: 2, name: 'Zinger Burger', price: 189, image: 'images/kfc/zinger.jpeg', bestSeller: true, isVeg: false },
            { id: 3, name: 'Hot Wings (6 pcs)', price: 249, image: 'images/kfc/hot-wings.jpeg', spicy: true, isVeg: false },
            { id: 4, name: 'French Fries', price: 119, image: 'images/kfc/fries.jpeg', isVeg: true },
            { id: 5, name: 'Chicken Popcorn - Regular', price: 159, image: 'images/kfc/popcorn.jpeg', bestSeller: true, isVeg: false },
            { id: 6, name: 'Veg Zinger', price: 179, image: 'images/kfc/veg-zinger.jpeg', isVeg: true },
            { id: 7, name: 'Pepsi', price: 89, image: 'images/kfc/pepsi.jpeg', isVeg: true }
        ],
        'pizza-hut': [
            { id: 1, name: 'Margherita Pizza', price: 249, image: 'images/pizza_hut/margherita.jpeg', bestSeller: true, isVeg: true },
            { id: 2, name: 'Pepperoni Pizza', price: 399, image: 'images/pizza_hut/pepperoni.jpeg', bestSeller: true, isVeg: false },
            { id: 3, name: 'Chicken Supreme', price: 459, image: 'images/pizza_hut/supreme.jpeg', bestSeller: true, isVeg: false },
            { id: 4, name: 'Garlic Bread', price: 149, image: 'images/pizza_hut/garlic-bread.jpeg', isVeg: true },
            { id: 5, name: 'Veggie Paradise', price: 399, image: 'images/pizza_hut/veggie.jpeg', isVeg: true },
            { id: 6, name: 'Cheese Burst Pizza', price: 499, image: 'images/pizza_hut/cheese-burst.jpeg', isVeg: true },
            { id: 7, name: 'Choco Lava Cake', price: 99, image: 'images/pizza_hut/choco-lava.jpeg', isVeg: true }
        ],
        'burger-king': [
            { id: 1, name: 'Whopper', price: 179, image: 'images/burger_king/whopper.jpeg', bestSeller: true, isVeg: false },
            { id: 2, name: 'Chicken Royale', price: 169, image: 'images/burger_king/royale.jpeg', bestSeller: true, isVeg: false },
            { id: 3, name: 'Veg Whopper', price: 159, image: 'images/burger_king/veg-whopper.jpeg', bestSeller: true, isVeg: true },
            { id: 4, name: 'Crispy Chicken', price: 89, image: 'images/burger_king/crispy.jpeg', isVeg: false },
            { id: 5, name: 'Fries (Medium)', price: 99, image: 'images/burger_king/fries.jpeg', isVeg: true },
            { id: 6, name: 'Chicken Wings', price: 149, image: 'images/burger_king/wings.jpeg', isVeg: false },
            { id: 7, name: 'Chocolate Shake', price: 129, image: 'images/burger_king/shake.jpeg', isVeg: true }
        ],
        'taco-bell': [
            { id: 1, name: 'Crunchy Taco', price: 89, image: 'images/taco_bell/crunchy.jpeg', bestSeller: true, isVeg: false },
            { id: 2, name: 'Mexican Pizza', price: 199, image: 'images/taco_bell/mexican-pizza.jpeg', bestSeller: true, isVeg: false },
            { id: 3, name: 'Veg Crunchwrap', price: 159, image: 'images/taco_bell/crunchwrap.jpeg', isVeg: true },
            { id: 4, name: 'Nachos Bell Grande', price: 299, image: 'images/taco_bell/nachos.jpeg', bestSeller: true, isVeg: true },
            { id: 5, name: 'Chicken Quesadilla', price: 189, image: 'images/taco_bell/quesadilla.jpeg', isVeg: false },
            { id: 6, name: 'Burrito Supreme', price: 199, image: 'images/taco_bell/burrito.jpeg', isVeg: false },
            { id: 7, name: 'Churros', price: 99, image: 'images/taco_bell/churros.jpeg', isVeg: true }
        ],
        'starbucks': [
            { id: 1, name: 'Caffè Latte', price: 299, image: 'images/starbucks/latte.jpeg', bestSeller: true, isVeg: true },
            { id: 2, name: 'Caramel Frappuccino', price: 349, image: 'images/starbucks/caramel-frapp.jpeg', bestSeller: true, isVeg: true },
            { id: 3, name: 'Chocolate Chip Cookie', price: 129, image: 'images/starbucks/cookie.jpeg', isVeg: true },
            { id: 4, name: 'Classic Cold Coffee', price: 279, image: 'images/starbucks/cold-coffee.jpeg', bestSeller: true, isVeg: true },
            { id: 5, name: 'Blueberry Muffin', price: 159, image: 'images/starbucks/muffin.jpeg', isVeg: true },
            { id: 6, name: 'Green Tea Latte', price: 289, image: 'images/starbucks/green-tea.jpeg', isVeg: true },
            { id: 7, name: 'Chicken & Hummus Box', price: 349, image: 'images/starbucks/chicken-box.jpeg', isVeg: false }
        ]
    };

    // Add food preference toggle functionality
    const prefButtons = document.querySelectorAll('.pref-btn');
    prefButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            prefButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFoodPreference = btn.getAttribute('data-pref');
            displayRestaurants();
            if (currentRestaurant) {
                showMenu(currentRestaurant.id);
            }
        });
    });

    function displayRestaurants() {
        restaurantList.innerHTML = "";
        const filteredRestaurants = restaurants.filter(restaurant => {
            if (currentFoodPreference === 'all') return true;
            if (currentFoodPreference === 'veg') return restaurant.isVeg;
            return !restaurant.isVeg;
        });

        filteredRestaurants.forEach(restaurant => {
            const restaurantDiv = document.createElement("div");
            restaurantDiv.classList.add("restaurant-card");
            restaurantDiv.innerHTML = `
                <div class="restaurant-image">
                    <img src="${restaurant.image}" alt="${restaurant.name}">
                    ${restaurant.isServing ? 
                        `<div class="restaurant-offer">50% OFF up to ₹100</div>` :
                        `<div class="restaurant-closed">Currently Not Serving</div>`
                    }
                </div>
                <div class="restaurant-info">
                    <h3>${restaurant.name}</h3>
                    <div class="rating-time">
                        <span class="rating">⭐ ${restaurant.rating}</span>
                        <span class="dot">•</span>
                        <span class="time">${restaurant.isServing ? restaurant.time : 'Closed'}</span>
                    </div>
                    <p class="cuisines">${restaurant.cuisines}</p>
                    <p class="location">${restaurant.location}</p>
                </div>
            `;
            
            if (restaurant.isServing) {
                restaurantDiv.addEventListener("click", () => {
                    showMenu(restaurant.id);
                });
            } else {
                restaurantDiv.classList.add("restaurant-disabled");
            }
            restaurantList.appendChild(restaurantDiv);
        });
    }

    function calculateDiscountedPrice(originalPrice) {
        const discountPercent = 50;
        const maxDiscount = 100;
        const discount = Math.min((originalPrice * discountPercent) / 100, maxDiscount);
        return Math.round(originalPrice - discount);
    }

    function showMenu(restaurantId) {
        const restaurant = restaurants.find(r => r.id === restaurantId);
        if (!restaurant || !restaurant.isServing) return;

        currentRestaurant = restaurant;
        restaurantListSection.style.display = "none";
        menuSection.style.display = "block";
        
        menuItemsContainer.innerHTML = `
            <div class="restaurant-header">
                <div class="restaurant-details">
                    <h2>${restaurant.name}</h2>
                    <p class="cuisines">${restaurant.cuisines}</p>
                    <p class="location">${restaurant.location}</p>
                    <div class="rating-time">
                        <span class="rating">⭐ ${restaurant.rating}</span>
                        <span class="dot">•</span>
                        <span class="time">${restaurant.time}</span>
                        <span class="dot">•</span>
                        <span class="cost">${restaurant.costForTwo}</span>
                    </div>
                    <div class="offers-strip">
                        <div class="offer">
                            <span class="offer-icon">🏷️</span>
                            <span>50% off up to ₹100</span>
                        </div>
                        <div class="offer">
                            <span class="offer-icon">🎉</span>
                            <span>Free delivery on first order</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu-search">
                <input type="text" placeholder="Search for dishes..." id="menu-search-input">
            </div>
            <div class="menu-categories">
                <button class="menu-category active" data-category="menu">Menu</button>
            </div>
            <div class="menu-items-list"></div>
        `;

        const menuItemsList = menuItemsContainer.querySelector(".menu-items-list");
        const restaurantKey = restaurant.name.toLowerCase().replace(/\s+/g, '-');
        const menuItems = menus[restaurantKey];
        
        if (!menuItems) {
            menuItemsList.innerHTML = '<div class="no-menu">Menu items are not available for this restaurant.</div>';
            return;
        }
        
        const filteredMenuItems = menuItems.filter(item => {
            if (currentFoodPreference === 'all') return true;
            if (currentFoodPreference === 'veg') return item.isVeg;
            return !item.isVeg;
        });
        
        filteredMenuItems.forEach(item => {
            const menuItemDiv = document.createElement("div");
            menuItemDiv.classList.add("menu-item");
            const isInCart = cart.find(cartItem => cartItem.name === item.name);
            const discountedPrice = calculateDiscountedPrice(item.price);
            
            menuItemDiv.innerHTML = `
                <div class="menu-item-details">
                    <div class="veg-badge">${item.isVeg ? '🟢' : '🔴'}</div>
                    <h3>${item.name}</h3>
                    <p class="price">
                        <span class="original-price">₹${item.price}</span>
                        <span class="discounted-price">₹${discountedPrice}</span>
                        <span class="discount-tag">₹${item.price - discountedPrice} OFF</span>
                    </p>
                    <p class="description">${restaurant.description}</p>
                    ${item.bestSeller ? '<span class="bestseller-tag">⭐ Bestseller</span>' : ''}
                    ${item.spicy ? '<span class="spicy-tag">🌶️ Spicy</span>' : ''}
                </div>
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                    ${isInCart ? `
                        <div class="item-quantity-control">
                            <button class="quantity-btn minus" data-name="${item.name}">-</button>
                            <span class="quantity">${isInCart.quantity}</span>
                            <button class="quantity-btn plus" data-name="${item.name}">+</button>
                        </div>
                    ` : `
                        <button class="add-to-cart" data-name="${item.name}" data-price="${discountedPrice}" data-restaurant="${restaurant.name}">ADD</button>
                    `}
                </div>
            `;
            menuItemsList.appendChild(menuItemDiv);
        });

        // Add menu search functionality
        const searchInput = document.getElementById("menu-search-input");
        searchInput.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const menuItems = menuItemsList.querySelectorAll(".menu-item");
            
            menuItems.forEach(item => {
                const itemName = item.querySelector("h3").textContent.toLowerCase();
                if (itemName.includes(searchTerm)) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }

    // Add to cart functionality
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const name = e.target.getAttribute("data-name");
            const price = parseFloat(e.target.getAttribute("data-price"));
            const restaurant = e.target.getAttribute("data-restaurant");
            
            // Check if items from different restaurant are in cart
            if (cart.length > 0 && cart[0].restaurant !== restaurant) {
                if (confirm("Your cart contains items from a different restaurant. Would you like to clear it and add items from " + restaurant + "?")) {
                    cart = [];
                } else {
                    return;
                }
            }
            
            cart.push({
                name,
                price,
                quantity: 1,
                restaurant
            });
            
            updateCart();
            
            // Replace add button with quantity controls
            const menuItem = e.target.closest(".menu-item");
            const imageContainer = menuItem.querySelector(".menu-item-image");
            imageContainer.innerHTML = `
                <img src="${menuItem.querySelector('img').src}" alt="${name}">
                <div class="item-quantity-control">
                    <button class="quantity-btn minus" data-name="${name}">-</button>
                    <span class="quantity">1</span>
                    <button class="quantity-btn plus" data-name="${name}">+</button>
                </div>
            `;
        }
        if (e.target.classList.contains("minus")) {
            const name = e.target.getAttribute("data-name");
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity--;
                } else {
                    cart = cart.filter(item => item.name !== name);
                }
                updateCart();
            }
        }
        if (e.target.classList.contains("plus")) {
            const name = e.target.getAttribute("data-name");
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
                updateCart();
            }
        }
    });

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="restaurant-name">${item.restaurant}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-name="${item.name}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-name="${item.name}">+</button>
                </div>
                <p class="item-total">₹${itemTotal.toFixed(2)}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        cartTotal.innerText = `Total: ₹${total.toFixed(2)}`;
        cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    displayRestaurants();
    updateCart();

    // Add these styles to handle closed restaurants
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        .restaurant-closed {
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            background: #e74c3c;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.9rem;
        }
        
        .restaurant-disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .restaurant-disabled:hover {
            transform: none !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
