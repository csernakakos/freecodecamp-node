const label = document.querySelector("#label");
let shoppingCart;

if (document.querySelector("#shopping-cart")) {
    shoppingCart = document.querySelector("#shopping-cart");
} else {
    shoppingCart = null;
}

let basket = JSON.parse(localStorage.getItem("data")) || [];

function calculateTotal() {
    const totalDOM = document.querySelector(".cartAmount");

    const sumOfItems = basket.reduce((sum, item) => {
        return sum + item.item;
    }, 0);

    totalDOM.innerHTML = sumOfItems;
}

calculateTotal();

function generateCartItems() {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            const { id, item } = x;
            const search = shopItemsData.find((data) => id === data.id) || [];
            return `
                <div class="cart-item">
                    <img width="200" src="${search.img}"></img>
                </div>
            `
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
                <h2>Cart is Empty</h2>
                <a href="index.html">
                    <button class="HomeBtn">Back to Home</button>
                </a>
        `;

    }
}

function increment(id) {
    const selectedItem = id;
    
    let search = basket.find((item) => item.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    } else {
        search.item += 1;
    }

    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id);
}

function decrement(id) {
    const selectedItem = id;
    let search = basket.find((item) => item.id === selectedItem.id);

    if (!search) return;

    if (search.item === 0) return
    else {
        search.item -= 1;
    }

    
    update(selectedItem.id);
    basket = basket.filter((item) => item.item > 0);
    localStorage.setItem("data", JSON.stringify(basket));
}

function update(id) {
    let search = basket.find((item) => item.id === id);
    document.querySelector(`#${id}`).innerHTML = search.item;
    calculateTotal();
}

if (window.location.pathname.includes("cart")) {
    generateCartItems();
}