

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
const cartContentOne = document.querySelector(".cart-content");

function addToCart(id) {
    if(cartList.some((item) => item.id === id)){
        alert("Product already in cart");
    } else {
        const product = products.find((product) => product.id === id);
        cartList.push(product);

        const item = document.createElement('div');
        item.innerHTML = `
            <img src="${product.imgSrc}" class="cart-img">
            <div class="detail-box">
            <div class="title-price">
                <div class="cart-title">${product.title}</div>
                <div class="cart-price">${product.price} kr</div>
            </div>
                <div class="quantity">
                    <button class="quantity-button" id="decrement">-</button><h6 id="quantity">01</h6><button class="quantity-button" id="increment">+</button>
                </div>
                <button class="delete-btn" onclick="deleteButton(${product.id})">DELETE</button>
            </div>
        `;

        cartContentOne.appendChild(item);

        // När produkten läggs till i varukorgen ändras total summan från 0kr till 999 kr.

        const total = document.querySelector(".total-price");
        total.textContent = "999 kr";

// ====================ÖKA OCH MINSKA ANTALET AV PRODUKTEN SAMT TOTAL PRIS======================
        const decrement = item.querySelector("#decrement");
        const increment = item.querySelector("#increment");
        const quantityNum = item.querySelector("#quantity");
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

// ====================TA BORT PRODUKTEN FRÅN VARUKORGEN======================
function deleteButton() {
    const cartContentTwo = document.querySelector(".cart-content");
    cartContentTwo.addEventListener('click', function(event) {
        let deleteBtn = event.target.classList.contains('delete-btn');
        if (deleteBtn) {
            event.target.parentElement.parentElement.remove();
            refreshPage();
        }   
    });
}
function refreshPage() {
    window.location.reload();
}