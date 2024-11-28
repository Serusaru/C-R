const cartItems = [
    { name: "Product 1", price: 29.99 },
    { name: "Product 2", price: 19.99 },
    { name: "Product 3", price: 49.99 },
];

const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutForm = document.getElementById('checkout');

function populateOrderSummary() {
    let total = 0;
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(li);
        total += item.price;
    });
    totalPriceElement.textContent = total.toFixed(2);
}

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zipCode = document.getElementById('zip-code').value.trim();
    const paymentMethod = document.getElementById('payment-method').value;

    if (!fullName || !email || !address || !city || !zipCode || !paymentMethod) {
        alert("Please fill out all required fields.");
        return;
    }

    alert(`Order placed successfully!
    Name: ${fullName}
    Email: ${email}
    Total: $${totalPriceElement.textContent}`);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
});

populateOrderSummary();
