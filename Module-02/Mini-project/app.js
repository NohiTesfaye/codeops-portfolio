// =========================
// Application state
// =========================

const state = {
    menu: [],
    filteredMenu: [],
    cart: [],
    searchTerm: "",
    category: "All"
};


// =========================
// DOM elements
// =========================

const menuContainer = document.getElementById("menu");
const cartContainer = document.getElementById("cart");
const cartTotalElement = document.getElementById("cart-total");

const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const checkoutButton = document.getElementById("checkout-btn");


// =========================
// Load menu
// =========================

async function loadMenu() {

    try {

        const response = await fetch("./data/menu.json");

        if (!response.ok) {
            throw new Error("Failed to load menu");
        }

        state.menu = await response.json();

        state.filteredMenu = state.menu;

        renderMenu();

    } catch (error) {

        console.error(error);

        menuContainer.innerHTML = `
            <p class="empty-message">
                Unable to load the menu.
            </p>
        `;
    }
}


// =========================
// Render menu
// =========================

function renderMenu() {

    if (state.filteredMenu.length === 0) {

        menuContainer.innerHTML = `
            <p class="empty-message">
                No dishes found.
            </p>
        `;

        return;
    }


    menuContainer.innerHTML = state.filteredMenu.map(dish => {

        return `
            <article class="dish-card">

                <h3>${dish.name}</h3>

                <p class="dish-category">
                    ${dish.category}
                </p>

                <p class="dish-price">
                    ${dish.price} ETB
                </p>

                <p class="${dish.spicy ? "spicy" : "not-spicy"}">
                    ${dish.spicy ? "🌶 Spicy" : "Not spicy"}
                </p>

                <button
                    class="add-to-cart"
                    data-id="${dish.id}"
                >
                    Add to cart
                </button>

            </article>
        `;

    }).join("");
}


// =========================
// Filter menu
// =========================

function filterMenu() {

    const searchTerm = state.searchTerm.toLowerCase();

    state.filteredMenu = state.menu.filter(dish => {

        const matchesSearch =
            dish.name.toLowerCase().includes(searchTerm);

        const matchesCategory =
            state.category === "All" ||
            dish.category === state.category;

        return matchesSearch && matchesCategory;
    });

    renderMenu();
}


// =========================
// Add item to cart
// =========================

function addToCart(dishId) {

    const existingItem = state.cart.find(
        item => item.id === dishId
    );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        const dish = state.menu.find(
            item => item.id === dishId
        );

        state.cart.push({
            ...dish,
            quantity: 1
        });
    }


    saveCart();
    renderCart();
}


// =========================
// Change quantity
// =========================

function changeQuantity(dishId, change) {

    const item = state.cart.find(
        item => item.id === dishId
    );

    if (!item) {
        return;
    }

    item.quantity += change;


    if (item.quantity <= 0) {

        state.cart = state.cart.filter(
            item => item.id !== dishId
        );
    }


    saveCart();
    renderCart();
}


// =========================
// Remove item
// =========================

function removeFromCart(dishId) {

    state.cart = state.cart.filter(
        item => item.id !== dishId
    );

    saveCart();
    renderCart();
}


// =========================
// Calculate total
// =========================

function calculateTotal() {

    return state.cart.reduce(
        (total, item) => {
            return total + item.price * item.quantity;
        },
        0
    );
}


// =========================
// Render cart
// =========================

function renderCart() {

    if (state.cart.length === 0) {

        cartContainer.innerHTML = `
            <p class="empty-message">
                Your cart is empty.
            </p>
        `;

        cartTotalElement.textContent = "0 ETB";

        return;
    }


    cartContainer.innerHTML = state.cart.map(item => {

        return `
            <div class="cart-item">

                <strong>${item.name}</strong>

                <span>
                    ${item.price} ETB × ${item.quantity}
                </span>

                <div class="cart-controls">

                    <button
                        type="button"
                        data-action="decrease"
                        data-id="${item.id}"
                        aria-label="Decrease ${item.name} quantity"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        type="button"
                        data-action="increase"
                        data-id="${item.id}"
                        aria-label="Increase ${item.name} quantity"
                    >
                        +
                    </button>

                    <button
                        type="button"
                        class="remove-btn"
                        data-action="remove"
                        data-id="${item.id}"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;

    }).join("");


    const total = calculateTotal();

    cartTotalElement.textContent = `${total} ETB`;
}


// =========================
// LocalStorage
// =========================

function saveCart() {

    localStorage.setItem(
        "addisEatsCart",
        JSON.stringify(state.cart)
    );
}


function loadCart() {

    const savedCart = localStorage.getItem(
        "addisEatsCart"
    );


    if (savedCart) {

        state.cart = JSON.parse(savedCart);
    }

    renderCart();
}


// =========================
// Events
// =========================

// Search

searchInput.addEventListener("input", event => {

    state.searchTerm = event.target.value;

    filterMenu();
});


// Category filter

categoryFilter.addEventListener("change", event => {

    state.category = event.target.value;

    filterMenu();
});


// Add to cart

menuContainer.addEventListener("click", event => {

    const button = event.target.closest(".add-to-cart");

    if (!button) {
        return;
    }

    const dishId = Number(button.dataset.id);

    addToCart(dishId);
});


// Cart controls

cartContainer.addEventListener("click", event => {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const dishId = Number(button.dataset.id);

    const action = button.dataset.action;


    if (action === "increase") {

        changeQuantity(dishId, 1);

    } else if (action === "decrease") {

        changeQuantity(dishId, -1);

    } else if (action === "remove") {

        removeFromCart(dishId);
    }
});


// Checkout

checkoutButton.addEventListener("click", () => {

    if (state.cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert(
        `Your order total is ${calculateTotal()} ETB`
    );
});


// =========================
// Start application
// =========================

loadCart();
loadMenu();