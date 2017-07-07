import CollisionDetector from './collisionDetection'
import store from '../../../store/store'


// get state on load
let updatedState = store.getState()
let gameState = updatedState.gameReducer
let enemiesState = updatedState.enemiesReducer


export default class SugarPool {
    constructor(context, maxSize, maxOnScreen, waveSize = 10) {
        this.context = context
        this.active = []
        this.inactiveLarge = []
        this.inactiveMedium = []
        this.inactiveSmall = []
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
    getEnemy(size) {
         return this.waveSize > 1 ? this.inactive[size].shift() : false
        }

    // moves enemy from active array to inactive array 
    storeEnemy(enemy) {
            this.inactive.push(enemy)
        }

    // move enemy from inactive array to active array
    spawnEnemy() {
        if (this.active.length < this.numOnScreen ) {
            let enemy = this.getEnemy()
            if (enemy) {
            enemy.isAlive = true
            this.active.push(enemy)
            this.waveSize--
            }
        }
    }


    // before game loop: create a new pool with the input enemy type and populate the inactive and active pools
    init(EnemyType, image) {
        for (let i = 0; i < this.maxSize; i++) {
            let enemy = new EnemyType(this.context, image)
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
                this.storeEnemy(this.active.splice(i,1)[0]) 
                this.spawnEnemy()
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
