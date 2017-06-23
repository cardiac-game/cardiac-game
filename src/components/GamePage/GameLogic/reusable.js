export default {
  pi: Math.PI,
  fullCircle: Math.PI*2,
  randBtwn: function(min,max) {
    return ~~(Math.random()*(max-min) + min)
  },
  toRad: function(num) {
    return num*this.pi/180
  },
  toDeg: function(num) {
    return num*180/this.pi
  }
}
