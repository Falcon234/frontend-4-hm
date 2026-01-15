<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <title>Mouse Move with Debounce</title>

  <style>
    #box {
      width: 50px;
      height: 50px;
      background-color: red;
      position: absolute;
      top: 0;
      left: 0;
    }
  </style>
</head>
<body>

  <div id="box"></div>

  <!-- Lodash debounce -->
  <script src="https://cdn.jsdelivr.net/npm/lodash.debounce@4.0.8/index.js"></script>

  <script>
    const box = document.getElementById('box');

    const moveBox = _.debounce(event => {
      box.style.left = event.clientX + 'px';
      box.style.top = event.clientY + 'px';
    }, 100);

    document.addEventListener('mousemove', moveBox);
  </script>

</body>
</html>
