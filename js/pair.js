

const minute = document.querySelector('.minute');
const second = document.querySelector('.second');

let seconds = 0;

let hasGameStarted = 0;

const update = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
};

function measureTime() {
    if (hasGameStarted === 0) {
        hasGameStarted = 1;
        const startInterval = setInterval(function() {
            seconds++;
            minute.textContent = update(Math.floor(seconds / 60));
            second.textContent = update(seconds % 60);
            if (flipped.length == 10) clearInterval(startInterval);
        }, 1000);
    };
};

function startInterval() {
    setInterval(intervalTime, 1000);
};






(function () {
  // Kártya ikonok elhelyezése 
  const icons = [
    
      'fa-bell',
      'fa-bank',
      'fa-bus',
      'fa-anchor',
      'fa-cab',
  ];
  
  let points = 0;

  
  const getOneCard = (icon) => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<div class="card__front">
              <i class="fa ${icon}"></i>
          </div>
          <div class="card__back">
              <img src="/pics/card-back.png" alt="back">
          </div>`;
      return div;
  };

  // Shuffle azaz kártya keverés
  
  const shuffle = (array) => {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

  // Show cards.
  const iconArray = icons.concat(icons);
  shuffle(iconArray);
  const row1 = document.querySelector('.cards__container .row:first-child');
  const row2 = document.querySelector('.cards__container .row:last-child');
  let i = 0;
  for (const icon of iconArray) {
      i++;
      const card = getOneCard(icon);
      if (i < 6) {
          row1.appendChild(card);
      } else {
          row2.appendChild(card);
      }
  }

  let blockClicks = false;
  const cardClick = (ev) => {
      if (blockClicks) {
          return;
      }

      ev.currentTarget.classList.toggle('flipped');
      const flippedCards = document.querySelectorAll('.card.flipped');
      if (flippedCards.length > 1) {
          blockClicks = true;
          const to = setTimeout( () => {
              clearTimeout(to);
              blockClicks = false;
              document.querySelectorAll('.card').forEach( card => {
                  card.classList.remove('flipped');
              });
          }, 2000);

          checkPair();
      }


  };

  const cards = document.querySelectorAll('.card');
  cards.forEach( card => {
      card.addEventListener('click', cardClick);
  });

  const showPoints = (points) => {
      document.querySelector('.user-points').textContent = points;
  }

  const checkPair = () => {
      const firstCardIcon = document.querySelector('.card.flipped i');
      if (firstCardIcon) {
          const firstIconClass = firstCardIcon.className.split(' ');
          const pair = document.querySelectorAll(`.card.flipped .${firstIconClass.pop()}`);
          if (pair.length == 2) {
              points++;
              showPoints(points);
              document.querySelectorAll(`.card.flipped`).forEach( 
                  card => card.classList.add('found') 
              );
          }
      }
  }
})();