async function retrieveContent() {
    try {
        const res = await fetch("http://localhost:3000/api/teddies");
        return res.json();

    } catch (e) {
        console.log('Error', e);
    }
}

async function showContent() {
    try {
        const data = await retrieveContent();
        
        let productsInCart = JSON.parse(localStorage.getItem("product"));
        if(productsInCart){

            displayCart();
            deleteProduct();
            displayClearCartbutton();
            setClearCartbutton();
            displayTotalAmount();

        } else {
            displayEmptyCart();
        }
        console.log(productsInCart);

    } catch (e) {
        console.log('Error', e);
    }
  }
  
  showContent();
 




  function displayCart() {
    const tableHead = 
        `<tr>
            <th scope="col">Article</th>
            <th scope="col" class="text-center">Quantité</th>
            <th scope="col" class="text-right">Prix</th>
        </tr>`
    document.getElementById("table-head").innerHTML += tableHead;
    let productsInCart = JSON.parse(localStorage.getItem("product"));
    for(const p in productsInCart) {
       const productToDisplay =
            `<tr>
                <td class="name">${productsInCart[p].name}</td>
                <td class="quantity text-center">
                    <button type="button" class="remove-quantity-button btn btn-dark text-center mx-2 px-1 py-1">-</button>
                        ${productsInCart[p].quantity}
                    <button type="button" class="add-quantity-button btn btn-dark mx-2 px-1 py-1">+</button>
                </td>
                <td class="price text-right">
                    ${productsInCart[p].price} €
                    <button type="button" data-name="${productsInCart[p].name}" class="delete-product-button btn btn-dark mx-3 px-1 py-1">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>`
        document.getElementById("products-in-cart").innerHTML += productToDisplay;
    }
}

function deleteProduct() {
        document.getElementById("products-in-cart").onclick = function(e) {
        if (e.target && e.target.classList.contains('delete-product-button')) {
            let productsInCart = JSON.parse(localStorage.getItem("product"));
            for(const k in productsInCart) {
                if(productsInCart[k].name === e.target.dataset.name) {
                    productsInCart.splice(k, 1);
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

function displayTotalAmount() {
    let productsInCart = JSON.parse(localStorage.getItem("product"));
    let setTotalAmount = 0;
    for(const p in productsInCart) {
        setTotalAmount += productsInCart[p].price;
    }
    const totalAmount = 
        `<tr>
            <td colspan=3 class="text-right font-weight-bold">Montant total : ${setTotalAmount} €</td>
        </tr>`;
    document.getElementById("total-amount").innerHTML = totalAmount;
}

function displayEmptyCart() {
    const emptyCart =
        `<p class="text-center">Le pannier est vide !</p>`
    document.getElementById("empty-cart").innerHTML = emptyCart;
}