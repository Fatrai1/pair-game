

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
    
    //Óra 
    let timerIsRuning = false;
    let currentTime = 0;
  
  setInterval( () => {
      if(!timerIsRuning) {
          return;
        }
        currentTime++;
        showCurrentTime();
    }, 1000 );
    
    const showCurrentTime = () => {
        let minutes = Math.floor( currentTime / 60 );
        let seconds = currentTime % 60;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        document.querySelector('.current-time').textContent = 
        `${minutes}:${seconds}`;
    };
    
    
    
    //Kártyák elkészítése
    const getOneCard = (icon) => {
        const div = document.createElement('div');
        div.classList.add('col-2', 'card');
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
    const iconArray = icons.concat(icons);
    const row1 = document.querySelector('.row:nth-child(2)');
    const row2 = document.querySelector('.row:nth-child(3)');
    let i = 0;
    
    // Show cards.
    const startGame = () => {
        i = 0;
       
        
        shuffle(iconArray);
        row1.innerHTML = '';
        row2.innerHTML = '';
        for (const icon of iconArray) {
            i++;
            const card = getOneCard(icon);
            if (i < 6) {
                row1.appendChild(card);
            } else {
                row2.appendChild(card);
            }
        }
        
        const cards = document.querySelectorAll('.card');
        cards.forEach( card => {
            card.addEventListener('click', cardClick);
    });
};


let blockClicks = false;
let clickNum = 0;

const cardClick = (ev) => {

    
    if (blockClicks) {
        return;
    }
    if (ev.currentTarget.classList.contains('found')) {
        return;
    }

    clickNum++;
    if (clickNum === 1){
        timerIsRuning = true;
    }
    
    document.querySelector('.click-number').textContent = clickNum;
    
    
      ev.currentTarget.classList.toggle('flipped');
      const flippedCards = document.querySelectorAll('.card.flipped');
      if (flippedCards.length > 1) {
          blockClicks = true;
          const timeOut = setTimeout( () => {
              clearTimeout(timeOut);
              blockClicks = false;
              document.querySelectorAll('.card').forEach( card => {
                  card.classList.remove('flipped');
              });
          }, 1500);
          checkPair();
      }
  };


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
                if (points === icons.length){
                    timerIsRuning = false;
                    const to = setTimeout( () => {
                        currentTime = 0;
                        points = 0;
                        clickNum = 0;
                        showCurrentTime();
                        showPoints()
                        startGame();
                    }, 5000 );
                }
          }
      }
  }
  startGame();
})();