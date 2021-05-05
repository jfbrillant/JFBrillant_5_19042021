//------------------------------------ Query Function ------------------------------------------

async function retrieveProducts() {
  try {
    const res = await fetch("http://localhost:3000/api/teddies");
    return res.json();
  } catch (e) {
    console.log("Error", e);
  }
}

//------------------------------------- Global Display Function ---------------------------------

async function showContent() {
  try {
    const products = await retrieveProducts();

    for (const p in products) {
      displayCarousel(products[p]);
      displayCardsProduct(products[p]);
    }
    document
      .getElementById("carousel-content")
      .children[0].classList.add("active");
  } catch (e) {
    console.log("Error", e);
  }
}

showContent();

//--------------------------------------- Index Functions -----------------------------------------

function displayCarousel(product) {
  const carouselContent = `<div class="carousel-item">
        <img src="${product.imageUrl}" class="d-block w-100" alt="${product.description}">
    </div>`;

  document.getElementById("carousel-content").innerHTML += carouselContent;
}

function displayCardsProduct(product) {
  const cardProduct = `<div class="col-12 col-lg-4 my-2">
        <div class="card shadow">
          <img src="${product.imageUrl}" alt="${
    product.description
  }" class="card-img-top">
          <div class="card-body">
              <a href="product.html?id=${
                product._id
              }" class="card-title stretched-link">${product.name}</a>
              <p class="card-text">${product.price / 100} €</p>
          </div>
        </div>
    </div>`;

  document.getElementById("card-products").innerHTML += cardProduct;
}