import retrieveContent from './query.js';

async function showContent() {
  try {
    const data = await retrieveContent();

    for(let i in data) {

      const carouselContent =
        `<div class="carousel-item">
            <img src="${data[i].imageUrl}" class="d-block w-100" alt="${data[i].description}">
        </div>`;

      const cardProduct =
        `<div class="col-12 col-lg-4 my-2">
            <div class="card shadow">
              <img src="${data[i].imageUrl}" alt="${data[i].description}" class="card-img-top">
              <div class="card-body">
                  <a href="http://localhost:5000/product.html?id=${data[i]._id}" class="card-title stretched-link">${data[i].name}</a>
                  <p class="card-text">${data[i].price/100} €</p>
              </div>
            </div>
        </div>`;

      document.getElementById("carousel-content").innerHTML += carouselContent;
      document.getElementById("card-products").innerHTML += cardProduct;

      if(i==0){
        document.getElementById("carousel-content").children[0].classList.add("active");
      }
    }
  } catch (e) {
    console.log('Error', e);
  }
}

showContent();