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

    for(const d in data) {

      displayCarousel(data[d]);
      displayCardsProduct(data[d]);
    }
    document.getElementById("carousel-content").children[0].classList.add("active");

  } catch (e) {
    console.log('Error', e);
  }
}

showContent();




function displayCarousel(product) {
  const carouselContent =
    `<div class="carousel-item">
        <img src="${product.imageUrl}" class="d-block w-100" alt="${product.description}">
    </div>`;

  document.getElementById("carousel-content").innerHTML += carouselContent;
}



function displayCardsProduct(product) {
  const cardProduct =
    `<div class="col-12 col-lg-4 my-2">
        <div class="card shadow">
          <img src="${product.imageUrl}" alt="${product.description}" class="card-img-top">
          <div class="card-body">
              <a href="product.html?id=${product._id}" class="card-title stretched-link">${product.name}</a>
              <p class="card-text">${product.price/100} €</p>
          </div>
        </div>
    </div>`;

  document.getElementById("card-products").innerHTML += cardProduct;
}

