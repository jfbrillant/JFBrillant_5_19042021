async function retrieveProducts() {
    try {
        const res = await fetch("http://localhost:3000/api/teddies");
        return res.json();

    } catch (e) {
        console.log('Error', e);
    }
}

async function showContent() {
    try {
        const product = await retrieveProducts();
        
        let productsInCart = JSON.parse(localStorage.getItem("product"));
        
        if(productsInCart === null || productsInCart == 0){
            displayEmptyCart();
        } else {
            setPrice(productsInCart);
            displayCart(productsInCart);
            setDeleteAndQuantityButtons(productsInCart);
            displayClearCartbutton();
            setClearCartbutton();
            displayTotalAmount(productsInCart);
        }

    } catch (e) {
        console.log('Error', e);
    }
  }
  
  showContent();
 





function setPrice(productsInCart) {
    for(const p in productsInCart) {
        productsInCart[p].finalPrice = productsInCart[p].unitPrice * productsInCart[p].quantity;
        localStorage.setItem("product", JSON.stringify(productsInCart));
    }
}

function displayCart(productsInCart) {
    const tableHead = 
        `<tr>
            <th scope="col" class="text-left">Article</th>
            <th scope="col" class="text-center">Quantité</th>
            <th scope="col" class="text-right">Prix</th>
        </tr>`
    document.getElementById("table-head").innerHTML += tableHead;
    for(const p in productsInCart) {
       const productToDisplay =
            `<tr>
                <td class="name text-left">${productsInCart[p].name}</td>
                <td class="quantity text-center">
                    <button type="button" data-name="${productsInCart[p].name}" class="remove-quantity-button btn btn-dark text-center mx-1 mx-lg-2 px-1 py-1">-</button>
                        ${productsInCart[p].quantity}
                    <button type="button" data-name="${productsInCart[p].name}" class="add-quantity-button btn btn-dark mx-1 mx-lg-2 px-1 py-1">+</button>
                </td>
                <td class="price text-right">
                    ${productsInCart[p].finalPrice} €
                    <button type="button" data-name="${productsInCart[p].name}" class="delete-product-button btn btn-dark mx-1 mx-lg-2 px-1 py-1">
                        X
                    </button>
                </td>
            </tr>`
        document.getElementById("products-in-cart").innerHTML += productToDisplay;
    }
}

function setDeleteAndQuantityButtons(productsInCart) {
        document.getElementById("products-in-cart").onclick = function(e) {
        if (e.target && e.target.classList.contains('delete-product-button')) {
            for(const p in productsInCart) {
                if(productsInCart[p].name === e.target.dataset.name) {
                    productsInCart.splice(p, 1);
                    localStorage.setItem("product", JSON.stringify(productsInCart));
                    window.location.href = "cart.html";
                }
            }
        }
        if (e.target && e.target.classList.contains('remove-quantity-button')) {
            for(const p in productsInCart) {
                if(productsInCart[p].name === e.target.dataset.name) {
                    productsInCart[p].quantity--;
                    if(productsInCart[p].quantity == 0) {
                        productsInCart.splice(p, 1);
                        localStorage.setItem("product", JSON.stringify(productsInCart));
                        window.location.href = "cart.html";
                    } else {
                    localStorage.setItem("product", JSON.stringify(productsInCart));
                    window.location.href = "cart.html";
                    }
                }
            }
        }
        if (e.target && e.target.classList.contains('add-quantity-button')) {
            for(const p in productsInCart) {
                if(productsInCart[p].name === e.target.dataset.name) {
                    productsInCart[p].quantity++;
                    localStorage.setItem("product", JSON.stringify(productsInCart));
                    window.location.href = "cart.html";
                }
            }
        }
    }
}

function displayClearCartbutton() {
    const clearCartbutton =
        `<tr>
            <td colspan=3>
                <button type="button" id="clear-cart-button" class="btn btn-dark col">Vider le panier</button>
            </td>
        </tr>`;
    document.getElementById("products-in-cart").insertAdjacentHTML('beforeend', clearCartbutton);
    
}

function setClearCartbutton() {
    document.getElementById("clear-cart-button").addEventListener('click', function(e){
        e.preventDefault;
        localStorage.clear();
        window.location.href = "cart.html";
    });
}

function displayTotalAmount(productsInCart) {
    let setTotalAmount = 0;
    for(const p in productsInCart) {
        setTotalAmount += productsInCart[p].finalPrice;
    }
    const totalAmount = 
        `<tr>
            <td colspan=3 class="text-right font-weight-bold">Montant total : ${setTotalAmount} €</td>
        </tr>`;
    document.getElementById("total-amount").innerHTML = totalAmount;
}

function displayEmptyCart() {
    const emptyCart =
        `<p class="text-center h2">Le pannier est vide !</p>`
    document.getElementById("empty-cart").innerHTML = emptyCart;
}