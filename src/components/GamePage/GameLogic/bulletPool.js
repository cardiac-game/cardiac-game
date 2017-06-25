import Bullet from './bullet'

export default function BulletPool(maxSize,context) {
	var size = maxSize
	let active = []
  let inactive = []

  function getBullet() {
    let bullet;
    if ( inactive.length > 1 ) {
      bullet = inactive.shift()
    }  else {
      bullet = new Bullet(context)
    }
    return bullet
  }

  function storeBullet(bullet) {
    inactive.push(bullet)
  }

	this.init = function() {
      for (let i = 0; i < size; i++) {
        let b = new Bullet(context)
        storeBullet(b)
      }
	}

	this.fire = function(x, y, orientation, img) {
    let bullet = getBullet()
    bullet.spawn(x,y,orientation,img)
    active.push(bullet)
	}

	this.move = function() {
    if (active.length < 1) return
    for (let i = 0; i < active.length; i ++) {
      active[i].move()
      active[i].checkInBounds() ? storeBullet(active.splice(i,1)[0]) : null
    }
	}

  this.draw = function() {
    for (let i = 0; i < active.length; i++) {
      active[i].draw()
    }
  }
}
