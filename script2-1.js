<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <title>Slider with Debounce</title>

  <style>
    .slider {
      max-width: 400px;
      margin: 40px auto;
      text-align: center;
    }

    .slider__input {
      width: 100%;
    }

    .slider__image {
      display: block;
      margin: 20px auto;
      transition: width 0.2s ease;
    }
  </style>
</head>
<body>

  <div class="slider">
    <input
      type="range"
      min="50"
      max="300"
      value="150"
      class="slider__input"
    />
    <img
      src="https://via.placeholder.com/300x300"
      class="slider__image"
      alt="Preview"
    />
  </div>

  <script>
    const sliderInput = document.querySelector('.slider__input');
    const sliderImage = document.querySelector('.slider__image');

    function debounce(fn, delay) {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          fn.apply(this, args);
        }, delay);
      };
    }

    const resizeImage = debounce(event => {
      const size = event.target.value;
      sliderImage.style.width = size + 'px';
    }, 200);

    sliderInput.addEventListener('input', resizeImage);
  </script>

</body>
</html>
