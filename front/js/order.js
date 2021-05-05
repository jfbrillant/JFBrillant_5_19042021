//------------------------------------- Global Display Function ---------------------------------

function showContent() {
    displayOrder();
}

showContent();

//--------------------------------------- Display Order Functions -------------------------------------

function displayOrder() {
    let order = JSON.parse(localStorage.getItem("order"));
    let totalAmount = JSON.parse(localStorage.getItem("orderTotalAmount"));

    console.log(order);

    const showOrder = `<h2>Récapitulatif de la commande :</h2>
        <p>prix total : ${totalAmount} €</p>
        <p>id : ${order.orderId}</p>`;

    document.getElementById("order").innerHTML = showOrder;
}