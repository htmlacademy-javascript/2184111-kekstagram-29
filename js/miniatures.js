import {createPosts} from '/js/data.js';

const posts = createPosts();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

console.log(pictureTemplate);
console.log({posts});

const pictureFiller = () => {
  const pictureDataFragment = document.createDocumentFragment();
  for (let i = 0; i < posts.length; i++) {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = posts[i].url;
    pictureItem.querySelector('.picture__img').alt = posts[i].description;
    pictureItem.querySelector('.picture__likes').textContent = posts[i].likes;
    pictureItem.querySelector('.picture__comments').textContent = posts[i].comments.length;
    pictureDataFragment.appendChild(pictureItem);
  }
  return pictureDataFragment;
};

const picturesData = pictureFiller();

console.log(picturesData);

pictures.append(picturesData);

