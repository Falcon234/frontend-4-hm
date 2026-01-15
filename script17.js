<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pixabay Editor's Choice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f6f8;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 1100px;
      margin: 20px auto;
      padding: 16px;
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }

    .card {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .card img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      display: block;
    }

    .info {
      padding: 10px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }

    .load-more {
      display: block;
      margin: 30px auto;
      padding: 10px 20px;
      font-size: 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .load-more:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>

<div class="container">
  <h1>Editor's Choice — Pixabay</h1>

  <div id="gallery" class="gallery"></div>

  <button id="loadMoreBtn" class="load-more">Завантажити ще</button>
</div>

<script>
  const API_KEY = '54212080-5be9a6906c6b76d8e51d64a2c'; 
  const BASE_URL = 'https://pixabay.com/api/';
  const PER_PAGE = 12;

  const galleryEl = document.getElementById('gallery');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  let page = Number(localStorage.getItem('page')) || 1;

  async function fetchEditorsChoice() {
    try {
      const url = `${BASE_URL}?key=${API_KEY}&editors_choice=true&image_type=photo&orientation=horizontal&page=${page}&per_page=${PER_PAGE}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Помилка запиту до Pixabay API');
      }

      const data = await response.json();
      return data.hits;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function renderImages(images) {
    const markup = images.map(img => `
      <div class="card">
        <img src="${img.webformatURL}" alt="${img.tags}" />
        <div class="info">
          <span>❤️ ${img.likes}</span>
          <span>👁️ ${img.views}</span>
        </div>
      </div>
    `).join('');

    galleryEl.insertAdjacentHTML('beforeend', markup);
  }

  async function loadImages() {
    const images = await fetchEditorsChoice();
    renderImages(images);
    localStorage.setItem('page', page);
  }

  loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    await loadImages();
  });

  loadImages();
</script>

</body>
</html>
