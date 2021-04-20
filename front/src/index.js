import retrieveContent from './query.js';

async function showContent() {
  try {
    const data = await retrieveContent();

    let img1 = document.getElementById('img1');
    img1.src = data[0].imageUrl;

  } catch (e) {
    console.log('Error', e);
  }
}

showContent();