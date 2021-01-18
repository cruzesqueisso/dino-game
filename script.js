const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let position = 0;
let isJumping = false;
let isGameOver = false;

function handleKeyUp(event) {
  if(event.keyCode === 32 && ! isJumping) {
    jump();
  }

  if(event.keyCode === 13 && isGameOver) {
    location.reload();
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 160) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  if (isGameOver) return;

  const cactus = document.createElement('div');
  let cactusStartPosition = background.clientWidth - 60;
  let cactusPosition = cactusStartPosition;
  let randomTime = Math.random() * 5000;

  cactus.classList.add('cactus');
  cactus.style.left = cactusStartPosition + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = '<div class="game-over"><h1>Game Over</h1><button class="btn" onclick="location.reload()">Play again (ENTER)</button></div>';
      isGameOver = true;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}


createCactus();
document.addEventListener('keydown', handleKeyUp);