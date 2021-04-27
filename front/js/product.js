async function retrieveProductById() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const res = await fetch(`http://localhost:3000/api/teddies/${id}`);
        return res.json();

    } catch (e) {
        console.log('Error', e);
    }
}

async function showContent() {
    try {
        const data = await retrieveProductById();
        
        displayProduct(data);
        displayColorSelector(data);
        addToCart(data);

    } catch (e) {
      console.log('Error', e);
    }
}
  
showContent();





function displayProduct(data) {
    document.getElementById("teddy-name").innerHTML = data.name;

    const cardProduct =
        `<div class="col-12 col-lg">
            <div class="card shadow">
                <img src="${data.imageUrl}" alt="${data.description}" class="card-img-top">
                <div class="card-body">
                    <h2 class="card-text">${data.name}</h2>
                    <p class="card-text">${data.description}</p>
                    <p class="card-text">${data.price/100} €</p>
                </div>
            </div>
        </div>`;

    document.getElementById("card-products").innerHTML += cardProduct;
}

function displayColorSelector(data) {
    const colors = data.colors;
                
    for(const c in colors){
        const colorSelect = 
        `<option value="${colors[c]}">${colors[c]}</option>`;
                    
        document.getElementById("color").innerHTML += colorSelect;
    }
}

function addToCart(data) {
    document.getElementById("cart-btn").addEventListener('click', function(e) {
        e.preventDefault;

        const product = {
            name: data.name,
            quantity: 1,
            price: data.price/100
        };

        let productsInCart = JSON.parse(localStorage.getItem("product"));

        if(productsInCart) {
            productsInCart.push(product);
            localStorage.setItem("product", JSON.stringify(productsInCart));
  
        } else {        
            productsInCart = [];
            productsInCart.push(product);
            localStorage.setItem("product", JSON.stringify(productsInCart));
        }
    });
}