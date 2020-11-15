// Функция форматирования секунд
export function formatTime(s) {
  if (!s && s !== 0) {
    return '00:00';
  }

  const totalSeconds = Math.floor(s);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) - hours * 60;
  const seconds = totalSeconds - minutes * 60 - hours * 3600;

  if (hours) {
    return `${hours}:${minutes}:${format2Number(seconds)}`;
  }

  return `${minutes}:${format2Number(seconds)}`;
}

// Функция форматирования до двух знаяков числа
export function format2Number(num) {
  return ('0' + num).slice(-2);
}

// Функция подсчета расстояния до края страницы
export function offsetLeft(el) {
  var left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}

// Функция проверки вместимости элемента в родительский блок
export function isOverflow(ref) {
  return !!ref
    ? ref.offsetWidth - (ref.classList.contains('marquee') ? ref.parentElement.offsetWidth : 0) >
        ref.parentElement.offsetWidth
    : false;
}
