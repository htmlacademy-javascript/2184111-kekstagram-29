// Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
//  и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
//   и false, если строка длиннее. Эта функция нам пригодится для валидации формы. Примеры использования функции:

// Cтрока короче 20 символовимяФункции('проверяемая строка', 20); // true
// Длина строки ровно 18 символо имяФункции('проверяемая строка', 18); // true
// Строка длиннее 10 символов имяФункции('проверяемая строка', 10); // false

// let testString = 'проверяемая строка';
// let maxLenght = 15;

function stringChecker(testString, maxLength) {
  return testString.length <= maxLength;
}

console.log(stringChecker('проверяемая строка', 15));


function checkingPalindrome(baseString) {
  let normalizedString = baseString.replaceAll(' ','').toLowerCase();
  let newString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    let char = normalizedString[i];
    newString += char;
  }
  return (normalizedString === newString) ? 'Палиндром' : 'Не палиндром';
}

console.log(checkingPalindrome('Довод'));
