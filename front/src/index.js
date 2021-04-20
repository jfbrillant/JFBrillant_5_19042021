import retrieveContent from './query.js';

async function showContent() {
  try {
    const data = await retrieveContent();

    let imgCard1 = document.getElementById('img-card-1');
    imgCard1.src = data[0].imageUrl;
    let nameCard1 = document.getElementById('name-card-1');
    nameCard1.innerHTML = data[0].name;
    let priceCard1 = document.getElementById('price-card-1');
    priceCard1.innerHTML = data[0].price/100 + "€";

    let imgCard2 = document.getElementById('img-card-2');
    imgCard2.src = data[1].imageUrl;
    let nameCard2 = document.getElementById('name-card-2');
    nameCard2.innerHTML = data[1].name;
    let priceCard2 = document.getElementById('price-card-2');
    priceCard2.innerHTML = data[1].price/100  + "€";

    let imgCard3 = document.getElementById('img-card-3');
    imgCard3.src = data[2].imageUrl;
    let nameCard3 = document.getElementById('name-card-3');
    nameCard3.innerHTML = data[2].name;
    let priceCard3 = document.getElementById('price-card-3');
    priceCard3.innerHTML = data[2].price/100  + "€";

    let imgCard4 = document.getElementById('img-card-4');
    imgCard4.src = data[3].imageUrl;
    let nameCard4 = document.getElementById('name-card-4');
    nameCard4.innerHTML = data[3].name;
    let priceCard4 = document.getElementById('price-card-4');
    priceCard4.innerHTML = data[3].price/100  + "€";

    let imgCard5 = document.getElementById('img-card-5');
    imgCard5.src = data[4].imageUrl;
    let nameCard5 = document.getElementById('name-card-5');
    nameCard5.innerHTML = data[4].name;
    let priceCard5 = document.getElementById('price-card-5');
    priceCard5.innerHTML = data[4].price/100  + "€";

  } catch (e) {
    console.log('Error', e);
  }
}

showContent();