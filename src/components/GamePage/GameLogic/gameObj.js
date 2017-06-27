import Player from './player'
import Enemy from './enemy'
import images from './mediaRepos'



export default function Game(obj, context) {
    let initialState = obj

    this.context = context

    let player = new Player(100,this.context) // maxBullets, context
    let enemy = new Enemy(this.context, images.enemy) // context, enemy


    this.init = function() {
        player.init() // speed, turnSpeed
        // enemy.init() 
    },

    this.update = function() {
        player.shoot()
        player.update()
        // enemy.update()
    }

    this.draw = function(context) {
        player.draw()
        // enemy.draw()
    }

}

