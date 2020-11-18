let img = document.querySelector('img');
const baseValues = {
  top: img.offsetTop,
  left: img.offsetLeft
}
let slider = document.querySelector("#myRange");
let maxValueX = window.innerWidth - (img.height / 2);
let maxValueY = window.innerHeight - (img.width / 2);
let minValueX = (img.height / 2);
let minValueY = (img.width / 2);

let imageManager = {
  goUp: () => {
    img.style.top = img.offsetTop - 10 + 'px';
  },
  goDown: () => {
    img.style.top = img.offsetTop + 10 + 'px';
  },
  goLeft: () => {
    img.style.left = img.offsetLeft - 10 + 'px';
  },
  goRight: () => {
    img.style.left = img.offsetLeft + 10 + 'px';
  }
}

let loop = setInterval(moveToRandomPos, 500);

slider.oninput = function() {
  clearInterval(loop);
  loop = setInterval(moveToRandomPos, this.value);
  document.querySelector('span').innerHTML = this.value;
}

function moveToRandomPos() {
  const operation = getRandomOperation();
  imageManager[operation]()
  if (img.offsetTop > maxValueY || img.offsetTop < minValueY || img.offsetLeft < minValueX || img.offsetLeft > maxValueX) {
    resetPos()
  }
}

function resetPos() {
  img.style.top = baseValues.top + 'px';
  img.style.left = baseValues.left + 'px';
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min
}

function getRandomOperation() {
  const keys = Object.keys(imageManager).filter(key => key !== 'image')
  return keys[getRandomNumber(0, keys.length)]
}