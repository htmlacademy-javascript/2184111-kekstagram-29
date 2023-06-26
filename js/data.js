import {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;


const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Валя',
  'Коля',
  'Галя',
  'Света',
  'Саша',
  'Паша',
  'Наташа',
  'Маня',
  'Ваня',
  'Соня',
  'Сергей',
  'Матвей',
  'Борис',
];

const DESCRIPTIONS = [
  'Самбрэрро',
  'На виле',
  'Крутота',
  'Великий Новгород',
  'Шел по шоссе',
  'Берлин',
  'Выходка столетия',
  '17 мгновений весны',
  'Баня',
  'Очень забавное фото',
  'Очень крсиво',
  'Грустное фото',
  'Фото в стиле "Хаки"',
  'Гудзонский ястреб',
  'Балдышок',
  'Восстание машин',
  'Слоник в четырех стенах',
  'Посудная лавка',
  'Спорт - это жизнь',
  'Моя прелесть',
  'Миф о сизифе',
  'Рефакторинг кода',
  'Вфыпускной',
  'Солнце мертвых',
  'Городской полицай',
];

let getCommentId = createRandomIdFromRangeGenerator(1, 1000);

const createMessage = () => {
  if (getRandomInteger(0, 1)) {
    return getRandomArrayElement(MESSAGES);
  }
  return getRandomArrayElement(MESSAGES) + ' ' + getRandomArrayElement(MESSAGES);
};


const CreatePosts = () => {
  const posts = [];
  for (let i = 1; i <= PICTURE_COUNT; i++) {
    const post = {
      id: i,
      url: 'photos/' + i + '.jpg',
      description: DESCRIPTIONS[i - 1],
      likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
      comments: []
    };
    for (let j = 1; j <= getRandomInteger(0, COMMENT_COUNT); j++) {
      const comment = {
        id: getCommentId(),
        avatar: 'img/avatar-' + getRandomInteger(1, AVATAR_COUNT) + '.svg',
        message: createMessage(),
        name: getRandomArrayElement(NAMES),
      };
      post.comments.push(comment);
    }
    posts.push(post);
  }
  return posts;
};

CreatePosts();

console.log(CreatePosts());

export {CreatePosts};
