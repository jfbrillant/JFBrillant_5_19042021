//------------------------------------ Query Function ------------------------------------------

async function retrieveProductById() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const res = await fetch(`http://localhost:3000/api/teddies/${id}`);
        return res.json();
    } catch (e) {
        console.log("Error", e);
    }
}

//------------------------------------- Global Display Function ---------------------------------

async function showContent() {
    try {
        const product = await retrieveProductById();

        displayProduct(product);
        displayColorSelector(product);
        addToCart(product);
    } catch (e) {
        console.log("Error", e);
    }
}

showContent();

//--------------------------------------- Product Functions -----------------------------------------

function displayProduct(product) {
    document.getElementById("teddy-name").innerHTML = product.name;

    const cardProduct = `<div class="col-12 col-lg">
            <div class="card shadow">
                <img src="${product.imageUrl}" alt="${
    product.description
  }" class="card-img-top">
                <div class="card-body">
                    <h2 class="card-text">${product.name}</h2>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text font-weight-bold">${
                      product.price / 100
                    } €</p>
                </div>
            </div>
        </div>`;

    document.getElementById("card-products").innerHTML += cardProduct;
}

function displayColorSelector(product) {
    const colors = product.colors;

    for (const c in colors) {
        const colorSelect = `<option value="${colors[c]}">${colors[c]}</option>`;

        document.getElementById("color").innerHTML += colorSelect;
    }
}

function addToCart(product) {
    document.getElementById("cart-btn").addEventListener("click", function (e) {
        e.preventDefault;

        let productToBuy = {
            id: product._id,
            name: product.name,
            quantity: 1,
            unitPrice: product.price / 100,
            finalPrice: product.price / 100,
        };

        let productsInCart = JSON.parse(localStorage.getItem("product"));

        if (productsInCart) {
            checkIfProductIsAlreadyInCart(productToBuy, productsInCart);
        } else {
            productsInCart = [];
            productsInCart.push(productToBuy);
            localStorage.setItem("product", JSON.stringify(productsInCart));
        }
    });
}

function checkIfProductIsAlreadyInCart(productToBuy, productsInCart) {
    const res = productsInCart.find(
        (article) => article.name === productToBuy.name
    );
    if (res) {
        const index = productsInCart.indexOf(res);
        productsInCart[index].quantity++;
        localStorage.setItem("product", JSON.stringify(productsInCart));
    } else {
        productsInCart.push(productToBuy);
        localStorage.setItem("product", JSON.stringify(productsInCart));
    }
}