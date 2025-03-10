const products = [
    {id: 1, img: "movies/pulp_fiction.jpg", name: "Криминальное чтиво", price: 150},
    {id: 2, img: "movies/back_to_the_future.jpg", name: "Назад в будущее", price: 200},
    {id: 3, img: "movies/brother.jpg", name: "Брат", price: 120},
    {id: 4, img: "movies/the_big_lebowski.jpg", name: "Большой Лебовски", price: 300},
    {id: 5, img: "movies/challengers.jpg", name: "Претенденты", price: 600},
    {id: 6, img: "movies/the_guernsey_literary_and_potato_peel_pie_society.jpg", name: "Клуб любителей книг и пирогов из картофельных очистков", price: 250},
    {id: 7, img: "movies/monsters,_inc.jpg", name: "Корпорация монстров", price: 150},
    {id: 8, img: "movies/shawshank_redemption.jpg", name: "Побег из Шоушенка", price: 100},
    {id: 9, img: "movies/the_ministry_of_ungentlemanly_warfare.jpg", name: "Министерство неджентельменских дел", price: 500},
    {id: 10, img: "movies/borat.jpg", name: "Борат", price: 300},
    {id: 11, img: "movies/mid_90-s.jpg", name: "Середина 90-х", price: 200},
    {id: 12, img: "movies/grinch.jpg", name: "Гринч", price: 100},
    {id: 13, img: "movies/brother_2.jpg", name: "Брат 2", price: 100},
    {id: 14, img: "movies/harry_potter_and_the_sorcerer's_stone.jpg", name: "Гарри Поттер и философский камень", price: 200},
    {id: 15, img: "movies/hateful_eight.jpg", name: "Омерзительная восьмерка", price: 300},
    {id: 16, img: "movies/oppenheimer.jpg", name: "Оппенгеймер", price: 400},
    {id: 17, img: "movies/the_mule.jpg", name: "Мул", price: 350},
    {id: 18, img: "movies/bunker.jpg", name: "Бункер", price: 488},
    {id: 19, img: "movies/breaking_bad.jpg", name: "Во все тяжкие", price: 1200},
    {id: 20, img: "movies/pirates_of_the_carribean_the_curse_of_the_black_pearl.jpg", name: "Пираты Карибского моря: Проклятие Чёрной жемчужины", price: 225},
    {id: 21, img: "movies/home_alone.jpg", name: "Один дома", price: 150}
]

const cart = [];

function renderProducts(filteredProducts = products) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.img}">
            <h3>${product.name}</h3>
            <p>Цена: ${product.price} руб.</p>
            <button onclick="addToCart(${product.id})">Добавить в корзину</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

function renderCart() {
    const cartDiv = document.getElementById('cart-popover');
    cartDiv.innerHTML = ``;
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Корзина пуста</p>';
    } else {
        let totalPrice = 0;
        let extraDivs = 0;
        cart.forEach(item => {
            console.log(cartDiv.children.length)
            if (cartDiv.children.length < 4) {
                cartItemDiv = document.createElement('div');
                cartItemDiv.className = "cart-item"
                cartItemDiv.innerHTML = `
                    <img class="cart-item-img"src="${item.img}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.price*item.quantity} руб.</p>
                        <p>Количество: ${item.quantity}</p>
                        <button onclick="removeFromCart(${item.id})"><img src="remove2.png"></button>
                    </div>
                    `;
                cartDiv.appendChild(cartItemDiv);
            } else {
                extraDivs += 1*item.quantity;
            }
            // console.log(cartDiv);
            totalPrice += item.price*item.quantity;
        });
        if (extraDivs > 0) {
            const extraDivsDiv = document.createElement('div');
            if (extraDivs === 1) {
                extraDivsDiv.innerHTML = `<h4>И ещё 1 товар...</h4>`;
            } else {
                extraDivsDiv.innerHTML = `<h4>И ещё ${extraDivs} товаров...</h4>`;
            }
            cartDiv.appendChild(extraDivsDiv);
        }
        const totalPriceDiv = document.createElement('div');
        totalPriceDiv.className = 'total';
        totalPriceDiv.innerHTML = `<h3>Итого: ${totalPrice}</h3>`;
        cartDiv.appendChild(totalPriceDiv);
        // console.log(cartDiv);
    }
}

function addToCart(productId) {
    let product = products.find(product => product.id === productId);
    let cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
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

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    renderProducts(filteredProducts);
}

function sortProducts() {
    const sortBy = document.getElementById('sort-select').value;
    let sortedProducts = [...products];
    
    switch (sortBy) {
        case 'name-asc':
            sortedProducts.sort((a,b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a,b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            sortedProducts.sort((a,b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a,b) => b.price - a.price);
            break;
        default:
            break;
    }

    renderProducts(sortedProducts);
}

document.querySelector('.nav-img-cart').addEventListener('mouseenter', () => {
    document.getElementById('cart-popover').style.display = 'block';
});

document.querySelector('.cart-popover').addEventListener('mouseleave', () => {
    document.getElementById('cart-popover').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
});
