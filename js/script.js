var feedbackModal = document.querySelector('.feedback');
var feedbackBtn = document.querySelector('.button-contacts');
var mapModal = document.querySelector('.map');
var mapBtn = document.querySelector('.map-link');
var closeModalBtns = document.querySelectorAll('.button-close-modal');
var feedbackNameInput = document.querySelector('[name="name"]');
var feedbackEmailInput = document.querySelector('[name="email"]');
var feedbackTextarea = document.querySelector('[name="text"]');
var feedbackForm = document.querySelector('.feedback-form');
var sliderControls = document.querySelectorAll('.slider-control');
var modalShowClassName = 'modal-show';
var modalErrorClassName = 'modal-error';
var activeControlClassName = 'slider-control-active';
var activeSlideClassName = 'slide-active';
var isStorageSupport = true;
var nameStorage = '';
var emailStorage = '';
var escKeyCode = 27;

try {
  nameStorage = localStorage.getItem('name');
  emailStorage = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

/** Открытие формы обратной связи */
feedbackBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  feedbackModal.classList.add(modalShowClassName);

  if (nameStorage && emailStorage) {
    feedbackNameInput.value = nameStorage;
    feedbackEmailInput.value = emailStorage;
    feedbackTextarea.focus();
  } else if (nameStorage) {
    feedbackNameInput.value = nameStorage;
    feedbackEmailInput.focus();
  } else if (emailStorage) {
    feedbackEmailInput.value = emailStorage;
    feedbackNameInput.focus();
  } else {
    feedbackNameInput.focus();
  }
});

/** Открытие формы с картой */
mapBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  mapModal.classList.add(modalShowClassName);
});

/** Отправка формы обратной связи */
feedbackForm.addEventListener('submit', function (evt) {
  if (!feedbackNameInput.value || !feedbackEmailInput.value || !feedbackTextarea.value) {
    evt.preventDefault();
    feedbackModal.classList.remove(modalErrorClassName);
    feedbackModal.offsetWidth = feedbackModal.offsetWidth;
    feedbackModal.classList.add(modalErrorClassName);
  } else {
    localStorage.setItem('name', feedbackNameInput.value);
    localStorage.setItem('email', feedbackEmailInput.value);
  }
});

/** Назначение события закрытия модального окна при нажатии кнопки закрытия */
closeModalBtns.forEach(function (item) {
  item.addEventListener('click',function (evt) {
    closeOpenedModal(item.parentElement);
  })
});

/** Назначение события закрытия модального окна при нажатии esc */
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === escKeyCode) {
    var openedModal = document.querySelector('.' + modalShowClassName);
    if (openedModal) {
      evt.preventDefault();
      closeOpenedModal(openedModal);
    }
  }
});

/** Переключение слайдов */
sliderControls.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault();

    var currentControlId = item.dataset.slideControlId;
    document.querySelector('.slider-control.' + activeControlClassName).classList.remove(activeControlClassName);
    item.classList.add(activeControlClassName);

    document.querySelector('.' + activeSlideClassName).classList.remove(activeSlideClassName);
    document.querySelector('[data-slide-id="' + currentControlId + '"]').classList.add(activeSlideClassName);

  });
});

/** Логика закрытия модального окна */
function closeOpenedModal(item) {
  item.classList.remove(modalShowClassName);
  item.classList.remove(modalErrorClassName);
}
