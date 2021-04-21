import retrieveContent from './query.js';

async function showContent() {
    try {
        const data = await retrieveContent();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        for(let i in data) {
            if(id==data[i]._id){
                const cardProduct =
                    `<div class="col-12 col-lg">
                        <div class="card shadow">
                            <img src="${data[i].imageUrl}" alt="${data[i].description}" class="card-img-top">
                            <div class="card-body">
                                <h2 class="card-text">${data[i].name}</h2>
                                <p class="card-text">${data[i].description}</p>
                                <p class="card-text">${data[i].price/100} €</p>
                            </div>
                        </div>
                    </div>`;

                const colors = data[i].colors;

                for(let c in colors){
                    const colorSelect = 
                        `<option value="${colors[c]}">${colors[c]}</option>`;
                    
                    document.getElementById("color").innerHTML += colorSelect;
                }

                document.getElementById("teddy-name").innerHTML = data[i].name;
                document.getElementById("card-products").innerHTML += cardProduct;
                
            }
        }

    } catch (e) {
      console.log('Error', e);
    }
  }
  
  showContent();