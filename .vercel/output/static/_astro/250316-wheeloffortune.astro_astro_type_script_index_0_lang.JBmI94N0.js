import{a as n}from"./custom-tone.Bi7vN0l5.js";import{c as d,r as l}from"./runtime-dom.esm-bundler.D5Xpk69B.js";const m={template:`
      <div class="wheel-container">
        <div class="wheel" :style="{ transform: 'rotate(' + rotation + 'deg)' }">
          <div v-for="(cuisine, index) in cuisines" :key="index" class="segment" :style="getSegmentStyle(index)">
            <span class="segment-text">{{ cuisine }}</span>
          </div>
        </div>
        <div class="pointer"></div>
      </div>

      <button @click="spinWheel" :disabled="isSpinning">Spin the Wheel</button>

      <div v-if="winner" class="result">
        <h2>Winner: {{ winner }}</h2>
      </div>
    `,data(){return{cuisines:["Italian","Chinese","Indian","Mexican","Japanese","Thai","French","Mediterranean"],rotation:0,isSpinning:!1,winner:null}},methods:{getSegmentStyle(i){const s=360/this.cuisines.length;return{transform:`rotate(${i*s}deg)`,backgroundColor:i%2===0?"#f8b400":"#ffe8a1"}},async spinWheel(){if(this.isSpinning)return;if(this.isSpinning=!0,this.winner=null,!n.initialized)try{await n.init(),n.setVolume(.4),console.log("Audio initialized on game start")}catch(c){console.error("Failed to initialize audio:",c)}n.playMelody([{note:"G3",duration:"8n"},{note:"C4",duration:"8n"}],240);const i=Math.floor(Math.random()*5)+5,s=Math.random()*360,e=i*360+s,o=360/this.cuisines.length,t=o/2,r=((this.rotation+e)%360+t+-80)%360,u=Math.floor((this.cuisines.length-r/o)%this.cuisines.length);this.rotation+=e,setTimeout(()=>{this.winner=this.cuisines[u],this.isSpinning=!1,this.showConfetti(),n.playCorrect()},5e3)},showConfetti(){const i=document.querySelector("#confetti-container");if(i){i.innerHTML="";for(let s=0;s<100;s++){const e=document.createElement("div");e.className="confetti-piece",e.style.backgroundColor=`hsl(${Math.random()*360}, 100%, 50%)`,e.style.left=Math.random()*100+"%",e.style.animationDelay=Math.random()+"s",i.appendChild(e)}setTimeout(()=>{i.innerHTML=""},3e3)}}}};document.addEventListener("DOMContentLoaded",()=>{d({components:{WheelOfFortune:m},setup(){const o=l(40),t=l(!1),a=()=>{t.value?n.mute():(n.unmute(),n.setVolume(o.value/100))};return a(),{volume:o,isMuted:t,toggleMute(){t.value=!t.value,a(),document.getElementById("mute-toggle").textContent=t.value?"🔇":"🔊"}}},template:`
        <wheel-of-fortune></wheel-of-fortune>
      `}).mount("#app");const s=document.getElementById("volume-slider"),e=document.getElementById("mute-toggle");s&&s.addEventListener("input",o=>{const t=document.getElementById("app").__vue_app__;if(t){const a=parseInt(o.target.value);t._instance.setupState.volume=a,t._instance.setupState.isMuted=a===0,e.textContent=a===0?"🔇":"🔊",a===0?n.mute():(n.unmute(),n.setVolume(a/100))}}),e&&e.addEventListener("click",()=>{const o=document.getElementById("app").__vue_app__;o&&o._instance.setupState.toggleMute()})});
