const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

function renderCart() {
    const cartDiv = document.getElementById('cart');
    let totalPrice = 0;
    cartDiv.innerHTML = '';
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p class="cart-empty">Вы пока не добавили товаров. <br><br><a href="main.html"> Продолжайте покупки</a> </p>';
    } else {
        cartDiv.innerHTML = `<table>
            <thead>
                <tr>
                    <th></th>
                    <th>Название товара</th>
                    <th>Цена за единицу</th>
                    <th>Количество</th>
                    <th>Сумма</th>
                </tr>
            </thead>
            <tbody id="cart-items"></tbody>
            <tfoot>
                <tr>
                    <td colspan="4"><strong>Итого:</strong></td>
                    <td id="total-price"></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <button class="pay-button">Оплатить</button>`
        const cartTable = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.img}"></td>
                <td>${item.name}</td>
                <td>${item.price} руб.</td>
                <td class="quantity"><button class="minus" onclick="removeFromCart(${item.id})"><img src="minus.png"></button><span>${item.quantity}</span>
                <button class="plus"onclick="increaseItemQuantity(${item.id})"><img src="plus.png"></button>
                </td>
                <td>${item.price * item.quantity} руб.</td>
            `;
            cartTable.appendChild(row);
            totalPrice += item.price * item.quantity;
        });
    
        totalPriceElement.textContent = `${totalPrice} руб.`;
    }


}

function increaseItemQuantity(itemId) {
    let cartItem = cart.find(item => item.id === itemId);
    cartItem.quantity++;
    localStorage.setItem('cartItems', JSON.stringify(cart));
    renderCart();
}

function removeFromCart(itemId) {
    let cartItem = cart.find(item => item.id === itemId);
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
    } else if (cartItem.quantity === 1) {
        cart.splice(cart.indexOf(cartItem),1);
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});