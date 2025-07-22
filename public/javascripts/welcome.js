  const box = document.getElementById('error-box');
  const bar = document.getElementById('progress-bar');

  if (box) {
    bar.style.width = '100%';
    bar.style.transition = 'width 3s linear';
    setTimeout(() => {
      bar.style.width = '0%';
    }, 100);

    setTimeout(() => {
      box.remove();
    }, 3100); // after 3.1 sec
  }