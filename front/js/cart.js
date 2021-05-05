function sendOrder(){
    let productsInCart = JSON.parse(localStorage.getItem("product"));
    console.log(formValues);
    console.log(productsInCart);
    fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            contact: formValues,
            products: productsInCart
          })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log('Error', error))
}

async function showContent() {
    try {
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
 




//-------------------------------- Cart Functions -------------------------------------

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



//-------------------------------- Form Functions -------------------------------------

let formValues = {
    firstName : document.getElementById("inputFirstName").value,
    lastName : document.getElementById("inputLastName").value,
    address : document.getElementById("inputAddress").value,
    city : document.getElementById("inputCity").value,
    email : document.getElementById("inputMail").value
}

function formControl(regex, value) {
    if(regex.test(value)) {
        return true;
    } else {
        return false; 
    }
}

function mailConfirmControl() {
    if(document.getElementById("inputMail").value === document.getElementById("inputMailConfirm").value) {
        return true;
    } else {
        return false; 
    }
}

function changeBorderColor(regex, input) {
    document.getElementById(input).addEventListener('input', function(e) {
        if(formControl(regex, e.target.value)) {
            document.getElementById(input).classList.remove("border-danger");
            document.getElementById(input).classList.add("border-success");
        } else {
            document.getElementById(input).classList.remove("border-success");
            document.getElementById(input).classList.add("border-danger");
        }
    });
}

function changeMailConfirmBorderColor(regex) {
    document.getElementById("inputMailConfirm").addEventListener('input', function(e) {
        if(mailConfirmControl() && formControl(regex, e.target.value)) {
            document.getElementById("inputMailConfirm").classList.remove("border-danger");
            document.getElementById("inputMailConfirm").classList.add("border-success");
        } else {
            document.getElementById("inputMailConfirm").classList.remove("border-success");
            document.getElementById("inputMailConfirm").classList.add("border-danger");
        }
    });
}

formControl(/^[A-Za-z-éïî]{3,20}$/, formValues.firstName);
changeBorderColor(/^[A-Za-z-éïî]{3,20}$/, "inputFirstName");

formControl(/^[A-Za-z]{3,20}$/, formValues.lastName);
changeBorderColor(/^[A-Za-z]{3,20}$/, "inputLastName");

formControl(/^[A-Za-z0-9\s]{3,40}$/, formValues.address);
changeBorderColor(/^[A-Za-z0-9\s]{3,40}$/, "inputAddress");

formControl(/^[A-Za-z\s-]{3,20}$/, formValues.city);
changeBorderColor(/^[A-Za-z\s-]{3,20}$/, "inputCity");

formControl(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/, formValues.email);
changeBorderColor(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/, "inputMail");

mailConfirmControl();
changeMailConfirmBorderColor(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/);




document.getElementById("checkout-button").addEventListener('click', function(e) {
    e.preventDefault();

    formValues = {
        firstName : document.getElementById("inputFirstName").value,
        lastName : document.getElementById("inputLastName").value,
        address : document.getElementById("inputAddress").value,
        city : document.getElementById("inputCity").value,
        email : document.getElementById("inputMail").value
    };

    if(formControl(/^[A-Za-z-éïî]{3,20}$/, formValues.firstName) 
        && formControl(/^[A-Za-z]{3,20}$/, formValues.lastName) 
        && formControl(/^[A-Za-z0-9\s]{3,40}$/, formValues.address) 
        && formControl(/^[A-Za-z\s-]{3,20}$/, formValues.city) 
        && formControl(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/, formValues.email)
        && mailConfirmControl()) {
            console.log("OUI");
            sendOrder();
        } else {
            console.log("NON");
        }
});