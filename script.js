const AddProductButton = document.getElementById('openModal');
const AddProductModal = document.getElementById('overlay');
const CloseProductModal = document.querySelectorAll('.close-modal');
const generateCardBtn = document.getElementById('generateBtn')

// opening Modal 
AddProductButton.addEventListener('click', (e) => {
    e.preventDefault();
    AddProductModal.classList.add('open')
    AddProductModal.classList.remove('close')
})

// Closing Modal
function closeOverlay() {
    AddProductModal.classList.add('close')
    AddProductModal.classList.remove('open')
}
CloseProductModal.forEach((button) => {
    button.addEventListener('click', closeOverlay)
});


// Cards Grid
const cardGrid = document.getElementById('grid')

const productCards = [];
//  Genera Cards 
function CardGenerator() {

    const prName = document.getElementById('inputName').value;
    const prPrice = document.getElementById('inputPrice').value;
    const prDesc = document.getElementById('inputDesc').value;
    const prRating = document.getElementById('inputRating').value;
    const prCategory = document.getElementById('inputCategory').value;
    const prEmoji = document.getElementById('inputEmoji').value;


    productCards.push({
        name: prName,
        price: prPrice,
        description: prDesc,
        rating: prRating,
        category: prCategory,
        emoji: prEmoji
    });

    const HtmlString = data.map(item => `
    <div class="card" data-category="${productCards.category}">
        <div class="card-img tone-a">
            <span>${productCards.emoji}</span>
        </div>

        <span class="card-tag">${productCards.category}</span>

        <div class="card-body">
            <div class="card-name">${productCards.name}</div>
            <div class="card-desc">${productCards.description}</div>

            <div class="card-foot">
                <span class="card-price">$${productCards.price}</span>

                <span class="card-rating">
                    <svg viewBox="0 0 24 24">
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    ${productCards.rating}
                </span>
            </div>
        </div>
    </div>
`).join("");

    cardGrid.innerHTML = HtmlString;


    console.log(productCards);
}

generateCardBtn.addEventListener('click', CardGenerator)