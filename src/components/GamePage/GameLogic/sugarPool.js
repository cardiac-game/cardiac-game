import CollisionDetector from './collisionDetection'
import store from '../../../store/store'


// get state on load
let updatedState = store.getState()
let gameState = updatedState.gameReducer
let enemiesState = updatedState.enemiesReducer

store.subscribe(function() {
    updatedState = store.getState()
    gameState = updatedState.gameReducer
    enemiesState = updatedState.enemiesReducer    
})

export default class SugarPool {
    constructor(maxSize, maxOnScreen, waveSize = 10) {
        this.context = gameState.context
        this.active = []
        this.inactive = []
        this.maxSize = maxSize
        this.numOnScreen = maxOnScreen
        this.waveSize = waveSize

        this.getEnemy = this.getEnemy.bind(this)
        this.storeEnemy = this.storeEnemy.bind(this)
        this.init = this.init.bind(this)
        this.spawnEnemy = this.spawnEnemy.bind(this)
        this.update = this.update.bind(this)
        this.draw = this.draw.bind(this)
    }

    // returns an enemy unless all enemies in wave have been killed
    getEnemy() {
         return this.waveSize > 1 ? this.inactive.shift() : false
        }

    // moves enemy from active array to inactive array 
    storeEnemy(enemy) {
            this.inactive.push(enemy)
        }

    // move enemy from inactive array to active array
    spawnEnemy(size, x, y) {
        let enemy = this.getEnemy()
        enemy.setSize(size, x, y)
        if (enemy) {
        enemy.isAlive = true
        this.active.push(enemy)
        }
    }


    // before game loop: create a new pool with the input enemy type and populate the inactive and active pools
    init(EnemyType) {
        for (let i = 0; i < this.maxSize; i++) {
            let enemy = new EnemyType()
            this.inactive.push(enemy)
        }
        for (let i = 0; i < this.numOnScreen; i++ ) {
            this.spawnEnemy()
        }
    }

    // update each enemy in active pool. if an enemy is dead, remove from the 
    update() {
        for (let i = 0; i < this.active.length; i++) {
            this.active[i].update()
            if (!this.active[i].isAlive) {
                let newSize = this.active[i].size - 1
                let sugarX = ~~this.active[i].x
                let sugarY = ~~this.active[i].y
                if (newSize > 0) {
                this.spawnEnemy(newSize, sugarX, sugarY)
                this.spawnEnemy(newSize, sugarX, sugarY)
                } else {
                this.waveSize--
                }
                this.storeEnemy(this.active.splice(i,1)[0]) 
            }
        }
    }
    

    draw() {
    if (this.active.length > 0) {
        for (let i = 0; i < this.active.length; i++) {
            this.active[i].draw()
            }
        }
    }
}
