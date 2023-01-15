document.addEventListener('click', (evt) => {
  const menuToggleButton = document.querySelector('.menu-toggle');
  const menuRoundButton = document.querySelector('.menu-round');

  if (evt.target === menuToggleButton) {
    menuToggleButton.classList.toggle('open');
    menuRoundButton.classList.toggle('open');
  }
})

// TODO Разметка
{/* <div>
	
  <div class="menu-toggle">+</div>
  
  <div class="menu-round">
    <div class="btn-app">t</div>
    <div class="btn-app">f</div>
    <div class="btn-app">w</div>
  </div>
  
</div> */}