let btn = document.querySelector('.btn');
let popup = document.querySelector('.popup');

btn.addEventListener('click', () => {
  popup.classList.remove('hide');
});