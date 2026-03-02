// ELEMENT SELECTORS

const AddProductButton = document.getElementById('openModal');
const AddProductModal = document.getElementById('overlay');
const CloseProductModal = document.querySelectorAll('.close-modal');
const generateCardBtn = document.getElementById('generateBtn');
const cardGrid = document.getElementById('grid');
const cardCounter = document.getElementById('counter');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const emptyState = document.getElementById('empty');


// GLOBAL STATE (Source of Truth)

let productCards = [];
let counter = 0;

// Card tone classes cycle (for visual variety)
const toneClasses = ['tone-a', 'tone-b', 'tone-c', 'tone-d'];


// MODAL OPEN

AddProductButton.addEventListener('click', (e) => {
    e.preventDefault();
    AddProductModal.classList.add('open');
    AddProductModal.classList.remove('close');
});


// MODAL CLOSE

function closeOverlay() {
    AddProductModal.classList.add('close');
    AddProductModal.classList.remove('open');
}

CloseProductModal.forEach((button) => {
    button.addEventListener('click', closeOverlay);
});

// Close modal when clicking outside the modal box
AddProductModal.addEventListener('click', (e) => {
    if (e.target === AddProductModal) {
        closeOverlay();
    }
});


// SAVE TO LOCAL STORAGE

function saveToStorage() {
    localStorage.setItem("cards", JSON.stringify(productCards));
}


// LOAD FROM LOCAL STORAGE

function loadCards() {
    const storedCards = localStorage.getItem("cards");

    if (storedCards) {
        productCards = JSON.parse(storedCards);
        counter = productCards.length;
        cardCounter.innerText = counter;
        renderCards();
    }
}


// GET FILTERED + SORTED CARDS

function getFilteredCards() {

    // Read current filter values
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const sortValue = sortFilter.value;

    // Start with all cards
    let result = [...productCards];

    // FILTER by search input (checks name and description)
    if (searchValue) {
        result = result.filter(product =>
            product.name.toLowerCase().includes(searchValue) ||
            product.description.toLowerCase().includes(searchValue)
        );
    }

    // FILTER by category
    if (categoryValue) {
        result = result.filter(product => product.category === categoryValue);
    }

    // SORT the result
    if (sortValue === 'price-asc') {
        result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortValue === 'price-desc') {
        result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortValue === 'rating') {
        result.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    if (sortValue === 'newest') {
        // Newest = last added, so we reverse the array
        result.reverse();
    }

    return result;
}


// RENDER CARDS (UI Generator)

function renderCards() {

    // Get the filtered and sorted list
    const filtered = getFilteredCards();

    // Update counter chip to show how many cards are visible
    cardCounter.innerText = filtered.length;

    // Show empty state if no cards match
    if (filtered.length === 0) {
        emptyState.style.display = 'flex';
        // Remove all cards from grid except the empty state div
        const existingCards = cardGrid.querySelectorAll('.card');
        existingCards.forEach(card => card.remove());
        return;
    }

    // Hide empty state if we have results
    emptyState.style.display = 'none';

    // Build HTML for each card and inject into grid
    const existingCards = cardGrid.querySelectorAll('.card');
    existingCards.forEach(card => card.remove());

    filtered.forEach((product, index) => {

        // Cycle through tone classes for card color variety
        const tone = toneClasses[index % toneClasses.length];

        // Create a new div element for the card
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.setAttribute('data-category', product.category);

        // Fill the card with content
        cardEl.innerHTML = `
            <div class="card-img ${tone}">
                <span>${product.emoji || '📦'}</span>
            </div>
            <span class="card-tag">${product.category}</span>
            <div class="card-body">
                <div class="card-name">${product.name}</div>
                <div class="card-desc">${product.description}</div>
                <div class="card-foot">
                    <span class="card-price">$${Number(product.price).toFixed(2)}</span>
                    <span class="card-rating">
                        <svg viewBox="0 0 24 24">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        ${product.rating}
                    </span>
                </div>
            </div>
            <button class="delete-btn" data-index="${productCards.indexOf(product)}">✕</button>
        `;

        cardGrid.appendChild(cardEl);
    });

    // Attach delete listeners to each new delete button
    attachDeleteListeners();
}


// DELETE A CARD

function attachDeleteListeners() {

    const deleteButtons = cardGrid.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {

            // Get the index stored in the button's data attribute
            const index = Number(e.target.getAttribute('data-index'));

            // Remove that product from the array
            productCards.splice(index, 1);

            // Update counter and storage
            counter = productCards.length;
            saveToStorage();

            // Re-render with updated list
            renderCards();
        });
    });
}


// CARD GENERATOR

function CardGenerator() {

    const prName = document.getElementById('inputName').value.trim();
    const prPrice = document.getElementById('inputPrice').value;
    const prDesc = document.getElementById('inputDesc').value.trim();
    const prRating = document.getElementById('inputRating').value;
    const prCategory = document.getElementById('inputCategory').value;
    const prEmoji = document.getElementById('inputEmoji').value;
    const clearInputs = document.querySelectorAll('.cardInput');

    // Basic validation — name and price are required
    if (!prName || !prPrice) {
        alert('Please enter at least a product name and price.');
        return;
    }

    productCards.push({
        name: prName,
        price: prPrice,
        description: prDesc,
        rating: prRating || '—',
        category: prCategory,
        emoji: prEmoji || '📦'
    });

    renderCards();
    saveToStorage();
    closeOverlay();

    // Clear all text inputs after saving
    clearInputs.forEach(elem => elem.value = "");

    counter = productCards.length;
    cardCounter.innerText = counter;
}

generateCardBtn.addEventListener('click', CardGenerator);


// FILTER LISTENERS

// Re-render cards every time the user types in the search box
searchInput.addEventListener('input', renderCards);

// Re-render cards when category dropdown changes
categoryFilter.addEventListener('change', renderCards);

// Re-render cards when sort dropdown changes
sortFilter.addEventListener('change', renderCards);


// INITIAL LOAD

document.addEventListener("DOMContentLoaded", loadCards);