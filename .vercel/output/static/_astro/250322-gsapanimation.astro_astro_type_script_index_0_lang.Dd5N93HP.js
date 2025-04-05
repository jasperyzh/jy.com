gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,TextPlugin);document.addEventListener("DOMContentLoaded",()=>{const c=gsap.context(()=>{gsap.timeline().to(".hero-text",{duration:1,opacity:1,y:0,ease:"power3.out"}).to(".hero-subtitle",{duration:1,opacity:1,y:0,ease:"power3.out"},"-=0.7").to(".hero-button",{duration:.8,opacity:1,scale:1,ease:"back.out(1.7)"},"-=0.5"),document.querySelectorAll(".gsap-nav a").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const r=e.getAttribute("href");gsap.to(window,{duration:1,scrollTo:r,ease:"power2.inOut"})})}),ScrollTrigger.create({trigger:"#tweens",start:"top 80%",once:!0,onEnter:()=>{gsap.to("#tweens h2",{duration:.8,opacity:1,y:0,ease:"power2.out"}),gsap.to("#tweens p",{duration:.8,opacity:1,y:0,ease:"power2.out",delay:.2});const e=document.querySelectorAll(".tween-box");gsap.to(e[0],{scale:1.5,duration:1,repeat:-1,yoyo:!0,ease:"power1.inOut"}),gsap.to(e[1],{rotation:360,duration:2,repeat:-1,ease:"none"}),gsap.to(e[2],{x:100,duration:1.5,repeat:-1,yoyo:!0,ease:"power2.inOut"}),gsap.to(e[3],{opacity:.2,duration:1,repeat:-1,yoyo:!0,ease:"power2.inOut"})}}),ScrollTrigger.create({trigger:"#timelines",start:"top 80%",once:!0,onEnter:()=>{gsap.to("#timelines h2",{duration:.8,opacity:1,y:0,ease:"power2.out"}),gsap.to("#timelines p",{duration:.8,opacity:1,y:0,ease:"power2.out",delay:.2});const e=gsap.timeline({paused:!0}),t=document.querySelectorAll(".timeline-box");e.to(t[0],{x:200,duration:1,ease:"power2.out"}).to(t[1],{y:-50,duration:.8,ease:"back.out"},"-=0.5").to(t[2],{rotation:360,duration:1.2,ease:"elastic.out"},"-=0.3").to(t[3],{scale:1.5,duration:.7,ease:"power4.out"},"-=0.7").to(t,{background:"#ff5252",color:"white",stagger:.1}).to(t,{x:0,y:0,rotation:0,scale:1,background:"white",color:"#333",duration:1.5});const r=document.querySelector(".timeline-control");r&&r.addEventListener("click",()=>{e.restart()})}}),ScrollTrigger.create({trigger:"#eases",start:"top 80%",once:!0,onEnter:()=>{gsap.to("#eases h2",{duration:.8,opacity:1,y:0,ease:"power2.out"}),gsap.to("#eases p",{duration:.8,opacity:1,y:0,ease:"power2.out",delay:.2}),document.querySelectorAll(".ease-box").forEach(e=>{const t=e.getAttribute("data-ease");gsap.to(e,{x:150,duration:2,repeat:-1,yoyo:!0,ease:t,delay:Math.random()*.5})})}}),ScrollTrigger.create({trigger:"#staggers",start:"top 80%",once:!0,onEnter:()=>{gsap.to("#staggers h2",{duration:.8,opacity:1,y:0,ease:"power2.out"}),gsap.to("#staggers p",{duration:.8,opacity:1,y:0,ease:"power2.out",delay:.2}),gsap.from(".stagger-box",{scale:0,opacity:0,duration:.8,stagger:.1,ease:"back.out(1.7)",delay:.5}),gsap.to(".stagger-box",{y:-30,duration:.5,stagger:{each:.1,repeat:-1,yoyo:!0},ease:"power1.inOut",delay:1.5})}}),ScrollTrigger.create({trigger:"#scroll-trigger",start:"top 80%",once:!0,onEnter:()=>{gsap.to("#scroll-trigger h2",{duration:.8,opacity:1,y:0,ease:"power2.out"}),gsap.to("#scroll-trigger p",{duration:.8,opacity:1,y:0,ease:"power2.out",delay:.2})}}),ScrollTrigger.create({trigger:".scroll-demo",start:"top 70%",end:"bottom 20%",scrub:!0,onUpdate:e=>{gsap.to(".progress-bar",{width:e.progress*100+"%",ease:"none"}),gsap.to(".scroll-element",{top:e.progress*500,ease:"none"})}}),ScrollTrigger.create({trigger:"#interactive",start:"top 80%",once:!0,onEnter:()=>{gsap.to("#interactive h2",{duration:.8,opacity:1,y:0,ease:"power2.out"}),gsap.to("#interactive p",{duration:.8,opacity:1,y:0,ease:"power2.out",delay:.2});const e=document.querySelector(".draggable-circle");if(e){const t=o=>{const a=o.type.startsWith("touch");a?o.touches[0].clientX:o.clientX,a?o.touches[0].clientY:o.clientY,document.addEventListener("mousemove",r),document.addEventListener("touchmove",r),document.addEventListener("mouseup",n),document.addEventListener("touchend",n),gsap.to(e,{scale:1.2,boxShadow:"0 10px 20px rgba(0,0,0,0.3)",duration:.3})},r=o=>{o.preventDefault();const a=o.type.startsWith("touch"),u=a?o.touches[0].clientX:o.clientX,g=a?o.touches[0].clientY:o.clientY,i=document.querySelector(".interactive-demo");if(i){const s=i.getBoundingClientRect(),p=u-s.left,d=g-s.top,l=s.width-e.offsetWidth/2,y=s.height-e.offsetHeight/2,m=e.offsetWidth/2,h=e.offsetHeight/2,w=Math.min(Math.max(p,m),l),v=Math.min(Math.max(d,h),y);gsap.to(e,{left:w,top:v,duration:.5,ease:"power3.out"})}},n=()=>{document.removeEventListener("mousemove",r),document.removeEventListener("touchmove",r),document.removeEventListener("mouseup",n),document.removeEventListener("touchend",n),gsap.to(e,{scale:1,boxShadow:"0 5px 10px rgba(0,0,0,0.1)",duration:.3})};e.addEventListener("mousedown",t),e.addEventListener("touchstart",t)}}})});return()=>c.revert()});
