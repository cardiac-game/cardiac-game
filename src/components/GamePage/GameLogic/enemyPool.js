// import CollisionDetector from './collisionDetection'
// import store from '../../../store/store'
// import { setPlayerBulletPool } from '../../../store/ducks/enemiesReducer'


// let updatedState = store.getState()
// let gameState = updatedState.gameReducer
// let enemiesState = updatedState.enemiesReducer

// export class EnemyPool {
//     constructor(context, maxSize) {
//         this.context = context
//         this.active = []
//         this.inactive = []
//         this.maxSize = maxSize

//         this.getEnemy = this.getEnemy.bind(this)
//         this.storeEnemy = this.storeEnemy.bind(this)
//         this.init = this.init.bind(this)
//         this.spawnEnemy = this.spawnEnemy.bind(this)
//         this.update = this.update.bind(this)
//         this.draw = this.draw.bind(this)
//     }


//     getEnemy() {
//          return this.inactive.length > 1 ? this.inactive.shift() : false
//         }

//     storeEnemy(enemy) {
//             this.inactive.push(enemy)
//         }


//     init(EnemyType, ) {
//         for (let i = 0; i < this.maxSize; i++) {
//             let enemy = new EnemyType()
//             enemy.init ? enemy.init() : null 
//             inactive.push(enemy)
//         }
//     }

//     spawnEnemy(x,y,orientation) {
//         if (this.active.length < numOnScreen) {
//             let enemy = getEnemy()
//             if (!enemy) return 
//             enemy.isAlive = true
//             this.active.push(enemy)
//         }
//     }

//     update() {
//         if (this.active.length < 1) return
//         for (let i = 0; i < this.active.length; i++) {
//             this.active[i].update()
//             !this.active[i].isAlive || this.active[i].x === context.canvas.width / 2 ? storeEnemy(this.active.splice(i,1)) : null
//         }
//     }

//     draw() {
//     if (this.active.length > 0) {
//         for (let i = 0; i < this.active.length; i++) {
//             this.active[i].draw()
//             }
//         }
//     }
// }
