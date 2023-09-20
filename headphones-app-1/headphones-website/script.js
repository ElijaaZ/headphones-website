

// ====================PRODUKTLISTA======================
const products = [
    {
        id: 0,
        title: "Elias Headphones",
        price: 999,
        imgSrc: "images/headphonespng.png"
    }
];

// ====================FÖR ATT LÄGGA TILL PRODUKTEN I VARUKORGEN======================

const cartList = [];
const cartContentEl = document.querySelector(".cart-content");

function addToCart(id) {
    const product = products.find((product) => product.id === id);

    
        cartList.push(product);

        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <img src="${product.imgSrc}" class="cart-img">
            <div class="detail-box">
            <div class="title-price">
                <div class="cart-title">${product.title}</div>
                <div class="cart-price">${product.price} kr</div>
            </div>
                <div class="quantity">
                    <button class="quantity-button" id="decrement">-</button><h6 id="quantity">01</h6><button class="quantity-button" id="increment">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${product.id})">REMOVE</button>
            </div>
        `;

        cartContentEl.appendChild(cartItem);

        const totalPriceEl = document.querySelector(".total-price");
        totalPriceEl.textContent = "999 kr";

// ====================ÖKA OCH MINSKA ANTALET AV PRODUKTEN SAMT TOTAL PRIS======================
        const decrement = cartItem.querySelector("#decrement");
        const increment = cartItem.querySelector("#increment");
        const quantityNum = cartItem.querySelector("#quantity"); // Uppdatera id här
        const totalPrice = document.querySelector(".total-price");

        let quantity = 1;
        let price = 999;

        function updateQuantity() {
            quantityNum.textContent = `${quantity < 10 ? '0' : ''}${quantity}`;
            totalPrice.textContent = (quantity * price) + " kr";
        }

        decrement.addEventListener("click", function() {
            if (quantity > 1) {
                quantity--;
                updateQuantity();
            }
        });

        increment.addEventListener("click", function() {
            quantity++;
            updateQuantity();
        });
}
// ====================FÖR ATT ÖPPNA MENYN I MOBIL LÄGE======================

const menuList = document.getElementById("menuList");
menuList.style.maxHeight="0px";

function togglemenu(){
    if (menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "200px"
        }
        else {
        menuList.style.maxHeight = "0px";
    }
}

// ====================ÖPPNA OCH STÄNGA VARUKORGEN======================

document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.querySelector('.cart-icon');
    const closeCartBtn = document.querySelector('.closecart');
    const cart = document.querySelector('.cart');

    function openCart() {
        cart.style.display = 'block';
    }

    function closeCart() {
        cart.style.display = 'none';
    }

    cartIcon.addEventListener("click", openCart);
    closeCartBtn.addEventListener('click', closeCart); 
});

// ====================TA BORT PRODUKTEN FRÅN VARUKORGEN======================
function removeFromCart() {
    const cartContent = document.querySelector(".cart-content");
    cartContent.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            event.target.parentElement.parentElement.remove();
        }
    });
}