// connect component to store WITHOUT REACT REDUX
// very important to maintain game performance
// otherwise react will slow down the game
import store from '../../../store/store'
import { setContext, updateScore } from '../../../store/ducks/gameReducer'

// game logic files. if possible should move all actions to gameObject.js
import Player from './player'
import BulletPool from './bulletPool'
import Bullet from './bullet'
import EnemyPool from './enemyPool'
import Virus from './virus'
import Bacteria from './bacteria'
import SugarPool from './sugarPool.js'
import Sugar from './sugar'
import Cholesterol from './cholesterol'
import Heart from './heart'
import Powerup from './powerup'
import { images } from './mediaRepos'
import CollisionDetector from './collisionDetection'
import { startListening, stopListening } from './keyInput'

// get inputs from inputsObj on nutritionReducer from store
let nutritionState = store.getState().nutritionReducer
let {sugarAmount, cholesterolAmount, maxOnScreenEnemies} = nutritionState

let gameState = store.getState().gameReducer

store.subscribe(function() {
    gameState = store.getState().gameReducer
})

let req

export default class Game {
    constructor() {
        this.context = gameState.context
        this.player = new Player(gameState.context) // maxBullets, context
        this.bulletPool = new BulletPool(gameState.context)
        this.virusPool = new EnemyPool(this.context, 100, 1, 10)
        this.bacteriaPool = new EnemyPool(gameState.context, 100, 3, 40)
        this.sugarPool = new SugarPool(100, 3, 20)
        this.cholesterolPool = new EnemyPool(gameState.context, 100, 5, 60)
        this.heart = new Heart(gameState.context) 
        this.collision = new CollisionDetector()

        this.powerup = new Powerup("FP");
        this.powerupPool = new EnemyPool(this.context,1,1,1)


        this.virusPool.init(Virus, images.virus)
        this.bacteriaPool.init(Bacteria, images.bacteria)
        this.cholesterolPool.init(Cholesterol)
        this.sugarPool.init(Sugar)
    
        this.powerupPool.init(Powerup)

        this.draw = this.draw.bind(this)
        this.update = this.update.bind(this)
        this.checkCollisions = this.checkCollisions.bind(this)

        this.req 

        this.loop = this.loop.bind(this)
        this.pause = this.pause.bind(this)

        startListening()
    }

    draw() {
        this.bulletPool.draw()

        this.heart.draw()

        this.player.draw()

        this.virusPool.draw()
        this.bacteriaPool.draw()
        this.cholesterolPool.draw()
        this.sugarPool.draw()

        // this.powerup.draw()        
    }

    update() {
        this.player.update()
        this.bulletPool.update()
        this.virusPool.update()


        this.heart.update()
        this.bacteriaPool.update()

        this.cholesterolPool.update()
        this.sugarPool.update()

        // this.powerup.update();        
    }

    checkCollisions() {

        // player collisions
        this.collision.checkObjToArray(this.player, this.bacteriaPool.active, function(player,bacteria) {
            bacteria.healthDown()
            player.shieldDown()
        })

        this.collision.checkObjToArray(this.player, this.virusPool.active, function(player,virus) {
            virus.healthDown()
            player.shieldDown()
        })

        this.collision.checkObjToArray(this.player, this.cholesterolPool.active, function(player,cholesterol) {
            cholesterol.isAlive = false
            player.shieldDown()
        })

        this.collision.checkObjToArray(this.player, this.sugarPool.active, function(player, sugar) {
            sugar.isAlive = false
            player.shieldDown(sugar.size)
            sugar.size = 0
        })

        // this.collision.checkObjToArray(this.player, [this.powerup], function(player, powerup){
        //     // MS - max shield | FR - Fire Rate | FP - Fire Power | HP - Health Pack for Heart | CB - Cholesto-Bomb
        //     switch (powerup.type){
        //         case "MS":
        //         case "FR":
        //         player.poweredUp(powerup.type)
        //         break;
        //         case "FP":
        //         // this.bullet.poweredUp() // broken maybe a speceial powerup collision function with multiple params?
        //         break;
        //         case "HP":
        //         // this.heart.poweredUp() // broken 
        //         break;       
        //         case "CB":
        //         // clear all currently active cholesterol on screen
        //         break;         
        //     }
        //     powerup.isAlive = false;
        // })


        

        // player bullet collisions
        this.collision.checkArrayToArray(this.virusPool.active,this.bulletPool.active, function(virus,bullet) {
            virus.healthDown(bullet.damage)
            bullet.isAlive = false
            store.dispatch(updateScore(1))
        })

        this.collision.checkArrayToArray(this.bacteriaPool.active,this.bulletPool.active, function(bacteria,bullet) {
            bacteria.healthDown(bullet.damage)
            bullet.isAlive = false
            store.dispatch(updateScore(2))
        })

        this.collision.checkArrayToArray(this.sugarPool.active, this.bulletPool.active, function(sugar,bullet) {
            sugar.isAlive = false
            bullet.isAlive = false
            let score = 6 / sugar.size
            store.dispatch(updateScore(score))
        })

        this.collision.checkArrayToArray(this.cholesterolPool.active, this.bulletPool.active, function(cholesterol,bullet) {
            bullet.isAlive = false
            cholesterol.isAlive = false
            store.dispatch(updateScore(1))
        })


        // heart collisions
        this.collision.checkObjToArray(this.heart,this.bacteriaPool.active, function(heart,bacteria) {
            bacteria.healthDown(bacteria.maxHealth)
            heart.healthDown()
        })

        this.collision.checkObjToArray(this.heart,this.cholesterolPool.active, function(heart,cholesterol) {
            cholesterol.isOnHeart = true
            let score = 1 / 120
            heart.healthDown(score)
        })

        this.collision.checkObjToArray(this.heart, this.sugarPool.active, function(heart, sugar) {
            sugar.isAlive = false
            heart.healthDown(sugar.size)
            sugar.size = 0
        })
    }


    loop() {
        this.paused = false
        this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height)
        this.draw()
        this.update()
        this.checkCollisions()
        console.log(gameState.heartHealth)
        if (gameState.heartHealth < gameState.maxHeartHealth) {
        req = requestAnimationFrame(this.loop)
        } else {
            cancelAnimationFrame(req)
            alert('Game Over! Refresh to restart')
        }
    }

    pause() {
        console.log(this.paused)
        if (!this.paused) {
            cancelAnimationFrame(req)
            this.paused = true
        } else {
            this.loop()
        }
    }
}

