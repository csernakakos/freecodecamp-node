const shop = document.querySelector("#shop");

const shopItemsData = [
    {
        id: "a4523425dsf",
        name: "Casual Shirt",
        price: 45,
        desc: "Lorem ipsum...",
        img: "images/img-1.jpg"
    },
    {
        id: "dskmv",
        name: "Office Shirt",
        price: 100,
        desc: "Lorem ipsum...",
        img: "images/img-2.jpg"
    },
    {
        id: "dskmefwv",
        name: "Jeans",
        price: 99.4,
        desc: "Lorem ipsum...",
        img: "images/img-3.jpg"
    },
    {
        id: "dskmtehv",
        name: "Coffee",
        price: 12.5,
        desc: "Lorem ipsum...",
        img: "images/img-4.jpg"
    },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);

function generateShop() {
    return (shop.innerHTML = shopItemsData.map((item) => {

        const { id, name, price, desc, img } = item;

        let search = basket.find((item) => item.id === id) || [];

        return `
            <div class="item" id="product-id-${id}">
                <img width="220" src="${img}" alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>

                    <div class="price-quantity">
                        <h2>$${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div class="quantity" id=${id}>${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join(""));
};

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

    
    basket = basket.filter((item) => item.item > 0);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
}

function update(id) {
    let search = basket.find((item) => item.id === id);
    document.querySelector(`#${id}`).innerHTML = search.item;
    calculateTotal();
}

function calculateTotal() {
    const totalDOM = document.querySelector(".cartAmount");

    const sumOfItems = basket.reduce((sum, item) => {
        return sum + item.item;
    }, 0);

    totalDOM.innerHTML = sumOfItems;
}

generateShop();
calculateTotal();