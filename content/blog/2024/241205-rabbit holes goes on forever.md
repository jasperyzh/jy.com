---
pubDate: 241012
title: rabbit holes goes on forever 2
description: An exploration of 'Keep it Simple, Essential'—a step beyond the KISS principle. Learn how this approach helps identify what truly matters and why I adopted it.
tags: ["WebDevelopment", "FrontendDevelopment", "DIY", "Content", "test"]
draft: 0
---


# Scrolling a page out of the Playbook (test)

### Creating a scroll-driven gallery effect with CSS

In the past two issues, we've referenced CSS scroll-driven animations. But we've yet to build a "typical" scroll-driven animation. For this issue, let's put one together.

This past week, eBay dropped some docs for their Evo design system over at [playbook.ebay.com](https://playbook.ebay.com/). Having a browse, some things jumped out aside from the bold style. There's some [use of clamped fonts](https://x.com/jh3yy/status/1859651305788277139) in the header and a physics box further down the page. What also caught the eye were some scroll-driven and scroll-triggered pieces. How could you make this?

### Support options

CSS scroll-driven animations are currently [only available in Chromium](https://caniuse.com/mdn-css_properties_animation-range). Which poses the question "What about my non-Chromium users?". You can approach this in different ways.

1. Progressive enhancement with CSS: Display your images as a grid. If scroll animation has support, do the animation.
    
2. Progressive enhancement with JavaScript: Display your images as a grid. Use JavaScript to create the scroll animation. My preference is for using [GreenSock's ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) for this.
    
3. Cover all bases: If you can do option 1, do it. Otherwise, try option 2.
    

The typical approach will be option 2 based on the current support. It depends on how critical that scroll animation is to your design. You can do a lot with option 1. Especially when it’s those “little details”.

In today’s demo, any animation is a “bonus”. If a user scrolled our page and didn't see it, they wouldn't know unless they were looking for it. That said, let's do option 3!

### The Grid

First, you want to think about what elements you need to get this working. It’s a grid of images.

When you look at the animation you're trying to make, it's as if layers of the grid move at different rates. The best path here is to split the grid into layers and have each layer use the same grid layout. Then you can animate each layer with different timing.

``` html
<div class="grid">
  <!-- 6 images for outer edges -->
  <div class="layer">
    <img src="outer.avif" alt="" />
    ...
  </div>
  <!-- 6 images for images one column in -->
  <div class="layer">
    <img src="inner.avif" alt="" />
    ...
  </div>
  <!-- 2 images top and bottom of center column -->
  <div class="layer">
    <img src="center-top.avif" alt="" />
    <img src="center-bottom.avif" alt="" />
  </div>
  <!-- the center image that shrinks -->
  <div class="scaler">
    <img src="center.avif" alt="" />
  <div>
</div>
```

How about using CSS subgrid for this? You could use a subgrid to split the grid up in different ways. This provides an opportunity to create varied effects. In our example, sharing the grid layout might make working with that center image easier.

Start with a grid layout (You can adjust the columns for smaller screen sizes in a media query).

``` css
.grid {
  align-content: center;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8%;
  width: 1600px;
  max-width: calc(100% - 4rem);
  margin: 0 auto;
}
```

Now for each layer, use `subgrid`. Using a subgrid lets each layer use the grid tracks from the parent. This snippet shows how the first layer sets out its images using `:nth-of-type(odd/even)` with `grid-column`.

``` css
.grid .layer {
  display: grid;
  /* cover it */
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  /* use subgrid */
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}
.grid .layer:nth-of-type(1) img:nth-of-type(odd) {
  grid-column: 1;
}
.grid .layer:nth-of-type(1) img:nth-of-type(even) {
  grid-column: -1;
}
```

The scaling image goes in the center. It’s a direct child so you can place it with `grid-area`.

``` css
.grid .scaler {
  grid-area: 2 / 3;
} 
```

Now you have a grid of images ready to animate!

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ef883ca-c80b-408e-9624-8890d4a0fff0_1800x1350.png)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ef883ca-c80b-408e-9624-8890d4a0fff0_1800x1350.png)

Using the CSS Grid features in Chrome’s Developer Tools

**NOTE::** You may have to make a few adjustments to get things working in all browsers with subgrid. For example, a percentage gap didn’t work for this demo in Safari. Switching to a clamped container query unit did work.

### Laying Foundations

Scroll animations come in different shapes and sizes. There are a few common tricks. For this demo, you can use the "sticky spacer" trick. The gist is:

1. Stick an element with what you want to animate using `position: sticky`
    
2. Make the parent container larger so it creates space
    
3. Animate based on the container position
    

This demo presented at Figma Config (hence the Figma logo) shows how the trick works.

If you want to see a clip of me talking through that demo, it’s here 👇 (do not feel obliged)

For our demo. Wrap the grid in a content block inside a section.

``` html
<section>
  <div class="content">
    <div class="grid">
     <!-- our grid content -->
    </div>
  </div>
</section>
```

Give the section some extra height and make our content block sticky.

``` css
section:first-of-type {
  min-height: 240vh;
}
.content {
  position: sticky;
  top: 0;
}
```

Now you can start animating things! One last thing before we move things. Be mindful of your users. Remember to check for two things in your CSS. Check for scroll animation support and that your users have no motion preferences.

``` css
@media (prefers-reduced-motion: no-preference) {
@supports (animation-timeline: scroll()) and (animation-range: 0 100%){
  /* animation code */
}
}
```

### Animating the Center

The animation for the center image is straightforward. Animate its `height` and `width` from `100vh` and `100vw`. An open-ended animation means the image will animate to its size within the grid.

You’re animating based on the parent, so set a `view-timeline` on that element.

``` css
main section:first-of-type {
  view-timeline: --driver;
}
```

Then use that in your animation.

``` css
.scaler img {
  animation-name: scale-x, scale-y;
  animation-fill-mode: both;
  animation-timing-function: var(--power-2), var(--power-1);
  animation-timeline: --driver;
  animation-range: entry 100% exit -20%;
}
@keyframes scale-x {
  0%, 10% { width: calc(100vw - 4rem); }
}
@keyframes scale-y {
  0%, 10% { height: calc(100vh - 4rem); }
}
```

To break that down:

- Set 2 animations, `scale-x` and `scale-y`
    
- Set `animation-fill-mode` to `both`
    
- Use our `view-timeline` as the `animation-timeline`
    
- Set the `animation-range` to start once the parent has entered and finish 20% before it starts to exit
    
- Use a different timing function for each so it doesn't feel too linear (more on this in a moment)
    

And this gives you something like this!

### Animating the Layers

The last piece is the layers. You use the same `view-timeline` but drive two different keyframes.

``` css
.grid .layer {
  animation-name: fade, reveal;
  animation-fill-mode: both;
  animation-timeline: --driver;
  animation-timing-function: var(--sine), var(--power-1);
  animation-range: entry 100% exit 0%;
}
@keyframes fade { 0%, 55% { opacity: 0; }}
@keyframes reveal { 0%, 30% { scale: 0; }}
```

There are a few ways to get the stagger. You could opt to adjust the `animation-range` for each layer. An alternative could be for all layers to use the same range but have different `animation-timing`.

Using `animation-range` could look something like this:

``` sass
.grid .layer {
  &:nth-of-type(1) {
    animation-range: entry 100% exit 0%;
  }
  &:nth-of-type(2) {
    animation-range: entry 100% exit -10%;
  }
  &:nth-of-type(3) {
    animation-range: entry 100% exit -20%;
  }
}
```

Using `animation-timing-function` could look something like this:

``` css
.grid .layer {
  &:nth-of-type(1) {
    animation-timing-function: var(--sine), var(--power-1);
  }
  &:nth-of-type(2) {
    animation-timing-function: var(--sine), var(--power-3);
  }
  &:nth-of-type(3) {
    animation-timing-function: var(--sine), var(--power-4);
  }
}
```

The extra part about using `animation-timing-function` is defining the different easing curves. CSS now has support for custom timing curves via linear(). I built a [rudimentary demo to help me use GreenSock eases in CSS](https://x.com/jh3yy/status/1696651285456421375). Type in the easing string and get back the CSS equal. For this demo, "`--power-1`", "`--power-2`", etc. look wild. But they're written once, then not touched again.

``` css
.layer {
--power-1-out: linear(
    0 0%,
    0.0027 3.64%,
    0.0106 7.29%,
    0.0425 14.58%,
    0.0957 21.87%,
    0.1701 29.16%,
    0.2477 35.19%,
    0.3401 41.23%,
    0.5982 55.18%,
    0.7044 61.56%,
    0.7987 68.28%,
    0.875 75%,
    0.9297 81.25%,
    0.9687 87.5%,
    0.9922 93.75%,
    1 100%
  );
}
```

Here are the animated layers showcasing both staggers.

And here are the grid layers shown in DevTools

---

That's it for your CSS implementation. There was mention of a JavaScript solution above. Without digging deep, this could be the [GreenSock ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger) timeline for the center image. (You can wrap it in a support check like we did in the previous issue)

``` css
gsap
  .timeline({
    scrollTrigger: {
      trigger: 'main section:first-of-type',
      start: 'top -10%',
      end: 'bottom 80%',
      scrub: true,
    },
  })
  .from(
    '.scaler img',
    {
      height: window.innerHeight - 32,
      ease: 'power1.inOut',
    }
  )
  .from(
    '.scaler img',
    {
      width: window.innerWidth - 32,
      ease: 'power2.inOut',
    },
    0
  )
```

You create a GreenSock timeline and use the ScrollTrigger to drive it. That will work fine and you can adjust it as you wish. There is the potential that you may write more this way. An example is how you handled timing functions in the CSS for the scaling image.

---

Last things last, before we go. Remember option 1? How it's good to enhance as a bonus? Those little details? ʕ⊙ᴥ⊙ʔ

Until next time!

---

**Demo link: [codepen.io/jh3y](https://codepen.io/jh3y/pen/VYZwOwd/e336a907b7514f67b9eca281d625b774)  
On X: [x.com/jh3yy](https://x.com/jh3yy/status/1859789759167726065)  
On BlueSky: [bsky.app/jhey.dev](https://bsky.app/profile/jhey.dev/post/3lbiy7z6pek23)**