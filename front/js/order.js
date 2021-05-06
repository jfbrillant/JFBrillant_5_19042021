//------------------------------------- Global Display Function ---------------------------------

function showContent() {
    displayOrder();
    setHomeButton();
}

showContent();

//--------------------------------------- Display Order Functions -------------------------------------

function displayOrder() {
    let order = JSON.parse(localStorage.getItem("order"));
    let totalAmount = JSON.parse(localStorage.getItem("orderTotalAmount"));

    const showOrder = `<h2 class="pb-3 text-center">Récapitulatif de la commande :</h2>
            <p>Id : <span class="font-weight-bold">${order.orderId}</span></p>
            <p>Motant total : <span class="font-weight-bold">${totalAmount} €</span></p>`;

    document.getElementById("order").innerHTML = showOrder;
}

function setHomeButton() {
    const homeButton = `<button type="button" id="home-button" class="btn btn-dark col">Retour à l'accueil</button>`;

    document.getElementById("home-button").innerHTML += homeButton;

    document
        .querySelector("#home-button button")
        .addEventListener("click", function (e) {
            e.preventDefault;
            localStorage.clear();
            window.location.href = "index.html";
        });
}