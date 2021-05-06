//------------------------------------ Query Function ------------------------------------------

function sendOrder(formValues) {
    let productsInCart = JSON.parse(localStorage.getItem("product"));
    let product_id = [];
    for (const p in productsInCart) {
        product_id.push(productsInCart[p].id);
    }
    fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contact: formValues,
                products: product_id,
            }),
        })
        .then((res) => res.json())
        .then((res) => localStorage.setItem("order", JSON.stringify(res)))
        .catch((error) => console.log("Error", error));
}

//------------------------------------- Global Display Function ---------------------------------

function showContent() {
    let productsInCart = JSON.parse(localStorage.getItem("product"));

    if (productsInCart === null || productsInCart == 0) {
        displayEmptyCart();
        setHomeButton();
    } else {
        setPrice(productsInCart);
        displayCart(productsInCart);
        setDeleteAndQuantityButtons(productsInCart);
        displayClearCartbutton();
        setClearCartbutton();
        displayTotalAmount(productsInCart);
        setCartEndButtons();

        displayForm();
        applyFormControlOnInput();
        setFormSubmit();
    }
}

showContent();

//--------------------------------------- Cart Functions -----------------------------------------

function setPrice(productsInCart) {
    for (const p in productsInCart) {
        productsInCart[p].finalPrice =
            productsInCart[p].unitPrice * productsInCart[p].quantity;
        localStorage.setItem("product", JSON.stringify(productsInCart));
    }
}

function displayCart(productsInCart) {
    const tableHead = `<tr>
            <th scope="col" class="text-left">Article</th>
            <th scope="col" class="text-center">Quantité</th>
            <th scope="col" class="text-right">Prix</th>
        </tr>`;
    document.getElementById("table-head").innerHTML += tableHead;
    for (const p in productsInCart) {
        const productToDisplay = `<tr>
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
            </tr>`;
        document.getElementById("products-in-cart").innerHTML += productToDisplay;
    }
}

function setDeleteAndQuantityButtons(productsInCart) {
    document.getElementById("products-in-cart").onclick = function (e) {
        if (e.target && e.target.classList.contains("delete-product-button")) {
            for (const p in productsInCart) {
                if (productsInCart[p].name === e.target.dataset.name) {
                    productsInCart.splice(p, 1);
                    localStorage.setItem("product", JSON.stringify(productsInCart));
                    window.location.href = "cart.html";
                }
            }
        }
        if (e.target && e.target.classList.contains("remove-quantity-button")) {
            for (const p in productsInCart) {
                if (productsInCart[p].name === e.target.dataset.name) {
                    productsInCart[p].quantity--;
                    if (productsInCart[p].quantity == 0) {
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
        if (e.target && e.target.classList.contains("add-quantity-button")) {
            for (const p in productsInCart) {
                if (productsInCart[p].name === e.target.dataset.name) {
                    productsInCart[p].quantity++;
                    localStorage.setItem("product", JSON.stringify(productsInCart));
                    window.location.href = "cart.html";
                }
            }
        }
    };
}

function displayClearCartbutton() {
    const clearCartbutton = `<tr>
            <td colspan=3>
                <button type="button" id="clear-cart-button" class="btn btn-dark col">Vider le panier</button>
            </td>
        </tr>`;
    document
        .getElementById("products-in-cart")
        .insertAdjacentHTML("beforeend", clearCartbutton);
}

function setClearCartbutton(productsInCart) {
    document
        .getElementById("clear-cart-button")
        .addEventListener("click", function (e) {
            e.preventDefault;
            productsInCart = [];
            localStorage.setItem("product", JSON.stringify(productsInCart));
            window.location.href = "cart.html";
        });
}

function displayTotalAmount(productsInCart) {
    let setTotalAmount = 0;
    for (const p in productsInCart) {
        setTotalAmount += productsInCart[p].finalPrice;
    }
    const totalAmount = `<tr>
            <td colspan=3 class="text-right font-weight-bold">Montant total : ${setTotalAmount} €</td>
        </tr>`;
    document.getElementById("total-amount").innerHTML = totalAmount;

    localStorage.setItem("orderTotalAmount", JSON.stringify(setTotalAmount));
}

function setCartEndButtons() {
    const CartEndButtons = `<div class="col-12 col-lg my-2">
    <button id="ReturnToProducts" type="button" class="btn btn-dark col">Continuer vos achats</button>
    </div>
    <div class="col-12 col-lg my-2">
    <button id="goToCheckout" type="button" class="btn btn-dark col">Aller à la caisse</button>
    </div>`;

    document.getElementById("CartEndButtons").innerHTML = CartEndButtons;

    document
        .getElementById("ReturnToProducts")
        .addEventListener("click", function (e) {
            e.preventDefault;
            window.location.href = "index.html";
        });

    document
        .getElementById("goToCheckout")
        .addEventListener("click", function (e) {
            e.preventDefault;
            window.location.href = "#checkout-form";
        });
}

function displayEmptyCart() {
    const emptyCart = `<p class="text-center h2 my-5">Le pannier est vide !</p>`;
    document.getElementById("empty-cart").innerHTML = emptyCart;
}

function setHomeButton() {
    const homeButton = `<button type="button" class="btn btn-dark col">Retour à l'accueil</button>`;

    document.getElementById("empty-cart").innerHTML += homeButton;

    document
        .querySelector("#empty-cart button")
        .addEventListener("click", function (e) {
            e.preventDefault;
            window.location.href = "index.html";
        });
}

//-------------------------------------- Form Functions ------------------------------------------

function displayForm() {
    const CheckoutForm = `<div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputFirstName">Prénom</label>
                <input type="text" class="form-control" id="inputFirstName" placeholder="Prénom" required>
            </div>
            <div class="form-group col-md-6">
                <label for="inputLastName">Nom</label>
                <input type="text" class="form-control" id="inputLastName" placeholder="Nom" required>
            </div>
        </div>
        <div class="form-group">
            <label for="inputAddress">Addresse</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="6 rue des oursons" required>
        </div>
        <div class="form-group">
            <label for="inputCity">Ville</label>
            <input type="text" class="form-control" id="inputCity" placeholder="Paris" required>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputMail">E-mail</label>
                <input type="email" class="form-control" id="inputMail" placeholder="exemple@mail.com" required>
            </div>
            <div class="form-group col-md-6">
                <label for="inputMail">Confirmation e-mail</label>
                <input type="email" class="form-control" id="inputMailConfirm" placeholder="exemple@mail.com" required>
            </div>
        </div>
        <div id="unvalid-form-message" class="col">
        </div>
        <button type="submit" id="checkout-button" class=" col btn btn-dark">Acheter maintenant</button>`;

    document.getElementById("checkout-form").innerHTML = CheckoutForm;
}

function formControl(regex, inputValue) {
    if (regex.test(inputValue)) {
        return true;
    } else {
        return false;
    }
}

function mailConfirmControl() {
    if (
        document.getElementById("inputMail").value ===
        document.getElementById("inputMailConfirm").value
    ) {
        return true;
    } else {
        return false;
    }
}

function changeBorderColorOnInput(regex, input) {
    document.getElementById(input).addEventListener("input", function (e) {
        if (formControl(regex, e.target.value)) {
            document.getElementById(input).classList.remove("border-danger");
            document.getElementById(input).classList.add("border-success");
        } else {
            document.getElementById(input).classList.remove("border-success");
            document.getElementById(input).classList.add("border-danger");
        }
    });
}

function changeBorderColorOnSubmit(regex, input) {
    if (
        !formControl(regex, document.getElementById(input).value) ||
        document.getElementById(input).value === null
    ) {
        document.getElementById(input).classList.remove("border-success");
        document.getElementById(input).classList.add("border-danger");
    }
}

function changeMailConfirmBorderColor(regex) {
    document
        .getElementById("inputMailConfirm")
        .addEventListener("input", function (e) {
            if (mailConfirmControl() && formControl(regex, e.target.value)) {
                document
                    .getElementById("inputMailConfirm")
                    .classList.remove("border-danger");
                document
                    .getElementById("inputMailConfirm")
                    .classList.add("border-success");
            } else {
                document
                    .getElementById("inputMailConfirm")
                    .classList.remove("border-success");
                document
                    .getElementById("inputMailConfirm")
                    .classList.add("border-danger");
            }
        });
}

//-------------------------------- Apply form control on all fields -----------------------------

function applyFormControlOnInput() {
    formControl(
        /^[A-Za-z-éïî]{3,20}$/,
        document.getElementById("inputFirstName").value
    );
    changeBorderColorOnInput(/^[A-Za-z-éïî]{3,20}$/, "inputFirstName");

    formControl(
        /^[A-Za-z]{3,20}$/,
        document.getElementById("inputLastName").value
    );
    changeBorderColorOnInput(/^[A-Za-z]{3,20}$/, "inputLastName");

    formControl(
        /^[A-Za-z0-9\s]{3,40}$/,
        document.getElementById("inputAddress").value
    );
    changeBorderColorOnInput(/^[A-Za-z0-9\s]{3,40}$/, "inputAddress");

    formControl(
        /^[A-Za-z\s-]{3,20}$/,
        document.getElementById("inputCity").value
    );
    changeBorderColorOnInput(/^[A-Za-z\s-]{3,20}$/, "inputCity");

    formControl(
        /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/,
        document.getElementById("inputMail").value
    );
    changeBorderColorOnInput(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/, "inputMail");

    mailConfirmControl();
    changeMailConfirmBorderColor(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/);
}

function applyFormControlOnSubmit() {
    formControl(
        /^[A-Za-z-éïî]{3,20}$/,
        document.getElementById("inputFirstName").value
    );
    changeBorderColorOnSubmit(/^[A-Za-z-éïî]{3,20}$/, "inputFirstName");

    formControl(
        /^[A-Za-z]{3,20}$/,
        document.getElementById("inputLastName").value
    );
    changeBorderColorOnSubmit(/^[A-Za-z]{3,20}$/, "inputLastName");

    formControl(
        /^[A-Za-z0-9\s]{3,40}$/,
        document.getElementById("inputAddress").value
    );
    changeBorderColorOnSubmit(/^[A-Za-z0-9\s]{3,40}$/, "inputAddress");

    formControl(
        /^[A-Za-z\s-]{3,20}$/,
        document.getElementById("inputCity").value
    );
    changeBorderColorOnSubmit(/^[A-Za-z\s-]{3,20}$/, "inputCity");

    formControl(
        /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/,
        document.getElementById("inputMail").value
    );
    changeBorderColorOnSubmit(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/, "inputMail");

    formControl(
        /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/,
        document.getElementById("inputMailConfirm").value
    );
    changeBorderColorOnSubmit(
        /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/,
        "inputMailConfirm"
    );
}

//--------- If form is valid, save all fields values into an object and call sendOrder function -----------

function setFormSubmit() {
    document
        .getElementById("checkout-button")
        .addEventListener("click", function (e) {
            e.preventDefault();

            let formValues = {
                firstName: document.getElementById("inputFirstName").value,
                lastName: document.getElementById("inputLastName").value,
                address: document.getElementById("inputAddress").value,
                city: document.getElementById("inputCity").value,
                email: document.getElementById("inputMail").value,
            };

            if (
                formControl(/^[A-Za-z-éïî]{3,20}$/, formValues.firstName) &&
                formControl(/^[A-Za-z]{3,20}$/, formValues.lastName) &&
                formControl(/^[A-Za-z0-9\s]{3,40}$/, formValues.address) &&
                formControl(/^[A-Za-z\s-]{3,20}$/, formValues.city) &&
                formControl(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/, formValues.email) &&
                mailConfirmControl()
            ) {
                sendOrder(formValues);
                window.location.href = "order.html";
            } else {
                applyFormControlOnSubmit();
                const UnvalidFormMessage = `<p class="text-center text-danger">Saisie incorrecte, vérifiez que tous les champs encadrés en rouge soient remplis et valides</p>`;
                document.getElementById(
                    "unvalid-form-message"
                ).innerHTML = UnvalidFormMessage;
            }
        });
}