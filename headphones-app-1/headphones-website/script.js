// ====================PRODUKTLISTA======================
/* Här gör jag min produkt lista, men eftersom jag bara har en produkt så har jag endast en produkt här
med id, title, price och bilden. */ 
const products = [
    {
        id: 0,
        title: "Elias Headphones",
        price: 999,
        imgSrc: "images/headphonespng.png"
    }
];

// ====================FÖR ATT LÄGGA TILL PRODUKTEN I VARUKORGEN======================

/* Här skapar jag en tom varukorgs lista och visar vart listan ska visas på sidan (cart-container)
Sedan kommer min addToCart funktion, den börjar med att man endast kan lägga in samma produkt en gång i korgen.
Är det inte samma produkt så letar den efter rätt id och sedan pushar in produkten i den tomma listan.
Därefter skapar jag en ny variabel med namnet item som är själva cart-itemet, därefter gör jag själva HTML koden för 
hur den ska visas i korgen med en ny div (createElement) och lägger den sedan i korgen med appendChild.*/

const cartList = [];
const cartContainer = document.querySelector(".cart-container");

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
                    <button class="quantity-button" id="minus">-</button><h6 id="quantity">1</h6><button class="quantity-button" id="plus">+</button>
                </div>
                <button class="delete-btn" onclick="deleteButton(${product.id})">DELETE</button>
            </div>
        `;

        cartContainer.appendChild(item);

        // När produkten läggs till i varukorgen ändras total summan från 0kr till 999 kr.
        const total = document.querySelector(".total-price");
        total.textContent = "999 kr";

// ====================ÖKA OCH MINSKA ANTALET AV PRODUKTEN SAMT VARUKORGENS TOTAL PRIS======================

/* Här använder jag mig utav querySelector vilket tar det första elementet som matchar det som står i parenteserna och eftersom
jag har minus, plus och quantity som id:n använder jag "#" innan.
Sedan skapar jag en variabel för price och antal och sedan skapar jag funktionen updateTotal vilket i stort sett multiplicerar
antalet och priset av produkten för att få ut total priset. Sen använder jag en event lyssnare på både minus och plus för att öka eller
minska antalet produkter i varukorgen. I dem lägger jag även in updateTotal i slutet så att totalet uppdateras efter varje klick.*/
        const minus = item.querySelector("#minus");
        const plus = item.querySelector("#plus");
        const quantity = item.querySelector("#quantity");

        let itemQuantity = 1;
        let itemPrice = 999;

        function updateTotal() {
            quantity.textContent = itemQuantity;
            total.textContent = (itemQuantity * itemPrice) + " kr";
        }

        minus.addEventListener("click", function() {    
            if (itemQuantity > 1) {
                itemQuantity--;
                updateTotal();
            }
        });

        plus.addEventListener("click", function() {
            if (itemQuantity < 20) {
                itemQuantity++;
                updateTotal();
            }
        });
    }
}
// ====================FÖR ATT ÖPPNA MENYN I MOBIL LÄGE======================
/* Har en onclick på meny iconen till "togglemenu" funktionen, meny iconen visas endast på en device med en max bredd på 500px
Ifall menyn är på 0px när jag klickar så åker den ner 200px, är den på 200px redan åker den tillbaka till 0px.*/

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
/* Här gör jag en funktion för att kunna ta bort produkten ur varukorgen. Använder återigen "click" för eventet och sedan 
tar jag bort knappen samt dens övre parents eftersom jag vill få bort allt inom carten, därför kör jag parentElement två gånger 
för att knappen ligger inbäddad i två divs inom korgen.  */
function deleteButton() {
    cartContainer.addEventListener('click', function(event) {
        const buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove();
            refreshPage();
        }   
    );
}
/* Valde att använda mig av denna funktionen som refreshar sidan när jag klickar på delete item button,
anledningen till varför jag valde att ha den var för att ifall jag tog bort produkten från varukorgen utan den
så kunde jag inte lägga till produkten igen pga min "alert" i add to cart funktionen då det stod att produkten
redan var tillagd, men när man nu deletar produkten från korgen så renderas sidan om på nytt istället.
Förmodligen inte bästa sättet att göra det på men koden funkar åtminstone. */

function refreshPage() {
    window.location.reload();
}