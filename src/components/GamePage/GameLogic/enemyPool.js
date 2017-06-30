import CollisionDetector from './collisionDetection'
import store from '../../../store/store'
import { setPlayerBulletPool } from '../../../store/ducks/enemiesReducer'
import { images } from './mediaRepos'


let updatedState = store.getState()
let gameState = updatedState.gameReducer
let enemiesState = updatedState.enemiesReducer

export default class EnemyPool {
    constructor(context, maxSize) {
        this.context = context
        this.active = []
        this.inactive = []
        this.maxSize = maxSize
        this.numOnScreen = 10
        this.waveSize = maxSize

        this.getEnemy = this.getEnemy.bind(this)
        this.storeEnemy = this.storeEnemy.bind(this)
        this.init = this.init.bind(this)
        this.spawnEnemy = this.spawnEnemy.bind(this)
        this.update = this.update.bind(this)
        this.draw = this.draw.bind(this)
    }

    getEnemy() {
         return this.waveSize > 1 ? this.inactive.shift() : false
        }

    storeEnemy(enemy) {
            this.inactive.push(enemy)
        }

    spawnEnemy() {
        console.log(this.active.length,this.inactive.length, this.numOnScreen)
        if (this.active.length < this.numOnScreen ) {
            let enemy = this.getEnemy()
            if (enemy) {
            enemy.isAlive = true
            this.active.push(enemy)
            this.waveSize--
            }
        }
    }

    init(EnemyType, image) {
        for (let i = 0; i < this.maxSize; i++) {
            let enemy = new EnemyType(this.context, image)
            this.inactive.push(enemy)
        }
        for (let i = 0; i < this.numOnScreen; i++ ) {
            this.spawnEnemy()
        }
    }

    update() {
        for (let i = 0; i < this.active.length; i++) {
            this.active[i].update()
            if (!this.active[i].isAlive) {
                this.storeEnemy(this.active.splice(i,1)[0]) 
                this.spawnEnemy()
            }
        }
        store.setState()
    }
    

    draw() {
    if (this.active.length > 0) {
        for (let i = 0; i < this.active.length; i++) {
            this.active[i].draw()
            }
        }
    }
}
