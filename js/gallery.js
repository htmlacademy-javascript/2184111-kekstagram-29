import { createPosts } from '/js/data.js';
import { isEscapeKey } from '/js/util.js';
const posts = createPosts();
const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const pictureFiller = () => {
  const pictureDataFragment = document.createDocumentFragment();
  for (let i = 0; i < posts.length; i++) {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = posts[i].url;
    pictureItem.querySelector('.picture__img').alt = posts[i].description;
    pictureItem.querySelector('.picture__likes').textContent = posts[i].likes;
    pictureItem.querySelector('.picture__comments').textContent =
      posts[i].comments.length;
    pictureDataFragment.appendChild(pictureItem);
  }
  return pictureDataFragment;
};

const picturesData = pictureFiller();

pictures.append(picturesData);

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureContainer = document.querySelector('.big-picture__img');
const bigImage = bigPictureContainer.querySelector('img');
const bigPictureSocial = document.querySelector('.social');
const bigPictureCloseButton = document.querySelector('#picture-cancel');
const bigPictureCommentsCount = bigPictureSocial.querySelector(
  '.comments-count__max'
);
const bigPictureCommentsCountMin = bigPictureSocial.querySelector(
  '.comments-count__min'
);
const bigPictureLikes = bigPictureSocial.querySelector('.likes-count');
const bigPictureDescription =
  bigPictureSocial.querySelector('.social__caption');
const bigPictureCommentList =
  bigPictureSocial.querySelector('.social__comments');
const bigPictureCommentItem =
  bigPictureCommentList.querySelector('.social__comment');
// const bigPictureCommentsCounter = document.querySelector(
//   '.social__comment-count'
// );
const bigPictureCommentsLoader = document.querySelector('.comments-loader');
const bodyObject = document.querySelector('body');

function commentsLoading() {
  for (let j = 0; j < 5; j++) {
    const hiddenComments = bigPictureCommentList.querySelectorAll('.hidden');
    if (hiddenComments.length) {
      hiddenComments[0].classList.remove('hidden');
      bigPictureCommentsCountMin.textContent =
        bigPictureCommentList.querySelectorAll('li:not(.hidden)').length;
    }

    if (
      bigPictureCommentsCountMin.textContent ===
      bigPictureCommentsCount.textContent
    ) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
  }
}

function onCommentsLoaderClick(evt) {
  evt.preventDefault();
  commentsLoading();
}

const closeBigPicture = () => {
  bigPictureModal.classList.add('hidden');
  bodyObject.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCommentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onBPcloseButtonClick(evt) {
  evt.preventDefault();
  closeBigPicture();
}

const onMiniatureClick = function (evt) {
  if (evt.target.nodeName === 'IMG') {
    bigPictureCommentsCountMin.textContent = 5;
    bigPictureCommentsCount.textContent = 0;
    bigPictureModal.classList.remove('hidden');
    bigImage.src = evt.target.src;
    bigImage.alt = evt.target.alt;
    bigPictureCommentsCount.textContent =
      evt.target.nextElementSibling.querySelector(
        '.picture__comments'
      ).textContent;
    bigPictureDescription.textContent = evt.target.alt;
    bigPictureLikes.textContent =
      evt.target.nextElementSibling.querySelector(
        '.picture__likes'
      ).textContent;
    bodyObject.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    bigPictureCloseButton.addEventListener('click', onBPcloseButtonClick);

    const createCommentNode = (commentData) => {
      const commentNodeClone = bigPictureCommentItem.cloneNode(true);
      commentNodeClone.querySelector('img').src = commentData.avatar;
      commentNodeClone.querySelector('img').alt = commentData.name;
      commentNodeClone.querySelector('.social__text').textContent =
        commentData.message;
      return commentNodeClone;
    };
    const parts = bigImage.src.split('/');
    const lastPart = parts[parts.length - 1];

    posts.forEach((post) => {
      if ('photos/' + lastPart === post.url) {
        bigPictureCommentsCount.textContent = post.comments.length;
        bigPictureCommentList.innerHTML = '';
        post.comments.forEach((comment) => {
          const commentNode = createCommentNode(comment);
          bigPictureCommentList.appendChild(commentNode);
        });
      }
    });
  }

  if (bigPictureCommentsCount.textContent <= 5) {
    bigPictureCommentsCountMin.textContent =
      bigPictureCommentsCount.textContent;
  }

  const commentBox = bigPictureCommentList.querySelectorAll('.social__comment');

  if (bigPictureCommentsCount.textContent > 5) {
    bigPictureCommentsLoader.classList.remove('hidden');
    for (let i = 5; i < bigPictureCommentsCount.textContent; i++) {
      commentBox[i].classList.add('hidden');
    }
  }

  if (
    bigPictureCommentsCountMin.textContent ===
    bigPictureCommentsCount.textContent
  ) {
    bigPictureCommentsLoader.classList.add('hidden');
  }

  bigPictureCommentsLoader.addEventListener('click', onCommentsLoaderClick);
};

pictures.addEventListener('click', onMiniatureClick);
