const imgUploadInput = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const cancelUploadButton = document.querySelector('#upload-cancel');
const descriptionInput = uploadForm.querySelector('.text__description');

const scaleUpButton = uploadForm.querySelector('.scale__control--bigger');
const scaleDownButton = uploadForm.querySelector('.scale__control--smaller');
const scaleValue = uploadForm.querySelector('.scale__control--value');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;

const createTagsArray = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const stencilIsValid = (value) =>
  createTagsArray(value).every((tag) => VALID_HASHTAG.test(tag));

const amountIsValid = (value) =>
  createTagsArray(value).length <= MAX_HASHTAGS;

const uniquenessIsValid = (value) => {
  const loverCaseTags = createTagsArray(value).map((tag) => tag.toLowerCase());
  return loverCaseTags.length === new Set(loverCaseTags).size;
};

pristine.addValidator(
  hashTagInput,
  stencilIsValid,
  'Неправильный хэштег',
  1,
  true
);

pristine.addValidator(
  hashTagInput,
  uniquenessIsValid,
  'Хэштеги должны быть уникальные',
  2,
  true
);

pristine.addValidator(
  hashTagInput,
  amountIsValid,
  'Максимум 5 хэштегов',
  3,
  true
);

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeingImgFilter();
  }
}

function onDocumentKeydownWhileFocus(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

const imgPreview = document.querySelector('.img-upload__preview');

function scaleUp () {
  let valueNumber = Number(scaleValue.value.replace('%',''));
  const valueScale = valueNumber / 100;
  if (valueNumber < 100) {
    valueNumber += 25;
    imgPreview.style.transform = `scale(${valueScale + 0.25})`;
    scaleValue.value = `${valueNumber}%`;
  }
}

function scaleDown () {
  let valueNumber = Number(scaleValue.value.replace('%','')); //значение value без % ДО уменьшения
  const valueScale = valueNumber / 100; //значение scale for transform ДО уменьшения
  if (valueNumber >= 50 && valueNumber <= 100) {
    valueNumber -= 25; //уменьшение
    scaleValue.value = `${valueNumber}%`; // присваивание value с %
    imgPreview.style.transform = `scale(${valueScale - 0.25})`; // добавление стиля transform с %
  }
}

const openingImgFilter = () => {
  uploadForm.reset();
  pristine.reset();
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

  imgPreview.style.transform = 'scale(1)';

  scaleUpButton.addEventListener('click', scaleUp);
  scaleDownButton.addEventListener('click', scaleDown);

  cancelUploadButton.addEventListener('click', closeingImgFilter);
  document.addEventListener('keydown', onDocumentKeydown);
  hashTagInput.addEventListener('keydown', onDocumentKeydownWhileFocus);
  descriptionInput.addEventListener('keydown', onDocumentKeydownWhileFocus);
};

const closeingImgFilter = () => {
  pristine.reset();
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUploadInput.value = '';
  cancelUploadButton.removeEventListener('click', closeingImgFilter);
  scaleUpButton.removeEventListener('click', scaleUp);
  scaleDownButton.removeEventListener('click', scaleDown);
};

imgUploadInput.addEventListener('change', openingImgFilter);

const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');

const originalButton = document.querySelector('#effect-none');
const chromeButton = document.querySelector('#effect-chrome');
const sepiaButton = document.querySelector('#effect-sepia');
const marvinButton = document.querySelector('#effect-marvin');
const phobosButton = document.querySelector('#effect-phobos');
const heatButton = document.querySelector('#effect-heat');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

slider.noUiSlider.on('update', () => {
  sliderValue.value = slider.noUiSlider.get();
});

sliderContainer.classList.add('hidden');
slider.classList.add('hidden');
sliderValue.value = '';

marvinButton.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');
  slider.classList.remove('hidden');
  if (evt.target.checked) {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      imgPreview.style.filter = `invert(${sliderValue.value}%)`;
    });
  }
});

sepiaButton.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');
  slider.classList.remove('hidden');
  if (evt.target.checked) {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    });
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      imgPreview.style.filter = `sepia(${sliderValue.value})`;
    });
  }
});

chromeButton.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');
  slider.classList.remove('hidden');
  if (evt.target.checked) {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    });
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      imgPreview.style.filter = `grayscale(${sliderValue.value})`;
    });
  }
});

phobosButton.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');
  slider.classList.remove('hidden');
  if (evt.target.checked) {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1
    });
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      imgPreview.style.filter = `blur(${sliderValue.value}px)`;
    });
  }
});

heatButton.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');
  slider.classList.remove('hidden');
  if (evt.target.checked) {
    slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      imgPreview.style.filter = `brightness(${sliderValue.value})`;
    });
  }
});

originalButton.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderContainer.classList.add('hidden');
    slider.classList.add('hidden');
    sliderValue.value = '';
    imgPreview.style.filter = '';
  }
});

export {};

sdelalDelo();
