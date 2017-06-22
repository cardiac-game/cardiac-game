// keeps object in canvas
function keepOnScreen(obj) {
  let belowTop = obj.y >= 0 ? true : false
  let aboveBottom = obj.y <= window.innerHeight - obj.height ? true : false
  let inLeft = obj.x >= 0 ? true : false
  let inRight = obj.x <= window.innerWidth - obj.width ? true : false;

  if (!belowTop || !aboveBottom) {
    obj.dy = -obj.dy
  } else if (!inLeft || !inRight) {
    obj.dx = -obj.dx
  }
}
