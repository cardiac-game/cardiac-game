import store from '../../../store/store'
import { setPlayer } from '../../../store/ducks/gameReducer'


import $ from './reusable'

let gameState

export default function Virus(context) {


  let virus = {
    context: context,
    x: $.randBtwn(0,1200),
    y: $.randBtwn(0,900),
    width: 50,
    height: 50,
    cx: 50,
    cy: 50,
    dx: 0,
    dy: 0,
    speed: $.randBtwn(3,5),
    turnSpeed: $.randBtwn(3,6),
    orientation: $.randBtwn(0,$.fullCircle),
    lastShot: 0,
    fireRate: $.randBtwn(500,2000),
    

    init: function(spikes,outerRadius,innerRadius) {
      this.rot=Math.PI / 2*3
      this.spikes = spikes
      this.step=Math.PI/ spikes
      this.rDist = outerRadius - innerRadius
      this.spikePointsOuter = []
      this.spikePointsInner = []
      this.innerCircleRadius = innerRadius-(innerRadius*Math.random())

      for (let i = 0; i < spikes; i++) {
        this.spikePointsOuter.push(20*Math.random() + outerRadius)
        this.spikePointsInner.push(5*Math.random() + innerRadius)
      }
    },

    update: function() {
      let angle = Math.atan2(this.context.canvas.height/2 - this.y, this.context.canvas.width/2 - this.x)
      let delta = angle - this.orientation
      if (delta > $.pi) {
          delta = delta - $.pi
      }
      if (delta !== 0) {
          let direction = delta / delta
          this.orientation += (direction* Math.min(this.turnSpeed, delta))
      }
      this.orientation %= $.pi
      this.x += Math.cos(this.orientation) * this.speed + $.randBtwn(-3,3)
      this.y += Math.sin(this.orientation) * this.speed 
    },

    draw: function() {
      let xView = this.x + this.cx
      let yView = this.y + this.ccyenterY
      context.save()
      context.translate(xView, yView)
      context.rotate($.toRad(this.orientation + 90))
    
          context.beginPath()
          // start drawing at this point
          context.moveTo(this.cx,this.cy-this.outerRadius)
          // loop through each point
          for(let i=0;i<this.spikes;i++){
            this.drawX=this.cx+Math.cos(this.rot)*this.spikePointsOuter[i]
            this.drawY=this.cy+Math.sin(this.rot)*this.spikePointsOuter[i]
            // draw line to outer point
            context.lineTo(this.drawX,this.drawY)
            // rotate by this amout 
            this.rot+=this.step

            this.drawX=this.cx+Math.cos(this.rot)*this.spikePointsInner[i]
            this.drawY=this.cy+Math.sin(this.rot)*this.spikePointsInner[i]
            // draw line to inner point
            context.lineTo(this.drawX,this.drawY)
            // rotate by this amount
            this.rot+=this.step
          }
          // return to starting point
          context.lineTo(this.cx,this.cy-this.outerRadius)
          context.closePath()
          context.fillStyle='rgba(101,145,78,1)'
          // draw a circle in the center of each 
          context.fill()
          context.beginPath()
          context.fillStyle='rgba(101,145,178,0.3)'
          context.arc(this.cx,this.cy,this.innerCircleRadius*0.75,0,Math.PI*2,false)
          context.fill()

      context.restore()
   }
  }

  return virus
}
