const products = [
    { id: 1, name: 'Pandiero', price: 40 },
    { id: 2, name: 'Berimbau', price: 120 },
    { id: 3, name: 'Atabaque', price: 150 }
];

let cart = [];

const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-button');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>No items in the cart.</li>';
        checkoutButton.disabled = true;
        totalPrice.textContent = 'Total: $0.00';
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = '10px';
        removeButton.addEventListener('click', () => removeFromCart(index));
        li.appendChild(removeButton);

        cartItems.appendChild(li);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    checkoutButton.disabled = false;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.closest('.product').dataset.id, 10);
        addToCart(productId);
    });
checkoutButton.addEventListener('click', () => {
    window.location.href = 'Checkout.html';
    });


});
