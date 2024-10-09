---
title: The Malaysian's Favorite Clock
description: It so timeless everyone just point and awe.
pubDate: 231205 
author: jyzh 
image:
  url: ""
  alt: "#"
tags: ["general", "webdev"]
draft: false

---
<div id="canvas"></div>
<script
src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.8.0/p5.js"></script>
<script>
function setup_canvas(){let e=createCanvas(512,512);e.parent("canvas"),frameRate(60),background(13)}let yellow=[255,224,26],blue=[8,9,146];function setup(){setup_canvas(),describe("A sketch of THE Malaysian Favourite Clock."),angleMode(DEGREES)}function draw(){background(13),push(),draw_clock(),pop()}function draw_clock(){translate(width/2,height/2),strokeCap(SQUARE),stroke(255,0,0),strokeWeight(38),ellipse(0,0,350,350),fill(blue),stroke(255),strokeWeight(12),ellipse(0,0,350,350);for(let e=0;e<60;e++){var t=e%5==0?15:8;e%5==0?strokeWeight(6):strokeWeight(4);var o=map(e,0,60,0,360),a=165*cos(o),s=165*sin(o),r=cos(o)*(165-t),t=sin(o)*(165-t);line(a,s,r,t)}let e=new Date,l=e.getUTCHours()+8;var n=e.getUTCMinutes(),i=e.getUTCSeconds();l=24<=l?l-24:l;var p=map(l%12,0,12,0,360)+.5*n-90,n=map(n,0,60,0,360)+map(i,0,60,0,6)-90,i=map(i,0,60,0,360)-90;push(),stroke(yellow),strokeWeight(5),rotate(i),line(-22,0,164,0),pop(),push(),stroke(yellow),strokeWeight(6),rotate(n),line(-20,0,148,0),pop(),push(),stroke(yellow),strokeWeight(12),rotate(p),line(-20,0,140,0),pop()}
</script>

A timeless history that I thought I give it a go in replicating it.