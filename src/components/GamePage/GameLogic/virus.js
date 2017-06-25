export default function Virus(){

 function(){

    function drawStar(cx,cy,spikes,outerRadius,innerRadius){
      var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/spikes;
      var rDist = outerRadius - innerRadius
      var factor = 1

      ctx.beginPath();
      ctx.moveTo(cx,cy-outerRadius)
      for(i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*(20*Math.random() + outerRadius);
        y=cy+Math.sin(rot)*(20*Math.random() + outerRadius);
        ctx.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*((5*Math.random() + innerRadius))
        y=cy+Math.sin(rot)*( (5*Math.random() + innerRadius))
        ctx.lineTo(x,y)
        rot+=step
      }
      ctx.lineTo(cx,cy-outerRadius);
      ctx.closePath();
      ctx.fillStyle='rgba(101,145,78,1)';
      ctx.fill();
      ctx.closePath()
      ctx.beginPath()
 
      ctx.fillStyle='rgba(101,145,78,0.3)'
      ctx.arc(cx,cy,innerRadius-(innerRadius*Math.random()),0,Math.PI*2,false)
      ctx.fill()
    }

    drawStar(window.innerWidth/2,window.innerHeight/2,100,60,40);

})

})()