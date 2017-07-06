class Rock {
  constructor(minRadius=30, maxRadius=minRadius+10, granularity=25) {
    let tau = Math.PI*2;
    let increment = tau / granularity;
    let radius;
    let x;
    let y;
    let points = [];
    let offset = maxRadius;
    
    for (let ang = 0; ang < tau; ang += increment) {
      radius = this.getRandom(minRadius, maxRadius);
      x = offset + Math.sin(ang) * radius;
      y = offset + Math.cos(ang) * radius;
      

      points.push({x, y});
    }
    
    // close the rock shape by connecting
    // final point to starting point
    points.push(points[0]);
    
    this.points = points;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.offset = offset;
    this.tau = tau;
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    let { points, minRadius, maxRadius, offset, tau } = this;
    // clear the canvas
    ctx.clearRect(0, 0, canv.width, canv.height);
    
    // draw min and max radius as circles
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ddd';
    ctx.save();
    ctx.beginPath();
    ctx.arc(offset, offset, minRadius, 0, tau);
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.arc(offset, offset, maxRadius, 0, tau);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    
    // begin rock drawing
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#111';
    
    // draw all of the rock points, up to the counter value
    for(let i=0; i<counter; i++) {
      if(i===0) {
        ctx.moveTo(points[i].x, points[i].y);
      } else {
        ctx.lineTo(points[i].x, points[i].y);
      }
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    
    // increment/reset counter logic
    if(counter < points.length) {
      counter++;
    } else {
      counter = 0;
      
      // initialize new rock when drawing is done
      r = new Rock(100);
    }
  }
};

r = new Rock(100);

// slowly draw the rock
// to demonstrate the render
// and the constructor logic
// render a new rock on each drawing cycle
setInterval(() => {
  r.render();
}, 150);
