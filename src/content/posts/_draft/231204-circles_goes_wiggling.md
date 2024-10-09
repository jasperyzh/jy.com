---
title: Sketch of circles wiggling.
description: A sketch of grids with circles with small circles orbiting within restlessly, it keeps wiggle-wiggle-wiggle-wiggle.
pubDate: 231204 
author: jyzh 
image:
  url: ""
  alt: "#"
tags: ["general", "webdev"]
draft: false
---

<video width="512" height="512" controls autoplay loop muted>
<source src="/sketch/231204-circles_goes_wiggling.mp4" type="video/mp4">
</video>

> **Sketch Displays**
> Currently the above is using \<video>, about 3mb for 4secs, nice for loop/controls.
> Tried GIF at 512x512 for 4 secs is about 15mb.
> Probably best to moves the video to external platform like YouTube (Instagram enlarged the video and pixelate it bad..)

---
Setup a boilerplate template to speed up on output sketches, no fancy class or export JS modules, just procedural functions added via index.html in sequence, keep it simple for future references. Below are few pointers that I did and what I hope to do next: -

- \_canvas.js - setup base canvas, added button for controller and recordings
- \_debug.js - draw debug below the sketch for quick debug
- \_colors.js - default colors palette I picked for standardize color, hoping can pick my own set of unique colors as time went on
- \_music.js - setup a BPM functions to fire according to beats, may be useful for sketches that involves musics
- \_webmidi.js - added a library to connect to my music instruments, more to come!
- \_sketch.js - the main file to put everything together

- [ ] A main counter or value for elements to animate according to, previously I did a few sketches that could loop perfectly using Perlin Noise. Will do up a post that explains better with resources attach to it.
