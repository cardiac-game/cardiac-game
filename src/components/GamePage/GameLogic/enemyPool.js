import CollisionDetector from './collisionDetection'
import store from '../../../store/store'
import { setPlayerBulletPool } from '../../../store/ducks/enemiesReducer'
import images from './mediaRepos'


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

        this.getEnemy = this.getEnemy.bind(this)
        this.storeEnemy = this.storeEnemy.bind(this)
        this.init = this.init.bind(this)
        this.spawnEnemy = this.spawnEnemy.bind(this)
        this.update = this.update.bind(this)
        this.draw = this.draw.bind(this)
    }

    getEnemy() {
         return this.inactive.length > 1 ? this.inactive.shift() : false
        }

    storeEnemy(enemy) {
            this.inactive.push(enemy)
        }

    spawnEnemy() {
        console.log(this.active.length,this.inactive.length)
        if (this.active.length < this.numOnScreen ) {
            let enemy = this.getEnemy()
            enemy.isAlive = true
            this.active.push(enemy)
        }
    }

    init(EnemyType) {
        for (let i = 0; i < this.maxSize; i++) {
            let enemy = new EnemyType(this.context, images.enemy)
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
                this.storeEnemy(this.active.splice(i,1)) 
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
