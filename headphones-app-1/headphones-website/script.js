
// För att få fram menyn i mobil läge

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

// För att öka/minska antalet i varukorgen samt öka/minska priset

const decrement = document.getElementById("decrement");
const increment = document.getElementById("increment");
const quantityNum = document.getElementById("quantity");
const itemPrice = document.getElementById("item-price");
const totalPrice = document.getElementById("total-price");

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

updateQuantity();