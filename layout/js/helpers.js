/**
 * Вспомогательная функция для координат относительно документа
 */

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: top,
    left: left
  };
}

/**
 * Позиционирует элемент elem относительно элемента anchor, как указано в
 * в position.
 *
 * @param {Node} anchor     Элемент-якорь, относительно которого задана позиция
 * @param {string} position Позиция: одно из top/right/bottom с модификаторами in/out
 * @param {Node} elem       Элемент, который будет позиционирован
 */
function positionAt(anchor, position, elem) {

  var anchorCoords = getCoords(anchor);

  switch (position) {
    case "top-out":
      elem.style.left = anchorCoords.left + "px";
      elem.style.top = anchorCoords.top - elem.offsetHeight + "px";
      break;

    case "top-in":
      elem.style.top = anchorCoords.top + 'px';
      elem.style.left = anchorCoords.left + 'px';
      break;

    case "right-out":
      elem.style.left = anchorCoords.left + 10 + anchor.offsetWidth + "px";
      elem.style.top = anchorCoords.top - 10 + "px";
      break;

    case "right-in":
      elem.style.left = anchorCoords.left + anchor.offsetWidth - elem.offsetWidth + 'px';
      elem.style.top = anchorCoords.top + 'px';
      break;

    case "bottom-out":
      elem.style.left = anchorCoords.left + "px";
      elem.style.top = anchorCoords.top + anchor.offsetHeight + "px";
      break;

    case "bottom-in":
      elem.style.top = anchorCoords.top + anchor.offsetHeight - elem.offsetHeight + 'px';
      elem.style.left = anchorCoords.left + 'px';
      break;
  }

}

/**
 * Показывает share-block на позиции position
 * относительно элемента anchor
 */
function showShareBlock(anchor, position) {
  positionAt(anchor, position, $('.share-block')[0]);
}