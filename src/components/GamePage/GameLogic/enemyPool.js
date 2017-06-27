import CollisionDetector from './collisionDetection'
 
export default function EnemyPool(maxSize,Enemy,image, context) {
    
    let active = []
    let inactive = []
    let numOnScreen

    function getEnemy() {
         return inactive.length > 1 ? inactive.shift() : false
        }

    function storeEnemy(enemy) {
            inactive.push(enemy)
        }


    this.init = function(maxOnScreen) {
        numOnScreen = maxOnScreen
        for (let i = 0; i < maxSize; i++) {
            let enemy = new Enemy(context, image)
            enemy.init ? enemy.init() : null 
            inactive.push(enemy)
        }
    }

    this.spawnEnemy = function(x,y,orientation) {
        if (active.length < numOnScreen) {
            let enemy = getEnemy()
            if (!enemy) return 
            enemy.isAlive = true
            active.push(enemy)
        }
    }

    this.getActive = function() {
        return active
    }

    this.update = function() {
        if (active.length < 1) return
        for (let i = 0; i < active.length; i++) {
            active[i].update()
            !active[i].isAlive || active[i].x === context.canvas.width / 2 ? storeEnemy(active.splice(i,1)) : null
        }
    }

    this.draw = function() {
    if (active.length > 0) {
        for (let i = 0; i < active.length; i++) {
            active[i].draw()
            }
        }
    }
}
