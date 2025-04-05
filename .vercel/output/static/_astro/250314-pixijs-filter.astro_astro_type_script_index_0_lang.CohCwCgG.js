const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/browserAll.DTaJsiiy.js","_astro/webworkerAll.BghgWalp.js","_astro/colorToUniform.KTpA7KSL.js","_astro/preload-helper.CLcXU_4U.js","_astro/WebGPURenderer.C6ERU5BI.js","_astro/SharedSystems.fMoaElqj.js","_astro/WebGLRenderer.CcEnxgWU.js"])))=>i.map(i=>d[i]);
import{_ as Xe}from"./preload-helper.CLcXU_4U.js";var B=(n=>(n.Application="application",n.WebGLPipes="webgl-pipes",n.WebGLPipesAdaptor="webgl-pipes-adaptor",n.WebGLSystem="webgl-system",n.WebGPUPipes="webgpu-pipes",n.WebGPUPipesAdaptor="webgpu-pipes-adaptor",n.WebGPUSystem="webgpu-system",n.CanvasSystem="canvas-system",n.CanvasPipesAdaptor="canvas-pipes-adaptor",n.CanvasPipes="canvas-pipes",n.Asset="asset",n.LoadParser="load-parser",n.ResolveParser="resolve-parser",n.CacheParser="cache-parser",n.DetectionParser="detection-parser",n.MaskEffect="mask-effect",n.BlendMode="blend-mode",n.TextureSource="texture-source",n.Environment="environment",n.ShapeBuilder="shape-builder",n.Batcher="batcher",n))(B||{});const Br=n=>{if(typeof n=="function"||typeof n=="object"&&n.extension){if(!n.extension)throw new Error("Extension class must have an extension object");n={...typeof n.extension!="object"?{type:n.extension}:n.extension,ref:n}}if(typeof n=="object")n={...n};else throw new Error("Invalid extension type");return typeof n.type=="string"&&(n.type=[n.type]),n},Pe=(n,t)=>Br(n).priority??t,mt={_addHandlers:{},_removeHandlers:{},_queue:{},remove(...n){return n.map(Br).forEach(t=>{t.type.forEach(e=>this._removeHandlers[e]?.(t))}),this},add(...n){return n.map(Br).forEach(t=>{t.type.forEach(e=>{const r=this._addHandlers,i=this._queue;r[e]?r[e]?.(t):(i[e]=i[e]||[],i[e]?.push(t))})}),this},handle(n,t,e){const r=this._addHandlers,i=this._removeHandlers;if(r[n]||i[n])throw new Error(`Extension type ${n} already has a handler`);r[n]=t,i[n]=e;const s=this._queue;return s[n]&&(s[n]?.forEach(o=>t(o)),delete s[n]),this},handleByMap(n,t){return this.handle(n,e=>{e.name&&(t[e.name]=e.ref)},e=>{e.name&&delete t[e.name]})},handleByNamedList(n,t,e=-1){return this.handle(n,r=>{t.findIndex(s=>s.name===r.name)>=0||(t.push({name:r.name,value:r.ref}),t.sort((s,o)=>Pe(o.value,e)-Pe(s.value,e)))},r=>{const i=t.findIndex(s=>s.name===r.name);i!==-1&&t.splice(i,1)})},handleByList(n,t,e=-1){return this.handle(n,r=>{t.includes(r.ref)||(t.push(r.ref),t.sort((i,s)=>Pe(s,e)-Pe(i,e)))},r=>{const i=t.indexOf(r.ref);i!==-1&&t.splice(i,1)})},mixin(n,...t){for(const e of t)Object.defineProperties(n.prototype,Object.getOwnPropertyDescriptors(e))}},aa={extension:{type:B.Environment,name:"browser",priority:-1},test:()=>!0,load:async()=>{await Xe(()=>import("./browserAll.DTaJsiiy.js"),__vite__mapDeps([0,1,2,3]))}},la={extension:{type:B.Environment,name:"webworker",priority:0},test:()=>typeof self<"u"&&self.WorkerGlobalScope!==void 0,load:async()=>{await Xe(()=>import("./webworkerAll.BghgWalp.js"),__vite__mapDeps([1,2,3]))}};class xt{constructor(t,e,r){this._x=e||0,this._y=r||0,this._observer=t}clone(t){return new xt(t??this._observer,this._x,this._y)}set(t=0,e=t){return(this._x!==t||this._y!==e)&&(this._x=t,this._y=e,this._observer._onUpdate(this)),this}copyFrom(t){return(this._x!==t.x||this._y!==t.y)&&(this._x=t.x,this._y=t.y,this._observer._onUpdate(this)),this}copyTo(t){return t.set(this._x,this._y),t}equals(t){return t.x===this._x&&t.y===this._y}toString(){return`[pixi.js/math:ObservablePoint x=0 y=0 scope=${this._observer}]`}get x(){return this._x}set x(t){this._x!==t&&(this._x=t,this._observer._onUpdate(this))}get y(){return this._y}set y(t){this._y!==t&&(this._y=t,this._observer._onUpdate(this))}}function un(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var tr={exports:{}},Pn;function ua(){return Pn||(Pn=1,function(n){var t=Object.prototype.hasOwnProperty,e="~";function r(){}Object.create&&(r.prototype=Object.create(null),new r().__proto__||(e=!1));function i(l,u,c){this.fn=l,this.context=u,this.once=c||!1}function s(l,u,c,h,d){if(typeof c!="function")throw new TypeError("The listener must be a function");var f=new i(c,h||l,d),g=e?e+u:u;return l._events[g]?l._events[g].fn?l._events[g]=[l._events[g],f]:l._events[g].push(f):(l._events[g]=f,l._eventsCount++),l}function o(l,u){--l._eventsCount===0?l._events=new r:delete l._events[u]}function a(){this._events=new r,this._eventsCount=0}a.prototype.eventNames=function(){var u=[],c,h;if(this._eventsCount===0)return u;for(h in c=this._events)t.call(c,h)&&u.push(e?h.slice(1):h);return Object.getOwnPropertySymbols?u.concat(Object.getOwnPropertySymbols(c)):u},a.prototype.listeners=function(u){var c=e?e+u:u,h=this._events[c];if(!h)return[];if(h.fn)return[h.fn];for(var d=0,f=h.length,g=new Array(f);d<f;d++)g[d]=h[d].fn;return g},a.prototype.listenerCount=function(u){var c=e?e+u:u,h=this._events[c];return h?h.fn?1:h.length:0},a.prototype.emit=function(u,c,h,d,f,g){var x=e?e+u:u;if(!this._events[x])return!1;var p=this._events[x],v=arguments.length,b,S;if(p.fn){switch(p.once&&this.removeListener(u,p.fn,void 0,!0),v){case 1:return p.fn.call(p.context),!0;case 2:return p.fn.call(p.context,c),!0;case 3:return p.fn.call(p.context,c,h),!0;case 4:return p.fn.call(p.context,c,h,d),!0;case 5:return p.fn.call(p.context,c,h,d,f),!0;case 6:return p.fn.call(p.context,c,h,d,f,g),!0}for(S=1,b=new Array(v-1);S<v;S++)b[S-1]=arguments[S];p.fn.apply(p.context,b)}else{var C=p.length,I;for(S=0;S<C;S++)switch(p[S].once&&this.removeListener(u,p[S].fn,void 0,!0),v){case 1:p[S].fn.call(p[S].context);break;case 2:p[S].fn.call(p[S].context,c);break;case 3:p[S].fn.call(p[S].context,c,h);break;case 4:p[S].fn.call(p[S].context,c,h,d);break;default:if(!b)for(I=1,b=new Array(v-1);I<v;I++)b[I-1]=arguments[I];p[S].fn.apply(p[S].context,b)}}return!0},a.prototype.on=function(u,c,h){return s(this,u,c,h,!1)},a.prototype.once=function(u,c,h){return s(this,u,c,h,!0)},a.prototype.removeListener=function(u,c,h,d){var f=e?e+u:u;if(!this._events[f])return this;if(!c)return o(this,f),this;var g=this._events[f];if(g.fn)g.fn===c&&(!d||g.once)&&(!h||g.context===h)&&o(this,f);else{for(var x=0,p=[],v=g.length;x<v;x++)(g[x].fn!==c||d&&!g[x].once||h&&g[x].context!==h)&&p.push(g[x]);p.length?this._events[f]=p.length===1?p[0]:p:o(this,f)}return this},a.prototype.removeAllListeners=function(u){var c;return u?(c=e?e+u:u,this._events[c]&&o(this,c)):(this._events=new r,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=e,a.EventEmitter=a,n.exports=a}(tr)),tr.exports}var ca=ua();const Ft=un(ca),ha=Math.PI*2,fa=180/Math.PI,Or=Math.PI/180;class pt{constructor(t=0,e=0){this.x=0,this.y=0,this.x=t,this.y=e}clone(){return new pt(this.x,this.y)}copyFrom(t){return this.set(t.x,t.y),this}copyTo(t){return t.set(this.x,this.y),t}equals(t){return t.x===this.x&&t.y===this.y}set(t=0,e=t){return this.x=t,this.y=e,this}toString(){return`[pixi.js/math:Point x=${this.x} y=${this.y}]`}static get shared(){return er.x=0,er.y=0,er}}const er=new pt;class V{constructor(t=1,e=0,r=0,i=1,s=0,o=0){this.array=null,this.a=t,this.b=e,this.c=r,this.d=i,this.tx=s,this.ty=o}fromArray(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]}set(t,e,r,i,s,o){return this.a=t,this.b=e,this.c=r,this.d=i,this.tx=s,this.ty=o,this}toArray(t,e){this.array||(this.array=new Float32Array(9));const r=e||this.array;return t?(r[0]=this.a,r[1]=this.b,r[2]=0,r[3]=this.c,r[4]=this.d,r[5]=0,r[6]=this.tx,r[7]=this.ty,r[8]=1):(r[0]=this.a,r[1]=this.c,r[2]=this.tx,r[3]=this.b,r[4]=this.d,r[5]=this.ty,r[6]=0,r[7]=0,r[8]=1),r}apply(t,e){e=e||new pt;const r=t.x,i=t.y;return e.x=this.a*r+this.c*i+this.tx,e.y=this.b*r+this.d*i+this.ty,e}applyInverse(t,e){e=e||new pt;const r=this.a,i=this.b,s=this.c,o=this.d,a=this.tx,l=this.ty,u=1/(r*o+s*-i),c=t.x,h=t.y;return e.x=o*u*c+-s*u*h+(l*s-a*o)*u,e.y=r*u*h+-i*u*c+(-l*r+a*i)*u,e}translate(t,e){return this.tx+=t,this.ty+=e,this}scale(t,e){return this.a*=t,this.d*=e,this.c*=t,this.b*=e,this.tx*=t,this.ty*=e,this}rotate(t){const e=Math.cos(t),r=Math.sin(t),i=this.a,s=this.c,o=this.tx;return this.a=i*e-this.b*r,this.b=i*r+this.b*e,this.c=s*e-this.d*r,this.d=s*r+this.d*e,this.tx=o*e-this.ty*r,this.ty=o*r+this.ty*e,this}append(t){const e=this.a,r=this.b,i=this.c,s=this.d;return this.a=t.a*e+t.b*i,this.b=t.a*r+t.b*s,this.c=t.c*e+t.d*i,this.d=t.c*r+t.d*s,this.tx=t.tx*e+t.ty*i+this.tx,this.ty=t.tx*r+t.ty*s+this.ty,this}appendFrom(t,e){const r=t.a,i=t.b,s=t.c,o=t.d,a=t.tx,l=t.ty,u=e.a,c=e.b,h=e.c,d=e.d;return this.a=r*u+i*h,this.b=r*c+i*d,this.c=s*u+o*h,this.d=s*c+o*d,this.tx=a*u+l*h+e.tx,this.ty=a*c+l*d+e.ty,this}setTransform(t,e,r,i,s,o,a,l,u){return this.a=Math.cos(a+u)*s,this.b=Math.sin(a+u)*s,this.c=-Math.sin(a-l)*o,this.d=Math.cos(a-l)*o,this.tx=t-(r*this.a+i*this.c),this.ty=e-(r*this.b+i*this.d),this}prepend(t){const e=this.tx;if(t.a!==1||t.b!==0||t.c!==0||t.d!==1){const r=this.a,i=this.c;this.a=r*t.a+this.b*t.c,this.b=r*t.b+this.b*t.d,this.c=i*t.a+this.d*t.c,this.d=i*t.b+this.d*t.d}return this.tx=e*t.a+this.ty*t.c+t.tx,this.ty=e*t.b+this.ty*t.d+t.ty,this}decompose(t){const e=this.a,r=this.b,i=this.c,s=this.d,o=t.pivot,a=-Math.atan2(-i,s),l=Math.atan2(r,e),u=Math.abs(a+l);return u<1e-5||Math.abs(ha-u)<1e-5?(t.rotation=l,t.skew.x=t.skew.y=0):(t.rotation=0,t.skew.x=a,t.skew.y=l),t.scale.x=Math.sqrt(e*e+r*r),t.scale.y=Math.sqrt(i*i+s*s),t.position.x=this.tx+(o.x*e+o.y*i),t.position.y=this.ty+(o.x*r+o.y*s),t}invert(){const t=this.a,e=this.b,r=this.c,i=this.d,s=this.tx,o=t*i-e*r;return this.a=i/o,this.b=-e/o,this.c=-r/o,this.d=t/o,this.tx=(r*this.ty-i*s)/o,this.ty=-(t*this.ty-e*s)/o,this}isIdentity(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0}identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}clone(){const t=new V;return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t}copyTo(t){return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t}copyFrom(t){return this.a=t.a,this.b=t.b,this.c=t.c,this.d=t.d,this.tx=t.tx,this.ty=t.ty,this}equals(t){return t.a===this.a&&t.b===this.b&&t.c===this.c&&t.d===this.d&&t.tx===this.tx&&t.ty===this.ty}toString(){return`[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`}static get IDENTITY(){return pa.identity()}static get shared(){return da.identity()}}const da=new V,pa=new V,Yt=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],Ht=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],jt=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],qt=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],Gr=[],Xi=[],Fe=Math.sign;function ma(){for(let n=0;n<16;n++){const t=[];Gr.push(t);for(let e=0;e<16;e++){const r=Fe(Yt[n]*Yt[e]+jt[n]*Ht[e]),i=Fe(Ht[n]*Yt[e]+qt[n]*Ht[e]),s=Fe(Yt[n]*jt[e]+jt[n]*qt[e]),o=Fe(Ht[n]*jt[e]+qt[n]*qt[e]);for(let a=0;a<16;a++)if(Yt[a]===r&&Ht[a]===i&&jt[a]===s&&qt[a]===o){t.push(a);break}}}for(let n=0;n<16;n++){const t=new V;t.set(Yt[n],Ht[n],jt[n],qt[n],0,0),Xi.push(t)}}ma();const tt={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MAIN_DIAGONAL:10,MIRROR_HORIZONTAL:12,REVERSE_DIAGONAL:14,uX:n=>Yt[n],uY:n=>Ht[n],vX:n=>jt[n],vY:n=>qt[n],inv:n=>n&8?n&15:-n&7,add:(n,t)=>Gr[n][t],sub:(n,t)=>Gr[n][tt.inv(t)],rotate180:n=>n^4,isVertical:n=>(n&3)===2,byDirection:(n,t)=>Math.abs(n)*2<=Math.abs(t)?t>=0?tt.S:tt.N:Math.abs(t)*2<=Math.abs(n)?n>0?tt.E:tt.W:t>0?n>0?tt.SE:tt.SW:n>0?tt.NE:tt.NW,matrixAppendRotationInv:(n,t,e=0,r=0)=>{const i=Xi[tt.inv(t)];i.tx=e,i.ty=r,n.append(i)}},Me=[new pt,new pt,new pt,new pt];class lt{constructor(t=0,e=0,r=0,i=0){this.type="rectangle",this.x=Number(t),this.y=Number(e),this.width=Number(r),this.height=Number(i)}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}get bottom(){return this.y+this.height}isEmpty(){return this.left===this.right||this.top===this.bottom}static get EMPTY(){return new lt(0,0,0,0)}clone(){return new lt(this.x,this.y,this.width,this.height)}copyFromBounds(t){return this.x=t.minX,this.y=t.minY,this.width=t.maxX-t.minX,this.height=t.maxY-t.minY,this}copyFrom(t){return this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height,this}copyTo(t){return t.copyFrom(this),t}contains(t,e){return this.width<=0||this.height<=0?!1:t>=this.x&&t<this.x+this.width&&e>=this.y&&e<this.y+this.height}strokeContains(t,e,r,i=.5){const{width:s,height:o}=this;if(s<=0||o<=0)return!1;const a=this.x,l=this.y,u=r*(1-i),c=r-u,h=a-u,d=a+s+u,f=l-u,g=l+o+u,x=a+c,p=a+s-c,v=l+c,b=l+o-c;return t>=h&&t<=d&&e>=f&&e<=g&&!(t>x&&t<p&&e>v&&e<b)}intersects(t,e){if(!e){const L=this.x<t.x?t.x:this.x;if((this.right>t.right?t.right:this.right)<=L)return!1;const R=this.y<t.y?t.y:this.y;return(this.bottom>t.bottom?t.bottom:this.bottom)>R}const r=this.left,i=this.right,s=this.top,o=this.bottom;if(i<=r||o<=s)return!1;const a=Me[0].set(t.left,t.top),l=Me[1].set(t.left,t.bottom),u=Me[2].set(t.right,t.top),c=Me[3].set(t.right,t.bottom);if(u.x<=a.x||l.y<=a.y)return!1;const h=Math.sign(e.a*e.d-e.b*e.c);if(h===0||(e.apply(a,a),e.apply(l,l),e.apply(u,u),e.apply(c,c),Math.max(a.x,l.x,u.x,c.x)<=r||Math.min(a.x,l.x,u.x,c.x)>=i||Math.max(a.y,l.y,u.y,c.y)<=s||Math.min(a.y,l.y,u.y,c.y)>=o))return!1;const d=h*(l.y-a.y),f=h*(a.x-l.x),g=d*r+f*s,x=d*i+f*s,p=d*r+f*o,v=d*i+f*o;if(Math.max(g,x,p,v)<=d*a.x+f*a.y||Math.min(g,x,p,v)>=d*c.x+f*c.y)return!1;const b=h*(a.y-u.y),S=h*(u.x-a.x),C=b*r+S*s,I=b*i+S*s,T=b*r+S*o,F=b*i+S*o;return!(Math.max(C,I,T,F)<=b*a.x+S*a.y||Math.min(C,I,T,F)>=b*c.x+S*c.y)}pad(t=0,e=t){return this.x-=t,this.y-=e,this.width+=t*2,this.height+=e*2,this}fit(t){const e=Math.max(this.x,t.x),r=Math.min(this.x+this.width,t.x+t.width),i=Math.max(this.y,t.y),s=Math.min(this.y+this.height,t.y+t.height);return this.x=e,this.width=Math.max(r-e,0),this.y=i,this.height=Math.max(s-i,0),this}ceil(t=1,e=.001){const r=Math.ceil((this.x+this.width-e)*t)/t,i=Math.ceil((this.y+this.height-e)*t)/t;return this.x=Math.floor((this.x+e)*t)/t,this.y=Math.floor((this.y+e)*t)/t,this.width=r-this.x,this.height=i-this.y,this}enlarge(t){const e=Math.min(this.x,t.x),r=Math.max(this.x+this.width,t.x+t.width),i=Math.min(this.y,t.y),s=Math.max(this.y+this.height,t.y+t.height);return this.x=e,this.width=r-e,this.y=i,this.height=s-i,this}getBounds(t){return t||(t=new lt),t.copyFrom(this),t}containsRect(t){if(this.width<=0||this.height<=0)return!1;const e=t.x,r=t.y,i=t.x+t.width,s=t.y+t.height;return e>=this.x&&e<this.x+this.width&&r>=this.y&&r<this.y+this.height&&i>=this.x&&i<this.x+this.width&&s>=this.y&&s<this.y+this.height}toString(){return`[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`}}const rr={default:-1};function ut(n="default"){return rr[n]===void 0&&(rr[n]=-1),++rr[n]}const Fn={},at="8.0.0",ga="8.3.4";function D(n,t,e=3){if(Fn[t])return;let r=new Error().stack;typeof r>"u"?console.warn("PixiJS Deprecation Warning: ",`${t}
Deprecated since v${n}`):(r=r.split(`
`).splice(e).join(`
`),console.groupCollapsed?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",`${t}
Deprecated since v${n}`),console.warn(r),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",`${t}
Deprecated since v${n}`),console.warn(r))),Fn[t]=!0}const Yi=()=>{};function Ye(n){return n+=n===0?1:0,--n,n|=n>>>1,n|=n>>>2,n|=n>>>4,n|=n>>>8,n|=n>>>16,n+1}function Mn(n){return!(n&n-1)&&!!n}function Hi(n){const t={};for(const e in n)n[e]!==void 0&&(t[e]=n[e]);return t}const In=Object.create(null);function xa(n){const t=In[n];return t===void 0&&(In[n]=ut("resource")),t}const ji=class qi extends Ft{constructor(t={}){super(),this._resourceType="textureSampler",this._touched=0,this._maxAnisotropy=1,this.destroyed=!1,t={...qi.defaultOptions,...t},this.addressMode=t.addressMode,this.addressModeU=t.addressModeU??this.addressModeU,this.addressModeV=t.addressModeV??this.addressModeV,this.addressModeW=t.addressModeW??this.addressModeW,this.scaleMode=t.scaleMode,this.magFilter=t.magFilter??this.magFilter,this.minFilter=t.minFilter??this.minFilter,this.mipmapFilter=t.mipmapFilter??this.mipmapFilter,this.lodMinClamp=t.lodMinClamp,this.lodMaxClamp=t.lodMaxClamp,this.compare=t.compare,this.maxAnisotropy=t.maxAnisotropy??1}set addressMode(t){this.addressModeU=t,this.addressModeV=t,this.addressModeW=t}get addressMode(){return this.addressModeU}set wrapMode(t){D(at,"TextureStyle.wrapMode is now TextureStyle.addressMode"),this.addressMode=t}get wrapMode(){return this.addressMode}set scaleMode(t){this.magFilter=t,this.minFilter=t,this.mipmapFilter=t}get scaleMode(){return this.magFilter}set maxAnisotropy(t){this._maxAnisotropy=Math.min(t,16),this._maxAnisotropy>1&&(this.scaleMode="linear")}get maxAnisotropy(){return this._maxAnisotropy}get _resourceId(){return this._sharedResourceId||this._generateResourceId()}update(){this.emit("change",this),this._sharedResourceId=null}_generateResourceId(){const t=`${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;return this._sharedResourceId=xa(t),this._resourceId}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this.removeAllListeners()}};ji.defaultOptions={addressMode:"clamp-to-edge",scaleMode:"linear"};let ya=ji;const Ki=class Zi extends Ft{constructor(t={}){super(),this.options=t,this.uid=ut("textureSource"),this._resourceType="textureSource",this._resourceId=ut("resource"),this.uploadMethodId="unknown",this._resolution=1,this.pixelWidth=1,this.pixelHeight=1,this.width=1,this.height=1,this.sampleCount=1,this.mipLevelCount=1,this.autoGenerateMipmaps=!1,this.format="rgba8unorm",this.dimension="2d",this.antialias=!1,this._touched=0,this._batchTick=-1,this._textureBindLocation=-1,t={...Zi.defaultOptions,...t},this.label=t.label??"",this.resource=t.resource,this.autoGarbageCollect=t.autoGarbageCollect,this._resolution=t.resolution,t.width?this.pixelWidth=t.width*this._resolution:this.pixelWidth=this.resource?this.resourceWidth??1:1,t.height?this.pixelHeight=t.height*this._resolution:this.pixelHeight=this.resource?this.resourceHeight??1:1,this.width=this.pixelWidth/this._resolution,this.height=this.pixelHeight/this._resolution,this.format=t.format,this.dimension=t.dimensions,this.mipLevelCount=t.mipLevelCount,this.autoGenerateMipmaps=t.autoGenerateMipmaps,this.sampleCount=t.sampleCount,this.antialias=t.antialias,this.alphaMode=t.alphaMode,this.style=new ya(Hi(t)),this.destroyed=!1,this._refreshPOT()}get source(){return this}get style(){return this._style}set style(t){this.style!==t&&(this._style?.off("change",this._onStyleChange,this),this._style=t,this._style?.on("change",this._onStyleChange,this),this._onStyleChange())}get addressMode(){return this._style.addressMode}set addressMode(t){this._style.addressMode=t}get repeatMode(){return this._style.addressMode}set repeatMode(t){this._style.addressMode=t}get magFilter(){return this._style.magFilter}set magFilter(t){this._style.magFilter=t}get minFilter(){return this._style.minFilter}set minFilter(t){this._style.minFilter=t}get mipmapFilter(){return this._style.mipmapFilter}set mipmapFilter(t){this._style.mipmapFilter=t}get lodMinClamp(){return this._style.lodMinClamp}set lodMinClamp(t){this._style.lodMinClamp=t}get lodMaxClamp(){return this._style.lodMaxClamp}set lodMaxClamp(t){this._style.lodMaxClamp=t}_onStyleChange(){this.emit("styleChange",this)}update(){if(this.resource){const t=this._resolution;if(this.resize(this.resourceWidth/t,this.resourceHeight/t))return}this.emit("update",this)}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this._style&&(this._style.destroy(),this._style=null),this.uploadMethodId=null,this.resource=null,this.removeAllListeners()}unload(){this._resourceId=ut("resource"),this.emit("change",this),this.emit("unload",this)}get resourceWidth(){const{resource:t}=this;return t.naturalWidth||t.videoWidth||t.displayWidth||t.width}get resourceHeight(){const{resource:t}=this;return t.naturalHeight||t.videoHeight||t.displayHeight||t.height}get resolution(){return this._resolution}set resolution(t){this._resolution!==t&&(this._resolution=t,this.width=this.pixelWidth/t,this.height=this.pixelHeight/t)}resize(t,e,r){r||(r=this._resolution),t||(t=this.width),e||(e=this.height);const i=Math.round(t*r),s=Math.round(e*r);return this.width=i/r,this.height=s/r,this._resolution=r,this.pixelWidth===i&&this.pixelHeight===s?!1:(this._refreshPOT(),this.pixelWidth=i,this.pixelHeight=s,this.emit("resize",this),this._resourceId=ut("resource"),this.emit("change",this),!0)}updateMipmaps(){this.autoGenerateMipmaps&&this.mipLevelCount>1&&this.emit("updateMipmaps",this)}set wrapMode(t){this._style.wrapMode=t}get wrapMode(){return this._style.wrapMode}set scaleMode(t){this._style.scaleMode=t}get scaleMode(){return this._style.scaleMode}_refreshPOT(){this.isPowerOfTwo=Mn(this.pixelWidth)&&Mn(this.pixelHeight)}static test(t){throw new Error("Unimplemented")}};Ki.defaultOptions={resolution:1,format:"bgra8unorm",alphaMode:"premultiply-alpha-on-upload",dimensions:"2d",mipLevelCount:1,autoGenerateMipmaps:!1,sampleCount:1,antialias:!1,autoGarbageCollect:!1};let bt=Ki;class cn extends bt{constructor(t){const e=t.resource||new Float32Array(t.width*t.height*4);let r=t.format;r||(e instanceof Float32Array?r="rgba32float":e instanceof Int32Array||e instanceof Uint32Array?r="rgba32uint":e instanceof Int16Array||e instanceof Uint16Array?r="rgba16uint":(e instanceof Int8Array,r="bgra8unorm")),super({...t,resource:e,format:r}),this.uploadMethodId="buffer"}static test(t){return t instanceof Int8Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array}}cn.extension=B.TextureSource;const zn=new V;class va{constructor(t,e){this.mapCoord=new V,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,typeof e>"u"?this.clampMargin=t.width<10?0:.5:this.clampMargin=e,this.isSimple=!1,this.texture=t}get texture(){return this._texture}set texture(t){this.texture!==t&&(this._texture?.removeListener("update",this.update,this),this._texture=t,this._texture.addListener("update",this.update,this),this.update())}multiplyUvs(t,e){e===void 0&&(e=t);const r=this.mapCoord;for(let i=0;i<t.length;i+=2){const s=t[i],o=t[i+1];e[i]=s*r.a+o*r.c+r.tx,e[i+1]=s*r.b+o*r.d+r.ty}return e}update(){const t=this._texture;this._updateID++;const e=t.uvs;this.mapCoord.set(e.x1-e.x0,e.y1-e.y0,e.x3-e.x0,e.y3-e.y0,e.x0,e.y0);const r=t.orig,i=t.trim;i&&(zn.set(r.width/i.width,0,0,r.height/i.height,-i.x/i.width,-i.y/i.height),this.mapCoord.append(zn));const s=t.source,o=this.uClampFrame,a=this.clampMargin/s._resolution,l=this.clampOffset/s._resolution;return o[0]=(t.frame.x+a+l)/s.width,o[1]=(t.frame.y+a+l)/s.height,o[2]=(t.frame.x+t.frame.width-a+l)/s.width,o[3]=(t.frame.y+t.frame.height-a+l)/s.height,this.uClampOffset[0]=this.clampOffset/s.pixelWidth,this.uClampOffset[1]=this.clampOffset/s.pixelHeight,this.isSimple=t.frame.width===s.width&&t.frame.height===s.height&&t.rotate===0,!0}}class N extends Ft{constructor({source:t,label:e,frame:r,orig:i,trim:s,defaultAnchor:o,defaultBorders:a,rotate:l,dynamic:u}={}){if(super(),this.uid=ut("texture"),this.uvs={x0:0,y0:0,x1:0,y1:0,x2:0,y2:0,x3:0,y3:0},this.frame=new lt,this.noFrame=!1,this.dynamic=!1,this.isTexture=!0,this.label=e,this.source=t?.source??new bt,this.noFrame=!r,r)this.frame.copyFrom(r);else{const{width:c,height:h}=this._source;this.frame.width=c,this.frame.height=h}this.orig=i||this.frame,this.trim=s,this.rotate=l??0,this.defaultAnchor=o,this.defaultBorders=a,this.destroyed=!1,this.dynamic=u||!1,this.updateUvs()}set source(t){this._source&&this._source.off("resize",this.update,this),this._source=t,t.on("resize",this.update,this),this.emit("update",this)}get source(){return this._source}get textureMatrix(){return this._textureMatrix||(this._textureMatrix=new va(this)),this._textureMatrix}get width(){return this.orig.width}get height(){return this.orig.height}updateUvs(){const{uvs:t,frame:e}=this,{width:r,height:i}=this._source,s=e.x/r,o=e.y/i,a=e.width/r,l=e.height/i;let u=this.rotate;if(u){const c=a/2,h=l/2,d=s+c,f=o+h;u=tt.add(u,tt.NW),t.x0=d+c*tt.uX(u),t.y0=f+h*tt.uY(u),u=tt.add(u,2),t.x1=d+c*tt.uX(u),t.y1=f+h*tt.uY(u),u=tt.add(u,2),t.x2=d+c*tt.uX(u),t.y2=f+h*tt.uY(u),u=tt.add(u,2),t.x3=d+c*tt.uX(u),t.y3=f+h*tt.uY(u)}else t.x0=s,t.y0=o,t.x1=s+a,t.y1=o,t.x2=s+a,t.y2=o+l,t.x3=s,t.y3=o+l}destroy(t=!1){this._source&&t&&(this._source.destroy(),this._source=null),this._textureMatrix=null,this.destroyed=!0,this.emit("destroy",this),this.removeAllListeners()}update(){this.noFrame&&(this.frame.width=this._source.width,this.frame.height=this._source.height),this.updateUvs(),this.emit("update",this)}get baseTexture(){return D(at,"Texture.baseTexture is now Texture.source"),this._source}}N.EMPTY=new N({label:"EMPTY",source:new bt({label:"EMPTY"})});N.EMPTY.destroy=Yi;N.WHITE=new N({source:new cn({resource:new Uint8Array([255,255,255,255]),width:1,height:1,alphaMode:"premultiply-alpha-on-upload",label:"WHITE"}),label:"WHITE"});N.WHITE.destroy=Yi;function _a(n,t,e){const{width:r,height:i}=e.orig,s=e.trim;if(s){const o=s.width,a=s.height;n.minX=s.x-t._x*r,n.maxX=n.minX+o,n.minY=s.y-t._y*i,n.maxY=n.minY+a}else n.minX=-t._x*r,n.maxX=n.minX+r,n.minY=-t._y*i,n.maxY=n.minY+i}const Rn=new V;class Pt{constructor(t=1/0,e=1/0,r=-1/0,i=-1/0){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.matrix=Rn,this.minX=t,this.minY=e,this.maxX=r,this.maxY=i}isEmpty(){return this.minX>this.maxX||this.minY>this.maxY}get rectangle(){this._rectangle||(this._rectangle=new lt);const t=this._rectangle;return this.minX>this.maxX||this.minY>this.maxY?(t.x=0,t.y=0,t.width=0,t.height=0):t.copyFromBounds(this),t}clear(){return this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.matrix=Rn,this}set(t,e,r,i){this.minX=t,this.minY=e,this.maxX=r,this.maxY=i}addFrame(t,e,r,i,s){s||(s=this.matrix);const o=s.a,a=s.b,l=s.c,u=s.d,c=s.tx,h=s.ty;let d=this.minX,f=this.minY,g=this.maxX,x=this.maxY,p=o*t+l*e+c,v=a*t+u*e+h;p<d&&(d=p),v<f&&(f=v),p>g&&(g=p),v>x&&(x=v),p=o*r+l*e+c,v=a*r+u*e+h,p<d&&(d=p),v<f&&(f=v),p>g&&(g=p),v>x&&(x=v),p=o*t+l*i+c,v=a*t+u*i+h,p<d&&(d=p),v<f&&(f=v),p>g&&(g=p),v>x&&(x=v),p=o*r+l*i+c,v=a*r+u*i+h,p<d&&(d=p),v<f&&(f=v),p>g&&(g=p),v>x&&(x=v),this.minX=d,this.minY=f,this.maxX=g,this.maxY=x}addRect(t,e){this.addFrame(t.x,t.y,t.x+t.width,t.y+t.height,e)}addBounds(t,e){this.addFrame(t.minX,t.minY,t.maxX,t.maxY,e)}addBoundsMask(t){this.minX=this.minX>t.minX?this.minX:t.minX,this.minY=this.minY>t.minY?this.minY:t.minY,this.maxX=this.maxX<t.maxX?this.maxX:t.maxX,this.maxY=this.maxY<t.maxY?this.maxY:t.maxY}applyMatrix(t){const e=this.minX,r=this.minY,i=this.maxX,s=this.maxY,{a:o,b:a,c:l,d:u,tx:c,ty:h}=t;let d=o*e+l*r+c,f=a*e+u*r+h;this.minX=d,this.minY=f,this.maxX=d,this.maxY=f,d=o*i+l*r+c,f=a*i+u*r+h,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY,d=o*e+l*s+c,f=a*e+u*s+h,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY,d=o*i+l*s+c,f=a*i+u*s+h,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY}fit(t){return this.minX<t.left&&(this.minX=t.left),this.maxX>t.right&&(this.maxX=t.right),this.minY<t.top&&(this.minY=t.top),this.maxY>t.bottom&&(this.maxY=t.bottom),this}fitBounds(t,e,r,i){return this.minX<t&&(this.minX=t),this.maxX>e&&(this.maxX=e),this.minY<r&&(this.minY=r),this.maxY>i&&(this.maxY=i),this}pad(t,e=t){return this.minX-=t,this.maxX+=t,this.minY-=e,this.maxY+=e,this}ceil(){return this.minX=Math.floor(this.minX),this.minY=Math.floor(this.minY),this.maxX=Math.ceil(this.maxX),this.maxY=Math.ceil(this.maxY),this}clone(){return new Pt(this.minX,this.minY,this.maxX,this.maxY)}scale(t,e=t){return this.minX*=t,this.minY*=e,this.maxX*=t,this.maxY*=e,this}get x(){return this.minX}set x(t){const e=this.maxX-this.minX;this.minX=t,this.maxX=t+e}get y(){return this.minY}set y(t){const e=this.maxY-this.minY;this.minY=t,this.maxY=t+e}get width(){return this.maxX-this.minX}set width(t){this.maxX=this.minX+t}get height(){return this.maxY-this.minY}set height(t){this.maxY=this.minY+t}get left(){return this.minX}get right(){return this.maxX}get top(){return this.minY}get bottom(){return this.maxY}get isPositive(){return this.maxX-this.minX>0&&this.maxY-this.minY>0}get isValid(){return this.minX+this.minY!==1/0}addVertexData(t,e,r,i){let s=this.minX,o=this.minY,a=this.maxX,l=this.maxY;i||(i=this.matrix);const u=i.a,c=i.b,h=i.c,d=i.d,f=i.tx,g=i.ty;for(let x=e;x<r;x+=2){const p=t[x],v=t[x+1],b=u*p+h*v+f,S=c*p+d*v+g;s=b<s?b:s,o=S<o?S:o,a=b>a?b:a,l=S>l?S:l}this.minX=s,this.minY=o,this.maxX=a,this.maxY=l}containsPoint(t,e){return this.minX<=t&&this.minY<=e&&this.maxX>=t&&this.maxY>=e}toString(){return`[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`}copyFrom(t){return this.minX=t.minX,this.minY=t.minY,this.maxX=t.maxX,this.maxY=t.maxY,this}}var ba={grad:.9,turn:360,rad:360/(2*Math.PI)},Gt=function(n){return typeof n=="string"?n.length>0:typeof n=="number"},ht=function(n,t,e){return t===void 0&&(t=0),e===void 0&&(e=Math.pow(10,t)),Math.round(e*n)/e+0},At=function(n,t,e){return t===void 0&&(t=0),e===void 0&&(e=1),n>e?e:n>t?n:t},Qi=function(n){return(n=isFinite(n)?n%360:0)>0?n:n+360},En=function(n){return{r:At(n.r,0,255),g:At(n.g,0,255),b:At(n.b,0,255),a:At(n.a)}},nr=function(n){return{r:ht(n.r),g:ht(n.g),b:ht(n.b),a:ht(n.a,3)}},Sa=/^#([0-9a-f]{3,8})$/i,Ie=function(n){var t=n.toString(16);return t.length<2?"0"+t:t},Ji=function(n){var t=n.r,e=n.g,r=n.b,i=n.a,s=Math.max(t,e,r),o=s-Math.min(t,e,r),a=o?s===t?(e-r)/o:s===e?2+(r-t)/o:4+(t-e)/o:0;return{h:60*(a<0?a+6:a),s:s?o/s*100:0,v:s/255*100,a:i}},ts=function(n){var t=n.h,e=n.s,r=n.v,i=n.a;t=t/360*6,e/=100,r/=100;var s=Math.floor(t),o=r*(1-e),a=r*(1-(t-s)*e),l=r*(1-(1-t+s)*e),u=s%6;return{r:255*[r,a,o,o,l,r][u],g:255*[l,r,r,a,o,o][u],b:255*[o,o,l,r,r,a][u],a:i}},kn=function(n){return{h:Qi(n.h),s:At(n.s,0,100),l:At(n.l,0,100),a:At(n.a)}},Bn=function(n){return{h:ht(n.h),s:ht(n.s),l:ht(n.l),a:ht(n.a,3)}},On=function(n){return ts((e=(t=n).s,{h:t.h,s:(e*=((r=t.l)<50?r:100-r)/100)>0?2*e/(r+e)*100:0,v:r+e,a:t.a}));var t,e,r},ve=function(n){return{h:(t=Ji(n)).h,s:(i=(200-(e=t.s))*(r=t.v)/100)>0&&i<200?e*r/100/(i<=100?i:200-i)*100:0,l:i/2,a:t.a};var t,e,r,i},wa=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Aa=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Ca=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Ta=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Ur={string:[[function(n){var t=Sa.exec(n);return t?(n=t[1]).length<=4?{r:parseInt(n[0]+n[0],16),g:parseInt(n[1]+n[1],16),b:parseInt(n[2]+n[2],16),a:n.length===4?ht(parseInt(n[3]+n[3],16)/255,2):1}:n.length===6||n.length===8?{r:parseInt(n.substr(0,2),16),g:parseInt(n.substr(2,2),16),b:parseInt(n.substr(4,2),16),a:n.length===8?ht(parseInt(n.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(n){var t=Ca.exec(n)||Ta.exec(n);return t?t[2]!==t[4]||t[4]!==t[6]?null:En({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(n){var t=wa.exec(n)||Aa.exec(n);if(!t)return null;var e,r,i=kn({h:(e=t[1],r=t[2],r===void 0&&(r="deg"),Number(e)*(ba[r]||1)),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)});return On(i)},"hsl"]],object:[[function(n){var t=n.r,e=n.g,r=n.b,i=n.a,s=i===void 0?1:i;return Gt(t)&&Gt(e)&&Gt(r)?En({r:Number(t),g:Number(e),b:Number(r),a:Number(s)}):null},"rgb"],[function(n){var t=n.h,e=n.s,r=n.l,i=n.a,s=i===void 0?1:i;if(!Gt(t)||!Gt(e)||!Gt(r))return null;var o=kn({h:Number(t),s:Number(e),l:Number(r),a:Number(s)});return On(o)},"hsl"],[function(n){var t=n.h,e=n.s,r=n.v,i=n.a,s=i===void 0?1:i;if(!Gt(t)||!Gt(e)||!Gt(r))return null;var o=function(a){return{h:Qi(a.h),s:At(a.s,0,100),v:At(a.v,0,100),a:At(a.a)}}({h:Number(t),s:Number(e),v:Number(r),a:Number(s)});return ts(o)},"hsv"]]},Gn=function(n,t){for(var e=0;e<t.length;e++){var r=t[e][0](n);if(r)return[r,t[e][1]]}return[null,void 0]},Pa=function(n){return typeof n=="string"?Gn(n.trim(),Ur.string):typeof n=="object"&&n!==null?Gn(n,Ur.object):[null,void 0]},ir=function(n,t){var e=ve(n);return{h:e.h,s:At(e.s+100*t,0,100),l:e.l,a:e.a}},sr=function(n){return(299*n.r+587*n.g+114*n.b)/1e3/255},Un=function(n,t){var e=ve(n);return{h:e.h,s:e.s,l:At(e.l+100*t,0,100),a:e.a}},Dr=function(){function n(t){this.parsed=Pa(t)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return n.prototype.isValid=function(){return this.parsed!==null},n.prototype.brightness=function(){return ht(sr(this.rgba),2)},n.prototype.isDark=function(){return sr(this.rgba)<.5},n.prototype.isLight=function(){return sr(this.rgba)>=.5},n.prototype.toHex=function(){return t=nr(this.rgba),e=t.r,r=t.g,i=t.b,o=(s=t.a)<1?Ie(ht(255*s)):"","#"+Ie(e)+Ie(r)+Ie(i)+o;var t,e,r,i,s,o},n.prototype.toRgb=function(){return nr(this.rgba)},n.prototype.toRgbString=function(){return t=nr(this.rgba),e=t.r,r=t.g,i=t.b,(s=t.a)<1?"rgba("+e+", "+r+", "+i+", "+s+")":"rgb("+e+", "+r+", "+i+")";var t,e,r,i,s},n.prototype.toHsl=function(){return Bn(ve(this.rgba))},n.prototype.toHslString=function(){return t=Bn(ve(this.rgba)),e=t.h,r=t.s,i=t.l,(s=t.a)<1?"hsla("+e+", "+r+"%, "+i+"%, "+s+")":"hsl("+e+", "+r+"%, "+i+"%)";var t,e,r,i,s},n.prototype.toHsv=function(){return t=Ji(this.rgba),{h:ht(t.h),s:ht(t.s),v:ht(t.v),a:ht(t.a,3)};var t},n.prototype.invert=function(){return Rt({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a});var t},n.prototype.saturate=function(t){return t===void 0&&(t=.1),Rt(ir(this.rgba,t))},n.prototype.desaturate=function(t){return t===void 0&&(t=.1),Rt(ir(this.rgba,-t))},n.prototype.grayscale=function(){return Rt(ir(this.rgba,-1))},n.prototype.lighten=function(t){return t===void 0&&(t=.1),Rt(Un(this.rgba,t))},n.prototype.darken=function(t){return t===void 0&&(t=.1),Rt(Un(this.rgba,-t))},n.prototype.rotate=function(t){return t===void 0&&(t=15),this.hue(this.hue()+t)},n.prototype.alpha=function(t){return typeof t=="number"?Rt({r:(e=this.rgba).r,g:e.g,b:e.b,a:t}):ht(this.rgba.a,3);var e},n.prototype.hue=function(t){var e=ve(this.rgba);return typeof t=="number"?Rt({h:t,s:e.s,l:e.l,a:e.a}):ht(e.h)},n.prototype.isEqual=function(t){return this.toHex()===Rt(t).toHex()},n}(),Rt=function(n){return n instanceof Dr?n:new Dr(n)},Dn=[],Fa=function(n){n.forEach(function(t){Dn.indexOf(t)<0&&(t(Dr,Ur),Dn.push(t))})};function Ma(n,t){var e={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},r={};for(var i in e)r[e[i]]=i;var s={};n.prototype.toName=function(o){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var a,l,u=r[this.toHex()];if(u)return u;if(o?.closest){var c=this.toRgb(),h=1/0,d="black";if(!s.length)for(var f in e)s[f]=new n(e[f]).toRgb();for(var g in e){var x=(a=c,l=s[g],Math.pow(a.r-l.r,2)+Math.pow(a.g-l.g,2)+Math.pow(a.b-l.b,2));x<h&&(h=x,d=g)}return d}},t.string.push([function(o){var a=o.toLowerCase(),l=a==="transparent"?"#0000":e[a];return l?new n(l).toRgb():null},"name"])}Fa([Ma]);const se=class me{constructor(t=16777215){this._value=null,this._components=new Float32Array(4),this._components.fill(1),this._int=16777215,this.value=t}get red(){return this._components[0]}get green(){return this._components[1]}get blue(){return this._components[2]}get alpha(){return this._components[3]}setValue(t){return this.value=t,this}set value(t){if(t instanceof me)this._value=this._cloneSource(t._value),this._int=t._int,this._components.set(t._components);else{if(t===null)throw new Error("Cannot set Color#value to null");(this._value===null||!this._isSourceEqual(this._value,t))&&(this._value=this._cloneSource(t),this._normalize(this._value))}}get value(){return this._value}_cloneSource(t){return typeof t=="string"||typeof t=="number"||t instanceof Number||t===null?t:Array.isArray(t)||ArrayBuffer.isView(t)?t.slice(0):typeof t=="object"&&t!==null?{...t}:t}_isSourceEqual(t,e){const r=typeof t;if(r!==typeof e)return!1;if(r==="number"||r==="string"||t instanceof Number)return t===e;if(Array.isArray(t)&&Array.isArray(e)||ArrayBuffer.isView(t)&&ArrayBuffer.isView(e))return t.length!==e.length?!1:t.every((s,o)=>s===e[o]);if(t!==null&&e!==null){const s=Object.keys(t),o=Object.keys(e);return s.length!==o.length?!1:s.every(a=>t[a]===e[a])}return t===e}toRgba(){const[t,e,r,i]=this._components;return{r:t,g:e,b:r,a:i}}toRgb(){const[t,e,r]=this._components;return{r:t,g:e,b:r}}toRgbaString(){const[t,e,r]=this.toUint8RgbArray();return`rgba(${t},${e},${r},${this.alpha})`}toUint8RgbArray(t){const[e,r,i]=this._components;return this._arrayRgb||(this._arrayRgb=[]),t||(t=this._arrayRgb),t[0]=Math.round(e*255),t[1]=Math.round(r*255),t[2]=Math.round(i*255),t}toArray(t){this._arrayRgba||(this._arrayRgba=[]),t||(t=this._arrayRgba);const[e,r,i,s]=this._components;return t[0]=e,t[1]=r,t[2]=i,t[3]=s,t}toRgbArray(t){this._arrayRgb||(this._arrayRgb=[]),t||(t=this._arrayRgb);const[e,r,i]=this._components;return t[0]=e,t[1]=r,t[2]=i,t}toNumber(){return this._int}toBgrNumber(){const[t,e,r]=this.toUint8RgbArray();return(r<<16)+(e<<8)+t}toLittleEndianNumber(){const t=this._int;return(t>>16)+(t&65280)+((t&255)<<16)}multiply(t){const[e,r,i,s]=me._temp.setValue(t)._components;return this._components[0]*=e,this._components[1]*=r,this._components[2]*=i,this._components[3]*=s,this._refreshInt(),this._value=null,this}premultiply(t,e=!0){return e&&(this._components[0]*=t,this._components[1]*=t,this._components[2]*=t),this._components[3]=t,this._refreshInt(),this._value=null,this}toPremultiplied(t,e=!0){if(t===1)return(255<<24)+this._int;if(t===0)return e?0:this._int;let r=this._int>>16&255,i=this._int>>8&255,s=this._int&255;return e&&(r=r*t+.5|0,i=i*t+.5|0,s=s*t+.5|0),(t*255<<24)+(r<<16)+(i<<8)+s}toHex(){const t=this._int.toString(16);return`#${"000000".substring(0,6-t.length)+t}`}toHexa(){const e=Math.round(this._components[3]*255).toString(16);return this.toHex()+"00".substring(0,2-e.length)+e}setAlpha(t){return this._components[3]=this._clamp(t),this}_normalize(t){let e,r,i,s;if((typeof t=="number"||t instanceof Number)&&t>=0&&t<=16777215){const o=t;e=(o>>16&255)/255,r=(o>>8&255)/255,i=(o&255)/255,s=1}else if((Array.isArray(t)||t instanceof Float32Array)&&t.length>=3&&t.length<=4)t=this._clamp(t),[e,r,i,s=1]=t;else if((t instanceof Uint8Array||t instanceof Uint8ClampedArray)&&t.length>=3&&t.length<=4)t=this._clamp(t,0,255),[e,r,i,s=255]=t,e/=255,r/=255,i/=255,s/=255;else if(typeof t=="string"||typeof t=="object"){if(typeof t=="string"){const a=me.HEX_PATTERN.exec(t);a&&(t=`#${a[2]}`)}const o=Rt(t);o.isValid()&&({r:e,g:r,b:i,a:s}=o.rgba,e/=255,r/=255,i/=255)}if(e!==void 0)this._components[0]=e,this._components[1]=r,this._components[2]=i,this._components[3]=s,this._refreshInt();else throw new Error(`Unable to convert color ${t}`)}_refreshInt(){this._clamp(this._components);const[t,e,r]=this._components;this._int=(t*255<<16)+(e*255<<8)+(r*255|0)}_clamp(t,e=0,r=1){return typeof t=="number"?Math.min(Math.max(t,e),r):(t.forEach((i,s)=>{t[s]=Math.min(Math.max(i,e),r)}),t)}static isColorLike(t){return typeof t=="number"||typeof t=="string"||t instanceof Number||t instanceof me||Array.isArray(t)||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Float32Array||t.r!==void 0&&t.g!==void 0&&t.b!==void 0||t.r!==void 0&&t.g!==void 0&&t.b!==void 0&&t.a!==void 0||t.h!==void 0&&t.s!==void 0&&t.l!==void 0||t.h!==void 0&&t.s!==void 0&&t.l!==void 0&&t.a!==void 0||t.h!==void 0&&t.s!==void 0&&t.v!==void 0||t.h!==void 0&&t.s!==void 0&&t.v!==void 0&&t.a!==void 0}};se.shared=new se;se._temp=new se;se.HEX_PATTERN=/^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;let Q=se;const Ia={cullArea:null,cullable:!1,cullableChildren:!0};class hn{constructor(t,e){this._pool=[],this._count=0,this._index=0,this._classType=t,e&&this.prepopulate(e)}prepopulate(t){for(let e=0;e<t;e++)this._pool[this._index++]=new this._classType;this._count+=t}get(t){let e;return this._index>0?e=this._pool[--this._index]:e=new this._classType,e.init?.(t),e}return(t){t.reset?.(),this._pool[this._index++]=t}get totalSize(){return this._count}get totalFree(){return this._index}get totalUsed(){return this._count-this._index}clear(){this._pool.length=0,this._index=0}}class za{constructor(){this._poolsByClass=new Map}prepopulate(t,e){this.getPool(t).prepopulate(e)}get(t,e){return this.getPool(t).get(e)}return(t){this.getPool(t.constructor).return(t)}getPool(t){return this._poolsByClass.has(t)||this._poolsByClass.set(t,new hn(t)),this._poolsByClass.get(t)}stats(){const t={};return this._poolsByClass.forEach(e=>{const r=t[e._classType.name]?e._classType.name+e._classType.ID:e._classType.name;t[r]={free:e.totalFree,used:e.totalUsed,size:e.totalSize}}),t}}const Ut=new za,Ra={get isCachedAsTexture(){return!!this.renderGroup?.isCachedAsTexture},cacheAsTexture(n){typeof n=="boolean"&&n===!1?this.disableRenderGroup():(this.enableRenderGroup(),this.renderGroup.enableCacheAsTexture(n===!0?{}:n))},updateCacheTexture(){this.renderGroup?.updateCacheTexture()},get cacheAsBitmap(){return this.isCachedAsTexture},set cacheAsBitmap(n){D("v8.6.0","cacheAsBitmap is deprecated, use cacheAsTexture instead."),this.cacheAsTexture(n)}};function Ea(n,t,e){const r=n.length;let i;if(t>=r||e===0)return;e=t+e>r?r-t:e;const s=r-e;for(i=t;i<s;++i)n[i]=n[i+e];n.length=s}const ka={allowChildren:!0,removeChildren(n=0,t){const e=t??this.children.length,r=e-n,i=[];if(r>0&&r<=e){for(let o=e-1;o>=n;o--){const a=this.children[o];a&&(i.push(a),a.parent=null)}Ea(this.children,n,e);const s=this.renderGroup||this.parentRenderGroup;s&&s.removeChildren(i);for(let o=0;o<i.length;++o)this.emit("childRemoved",i[o],this,o),i[o].emit("removed",this);return i.length>0&&this._didViewChangeTick++,i}else if(r===0&&this.children.length===0)return i;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},removeChildAt(n){const t=this.getChildAt(n);return this.removeChild(t)},getChildAt(n){if(n<0||n>=this.children.length)throw new Error(`getChildAt: Index (${n}) does not exist.`);return this.children[n]},setChildIndex(n,t){if(t<0||t>=this.children.length)throw new Error(`The index ${t} supplied is out of bounds ${this.children.length}`);this.getChildIndex(n),this.addChildAt(n,t)},getChildIndex(n){const t=this.children.indexOf(n);if(t===-1)throw new Error("The supplied Container must be a child of the caller");return t},addChildAt(n,t){this.allowChildren||D(at,"addChildAt: Only Containers will be allowed to add children in v8.0.0");const{children:e}=this;if(t<0||t>e.length)throw new Error(`${n}addChildAt: The index ${t} supplied is out of bounds ${e.length}`);if(n.parent){const i=n.parent.children.indexOf(n);if(n.parent===this&&i===t)return n;i!==-1&&n.parent.children.splice(i,1)}t===e.length?e.push(n):e.splice(t,0,n),n.parent=this,n.didChange=!0,n._updateFlags=15;const r=this.renderGroup||this.parentRenderGroup;return r&&r.addChild(n),this.sortableChildren&&(this.sortDirty=!0),this.emit("childAdded",n,this,t),n.emit("added",this),n},swapChildren(n,t){if(n===t)return;const e=this.getChildIndex(n),r=this.getChildIndex(t);this.children[e]=t,this.children[r]=n;const i=this.renderGroup||this.parentRenderGroup;i&&(i.structureDidChange=!0),this._didContainerChangeTick++},removeFromParent(){this.parent?.removeChild(this)},reparentChild(...n){return n.length===1?this.reparentChildAt(n[0],this.children.length):(n.forEach(t=>this.reparentChildAt(t,this.children.length)),n[0])},reparentChildAt(n,t){if(n.parent===this)return this.setChildIndex(n,t),n;const e=n.worldTransform.clone();n.removeFromParent(),this.addChildAt(n,t);const r=this.worldTransform.clone();return r.invert(),e.prepend(r),n.setFromMatrix(e),n}},Ba={collectRenderables(n,t,e){this.parentRenderLayer&&this.parentRenderLayer!==e||this.globalDisplayStatus<7||!this.includeInBuild||(this.sortableChildren&&this.sortChildren(),this.isSimple?this.collectRenderablesSimple(n,t,e):this.renderGroup?t.renderPipes.renderGroup.addRenderGroup(this.renderGroup,n):this.collectRenderablesWithEffects(n,t,e))},collectRenderablesSimple(n,t,e){const r=this.children,i=r.length;for(let s=0;s<i;s++)r[s].collectRenderables(n,t,e)},collectRenderablesWithEffects(n,t,e){const{renderPipes:r}=t;for(let i=0;i<this.effects.length;i++){const s=this.effects[i];r[s.pipe].push(s,this,n)}this.collectRenderablesSimple(n,t,e);for(let i=this.effects.length-1;i>=0;i--){const s=this.effects[i];r[s.pipe].pop(s,this,n)}}};class Ln{constructor(){this.pipe="filter",this.priority=1}destroy(){for(let t=0;t<this.filters.length;t++)this.filters[t].destroy();this.filters=null,this.filterArea=null}}class Oa{constructor(){this._effectClasses=[],this._tests=[],this._initialized=!1}init(){this._initialized||(this._initialized=!0,this._effectClasses.forEach(t=>{this.add({test:t.test,maskClass:t})}))}add(t){this._tests.push(t)}getMaskEffect(t){this._initialized||this.init();for(let e=0;e<this._tests.length;e++){const r=this._tests[e];if(r.test(t))return Ut.get(r.maskClass,t)}return t}returnMaskEffect(t){Ut.return(t)}}const Lr=new Oa;mt.handleByList(B.MaskEffect,Lr._effectClasses);const Ga={_maskEffect:null,_maskOptions:{inverse:!1},_filterEffect:null,effects:[],_markStructureAsChanged(){const n=this.renderGroup||this.parentRenderGroup;n&&(n.structureDidChange=!0)},addEffect(n){this.effects.indexOf(n)===-1&&(this.effects.push(n),this.effects.sort((e,r)=>e.priority-r.priority),this._markStructureAsChanged(),this._updateIsSimple())},removeEffect(n){const t=this.effects.indexOf(n);t!==-1&&(this.effects.splice(t,1),this._markStructureAsChanged(),this._updateIsSimple())},set mask(n){const t=this._maskEffect;t?.mask!==n&&(t&&(this.removeEffect(t),Lr.returnMaskEffect(t),this._maskEffect=null),n!=null&&(this._maskEffect=Lr.getMaskEffect(n),this.addEffect(this._maskEffect)))},setMask(n){this._maskOptions={...this._maskOptions,...n},n.mask&&(this.mask=n.mask),this._markStructureAsChanged()},get mask(){return this._maskEffect?.mask},set filters(n){!Array.isArray(n)&&n&&(n=[n]);const t=this._filterEffect||(this._filterEffect=new Ln);n=n;const e=n?.length>0,r=t.filters?.length>0,i=e!==r;n=Array.isArray(n)?n.slice(0):n,t.filters=Object.freeze(n),i&&(e?this.addEffect(t):(this.removeEffect(t),t.filters=n??null))},get filters(){return this._filterEffect?.filters},set filterArea(n){this._filterEffect||(this._filterEffect=new Ln),this._filterEffect.filterArea=n},get filterArea(){return this._filterEffect?.filterArea}},Ua={label:null,get name(){return D(at,"Container.name property has been removed, use Container.label instead"),this.label},set name(n){D(at,"Container.name property has been removed, use Container.label instead"),this.label=n},getChildByName(n,t=!1){return this.getChildByLabel(n,t)},getChildByLabel(n,t=!1){const e=this.children;for(let r=0;r<e.length;r++){const i=e[r];if(i.label===n||n instanceof RegExp&&n.test(i.label))return i}if(t)for(let r=0;r<e.length;r++){const s=e[r].getChildByLabel(n,!0);if(s)return s}return null},getChildrenByLabel(n,t=!1,e=[]){const r=this.children;for(let i=0;i<r.length;i++){const s=r[i];(s.label===n||n instanceof RegExp&&n.test(s.label))&&e.push(s)}if(t)for(let i=0;i<r.length;i++)r[i].getChildrenByLabel(n,!0,e);return e}},gt=new hn(V),Dt=new hn(Pt),Da=new V,La={getFastGlobalBounds(n,t){t||(t=new Pt),t.clear(),this._getGlobalBoundsRecursive(!!n,t,this.parentRenderLayer),t.isValid||t.set(0,0,0,0);const e=this.renderGroup||this.parentRenderGroup;return t.applyMatrix(e.worldTransform),t},_getGlobalBoundsRecursive(n,t,e){let r=t;if(n&&this.parentRenderLayer&&this.parentRenderLayer!==e||this.localDisplayStatus!==7||!this.measurable)return;const i=!!this.effects.length;if((this.renderGroup||i)&&(r=Dt.get().clear()),this.boundsArea)t.addRect(this.boundsArea,this.worldTransform);else{if(this.renderPipeId){const o=this.bounds;r.addFrame(o.minX,o.minY,o.maxX,o.maxY,this.groupTransform)}const s=this.children;for(let o=0;o<s.length;o++)s[o]._getGlobalBoundsRecursive(n,r,e)}if(i){let s=!1;const o=this.renderGroup||this.parentRenderGroup;for(let a=0;a<this.effects.length;a++)this.effects[a].addBounds&&(s||(s=!0,r.applyMatrix(o.worldTransform)),this.effects[a].addBounds(r,!0));s&&(r.applyMatrix(o.worldTransform.copyTo(Da).invert()),t.addBounds(r,this.relativeGroupTransform)),t.addBounds(r),Dt.return(r)}else this.renderGroup&&(t.addBounds(r,this.relativeGroupTransform),Dt.return(r))}};function es(n,t,e){e.clear();let r,i;return n.parent?t?r=n.parent.worldTransform:(i=gt.get().identity(),r=fn(n,i)):r=V.IDENTITY,rs(n,e,r,t),i&&gt.return(i),e.isValid||e.set(0,0,0,0),e}function rs(n,t,e,r){if(!n.visible||!n.measurable)return;let i;r?i=n.worldTransform:(n.updateLocalTransform(),i=gt.get(),i.appendFrom(n.localTransform,e));const s=t,o=!!n.effects.length;if(o&&(t=Dt.get().clear()),n.boundsArea)t.addRect(n.boundsArea,i);else{n.bounds&&(t.matrix=i,t.addBounds(n.bounds));for(let a=0;a<n.children.length;a++)rs(n.children[a],t,i,r)}if(o){for(let a=0;a<n.effects.length;a++)n.effects[a].addBounds?.(t);s.addBounds(t,V.IDENTITY),Dt.return(t)}r||gt.return(i)}function fn(n,t){const e=n.parent;return e&&(fn(e,t),e.updateLocalTransform(),t.append(e.localTransform)),t}function ns(n,t){if(n===16777215||!t)return t;if(t===16777215||!n)return n;const e=n>>16&255,r=n>>8&255,i=n&255,s=t>>16&255,o=t>>8&255,a=t&255,l=e*s/255|0,u=r*o/255|0,c=i*a/255|0;return(l<<16)+(u<<8)+c}const Nn=16777215;function $n(n,t){return n===Nn?t:t===Nn?n:ns(n,t)}function Le(n){return((n&255)<<16)+(n&65280)+(n>>16&255)}const Na={getGlobalAlpha(n){if(n)return this.renderGroup?this.renderGroup.worldAlpha:this.parentRenderGroup?this.parentRenderGroup.worldAlpha*this.alpha:this.alpha;let t=this.alpha,e=this.parent;for(;e;)t*=e.alpha,e=e.parent;return t},getGlobalTransform(n,t){if(t)return n.copyFrom(this.worldTransform);this.updateLocalTransform();const e=fn(this,gt.get().identity());return n.appendFrom(this.localTransform,e),gt.return(e),n},getGlobalTint(n){if(n)return this.renderGroup?Le(this.renderGroup.worldColor):this.parentRenderGroup?Le($n(this.localColor,this.parentRenderGroup.worldColor)):this.tint;let t=this.localColor,e=this.parent;for(;e;)t=$n(t,e.localColor),e=e.parent;return Le(t)}};let or=0;const Vn=500;function et(...n){or!==Vn&&(or++,or===Vn?console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS."):console.warn("PixiJS Warning: ",...n))}function is(n,t,e){return t.clear(),e||(e=V.IDENTITY),ss(n,t,e,n,!0),t.isValid||t.set(0,0,0,0),t}function ss(n,t,e,r,i){let s;if(i)s=gt.get(),s=e.copyTo(s);else{if(!n.visible||!n.measurable)return;n.updateLocalTransform();const l=n.localTransform;s=gt.get(),s.appendFrom(l,e)}const o=t,a=!!n.effects.length;if(a&&(t=Dt.get().clear()),n.boundsArea)t.addRect(n.boundsArea,s);else{n.renderPipeId&&(t.matrix=s,t.addBounds(n.bounds));const l=n.children;for(let u=0;u<l.length;u++)ss(l[u],t,s,r,!1)}if(a){for(let l=0;l<n.effects.length;l++)n.effects[l].addLocalBounds?.(t,r);o.addBounds(t,V.IDENTITY),Dt.return(t)}gt.return(s)}function os(n,t){const e=n.children;for(let r=0;r<e.length;r++){const i=e[r],s=i.uid,o=(i._didViewChangeTick&65535)<<16|i._didContainerChangeTick&65535,a=t.index;(t.data[a]!==s||t.data[a+1]!==o)&&(t.data[t.index]=s,t.data[t.index+1]=o,t.didChange=!0),t.index=a+2,i.children.length&&os(i,t)}return t.didChange}const $a=new V,Va={_localBoundsCacheId:-1,_localBoundsCacheData:null,_setWidth(n,t){const e=Math.sign(this.scale.x)||1;t!==0?this.scale.x=n/t*e:this.scale.x=e},_setHeight(n,t){const e=Math.sign(this.scale.y)||1;t!==0?this.scale.y=n/t*e:this.scale.y=e},getLocalBounds(){this._localBoundsCacheData||(this._localBoundsCacheData={data:[],index:1,didChange:!1,localBounds:new Pt});const n=this._localBoundsCacheData;return n.index=1,n.didChange=!1,n.data[0]!==this._didViewChangeTick&&(n.didChange=!0,n.data[0]=this._didViewChangeTick),os(this,n),n.didChange&&is(this,n.localBounds,$a),n.localBounds},getBounds(n,t){return es(this,n,t||new Pt)}},Wa={_onRender:null,set onRender(n){const t=this.renderGroup||this.parentRenderGroup;if(!n){this._onRender&&t?.removeOnRender(this),this._onRender=null;return}this._onRender||t?.addOnRender(this),this._onRender=n},get onRender(){return this._onRender}},Xa={_zIndex:0,sortDirty:!1,sortableChildren:!1,get zIndex(){return this._zIndex},set zIndex(n){this._zIndex!==n&&(this._zIndex=n,this.depthOfChildModified())},depthOfChildModified(){this.parent&&(this.parent.sortableChildren=!0,this.parent.sortDirty=!0),this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0)},sortChildren(){this.sortDirty&&(this.sortDirty=!1,this.children.sort(Ya))}};function Ya(n,t){return n._zIndex-t._zIndex}const Ha={getGlobalPosition(n=new pt,t=!1){return this.parent?this.parent.toGlobal(this._position,n,t):(n.x=this._position.x,n.y=this._position.y),n},toGlobal(n,t,e=!1){const r=this.getGlobalTransform(gt.get(),e);return t=r.apply(n,t),gt.return(r),t},toLocal(n,t,e,r){t&&(n=t.toGlobal(n,e,r));const i=this.getGlobalTransform(gt.get(),r);return e=i.applyInverse(n,e),gt.return(i),e}};class as{constructor(){this.uid=ut("instructionSet"),this.instructions=[],this.instructionSize=0,this.renderables=[],this.gcTick=0}reset(){this.instructionSize=0}add(t){this.instructions[this.instructionSize++]=t}log(){this.instructions.length=this.instructionSize,console.table(this.instructions,["type","action"])}}let ja=0;class qa{constructor(t){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=t||{},this.enableFullScreen=!1}createTexture(t,e,r){const i=new bt({...this.textureOptions,width:t,height:e,resolution:1,antialias:r,autoGarbageCollect:!1});return new N({source:i,label:`texturePool_${ja++}`})}getOptimalTexture(t,e,r=1,i){let s=Math.ceil(t*r-1e-6),o=Math.ceil(e*r-1e-6);s=Ye(s),o=Ye(o);const a=(s<<17)+(o<<1)+(i?1:0);this._texturePool[a]||(this._texturePool[a]=[]);let l=this._texturePool[a].pop();return l||(l=this.createTexture(s,o,i)),l.source._resolution=r,l.source.width=s/r,l.source.height=o/r,l.source.pixelWidth=s,l.source.pixelHeight=o,l.frame.x=0,l.frame.y=0,l.frame.width=t,l.frame.height=e,l.updateUvs(),this._poolKeyHash[l.uid]=a,l}getSameSizeTexture(t,e=!1){const r=t.source;return this.getOptimalTexture(t.width,t.height,r._resolution,e)}returnTexture(t){const e=this._poolKeyHash[t.uid];this._texturePool[e].push(t)}clear(t){if(t=t!==!1,t)for(const e in this._texturePool){const r=this._texturePool[e];if(r)for(let i=0;i<r.length;i++)r[i].destroy(!0)}this._texturePool={}}}const wt=new qa;class Ka{constructor(){this.renderPipeId="renderGroup",this.root=null,this.canBundle=!1,this.renderGroupParent=null,this.renderGroupChildren=[],this.worldTransform=new V,this.worldColorAlpha=4294967295,this.worldColor=16777215,this.worldAlpha=1,this.childrenToUpdate=Object.create(null),this.updateTick=0,this.gcTick=0,this.childrenRenderablesToUpdate={list:[],index:0},this.structureDidChange=!0,this.instructionSet=new as,this._onRenderContainers=[],this.textureNeedsUpdate=!0,this.isCachedAsTexture=!1,this._matrixDirty=7}init(t){this.root=t,t._onRender&&this.addOnRender(t),t.didChange=!0;const e=t.children;for(let r=0;r<e.length;r++){const i=e[r];i._updateFlags=15,this.addChild(i)}}enableCacheAsTexture(t={}){this.textureOptions=t,this.isCachedAsTexture=!0,this.textureNeedsUpdate=!0}disableCacheAsTexture(){this.isCachedAsTexture=!1,this.texture&&(wt.returnTexture(this.texture),this.texture=null)}updateCacheTexture(){this.textureNeedsUpdate=!0}reset(){this.renderGroupChildren.length=0;for(const t in this.childrenToUpdate){const e=this.childrenToUpdate[t];e.list.fill(null),e.index=0}this.childrenRenderablesToUpdate.index=0,this.childrenRenderablesToUpdate.list.fill(null),this.root=null,this.updateTick=0,this.structureDidChange=!0,this._onRenderContainers.length=0,this.renderGroupParent=null,this.disableCacheAsTexture()}get localTransform(){return this.root.localTransform}addRenderGroupChild(t){t.renderGroupParent&&t.renderGroupParent._removeRenderGroupChild(t),t.renderGroupParent=this,this.renderGroupChildren.push(t)}_removeRenderGroupChild(t){const e=this.renderGroupChildren.indexOf(t);e>-1&&this.renderGroupChildren.splice(e,1),t.renderGroupParent=null}addChild(t){if(this.structureDidChange=!0,t.parentRenderGroup=this,t.updateTick=-1,t.parent===this.root?t.relativeRenderGroupDepth=1:t.relativeRenderGroupDepth=t.parent.relativeRenderGroupDepth+1,t.didChange=!0,this.onChildUpdate(t),t.renderGroup){this.addRenderGroupChild(t.renderGroup);return}t._onRender&&this.addOnRender(t);const e=t.children;for(let r=0;r<e.length;r++)this.addChild(e[r])}removeChild(t){if(this.structureDidChange=!0,t._onRender&&(t.renderGroup||this.removeOnRender(t)),t.parentRenderGroup=null,t.renderGroup){this._removeRenderGroupChild(t.renderGroup);return}const e=t.children;for(let r=0;r<e.length;r++)this.removeChild(e[r])}removeChildren(t){for(let e=0;e<t.length;e++)this.removeChild(t[e])}onChildUpdate(t){let e=this.childrenToUpdate[t.relativeRenderGroupDepth];e||(e=this.childrenToUpdate[t.relativeRenderGroupDepth]={index:0,list:[]}),e.list[e.index++]=t}updateRenderable(t){t.globalDisplayStatus<7||(this.instructionSet.renderPipes[t.renderPipeId].updateRenderable(t),t.didViewUpdate=!1)}onChildViewUpdate(t){this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++]=t}get isRenderable(){return this.root.localDisplayStatus===7&&this.worldAlpha>0}addOnRender(t){this._onRenderContainers.push(t)}removeOnRender(t){this._onRenderContainers.splice(this._onRenderContainers.indexOf(t),1)}runOnRender(t){for(let e=0;e<this._onRenderContainers.length;e++)this._onRenderContainers[e]._onRender(t)}destroy(){this.disableCacheAsTexture(),this.renderGroupParent=null,this.root=null,this.childrenRenderablesToUpdate=null,this.childrenToUpdate=null,this.renderGroupChildren=null,this._onRenderContainers=null,this.instructionSet=null}getChildren(t=[]){const e=this.root.children;for(let r=0;r<e.length;r++)this._getChildren(e[r],t);return t}_getChildren(t,e=[]){if(e.push(t),t.renderGroup)return e;const r=t.children;for(let i=0;i<r.length;i++)this._getChildren(r[i],e);return e}invalidateMatrices(){this._matrixDirty=7}get inverseWorldTransform(){return(this._matrixDirty&1)===0?this._inverseWorldTransform:(this._matrixDirty&=-2,this._inverseWorldTransform||(this._inverseWorldTransform=new V),this._inverseWorldTransform.copyFrom(this.worldTransform).invert())}get textureOffsetInverseTransform(){return(this._matrixDirty&2)===0?this._textureOffsetInverseTransform:(this._matrixDirty&=-3,this._textureOffsetInverseTransform||(this._textureOffsetInverseTransform=new V),this._textureOffsetInverseTransform.copyFrom(this.inverseWorldTransform).translate(-this._textureBounds.x,-this._textureBounds.y))}get inverseParentTextureTransform(){if((this._matrixDirty&4)===0)return this._inverseParentTextureTransform;this._matrixDirty&=-5;const t=this._parentCacheAsTextureRenderGroup;return t?(this._inverseParentTextureTransform||(this._inverseParentTextureTransform=new V),this._inverseParentTextureTransform.copyFrom(this.worldTransform).prepend(t.inverseWorldTransform).translate(-t._textureBounds.x,-t._textureBounds.y)):this.worldTransform}get cacheToLocalTransform(){return this._parentCacheAsTextureRenderGroup?this._parentCacheAsTextureRenderGroup.textureOffsetInverseTransform:null}}function Za(n,t,e={}){for(const r in t)!e[r]&&t[r]!==void 0&&(n[r]=t[r])}const ar=new xt(null),lr=new xt(null),ur=new xt(null,1,1),Wn=1,Qa=2,cr=4;class Vt extends Ft{constructor(t={}){super(),this.uid=ut("renderable"),this._updateFlags=15,this.renderGroup=null,this.parentRenderGroup=null,this.parentRenderGroupIndex=0,this.didChange=!1,this.didViewUpdate=!1,this.relativeRenderGroupDepth=0,this.children=[],this.parent=null,this.includeInBuild=!0,this.measurable=!0,this.isSimple=!0,this.updateTick=-1,this.localTransform=new V,this.relativeGroupTransform=new V,this.groupTransform=this.relativeGroupTransform,this.destroyed=!1,this._position=new xt(this,0,0),this._scale=ur,this._pivot=lr,this._skew=ar,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._rotation=0,this.localColor=16777215,this.localAlpha=1,this.groupAlpha=1,this.groupColor=16777215,this.groupColorAlpha=4294967295,this.localBlendMode="inherit",this.groupBlendMode="normal",this.localDisplayStatus=7,this.globalDisplayStatus=7,this._didContainerChangeTick=0,this._didViewChangeTick=0,this._didLocalTransformChangeId=-1,this.effects=[],Za(this,t,{children:!0,parent:!0,effects:!0}),t.children?.forEach(e=>this.addChild(e)),t.parent?.addChild(this)}static mixin(t){D("8.8.0","Container.mixin is deprecated, please use extensions.mixin instead."),mt.mixin(Vt,t)}set _didChangeId(t){this._didViewChangeTick=t>>12&4095,this._didContainerChangeTick=t&4095}get _didChangeId(){return this._didContainerChangeTick&4095|(this._didViewChangeTick&4095)<<12}addChild(...t){if(this.allowChildren||D(at,"addChild: Only Containers will be allowed to add children in v8.0.0"),t.length>1){for(let i=0;i<t.length;i++)this.addChild(t[i]);return t[0]}const e=t[0],r=this.renderGroup||this.parentRenderGroup;return e.parent===this?(this.children.splice(this.children.indexOf(e),1),this.children.push(e),r&&(r.structureDidChange=!0),e):(e.parent&&e.parent.removeChild(e),this.children.push(e),this.sortableChildren&&(this.sortDirty=!0),e.parent=this,e.didChange=!0,e._updateFlags=15,r&&r.addChild(e),this.emit("childAdded",e,this,this.children.length-1),e.emit("added",this),this._didViewChangeTick++,e._zIndex!==0&&e.depthOfChildModified(),e)}removeChild(...t){if(t.length>1){for(let i=0;i<t.length;i++)this.removeChild(t[i]);return t[0]}const e=t[0],r=this.children.indexOf(e);return r>-1&&(this._didViewChangeTick++,this.children.splice(r,1),this.renderGroup?this.renderGroup.removeChild(e):this.parentRenderGroup&&this.parentRenderGroup.removeChild(e),e.parentRenderLayer&&e.parentRenderLayer.detach(e),e.parent=null,this.emit("childRemoved",e,this,r),e.emit("removed",this)),e}_onUpdate(t){t&&t===this._skew&&this._updateSkew(),this._didContainerChangeTick++,!this.didChange&&(this.didChange=!0,this.parentRenderGroup&&this.parentRenderGroup.onChildUpdate(this))}set isRenderGroup(t){!!this.renderGroup!==t&&(t?this.enableRenderGroup():this.disableRenderGroup())}get isRenderGroup(){return!!this.renderGroup}enableRenderGroup(){if(this.renderGroup)return;const t=this.parentRenderGroup;t?.removeChild(this),this.renderGroup=Ut.get(Ka,this),this.groupTransform=V.IDENTITY,t?.addChild(this),this._updateIsSimple()}disableRenderGroup(){if(!this.renderGroup)return;const t=this.parentRenderGroup;t?.removeChild(this),Ut.return(this.renderGroup),this.renderGroup=null,this.groupTransform=this.relativeGroupTransform,t?.addChild(this),this._updateIsSimple()}_updateIsSimple(){this.isSimple=!this.renderGroup&&this.effects.length===0}get worldTransform(){return this._worldTransform||(this._worldTransform=new V),this.renderGroup?this._worldTransform.copyFrom(this.renderGroup.worldTransform):this.parentRenderGroup&&this._worldTransform.appendFrom(this.relativeGroupTransform,this.parentRenderGroup.worldTransform),this._worldTransform}get x(){return this._position.x}set x(t){this._position.x=t}get y(){return this._position.y}set y(t){this._position.y=t}get position(){return this._position}set position(t){this._position.copyFrom(t)}get rotation(){return this._rotation}set rotation(t){this._rotation!==t&&(this._rotation=t,this._onUpdate(this._skew))}get angle(){return this.rotation*fa}set angle(t){this.rotation=t*Or}get pivot(){return this._pivot===lr&&(this._pivot=new xt(this,0,0)),this._pivot}set pivot(t){this._pivot===lr&&(this._pivot=new xt(this,0,0)),typeof t=="number"?this._pivot.set(t):this._pivot.copyFrom(t)}get skew(){return this._skew===ar&&(this._skew=new xt(this,0,0)),this._skew}set skew(t){this._skew===ar&&(this._skew=new xt(this,0,0)),this._skew.copyFrom(t)}get scale(){return this._scale===ur&&(this._scale=new xt(this,1,1)),this._scale}set scale(t){this._scale===ur&&(this._scale=new xt(this,0,0)),typeof t=="number"?this._scale.set(t):this._scale.copyFrom(t)}get width(){return Math.abs(this.scale.x*this.getLocalBounds().width)}set width(t){const e=this.getLocalBounds().width;this._setWidth(t,e)}get height(){return Math.abs(this.scale.y*this.getLocalBounds().height)}set height(t){const e=this.getLocalBounds().height;this._setHeight(t,e)}getSize(t){t||(t={});const e=this.getLocalBounds();return t.width=Math.abs(this.scale.x*e.width),t.height=Math.abs(this.scale.y*e.height),t}setSize(t,e){const r=this.getLocalBounds();typeof t=="object"?(e=t.height??t.width,t=t.width):e??(e=t),t!==void 0&&this._setWidth(t,r.width),e!==void 0&&this._setHeight(e,r.height)}_updateSkew(){const t=this._rotation,e=this._skew;this._cx=Math.cos(t+e._y),this._sx=Math.sin(t+e._y),this._cy=-Math.sin(t-e._x),this._sy=Math.cos(t-e._x)}updateTransform(t){return this.position.set(typeof t.x=="number"?t.x:this.position.x,typeof t.y=="number"?t.y:this.position.y),this.scale.set(typeof t.scaleX=="number"?t.scaleX||1:this.scale.x,typeof t.scaleY=="number"?t.scaleY||1:this.scale.y),this.rotation=typeof t.rotation=="number"?t.rotation:this.rotation,this.skew.set(typeof t.skewX=="number"?t.skewX:this.skew.x,typeof t.skewY=="number"?t.skewY:this.skew.y),this.pivot.set(typeof t.pivotX=="number"?t.pivotX:this.pivot.x,typeof t.pivotY=="number"?t.pivotY:this.pivot.y),this}setFromMatrix(t){t.decompose(this)}updateLocalTransform(){const t=this._didContainerChangeTick;if(this._didLocalTransformChangeId===t)return;this._didLocalTransformChangeId=t;const e=this.localTransform,r=this._scale,i=this._pivot,s=this._position,o=r._x,a=r._y,l=i._x,u=i._y;e.a=this._cx*o,e.b=this._sx*o,e.c=this._cy*a,e.d=this._sy*a,e.tx=s._x-(l*e.a+u*e.c),e.ty=s._y-(l*e.b+u*e.d)}set alpha(t){t!==this.localAlpha&&(this.localAlpha=t,this._updateFlags|=Wn,this._onUpdate())}get alpha(){return this.localAlpha}set tint(t){const r=Q.shared.setValue(t??16777215).toBgrNumber();r!==this.localColor&&(this.localColor=r,this._updateFlags|=Wn,this._onUpdate())}get tint(){return Le(this.localColor)}set blendMode(t){this.localBlendMode!==t&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=Qa,this.localBlendMode=t,this._onUpdate())}get blendMode(){return this.localBlendMode}get visible(){return!!(this.localDisplayStatus&2)}set visible(t){const e=t?2:0;(this.localDisplayStatus&2)!==e&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=cr,this.localDisplayStatus^=2,this._onUpdate())}get culled(){return!(this.localDisplayStatus&4)}set culled(t){const e=t?0:4;(this.localDisplayStatus&4)!==e&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=cr,this.localDisplayStatus^=4,this._onUpdate())}get renderable(){return!!(this.localDisplayStatus&1)}set renderable(t){const e=t?1:0;(this.localDisplayStatus&1)!==e&&(this._updateFlags|=cr,this.localDisplayStatus^=1,this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._onUpdate())}get isRenderable(){return this.localDisplayStatus===7&&this.groupAlpha>0}destroy(t=!1){if(this.destroyed)return;this.destroyed=!0;let e;if(this.children.length&&(e=this.removeChildren(0,this.children.length)),this.removeFromParent(),this.parent=null,this._maskEffect=null,this._filterEffect=null,this.effects=null,this._position=null,this._scale=null,this._pivot=null,this._skew=null,this.emit("destroyed",this),this.removeAllListeners(),(typeof t=="boolean"?t:t?.children)&&e)for(let i=0;i<e.length;++i)e[i].destroy(t);this.renderGroup?.destroy(),this.renderGroup=null}}mt.mixin(Vt,ka,La,Ha,Wa,Va,Ga,Ua,Xa,Ia,Ra,Na,Ba);class Ja extends Vt{constructor(t){super(t),this.canBundle=!0,this.allowChildren=!1,this._roundPixels=0,this._lastUsed=-1,this._bounds=new Pt(0,1,0,0),this._boundsDirty=!0}get bounds(){return this._boundsDirty?(this.updateBounds(),this._boundsDirty=!1,this._bounds):this._bounds}get roundPixels(){return!!this._roundPixels}set roundPixels(t){this._roundPixels=t?1:0}containsPoint(t){const e=this.bounds,{x:r,y:i}=t;return r>=e.minX&&r<=e.maxX&&i>=e.minY&&i<=e.maxY}onViewUpdate(){if(this._didViewChangeTick++,this._boundsDirty=!0,this.didViewUpdate)return;this.didViewUpdate=!0;const t=this.renderGroup||this.parentRenderGroup;t&&t.onChildViewUpdate(this)}destroy(t){super.destroy(t),this._bounds=null}collectRenderablesSimple(t,e,r){const{renderPipes:i,renderableGC:s}=e;i.blendMode.setBlendMode(this,this.groupBlendMode,t),i[this.renderPipeId].addRenderable(this,t),s.addRenderable(this),this.didViewUpdate=!1;const a=this.children,l=a.length;for(let u=0;u<l;u++)a[u].collectRenderables(t,e,r)}}class Jt extends Ja{constructor(t=N.EMPTY){t instanceof N&&(t={texture:t});const{texture:e=N.EMPTY,anchor:r,roundPixels:i,width:s,height:o,...a}=t;super({label:"Sprite",...a}),this.renderPipeId="sprite",this.batched=!0,this._visualBounds={minX:0,maxX:1,minY:0,maxY:0},this._anchor=new xt({_onUpdate:()=>{this.onViewUpdate()}}),r?this.anchor=r:e.defaultAnchor&&(this.anchor=e.defaultAnchor),this.texture=e,this.allowChildren=!1,this.roundPixels=i??!1,s!==void 0&&(this.width=s),o!==void 0&&(this.height=o)}static from(t,e=!1){return t instanceof N?new Jt(t):new Jt(N.from(t,e))}set texture(t){t||(t=N.EMPTY);const e=this._texture;e!==t&&(e&&e.dynamic&&e.off("update",this.onViewUpdate,this),t.dynamic&&t.on("update",this.onViewUpdate,this),this._texture=t,this._width&&this._setWidth(this._width,this._texture.orig.width),this._height&&this._setHeight(this._height,this._texture.orig.height),this.onViewUpdate())}get texture(){return this._texture}get visualBounds(){return _a(this._visualBounds,this._anchor,this._texture),this._visualBounds}get sourceBounds(){return D("8.6.1","Sprite.sourceBounds is deprecated, use visualBounds instead."),this.visualBounds}updateBounds(){const t=this._anchor,e=this._texture,r=this._bounds,{width:i,height:s}=e.orig;r.minX=-t._x*i,r.maxX=r.minX+i,r.minY=-t._y*s,r.maxY=r.minY+s}destroy(t=!1){if(super.destroy(t),typeof t=="boolean"?t:t?.texture){const r=typeof t=="boolean"?t:t?.textureSource;this._texture.destroy(r)}this._texture=null,this._visualBounds=null,this._bounds=null,this._anchor=null}get anchor(){return this._anchor}set anchor(t){typeof t=="number"?this._anchor.set(t):this._anchor.copyFrom(t)}get width(){return Math.abs(this.scale.x)*this._texture.orig.width}set width(t){this._setWidth(t,this._texture.orig.width),this._width=t}get height(){return Math.abs(this.scale.y)*this._texture.orig.height}set height(t){this._setHeight(t,this._texture.orig.height),this._height=t}getSize(t){return t||(t={}),t.width=Math.abs(this.scale.x)*this._texture.orig.width,t.height=Math.abs(this.scale.y)*this._texture.orig.height,t}setSize(t,e){typeof t=="object"?(e=t.height??t.width,t=t.width):e??(e=t),t!==void 0&&this._setWidth(t,this._texture.orig.width),e!==void 0&&this._setHeight(e,this._texture.orig.height)}}const tl=new Pt;function ls(n,t,e){const r=tl;n.measurable=!0,es(n,e,r),t.addBoundsMask(r),n.measurable=!1}function us(n,t,e){const r=Dt.get();n.measurable=!0;const i=gt.get().identity(),s=cs(n,e,i);is(n,r,s),n.measurable=!1,t.addBoundsMask(r),gt.return(i),Dt.return(r)}function cs(n,t,e){return n?(n!==t&&(cs(n.parent,t,e),n.updateLocalTransform(),e.append(n.localTransform)),e):(et("Mask bounds, renderable is not inside the root container"),e)}class hs{constructor(t){this.priority=0,this.inverse=!1,this.pipe="alphaMask",t?.mask&&this.init(t.mask)}init(t){this.mask=t,this.renderMaskToTexture=!(t instanceof Jt),this.mask.renderable=this.renderMaskToTexture,this.mask.includeInBuild=!this.renderMaskToTexture,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask=null}addBounds(t,e){this.inverse||ls(this.mask,t,e)}addLocalBounds(t,e){us(this.mask,t,e)}containsPoint(t,e){const r=this.mask;return e(r,t)}destroy(){this.reset()}static test(t){return t instanceof Jt}}hs.extension=B.MaskEffect;class fs{constructor(t){this.priority=0,this.pipe="colorMask",t?.mask&&this.init(t.mask)}init(t){this.mask=t}destroy(){}static test(t){return typeof t=="number"}}fs.extension=B.MaskEffect;class ds{constructor(t){this.priority=0,this.pipe="stencilMask",t?.mask&&this.init(t.mask)}init(t){this.mask=t,this.mask.includeInBuild=!1,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask.includeInBuild=!0,this.mask=null}addBounds(t,e){ls(this.mask,t,e)}addLocalBounds(t,e){us(this.mask,t,e)}containsPoint(t,e){const r=this.mask;return e(r,t)}destroy(){this.reset()}static test(t){return t instanceof Vt}}ds.extension=B.MaskEffect;const el={createCanvas:(n,t)=>{const e=document.createElement("canvas");return e.width=n,e.height=t,e},getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>document.baseURI??window.location.href,getFontFaceSet:()=>document.fonts,fetch:(n,t)=>fetch(n,t),parseXML:n=>new DOMParser().parseFromString(n,"text/xml")};let Xn=el;const rt={get(){return Xn},set(n){Xn=n}};class dn extends bt{constructor(t){t.resource||(t.resource=rt.get().createCanvas()),t.width||(t.width=t.resource.width,t.autoDensity||(t.width/=t.resolution)),t.height||(t.height=t.resource.height,t.autoDensity||(t.height/=t.resolution)),super(t),this.uploadMethodId="image",this.autoDensity=t.autoDensity,this.resizeCanvas(),this.transparent=!!t.transparent}resizeCanvas(){this.autoDensity&&(this.resource.style.width=`${this.width}px`,this.resource.style.height=`${this.height}px`),(this.resource.width!==this.pixelWidth||this.resource.height!==this.pixelHeight)&&(this.resource.width=this.pixelWidth,this.resource.height=this.pixelHeight)}resize(t=this.width,e=this.height,r=this._resolution){const i=super.resize(t,e,r);return i&&this.resizeCanvas(),i}static test(t){return globalThis.HTMLCanvasElement&&t instanceof HTMLCanvasElement||globalThis.OffscreenCanvas&&t instanceof OffscreenCanvas}get context2D(){return this._context2D||(this._context2D=this.resource.getContext("2d"))}}dn.extension=B.TextureSource;class Nt extends bt{constructor(t){if(t.resource&&globalThis.HTMLImageElement&&t.resource instanceof HTMLImageElement){const e=rt.get().createCanvas(t.resource.width,t.resource.height);e.getContext("2d").drawImage(t.resource,0,0,t.resource.width,t.resource.height),t.resource=e,et("ImageSource: Image element passed, converting to canvas. Use CanvasSource instead.")}super(t),this.uploadMethodId="image",this.autoGarbageCollect=!0}static test(t){return globalThis.HTMLImageElement&&t instanceof HTMLImageElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap||globalThis.VideoFrame&&t instanceof VideoFrame}}Nt.extension=B.TextureSource;var Nr=(n=>(n[n.INTERACTION=50]="INTERACTION",n[n.HIGH=25]="HIGH",n[n.NORMAL=0]="NORMAL",n[n.LOW=-25]="LOW",n[n.UTILITY=-50]="UTILITY",n))(Nr||{});class hr{constructor(t,e=null,r=0,i=!1){this.next=null,this.previous=null,this._destroyed=!1,this._fn=t,this._context=e,this.priority=r,this._once=i}match(t,e=null){return this._fn===t&&this._context===e}emit(t){this._fn&&(this._context?this._fn.call(this._context,t):this._fn(t));const e=this.next;return this._once&&this.destroy(!0),this._destroyed&&(this.next=null),e}connect(t){this.previous=t,t.next&&(t.next.previous=this),this.next=t.next,t.next=this}destroy(t=!1){this._destroyed=!0,this._fn=null,this._context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);const e=this.next;return this.next=t?null:e,this.previous=null,e}}const ps=class _t{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new hr(null,null,1/0),this.deltaMS=1/_t.targetFPMS,this.elapsedMS=1/_t.targetFPMS,this._tick=t=>{this._requestId=null,this.started&&(this.update(t),this.started&&this._requestId===null&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}_requestIfNeeded(){this._requestId===null&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}_cancelIfNeeded(){this._requestId!==null&&(cancelAnimationFrame(this._requestId),this._requestId=null)}_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}add(t,e,r=Nr.NORMAL){return this._addListener(new hr(t,e,r))}addOnce(t,e,r=Nr.NORMAL){return this._addListener(new hr(t,e,r,!0))}_addListener(t){let e=this._head.next,r=this._head;if(!e)t.connect(r);else{for(;e;){if(t.priority>e.priority){t.connect(r);break}r=e,e=e.next}t.previous||t.connect(r)}return this._startIfPossible(),this}remove(t,e){let r=this._head.next;for(;r;)r.match(t,e)?r=r.destroy():r=r.next;return this._head.next||this._cancelIfNeeded(),this}get count(){if(!this._head)return 0;let t=0,e=this._head;for(;e=e.next;)t++;return t}start(){this.started||(this.started=!0,this._requestIfNeeded())}stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}destroy(){if(!this._protected){this.stop();let t=this._head.next;for(;t;)t=t.destroy(!0);this._head.destroy(),this._head=null}}update(t=performance.now()){let e;if(t>this.lastTime){if(e=this.elapsedMS=t-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),e*=this.speed,this._minElapsedMS){const s=t-this._lastFrame|0;if(s<this._minElapsedMS)return;this._lastFrame=t-s%this._minElapsedMS}this.deltaMS=e,this.deltaTime=this.deltaMS*_t.targetFPMS;const r=this._head;let i=r.next;for(;i;)i=i.emit(this);r.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=t}get FPS(){return 1e3/this.elapsedMS}get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(t){const e=Math.min(this.maxFPS,t),r=Math.min(Math.max(0,e)/1e3,_t.targetFPMS);this._maxElapsedMS=1/r}get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(t){if(t===0)this._minElapsedMS=0;else{const e=Math.max(this.minFPS,t);this._minElapsedMS=1/(e/1e3)}}static get shared(){if(!_t._shared){const t=_t._shared=new _t;t.autoStart=!0,t._protected=!0}return _t._shared}static get system(){if(!_t._system){const t=_t._system=new _t;t.autoStart=!0,t._protected=!0}return _t._system}};ps.targetFPMS=.06;let ze=ps,fr;async function ms(){return fr??(fr=(async()=>{const t=document.createElement("canvas").getContext("webgl");if(!t)return"premultiply-alpha-on-upload";const e=await new Promise(o=>{const a=document.createElement("video");a.onloadeddata=()=>o(a),a.onerror=()=>o(null),a.autoplay=!1,a.crossOrigin="anonymous",a.preload="auto",a.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",a.load()});if(!e)return"premultiply-alpha-on-upload";const r=t.createTexture();t.bindTexture(t.TEXTURE_2D,r);const i=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,i),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.NONE),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e);const s=new Uint8Array(4);return t.readPixels(0,0,1,1,t.RGBA,t.UNSIGNED_BYTE,s),t.deleteFramebuffer(i),t.deleteTexture(r),t.getExtension("WEBGL_lose_context")?.loseContext(),s[0]<=s[3]?"premultiplied-alpha":"premultiply-alpha-on-upload"})()),fr}const qe=class gs extends bt{constructor(t){super(t),this.isReady=!1,this.uploadMethodId="video",t={...gs.defaultOptions,...t},this._autoUpdate=!0,this._isConnectedToTicker=!1,this._updateFPS=t.updateFPS||0,this._msToNextUpdate=0,this.autoPlay=t.autoPlay!==!1,this.alphaMode=t.alphaMode??"premultiply-alpha-on-upload",this._videoFrameRequestCallback=this._videoFrameRequestCallback.bind(this),this._videoFrameRequestCallbackHandle=null,this._load=null,this._resolve=null,this._reject=null,this._onCanPlay=this._onCanPlay.bind(this),this._onCanPlayThrough=this._onCanPlayThrough.bind(this),this._onError=this._onError.bind(this),this._onPlayStart=this._onPlayStart.bind(this),this._onPlayStop=this._onPlayStop.bind(this),this._onSeeked=this._onSeeked.bind(this),t.autoLoad!==!1&&this.load()}updateFrame(){if(!this.destroyed){if(this._updateFPS){const t=ze.shared.elapsedMS*this.resource.playbackRate;this._msToNextUpdate=Math.floor(this._msToNextUpdate-t)}(!this._updateFPS||this._msToNextUpdate<=0)&&(this._msToNextUpdate=this._updateFPS?Math.floor(1e3/this._updateFPS):0),this.isValid&&this.update()}}_videoFrameRequestCallback(){this.updateFrame(),this.destroyed?this._videoFrameRequestCallbackHandle=null:this._videoFrameRequestCallbackHandle=this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback)}get isValid(){return!!this.resource.videoWidth&&!!this.resource.videoHeight}async load(){if(this._load)return this._load;const t=this.resource,e=this.options;return(t.readyState===t.HAVE_ENOUGH_DATA||t.readyState===t.HAVE_FUTURE_DATA)&&t.width&&t.height&&(t.complete=!0),t.addEventListener("play",this._onPlayStart),t.addEventListener("pause",this._onPlayStop),t.addEventListener("seeked",this._onSeeked),this._isSourceReady()?this._mediaReady():(e.preload||t.addEventListener("canplay",this._onCanPlay),t.addEventListener("canplaythrough",this._onCanPlayThrough),t.addEventListener("error",this._onError,!0)),this.alphaMode=await ms(),this._load=new Promise((r,i)=>{this.isValid?r(this):(this._resolve=r,this._reject=i,e.preloadTimeoutMs!==void 0&&(this._preloadTimeout=setTimeout(()=>{this._onError(new ErrorEvent(`Preload exceeded timeout of ${e.preloadTimeoutMs}ms`))})),t.load())}),this._load}_onError(t){this.resource.removeEventListener("error",this._onError,!0),this.emit("error",t),this._reject&&(this._reject(t),this._reject=null,this._resolve=null)}_isSourcePlaying(){const t=this.resource;return!t.paused&&!t.ended}_isSourceReady(){return this.resource.readyState>2}_onPlayStart(){this.isValid||this._mediaReady(),this._configureAutoUpdate()}_onPlayStop(){this._configureAutoUpdate()}_onSeeked(){this._autoUpdate&&!this._isSourcePlaying()&&(this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0)}_onCanPlay(){this.resource.removeEventListener("canplay",this._onCanPlay),this._mediaReady()}_onCanPlayThrough(){this.resource.removeEventListener("canplaythrough",this._onCanPlay),this._preloadTimeout&&(clearTimeout(this._preloadTimeout),this._preloadTimeout=void 0),this._mediaReady()}_mediaReady(){const t=this.resource;this.isValid&&(this.isReady=!0,this.resize(t.videoWidth,t.videoHeight)),this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0,this._resolve&&(this._resolve(this),this._resolve=null,this._reject=null),this._isSourcePlaying()?this._onPlayStart():this.autoPlay&&this.resource.play()}destroy(){this._configureAutoUpdate();const t=this.resource;t&&(t.removeEventListener("play",this._onPlayStart),t.removeEventListener("pause",this._onPlayStop),t.removeEventListener("seeked",this._onSeeked),t.removeEventListener("canplay",this._onCanPlay),t.removeEventListener("canplaythrough",this._onCanPlayThrough),t.removeEventListener("error",this._onError,!0),t.pause(),t.src="",t.load()),super.destroy()}get autoUpdate(){return this._autoUpdate}set autoUpdate(t){t!==this._autoUpdate&&(this._autoUpdate=t,this._configureAutoUpdate())}get updateFPS(){return this._updateFPS}set updateFPS(t){t!==this._updateFPS&&(this._updateFPS=t,this._configureAutoUpdate())}_configureAutoUpdate(){this._autoUpdate&&this._isSourcePlaying()?!this._updateFPS&&this.resource.requestVideoFrameCallback?(this._isConnectedToTicker&&(ze.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0),this._videoFrameRequestCallbackHandle===null&&(this._videoFrameRequestCallbackHandle=this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback))):(this._videoFrameRequestCallbackHandle!==null&&(this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker||(ze.shared.add(this.updateFrame,this),this._isConnectedToTicker=!0,this._msToNextUpdate=0)):(this._videoFrameRequestCallbackHandle!==null&&(this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker&&(ze.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0))}static test(t){return globalThis.HTMLVideoElement&&t instanceof HTMLVideoElement}};qe.extension=B.TextureSource;qe.defaultOptions={...bt.defaultOptions,autoLoad:!0,autoPlay:!0,updateFPS:0,crossorigin:!0,loop:!1,muted:!0,playsinline:!0,preload:!1};qe.MIME_TYPES={ogv:"video/ogg",mov:"video/quicktime",m4v:"video/mp4"};let Ne=qe;const Tt=(n,t,e=!1)=>(Array.isArray(n)||(n=[n]),t?n.map(r=>typeof r=="string"||e?t(r):r):n);class rl{constructor(){this._parsers=[],this._cache=new Map,this._cacheMap=new Map}reset(){this._cacheMap.clear(),this._cache.clear()}has(t){return this._cache.has(t)}get(t){const e=this._cache.get(t);return e||et(`[Assets] Asset id ${t} was not found in the Cache`),e}set(t,e){const r=Tt(t);let i;for(let l=0;l<this.parsers.length;l++){const u=this.parsers[l];if(u.test(e)){i=u.getCacheableAssets(r,e);break}}const s=new Map(Object.entries(i||{}));i||r.forEach(l=>{s.set(l,e)});const o=[...s.keys()],a={cacheKeys:o,keys:r};r.forEach(l=>{this._cacheMap.set(l,a)}),o.forEach(l=>{const u=i?i[l]:e;this._cache.has(l)&&this._cache.get(l)!==u&&et("[Cache] already has key:",l),this._cache.set(l,s.get(l))})}remove(t){if(!this._cacheMap.has(t)){et(`[Assets] Asset id ${t} was not found in the Cache`);return}const e=this._cacheMap.get(t);e.cacheKeys.forEach(i=>{this._cache.delete(i)}),e.keys.forEach(i=>{this._cacheMap.delete(i)})}get parsers(){return this._parsers}}const it=new rl,$r=[];mt.handleByList(B.TextureSource,$r);function xs(n={}){const t=n&&n.resource,e=t?n.resource:n,r=t?n:{resource:n};for(let i=0;i<$r.length;i++){const s=$r[i];if(s.test(e))return new s(r)}throw new Error(`Could not find a source type for resource: ${r.resource}`)}function nl(n={},t=!1){const e=n&&n.resource,r=e?n.resource:n,i=e?n:{resource:n};if(!t&&it.has(r))return it.get(r);const s=new N({source:xs(i)});return s.on("destroy",()=>{it.has(r)&&it.remove(r)}),t||it.set(r,s),s}function il(n,t=!1){return typeof n=="string"?it.get(n):n instanceof bt?new N({source:n}):nl(n,t)}N.from=il;bt.from=xs;mt.add(hs,fs,ds,Ne,Nt,dn,cn);var Wt=(n=>(n[n.Low=0]="Low",n[n.Normal=1]="Normal",n[n.High=2]="High",n))(Wt||{});function Ct(n){if(typeof n!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(n)}`)}function ce(n){return n.split("?")[0].split("#")[0]}function sl(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ol(n,t,e){return n.replace(new RegExp(sl(t),"g"),e)}function al(n,t){let e="",r=0,i=-1,s=0,o=-1;for(let a=0;a<=n.length;++a){if(a<n.length)o=n.charCodeAt(a);else{if(o===47)break;o=47}if(o===47){if(!(i===a-1||s===1))if(i!==a-1&&s===2){if(e.length<2||r!==2||e.charCodeAt(e.length-1)!==46||e.charCodeAt(e.length-2)!==46){if(e.length>2){const l=e.lastIndexOf("/");if(l!==e.length-1){l===-1?(e="",r=0):(e=e.slice(0,l),r=e.length-1-e.lastIndexOf("/")),i=a,s=0;continue}}else if(e.length===2||e.length===1){e="",r=0,i=a,s=0;continue}}}else e.length>0?e+=`/${n.slice(i+1,a)}`:e=n.slice(i+1,a),r=a-i-1;i=a,s=0}else o===46&&s!==-1?++s:s=-1}return e}const St={toPosix(n){return ol(n,"\\","/")},isUrl(n){return/^https?:/.test(this.toPosix(n))},isDataUrl(n){return/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(n)},isBlobUrl(n){return n.startsWith("blob:")},hasProtocol(n){return/^[^/:]+:/.test(this.toPosix(n))},getProtocol(n){Ct(n),n=this.toPosix(n);const t=/^file:\/\/\//.exec(n);if(t)return t[0];const e=/^[^/:]+:\/{0,2}/.exec(n);return e?e[0]:""},toAbsolute(n,t,e){if(Ct(n),this.isDataUrl(n)||this.isBlobUrl(n))return n;const r=ce(this.toPosix(t??rt.get().getBaseUrl())),i=ce(this.toPosix(e??this.rootname(r)));return n=this.toPosix(n),n.startsWith("/")?St.join(i,n.slice(1)):this.isAbsolute(n)?n:this.join(r,n)},normalize(n){if(Ct(n),n.length===0)return".";if(this.isDataUrl(n)||this.isBlobUrl(n))return n;n=this.toPosix(n);let t="";const e=n.startsWith("/");this.hasProtocol(n)&&(t=this.rootname(n),n=n.slice(t.length));const r=n.endsWith("/");return n=al(n),n.length>0&&r&&(n+="/"),e?`/${n}`:t+n},isAbsolute(n){return Ct(n),n=this.toPosix(n),this.hasProtocol(n)?!0:n.startsWith("/")},join(...n){if(n.length===0)return".";let t;for(let e=0;e<n.length;++e){const r=n[e];if(Ct(r),r.length>0)if(t===void 0)t=r;else{const i=n[e-1]??"";this.joinExtensions.includes(this.extname(i).toLowerCase())?t+=`/../${r}`:t+=`/${r}`}}return t===void 0?".":this.normalize(t)},dirname(n){if(Ct(n),n.length===0)return".";n=this.toPosix(n);let t=n.charCodeAt(0);const e=t===47;let r=-1,i=!0;const s=this.getProtocol(n),o=n;n=n.slice(s.length);for(let a=n.length-1;a>=1;--a)if(t=n.charCodeAt(a),t===47){if(!i){r=a;break}}else i=!1;return r===-1?e?"/":this.isUrl(o)?s+n:s:e&&r===1?"//":s+n.slice(0,r)},rootname(n){Ct(n),n=this.toPosix(n);let t="";if(n.startsWith("/")?t="/":t=this.getProtocol(n),this.isUrl(n)){const e=n.indexOf("/",t.length);e!==-1?t=n.slice(0,e):t=n,t.endsWith("/")||(t+="/")}return t},basename(n,t){Ct(n),t&&Ct(t),n=ce(this.toPosix(n));let e=0,r=-1,i=!0,s;if(t!==void 0&&t.length>0&&t.length<=n.length){if(t.length===n.length&&t===n)return"";let o=t.length-1,a=-1;for(s=n.length-1;s>=0;--s){const l=n.charCodeAt(s);if(l===47){if(!i){e=s+1;break}}else a===-1&&(i=!1,a=s+1),o>=0&&(l===t.charCodeAt(o)?--o===-1&&(r=s):(o=-1,r=a))}return e===r?r=a:r===-1&&(r=n.length),n.slice(e,r)}for(s=n.length-1;s>=0;--s)if(n.charCodeAt(s)===47){if(!i){e=s+1;break}}else r===-1&&(i=!1,r=s+1);return r===-1?"":n.slice(e,r)},extname(n){Ct(n),n=ce(this.toPosix(n));let t=-1,e=0,r=-1,i=!0,s=0;for(let o=n.length-1;o>=0;--o){const a=n.charCodeAt(o);if(a===47){if(!i){e=o+1;break}continue}r===-1&&(i=!1,r=o+1),a===46?t===-1?t=o:s!==1&&(s=1):t!==-1&&(s=-1)}return t===-1||r===-1||s===0||s===1&&t===r-1&&t===e+1?"":n.slice(t,r)},parse(n){Ct(n);const t={root:"",dir:"",base:"",ext:"",name:""};if(n.length===0)return t;n=ce(this.toPosix(n));let e=n.charCodeAt(0);const r=this.isAbsolute(n);let i;t.root=this.rootname(n),r||this.hasProtocol(n)?i=1:i=0;let s=-1,o=0,a=-1,l=!0,u=n.length-1,c=0;for(;u>=i;--u){if(e=n.charCodeAt(u),e===47){if(!l){o=u+1;break}continue}a===-1&&(l=!1,a=u+1),e===46?s===-1?s=u:c!==1&&(c=1):s!==-1&&(c=-1)}return s===-1||a===-1||c===0||c===1&&s===a-1&&s===o+1?a!==-1&&(o===0&&r?t.base=t.name=n.slice(1,a):t.base=t.name=n.slice(o,a)):(o===0&&r?(t.name=n.slice(1,s),t.base=n.slice(1,a)):(t.name=n.slice(o,s),t.base=n.slice(o,a)),t.ext=n.slice(s,a)),t.dir=this.dirname(n),t},sep:"/",delimiter:":",joinExtensions:[".html"]};function ys(n,t,e,r,i){const s=t[e];for(let o=0;o<s.length;o++){const a=s[o];e<t.length-1?ys(n.replace(r[e],a),t,e+1,r,i):i.push(n.replace(r[e],a))}}function ll(n){const t=/\{(.*?)\}/g,e=n.match(t),r=[];if(e){const i=[];e.forEach(s=>{const o=s.substring(1,s.length-1).split(",");i.push(o)}),ys(n,i,0,e,r)}else r.push(n);return r}const He=n=>!Array.isArray(n);class ae{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(t,e)=>`${t}${this._bundleIdConnector}${e}`,extractAssetIdFromBundle:(t,e)=>e.replace(`${t}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}setBundleIdentifier(t){if(this._bundleIdConnector=t.connector??this._bundleIdConnector,this._createBundleAssetId=t.createBundleAssetId??this._createBundleAssetId,this._extractAssetIdFromBundle=t.extractAssetIdFromBundle??this._extractAssetIdFromBundle,this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar"))!=="bar")throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")}prefer(...t){t.forEach(e=>{this._preferredOrder.push(e),e.priority||(e.priority=Object.keys(e.params))}),this._resolverHash={}}set basePath(t){this._basePath=t}get basePath(){return this._basePath}set rootPath(t){this._rootPath=t}get rootPath(){return this._rootPath}get parsers(){return this._parsers}reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}setDefaultSearchParams(t){if(typeof t=="string")this._defaultSearchParams=t;else{const e=t;this._defaultSearchParams=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&")}}getAlias(t){const{alias:e,src:r}=t;return Tt(e||r,s=>typeof s=="string"?s:Array.isArray(s)?s.map(o=>o?.src??o):s?.src?s.src:s,!0)}addManifest(t){this._manifest&&et("[Resolver] Manifest already exists, this will be overwritten"),this._manifest=t,t.bundles.forEach(e=>{this.addBundle(e.name,e.assets)})}addBundle(t,e){const r=[];let i=e;Array.isArray(e)||(i=Object.entries(e).map(([s,o])=>typeof o=="string"||Array.isArray(o)?{alias:s,src:o}:{alias:s,...o})),i.forEach(s=>{const o=s.src,a=s.alias;let l;if(typeof a=="string"){const u=this._createBundleAssetId(t,a);r.push(u),l=[a,u]}else{const u=a.map(c=>this._createBundleAssetId(t,c));r.push(...u),l=[...a,...u]}this.add({...s,alias:l,src:o})}),this._bundles[t]=r}add(t){const e=[];Array.isArray(t)?e.push(...t):e.push(t);let r;r=s=>{this.hasKey(s)&&et(`[Resolver] already has key: ${s} overwriting`)},Tt(e).forEach(s=>{const{src:o}=s;let{data:a,format:l,loadParser:u}=s;const c=Tt(o).map(f=>typeof f=="string"?ll(f):Array.isArray(f)?f:[f]),h=this.getAlias(s);Array.isArray(h)?h.forEach(r):r(h);const d=[];c.forEach(f=>{f.forEach(g=>{let x={};if(typeof g!="object"){x.src=g;for(let p=0;p<this._parsers.length;p++){const v=this._parsers[p];if(v.test(g)){x=v.parse(g);break}}}else a=g.data??a,l=g.format??l,u=g.loadParser??u,x={...x,...g};if(!h)throw new Error(`[Resolver] alias is undefined for this asset: ${x.src}`);x=this._buildResolvedAsset(x,{aliases:h,data:a,format:l,loadParser:u}),d.push(x)})}),h.forEach(f=>{this._assetMap[f]=d})})}resolveBundle(t){const e=He(t);t=Tt(t);const r={};return t.forEach(i=>{const s=this._bundles[i];if(s){const o=this.resolve(s),a={};for(const l in o){const u=o[l];a[this._extractAssetIdFromBundle(i,l)]=u}r[i]=a}}),e?r[t[0]]:r}resolveUrl(t){const e=this.resolve(t);if(typeof t!="string"){const r={};for(const i in e)r[i]=e[i].src;return r}return e.src}resolve(t){const e=He(t);t=Tt(t);const r={};return t.forEach(i=>{if(!this._resolverHash[i])if(this._assetMap[i]){let s=this._assetMap[i];const o=this._getPreferredOrder(s);o?.priority.forEach(a=>{o.params[a].forEach(l=>{const u=s.filter(c=>c[a]?c[a]===l:!1);u.length&&(s=u)})}),this._resolverHash[i]=s[0]}else this._resolverHash[i]=this._buildResolvedAsset({alias:[i],src:i},{});r[i]=this._resolverHash[i]}),e?r[t[0]]:r}hasKey(t){return!!this._assetMap[t]}hasBundle(t){return!!this._bundles[t]}_getPreferredOrder(t){for(let e=0;e<t.length;e++){const r=t[e],i=this._preferredOrder.find(s=>s.params.format.includes(r.format));if(i)return i}return this._preferredOrder[0]}_appendDefaultSearchParams(t){if(!this._defaultSearchParams)return t;const e=/\?/.test(t)?"&":"?";return`${t}${e}${this._defaultSearchParams}`}_buildResolvedAsset(t,e){const{aliases:r,data:i,loadParser:s,format:o}=e;return(this._basePath||this._rootPath)&&(t.src=St.toAbsolute(t.src,this._basePath,this._rootPath)),t.alias=r??t.alias??[t.src],t.src=this._appendDefaultSearchParams(t.src),t.data={...i||{},...t.data},t.loadParser=s??t.loadParser,t.format=o??t.format??ul(t.src),t}}ae.RETINA_PREFIX=/@([0-9\.]+)x/;function ul(n){return n.split(".").pop().split("?").shift().split("#").shift()}const Vr=(n,t)=>{const e=t.split("?")[1];return e&&(n+=`?${e}`),n},vs=class ge{constructor(t,e){this.linkedSheets=[],this._texture=t instanceof N?t:null,this.textureSource=t.source,this.textures={},this.animations={},this.data=e;const r=parseFloat(e.meta.scale);r?(this.resolution=r,t.source.resolution=this.resolution):this.resolution=t.source._resolution,this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}parse(){return new Promise(t=>{this._callback=t,this._batchIndex=0,this._frameKeys.length<=ge.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}_processFrames(t){let e=t;const r=ge.BATCH_SIZE;for(;e-t<r&&e<this._frameKeys.length;){const i=this._frameKeys[e],s=this._frames[i],o=s.frame;if(o){let a=null,l=null;const u=s.trimmed!==!1&&s.sourceSize?s.sourceSize:s.frame,c=new lt(0,0,Math.floor(u.w)/this.resolution,Math.floor(u.h)/this.resolution);s.rotated?a=new lt(Math.floor(o.x)/this.resolution,Math.floor(o.y)/this.resolution,Math.floor(o.h)/this.resolution,Math.floor(o.w)/this.resolution):a=new lt(Math.floor(o.x)/this.resolution,Math.floor(o.y)/this.resolution,Math.floor(o.w)/this.resolution,Math.floor(o.h)/this.resolution),s.trimmed!==!1&&s.spriteSourceSize&&(l=new lt(Math.floor(s.spriteSourceSize.x)/this.resolution,Math.floor(s.spriteSourceSize.y)/this.resolution,Math.floor(o.w)/this.resolution,Math.floor(o.h)/this.resolution)),this.textures[i]=new N({source:this.textureSource,frame:a,orig:c,trim:l,rotate:s.rotated?2:0,defaultAnchor:s.anchor,defaultBorders:s.borders,label:i.toString()})}e++}}_processAnimations(){const t=this.data.animations||{};for(const e in t){this.animations[e]=[];for(let r=0;r<t[e].length;r++){const i=t[e][r];this.animations[e].push(this.textures[i])}}}_parseComplete(){const t=this._callback;this._callback=null,this._batchIndex=0,t.call(this,this.textures)}_nextBatch(){this._processFrames(this._batchIndex*ge.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*ge.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}destroy(t=!1){for(const e in this.textures)this.textures[e].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,t&&(this._texture?.destroy(),this.textureSource.destroy()),this._texture=null,this.textureSource=null,this.linkedSheets=[]}};vs.BATCH_SIZE=1e3;let Yn=vs;const cl=["jpg","png","jpeg","avif","webp","basis","etc2","bc7","bc6h","bc5","bc4","bc3","bc2","bc1","eac","astc"];function _s(n,t,e){const r={};if(n.forEach(i=>{r[i]=t}),Object.keys(t.textures).forEach(i=>{r[i]=t.textures[i]}),!e){const i=St.dirname(n[0]);t.linkedSheets.forEach((s,o)=>{const a=_s([`${i}/${t.data.meta.related_multi_packs[o]}`],s,!0);Object.assign(r,a)})}return r}const hl={extension:B.Asset,cache:{test:n=>n instanceof Yn,getCacheableAssets:(n,t)=>_s(n,t,!1)},resolver:{extension:{type:B.ResolveParser,name:"resolveSpritesheet"},test:n=>{const e=n.split("?")[0].split("."),r=e.pop(),i=e.pop();return r==="json"&&cl.includes(i)},parse:n=>{const t=n.split(".");return{resolution:parseFloat(ae.RETINA_PREFIX.exec(n)?.[1]??"1"),format:t[t.length-2],src:n}}},loader:{name:"spritesheetLoader",extension:{type:B.LoadParser,priority:Wt.Normal,name:"spritesheetLoader"},async testParse(n,t){return St.extname(t.src).toLowerCase()===".json"&&!!n.frames},async parse(n,t,e){const{texture:r,imageFilename:i,textureOptions:s}=t?.data??{};let o=St.dirname(t.src);o&&o.lastIndexOf("/")!==o.length-1&&(o+="/");let a;if(r instanceof N)a=r;else{const c=Vr(o+(i??n.meta.image),t.src);a=(await e.load([{src:c,data:s}]))[c]}const l=new Yn(a.source,n);await l.parse();const u=n?.meta?.related_multi_packs;if(Array.isArray(u)){const c=[];for(const d of u){if(typeof d!="string")continue;let f=o+d;t.data?.ignoreMultiPack||(f=Vr(f,t.src),c.push(e.load({src:f,data:{textureOptions:s,ignoreMultiPack:!0}})))}const h=await Promise.all(c);l.linkedSheets=h,h.forEach(d=>{d.linkedSheets=[l].concat(l.linkedSheets.filter(f=>f!==d))})}return l},async unload(n,t,e){await e.unload(n.textureSource._sourceOrigin),n.destroy(!1)}}};mt.add(hl);const dr=Object.create(null),Hn=Object.create(null);function pn(n,t){let e=Hn[n];return e===void 0&&(dr[t]===void 0&&(dr[t]=1),Hn[n]=e=dr[t]++),e}let Re;function bs(){return(!Re||Re?.isContextLost())&&(Re=rt.get().createCanvas().getContext("webgl",{})),Re}let Ee;function fl(){if(!Ee){Ee="mediump";const n=bs();n&&n.getShaderPrecisionFormat&&(Ee=n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision?"highp":"mediump")}return Ee}function dl(n,t,e){return t?n:e?(n=n.replace("out vec4 finalColor;",""),`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${n}
        `):`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${n}
        `}function pl(n,t,e){const r=e?t.maxSupportedFragmentPrecision:t.maxSupportedVertexPrecision;if(n.substring(0,9)!=="precision"){let i=e?t.requestedFragmentPrecision:t.requestedVertexPrecision;return i==="highp"&&r!=="highp"&&(i="mediump"),`precision ${i} float;
${n}`}else if(r!=="highp"&&n.substring(0,15)==="precision highp")return n.replace("precision highp","precision mediump");return n}function ml(n,t){return t?`#version 300 es
${n}`:n}const gl={},xl={};function yl(n,{name:t="pixi-program"},e=!0){t=t.replace(/\s+/g,"-"),t+=e?"-fragment":"-vertex";const r=e?gl:xl;return r[t]?(r[t]++,t+=`-${r[t]}`):r[t]=1,n.indexOf("#define SHADER_NAME")!==-1?n:`${`#define SHADER_NAME ${t}`}
${n}`}function vl(n,t){return t?n.replace("#version 300 es",""):n}const pr={stripVersion:vl,ensurePrecision:pl,addProgramDefines:dl,setProgramName:yl,insertVersion:ml},mr=Object.create(null),Ss=class Wr{constructor(t){t={...Wr.defaultOptions,...t};const e=t.fragment.indexOf("#version 300 es")!==-1,r={stripVersion:e,ensurePrecision:{requestedFragmentPrecision:t.preferredFragmentPrecision,requestedVertexPrecision:t.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:fl()},setProgramName:{name:t.name},addProgramDefines:e,insertVersion:e};let i=t.fragment,s=t.vertex;Object.keys(pr).forEach(o=>{const a=r[o];i=pr[o](i,a,!0),s=pr[o](s,a,!1)}),this.fragment=i,this.vertex=s,this.transformFeedbackVaryings=t.transformFeedbackVaryings,this._key=pn(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(t){const e=`${t.vertex}:${t.fragment}`;return mr[e]||(mr[e]=new Wr(t)),mr[e]}};Ss.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let J=Ss;const jn={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function _l(n){return jn[n]??jn.float32}const bl={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function Sl({source:n,entryPoint:t}){const e={},r=n.indexOf(`fn ${t}`);if(r!==-1){const i=n.indexOf("->",r);if(i!==-1){const s=n.substring(r,i),o=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;let a;for(;(a=o.exec(s))!==null;){const l=bl[a[3]]??"float32";e[a[2]]={location:parseInt(a[1],10),format:l,stride:_l(l).stride,offset:0,instance:!1,start:0}}}}return e}function gr(n){const t=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,e=/@group\((\d+)\)/,r=/@binding\((\d+)\)/,i=/var(<[^>]+>)? (\w+)/,s=/:\s*(\w+)/,o=/struct\s+(\w+)\s*{([^}]+)}/g,a=/(\w+)\s*:\s*([\w\<\>]+)/g,l=/struct\s+(\w+)/,u=n.match(t)?.map(h=>({group:parseInt(h.match(e)[1],10),binding:parseInt(h.match(r)[1],10),name:h.match(i)[2],isUniform:h.match(i)[1]==="<uniform>",type:h.match(s)[1]}));if(!u)return{groups:[],structs:[]};const c=n.match(o)?.map(h=>{const d=h.match(l)[1],f=h.match(a).reduce((g,x)=>{const[p,v]=x.split(":");return g[p.trim()]=v.trim(),g},{});return f?{name:d,members:f}:null}).filter(({name:h})=>u.some(d=>d.type===h))??[];return{groups:u,structs:c}}var xe=(n=>(n[n.VERTEX=1]="VERTEX",n[n.FRAGMENT=2]="FRAGMENT",n[n.COMPUTE=4]="COMPUTE",n))(xe||{});function wl({groups:n}){const t=[];for(let e=0;e<n.length;e++){const r=n[e];t[r.group]||(t[r.group]=[]),r.isUniform?t[r.group].push({binding:r.binding,visibility:xe.VERTEX|xe.FRAGMENT,buffer:{type:"uniform"}}):r.type==="sampler"?t[r.group].push({binding:r.binding,visibility:xe.FRAGMENT,sampler:{type:"filtering"}}):r.type==="texture_2d"&&t[r.group].push({binding:r.binding,visibility:xe.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return t}function Al({groups:n}){const t=[];for(let e=0;e<n.length;e++){const r=n[e];t[r.group]||(t[r.group]={}),t[r.group][r.name]=r.binding}return t}function Cl(n,t){const e=new Set,r=new Set,i=[...n.structs,...t.structs].filter(o=>e.has(o.name)?!1:(e.add(o.name),!0)),s=[...n.groups,...t.groups].filter(o=>{const a=`${o.name}-${o.binding}`;return r.has(a)?!1:(r.add(a),!0)});return{structs:i,groups:s}}const xr=Object.create(null);class K{constructor(t){this._layoutKey=0,this._attributeLocationsKey=0;const{fragment:e,vertex:r,layout:i,gpuLayout:s,name:o}=t;if(this.name=o,this.fragment=e,this.vertex=r,e.source===r.source){const a=gr(e.source);this.structsAndGroups=a}else{const a=gr(r.source),l=gr(e.source);this.structsAndGroups=Cl(a,l)}this.layout=i??Al(this.structsAndGroups),this.gpuLayout=s??wl(this.structsAndGroups),this.autoAssignGlobalUniforms=this.layout[0]?.globalUniforms!==void 0,this.autoAssignLocalUniforms=this.layout[1]?.localUniforms!==void 0,this._generateProgramKey()}_generateProgramKey(){const{vertex:t,fragment:e}=this,r=t.source+e.source+t.entryPoint+e.entryPoint;this._layoutKey=pn(r,"program")}get attributeData(){return this._attributeData??(this._attributeData=Sl(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(t){const e=`${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;return xr[e]||(xr[e]=new K(t)),xr[e]}}const ws=["f32","i32","vec2<f32>","vec3<f32>","vec4<f32>","mat2x2<f32>","mat3x3<f32>","mat4x4<f32>","mat3x2<f32>","mat4x2<f32>","mat2x3<f32>","mat4x3<f32>","mat2x4<f32>","mat3x4<f32>","vec2<i32>","vec3<i32>","vec4<i32>"],Tl=ws.reduce((n,t)=>(n[t]=!0,n),{});function Pl(n,t){switch(n){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*t);case"vec3<f32>":return new Float32Array(3*t);case"vec4<f32>":return new Float32Array(4*t);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const As=class Cs{constructor(t,e){this._touched=0,this.uid=ut("uniform"),this._resourceType="uniformGroup",this._resourceId=ut("resource"),this.isUniformGroup=!0,this._dirtyId=0,this.destroyed=!1,e={...Cs.defaultOptions,...e},this.uniformStructures=t;const r={};for(const i in t){const s=t[i];if(s.name=i,s.size=s.size??1,!Tl[s.type])throw new Error(`Uniform type ${s.type} is not supported. Supported uniform types are: ${ws.join(", ")}`);s.value??(s.value=Pl(s.type,s.size)),r[i]=s.value}this.uniforms=r,this._dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this._signature=pn(Object.keys(r).map(i=>`${i}-${t[i].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};As.defaultOptions={ubo:!1,isStatic:!1};let Ke=As;class $e{constructor(t){this.resources=Object.create(null),this._dirty=!0;let e=0;for(const r in t){const i=t[r];this.setResource(i,e++)}this._updateKey()}_updateKey(){if(!this._dirty)return;this._dirty=!1;const t=[];let e=0;for(const r in this.resources)t[e++]=this.resources[r]._resourceId;this._key=t.join("|")}setResource(t,e){const r=this.resources[e];t!==r&&(r&&t.off?.("change",this.onResourceChange,this),t.on?.("change",this.onResourceChange,this),this.resources[e]=t,this._dirty=!0)}getResource(t){return this.resources[t]}_touch(t){const e=this.resources;for(const r in e)e[r]._touched=t}destroy(){const t=this.resources;for(const e in t)t[e].off?.("change",this.onResourceChange,this);this.resources=null}onResourceChange(t){if(this._dirty=!0,t.destroyed){const e=this.resources;for(const r in e)e[r]===t&&(e[r]=null)}else this._updateKey()}}var we=(n=>(n[n.WEBGL=1]="WEBGL",n[n.WEBGPU=2]="WEBGPU",n[n.BOTH=3]="BOTH",n))(we||{});class Ze extends Ft{constructor(t){super(),this.uid=ut("shader"),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:e,glProgram:r,groups:i,resources:s,compatibleRenderers:o,groupMap:a}=t;this.gpuProgram=e,this.glProgram=r,o===void 0&&(o=0,e&&(o|=we.WEBGPU),r&&(o|=we.WEBGL)),this.compatibleRenderers=o;const l={};if(!s&&!i&&(s={}),s&&i)throw new Error("[Shader] Cannot have both resources and groups");if(!e&&i&&!a)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&i&&a)for(const u in a)for(const c in a[u]){const h=a[u][c];l[h]={group:u,binding:c,name:h}}else if(e&&i&&!a){const u=e.structsAndGroups.groups;a={},u.forEach(c=>{a[c.group]=a[c.group]||{},a[c.group][c.binding]=c.name,l[c.name]=c})}else if(s){i={},a={},e&&e.structsAndGroups.groups.forEach(h=>{a[h.group]=a[h.group]||{},a[h.group][h.binding]=h.name,l[h.name]=h});let u=0;for(const c in s)l[c]||(i[99]||(i[99]=new $e,this._ownedBindGroups.push(i[99])),l[c]={group:99,binding:u,name:c},a[99]=a[99]||{},a[99][u]=c,u++);for(const c in s){const h=c;let d=s[c];!d.source&&!d._resourceType&&(d=new Ke(d));const f=l[h];f&&(i[f.group]||(i[f.group]=new $e,this._ownedBindGroups.push(i[f.group])),i[f.group].setResource(d,f.binding))}}this.groups=i,this._uniformBindMap=a,this.resources=this._buildResourceAccessor(i,l)}addResource(t,e,r){var i,s;(i=this._uniformBindMap)[e]||(i[e]={}),(s=this._uniformBindMap[e])[r]||(s[r]=t),this.groups[e]||(this.groups[e]=new $e,this._ownedBindGroups.push(this.groups[e]))}_buildResourceAccessor(t,e){const r={};for(const i in e){const s=e[i];Object.defineProperty(r,s.name,{get(){return t[s.group].getResource(s.binding)},set(o){t[s.group].setResource(o,s.binding)}})}return r}destroy(t=!1){this.emit("destroy",this),t&&(this.gpuProgram?.destroy(),this.glProgram?.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(e=>{e.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(t){const{gpu:e,gl:r,...i}=t;let s,o;return e&&(s=K.from(e)),r&&(o=J.from(r)),new Ze({gpuProgram:s,glProgram:o,...i})}}const Fl={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8,min:9,max:10},yr=0,vr=1,_r=2,br=3,Sr=4,wr=5,Xr=class Ts{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<yr)}set blend(t){!!(this.data&1<<yr)!==t&&(this.data^=1<<yr)}get offsets(){return!!(this.data&1<<vr)}set offsets(t){!!(this.data&1<<vr)!==t&&(this.data^=1<<vr)}set cullMode(t){if(t==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=t==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<_r)}set culling(t){!!(this.data&1<<_r)!==t&&(this.data^=1<<_r)}get depthTest(){return!!(this.data&1<<br)}set depthTest(t){!!(this.data&1<<br)!==t&&(this.data^=1<<br)}get depthMask(){return!!(this.data&1<<wr)}set depthMask(t){!!(this.data&1<<wr)!==t&&(this.data^=1<<wr)}get clockwiseFrontFace(){return!!(this.data&1<<Sr)}set clockwiseFrontFace(t){!!(this.data&1<<Sr)!==t&&(this.data^=1<<Sr)}get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!=="none",this._blendMode=t,this._blendModeId=Fl[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const t=new Ts;return t.depthTest=!1,t.blend=!0,t}};Xr.default2d=Xr.for2d();let Ml=Xr;const Ps=class Yr extends Ze{constructor(t){t={...Yr.defaultOptions,...t},super(t),this.enabled=!0,this._state=Ml.for2d(),this.blendMode=t.blendMode,this.padding=t.padding,typeof t.antialias=="boolean"?this.antialias=t.antialias?"on":"off":this.antialias=t.antialias,this.resolution=t.resolution,this.blendRequired=t.blendRequired,this.clipToViewport=t.clipToViewport,this.addResource("uTexture",0,1)}apply(t,e,r,i){t.applyFilter(this,e,r,i)}get blendMode(){return this._state.blendMode}set blendMode(t){this._state.blendMode=t}static from(t){const{gpu:e,gl:r,...i}=t;let s,o;return e&&(s=K.from(e)),r&&(o=J.from(r)),new Yr({gpuProgram:s,glProgram:o,...i})}};Ps.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let st=Ps;const Hr=[];mt.handleByNamedList(B.Environment,Hr);async function Il(n){if(!n)for(let t=0;t<Hr.length;t++){const e=Hr[t];if(e.value.test()){await e.value.load();return}}}let he;function zl(){if(typeof he=="boolean")return he;try{he=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{he=!1}return he}var ke={exports:{}},qn;function Rl(){if(qn)return ke.exports;qn=1,ke.exports=n,ke.exports.default=n;function n(m,y,_){_=_||2;var w=y&&y.length,A=w?y[0]*_:m.length,P=t(m,0,A,_,!0),M=[];if(!P||P.next===P.prev)return M;var z,U,O,H,j,W,ot;if(w&&(P=l(m,y,P,_)),m.length>80*_){z=O=m[0],U=H=m[1];for(var Y=_;Y<A;Y+=_)j=m[Y],W=m[Y+1],j<z&&(z=j),W<U&&(U=W),j>O&&(O=j),W>H&&(H=W);ot=Math.max(O-z,H-U),ot=ot!==0?32767/ot:0}return r(P,M,_,z,U,ot,0),M}function t(m,y,_,w,A){var P,M;if(A===Bt(m,y,_,w)>0)for(P=y;P<_;P+=w)M=Z(P,m[P],m[P+1],M);else for(P=_-w;P>=y;P-=w)M=Z(P,m[P],m[P+1],M);return M&&C(M,M.next)&&(q(M),M=M.next),M}function e(m,y){if(!m)return m;y||(y=m);var _=m,w;do if(w=!1,!_.steiner&&(C(_,_.next)||S(_.prev,_,_.next)===0)){if(q(_),_=y=_.prev,_===_.next)break;w=!0}else _=_.next;while(w||_!==y);return y}function r(m,y,_,w,A,P,M){if(m){!M&&P&&f(m,w,A,P);for(var z=m,U,O;m.prev!==m.next;){if(U=m.prev,O=m.next,P?s(m,w,A,P):i(m)){y.push(U.i/_|0),y.push(m.i/_|0),y.push(O.i/_|0),q(m),m=O.next,z=O.next;continue}if(m=O,m===z){M?M===1?(m=o(e(m),y,_),r(m,y,_,w,A,P,2)):M===2&&a(m,y,_,w,A,P):r(e(m),y,_,w,A,P,1);break}}}}function i(m){var y=m.prev,_=m,w=m.next;if(S(y,_,w)>=0)return!1;for(var A=y.x,P=_.x,M=w.x,z=y.y,U=_.y,O=w.y,H=A<P?A<M?A:M:P<M?P:M,j=z<U?z<O?z:O:U<O?U:O,W=A>P?A>M?A:M:P>M?P:M,ot=z>U?z>O?z:O:U>O?U:O,Y=w.next;Y!==y;){if(Y.x>=H&&Y.x<=W&&Y.y>=j&&Y.y<=ot&&v(A,z,P,U,M,O,Y.x,Y.y)&&S(Y.prev,Y,Y.next)>=0)return!1;Y=Y.next}return!0}function s(m,y,_,w){var A=m.prev,P=m,M=m.next;if(S(A,P,M)>=0)return!1;for(var z=A.x,U=P.x,O=M.x,H=A.y,j=P.y,W=M.y,ot=z<U?z<O?z:O:U<O?U:O,Y=H<j?H<W?H:W:j<W?j:W,Ot=z>U?z>O?z:O:U>O?U:O,vt=H>j?H>W?H:W:j>W?j:W,It=x(ot,Y,y,_,w),zt=x(Ot,vt,y,_,w),$=m.prevZ,X=m.nextZ;$&&$.z>=It&&X&&X.z<=zt;){if($.x>=ot&&$.x<=Ot&&$.y>=Y&&$.y<=vt&&$!==A&&$!==M&&v(z,H,U,j,O,W,$.x,$.y)&&S($.prev,$,$.next)>=0||($=$.prevZ,X.x>=ot&&X.x<=Ot&&X.y>=Y&&X.y<=vt&&X!==A&&X!==M&&v(z,H,U,j,O,W,X.x,X.y)&&S(X.prev,X,X.next)>=0))return!1;X=X.nextZ}for(;$&&$.z>=It;){if($.x>=ot&&$.x<=Ot&&$.y>=Y&&$.y<=vt&&$!==A&&$!==M&&v(z,H,U,j,O,W,$.x,$.y)&&S($.prev,$,$.next)>=0)return!1;$=$.prevZ}for(;X&&X.z<=zt;){if(X.x>=ot&&X.x<=Ot&&X.y>=Y&&X.y<=vt&&X!==A&&X!==M&&v(z,H,U,j,O,W,X.x,X.y)&&S(X.prev,X,X.next)>=0)return!1;X=X.nextZ}return!0}function o(m,y,_){var w=m;do{var A=w.prev,P=w.next.next;!C(A,P)&&I(A,w,w.next,P)&&G(A,P)&&G(P,A)&&(y.push(A.i/_|0),y.push(w.i/_|0),y.push(P.i/_|0),q(w),q(w.next),w=m=P),w=w.next}while(w!==m);return e(w)}function a(m,y,_,w,A,P){var M=m;do{for(var z=M.next.next;z!==M.prev;){if(M.i!==z.i&&b(M,z)){var U=E(M,z);M=e(M,M.next),U=e(U,U.next),r(M,y,_,w,A,P,0),r(U,y,_,w,A,P,0);return}z=z.next}M=M.next}while(M!==m)}function l(m,y,_,w){var A=[],P,M,z,U,O;for(P=0,M=y.length;P<M;P++)z=y[P]*w,U=P<M-1?y[P+1]*w:m.length,O=t(m,z,U,w,!1),O===O.next&&(O.steiner=!0),A.push(p(O));for(A.sort(u),P=0;P<A.length;P++)_=c(A[P],_);return _}function u(m,y){return m.x-y.x}function c(m,y){var _=h(m,y);if(!_)return y;var w=E(_,m);return e(w,w.next),e(_,_.next)}function h(m,y){var _=y,w=m.x,A=m.y,P=-1/0,M;do{if(A<=_.y&&A>=_.next.y&&_.next.y!==_.y){var z=_.x+(A-_.y)*(_.next.x-_.x)/(_.next.y-_.y);if(z<=w&&z>P&&(P=z,M=_.x<_.next.x?_:_.next,z===w))return M}_=_.next}while(_!==y);if(!M)return null;var U=M,O=M.x,H=M.y,j=1/0,W;_=M;do w>=_.x&&_.x>=O&&w!==_.x&&v(A<H?w:P,A,O,H,A<H?P:w,A,_.x,_.y)&&(W=Math.abs(A-_.y)/(w-_.x),G(_,m)&&(W<j||W===j&&(_.x>M.x||_.x===M.x&&d(M,_)))&&(M=_,j=W)),_=_.next;while(_!==U);return M}function d(m,y){return S(m.prev,m,y.prev)<0&&S(y.next,m,m.next)<0}function f(m,y,_,w){var A=m;do A.z===0&&(A.z=x(A.x,A.y,y,_,w)),A.prevZ=A.prev,A.nextZ=A.next,A=A.next;while(A!==m);A.prevZ.nextZ=null,A.prevZ=null,g(A)}function g(m){var y,_,w,A,P,M,z,U,O=1;do{for(_=m,m=null,P=null,M=0;_;){for(M++,w=_,z=0,y=0;y<O&&(z++,w=w.nextZ,!!w);y++);for(U=O;z>0||U>0&&w;)z!==0&&(U===0||!w||_.z<=w.z)?(A=_,_=_.nextZ,z--):(A=w,w=w.nextZ,U--),P?P.nextZ=A:m=A,A.prevZ=P,P=A;_=w}P.nextZ=null,O*=2}while(M>1);return m}function x(m,y,_,w,A){return m=(m-_)*A|0,y=(y-w)*A|0,m=(m|m<<8)&16711935,m=(m|m<<4)&252645135,m=(m|m<<2)&858993459,m=(m|m<<1)&1431655765,y=(y|y<<8)&16711935,y=(y|y<<4)&252645135,y=(y|y<<2)&858993459,y=(y|y<<1)&1431655765,m|y<<1}function p(m){var y=m,_=m;do(y.x<_.x||y.x===_.x&&y.y<_.y)&&(_=y),y=y.next;while(y!==m);return _}function v(m,y,_,w,A,P,M,z){return(A-M)*(y-z)>=(m-M)*(P-z)&&(m-M)*(w-z)>=(_-M)*(y-z)&&(_-M)*(P-z)>=(A-M)*(w-z)}function b(m,y){return m.next.i!==y.i&&m.prev.i!==y.i&&!L(m,y)&&(G(m,y)&&G(y,m)&&R(m,y)&&(S(m.prev,m,y.prev)||S(m,y.prev,y))||C(m,y)&&S(m.prev,m,m.next)>0&&S(y.prev,y,y.next)>0)}function S(m,y,_){return(y.y-m.y)*(_.x-y.x)-(y.x-m.x)*(_.y-y.y)}function C(m,y){return m.x===y.x&&m.y===y.y}function I(m,y,_,w){var A=F(S(m,y,_)),P=F(S(m,y,w)),M=F(S(_,w,m)),z=F(S(_,w,y));return!!(A!==P&&M!==z||A===0&&T(m,_,y)||P===0&&T(m,w,y)||M===0&&T(_,m,w)||z===0&&T(_,y,w))}function T(m,y,_){return y.x<=Math.max(m.x,_.x)&&y.x>=Math.min(m.x,_.x)&&y.y<=Math.max(m.y,_.y)&&y.y>=Math.min(m.y,_.y)}function F(m){return m>0?1:m<0?-1:0}function L(m,y){var _=m;do{if(_.i!==m.i&&_.next.i!==m.i&&_.i!==y.i&&_.next.i!==y.i&&I(_,_.next,m,y))return!0;_=_.next}while(_!==m);return!1}function G(m,y){return S(m.prev,m,m.next)<0?S(m,y,m.next)>=0&&S(m,m.prev,y)>=0:S(m,y,m.prev)<0||S(m,m.next,y)<0}function R(m,y){var _=m,w=!1,A=(m.x+y.x)/2,P=(m.y+y.y)/2;do _.y>P!=_.next.y>P&&_.next.y!==_.y&&A<(_.next.x-_.x)*(P-_.y)/(_.next.y-_.y)+_.x&&(w=!w),_=_.next;while(_!==m);return w}function E(m,y){var _=new ct(m.i,m.x,m.y),w=new ct(y.i,y.x,y.y),A=m.next,P=y.prev;return m.next=y,y.prev=m,_.next=A,A.prev=_,w.next=_,_.prev=w,P.next=w,w.prev=P,w}function Z(m,y,_,w){var A=new ct(m,y,_);return w?(A.next=w.next,A.prev=w,w.next.prev=A,w.next=A):(A.prev=A,A.next=A),A}function q(m){m.next.prev=m.prev,m.prev.next=m.next,m.prevZ&&(m.prevZ.nextZ=m.nextZ),m.nextZ&&(m.nextZ.prevZ=m.prevZ)}function ct(m,y,_){this.i=m,this.x=y,this.y=_,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}n.deviation=function(m,y,_,w){var A=y&&y.length,P=A?y[0]*_:m.length,M=Math.abs(Bt(m,0,P,_));if(A)for(var z=0,U=y.length;z<U;z++){var O=y[z]*_,H=z<U-1?y[z+1]*_:m.length;M-=Math.abs(Bt(m,O,H,_))}var j=0;for(z=0;z<w.length;z+=3){var W=w[z]*_,ot=w[z+1]*_,Y=w[z+2]*_;j+=Math.abs((m[W]-m[Y])*(m[ot+1]-m[W+1])-(m[W]-m[ot])*(m[Y+1]-m[W+1]))}return M===0&&j===0?0:Math.abs((j-M)/M)};function Bt(m,y,_,w){for(var A=0,P=y,M=_-w;P<_;P+=w)A+=(m[M]-m[P])*(m[P+1]+m[M+1]),M=P;return A}return n.flatten=function(m){for(var y=m[0][0].length,_={vertices:[],holes:[],dimensions:y},w=0,A=0;A<m.length;A++){for(var P=0;P<m[A].length;P++)for(var M=0;M<y;M++)_.vertices.push(m[A][P][M]);A>0&&(w+=m[A-1].length,_.holes.push(w))}return _},ke.exports}var El=Rl();const kl=un(El);var Fs=(n=>(n[n.NONE=0]="NONE",n[n.COLOR=16384]="COLOR",n[n.STENCIL=1024]="STENCIL",n[n.DEPTH=256]="DEPTH",n[n.COLOR_DEPTH=16640]="COLOR_DEPTH",n[n.COLOR_STENCIL=17408]="COLOR_STENCIL",n[n.DEPTH_STENCIL=1280]="DEPTH_STENCIL",n[n.ALL=17664]="ALL",n))(Fs||{});class Bl{constructor(t){this.items=[],this._name=t}emit(t,e,r,i,s,o,a,l){const{name:u,items:c}=this;for(let h=0,d=c.length;h<d;h++)c[h][u](t,e,r,i,s,o,a,l);return this}add(t){return t[this._name]&&(this.remove(t),this.items.push(t)),this}remove(t){const e=this.items.indexOf(t);return e!==-1&&this.items.splice(e,1),this}contains(t){return this.items.indexOf(t)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Ol=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Ms=class Is extends Ft{constructor(t){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=t.type,this.name=t.name,this.config=t;const e=[...Ol,...this.config.runners??[]];this._addRunners(...e),this._unsafeEvalCheck()}async init(t={}){const e=t.skipExtensionImports===!0?!0:t.manageImports===!1;await Il(e),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)t={...this._systemsHash[r].constructor.defaultOptions,...t};t={...Is.defaultOptions,...t},this._roundPixels=t.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(t);this._initOptions=t}render(t,e){let r=t;if(r instanceof Vt&&(r={container:r},e&&(D(at,"passing a second argument is deprecated, please use render options instead"),r.target=e.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const i=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=i?r.clearColor:Q.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(t,e,r){const i=this.view.resolution;this.view.resize(t,e,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==i&&this.runners.resolutionChange.emit(r)}clear(t={}){const e=this;t.target||(t.target=e.renderTarget.renderTarget),t.clearColor||(t.clearColor=this.background.colorRgba),t.clear??(t.clear=Fs.ALL);const{clear:r,clearColor:i,target:s}=t;Q.shared.setValue(i??this.background.colorRgba),e.renderTarget.clear(s,r,Q.shared.toArray())}get resolution(){return this.view.resolution}set resolution(t){this.view.resolution=t,this.runners.resolutionChange.emit(t)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...t){t.forEach(e=>{this.runners[e]=new Bl(e)})}_addSystems(t){let e;for(e in t){const r=t[e];this._addSystem(r.value,r.name)}}_addSystem(t,e){const r=new t(this);if(this[e])throw new Error(`Whoops! The name "${e}" is already in use`);this[e]=r,this._systemsHash[e]=r;for(const i in this.runners)this.runners[i].add(r);return this}_addPipes(t,e){const r=e.reduce((i,s)=>(i[s.name]=s.value,i),{});t.forEach(i=>{const s=i.value,o=i.name,a=r[o];this.renderPipes[o]=new s(this,a?new a:null)})}destroy(t=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(t),Object.values(this.runners).forEach(e=>{e.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(t){return this.textureGenerator.generateTexture(t)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!zl())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Ms.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let zs=Ms,Be;function Gl(n){return Be!==void 0||(Be=(()=>{const t={stencil:!0,failIfMajorPerformanceCaveat:n??zs.defaultOptions.failIfMajorPerformanceCaveat};try{if(!rt.get().getWebGLRenderingContext())return!1;let r=rt.get().createCanvas().getContext("webgl",t);const i=!!r?.getContextAttributes()?.stencil;if(r){const s=r.getExtension("WEBGL_lose_context");s&&s.loseContext()}return r=null,i}catch{return!1}})()),Be}let Oe;async function Ul(n={}){return Oe!==void 0||(Oe=await(async()=>{const t=rt.get().getNavigator().gpu;if(!t)return!1;try{return await(await t.requestAdapter(n)).requestDevice(),!0}catch{return!1}})()),Oe}const Kn=["webgl","webgpu","canvas"];async function Dl(n){let t=[];n.preference?(t.push(n.preference),Kn.forEach(s=>{s!==n.preference&&t.push(s)})):t=Kn.slice();let e,r={};for(let s=0;s<t.length;s++){const o=t[s];if(o==="webgpu"&&await Ul()){const{WebGPURenderer:a}=await Xe(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer.C6ERU5BI.js");return{WebGPURenderer:l}},__vite__mapDeps([4,2,5,3]));e=a,r={...n,...n.webgpu};break}else if(o==="webgl"&&Gl(n.failIfMajorPerformanceCaveat??zs.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Xe(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer.CcEnxgWU.js");return{WebGLRenderer:l}},__vite__mapDeps([6,2,5,3]));e=a,r={...n,...n.webgl};break}else if(o==="canvas")throw r={...n},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!e)throw new Error("No available renderer for the current environment");const i=new e;return await i.init(r),i}const Rs="8.8.1";class Es{static init(){globalThis.__PIXI_APP_INIT__?.(this,Rs)}static destroy(){}}Es.extension=B.Application;class Ll{constructor(t){this._renderer=t}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Rs)}destroy(){this._renderer=null}}Ll.extension={type:[B.WebGLSystem,B.WebGPUSystem],name:"initHook",priority:-10};const ks=class jr{constructor(...t){this.stage=new Vt,t[0]!==void 0&&D(at,"Application constructor options are deprecated, please use Application.init() instead.")}async init(t){t={...t},this.renderer=await Dl(t),jr._plugins.forEach(e=>{e.init.call(this,t)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return D(at,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(t=!1,e=!1){const r=jr._plugins.slice(0);r.reverse(),r.forEach(i=>{i.destroy.call(this)}),this.stage.destroy(e),this.stage=null,this.renderer.destroy(t),this.renderer=null}};ks._plugins=[];let Bs=ks;mt.handleByList(B.Application,Bs._plugins);mt.add(Es);class Os extends Ft{constructor(){super(...arguments),this.chars=Object.create(null),this.lineHeight=0,this.fontFamily="",this.fontMetrics={fontSize:0,ascent:0,descent:0},this.baseLineOffset=0,this.distanceField={type:"none",range:0},this.pages=[],this.applyFillAsTint=!0,this.baseMeasurementFontSize=100,this.baseRenderedFontSize=100}get font(){return D(at,"BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."),this.fontFamily}get pageTextures(){return D(at,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}get size(){return D(at,"BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."),this.fontMetrics.fontSize}get distanceFieldRange(){return D(at,"BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."),this.distanceField.range}get distanceFieldType(){return D(at,"BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."),this.distanceField.type}destroy(t=!1){this.emit("destroy",this),this.removeAllListeners();for(const e in this.chars)this.chars[e].texture?.destroy();this.chars=null,t&&(this.pages.forEach(e=>e.texture.destroy(!0)),this.pages=null)}}const Zn=[{offset:0,color:"white"},{offset:1,color:"black"}],mn=class qr{constructor(...t){this.uid=ut("fillGradient"),this.type="linear",this.colorStops=[];let e=Nl(t);e={...e.type==="radial"?qr.defaultRadialOptions:qr.defaultLinearOptions,...Hi(e)},this._textureSize=e.textureSize,e.type==="radial"?(this.center=e.center,this.outerCenter=e.outerCenter??this.center,this.innerRadius=e.innerRadius,this.outerRadius=e.outerRadius,this.scale=e.scale,this.rotation=e.rotation):(this.start=e.start,this.end=e.end),this.textureSpace=e.textureSpace,this.type=e.type,e.colorStops.forEach(i=>{this.addColorStop(i.offset,i.color)})}addColorStop(t,e){return this.colorStops.push({offset:t,color:Q.shared.setValue(e).toHexa()}),this}buildLinearGradient(){if(this.texture)return;const t=this.colorStops.length?this.colorStops:Zn,e=this._textureSize,{canvas:r,context:i}=Jn(e,1),s=i.createLinearGradient(0,0,this._textureSize,0);Qn(s,t),i.fillStyle=s,i.fillRect(0,0,e,1),this.texture=new N({source:new Nt({resource:r})});const{x:o,y:a}=this.start,{x:l,y:u}=this.end,c=new V,h=l-o,d=u-a,f=Math.sqrt(h*h+d*d),g=Math.atan2(d,h);c.scale(f/e,1),c.rotate(g),c.translate(o,a),this.textureSpace==="local"&&c.scale(e,e),this.transform=c}buildGradient(){this.type==="linear"?this.buildLinearGradient():this.buildRadialGradient()}buildRadialGradient(){if(this.texture)return;const t=this.colorStops.length?this.colorStops:Zn,e=this._textureSize,{canvas:r,context:i}=Jn(e,e),{x:s,y:o}=this.center,{x:a,y:l}=this.outerCenter,u=this.innerRadius,c=this.outerRadius,h=a-c,d=l-c,f=e/(c*2),g=(s-h)*f,x=(o-d)*f,p=i.createRadialGradient(g,x,u*f,(a-h)*f,(l-d)*f,c*f);Qn(p,t),i.fillStyle=t[t.length-1].color,i.fillRect(0,0,e,e),i.fillStyle=p,i.translate(g,x),i.rotate(this.rotation),i.scale(1,this.scale),i.translate(-g,-x),i.fillRect(0,0,e,e),this.texture=new N({source:new Nt({resource:r,addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})});const v=new V;v.scale(1/f,1/f),v.translate(h,d),this.textureSpace==="local"&&v.scale(e,e),this.transform=v}get styleKey(){return this.uid}destroy(){this.texture?.destroy(!0),this.texture=null}};mn.defaultLinearOptions={start:{x:0,y:0},end:{x:0,y:1},colorStops:[],textureSpace:"local",type:"linear",textureSize:256};mn.defaultRadialOptions={center:{x:.5,y:.5},innerRadius:0,outerRadius:.5,colorStops:[],scale:1,textureSpace:"local",type:"radial",textureSize:256};let $t=mn;function Qn(n,t){for(let e=0;e<t.length;e++){const r=t[e];n.addColorStop(r.offset,r.color)}}function Jn(n,t){const e=rt.get().createCanvas(n,t),r=e.getContext("2d");return{canvas:e,context:r}}function Nl(n){let t=n[0]??{};return(typeof t=="number"||n[1])&&(D("8.5.2","use options object instead"),t={type:"linear",start:{x:n[0],y:n[1]},end:{x:n[2],y:n[3]},textureSpace:n[4],textureSize:n[5]??$t.defaultLinearOptions.textureSize}),t}const ti={repeat:{addressModeU:"repeat",addressModeV:"repeat"},"repeat-x":{addressModeU:"repeat",addressModeV:"clamp-to-edge"},"repeat-y":{addressModeU:"clamp-to-edge",addressModeV:"repeat"},"no-repeat":{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}};class Qe{constructor(t,e){this.uid=ut("fillPattern"),this.transform=new V,this._styleKey=null,this.texture=t,this.transform.scale(1/t.frame.width,1/t.frame.height),e&&(t.source.style.addressModeU=ti[e].addressModeU,t.source.style.addressModeV=ti[e].addressModeV)}setTransform(t){const e=this.texture;this.transform.copyFrom(t),this.transform.invert(),this.transform.scale(1/e.frame.width,1/e.frame.height),this._styleKey=null}get styleKey(){return this._styleKey?this._styleKey:(this._styleKey=`fill-pattern-${this.uid}-${this.texture.uid}-${this.transform.toArray().join("-")}`,this._styleKey)}}var Ar,ei;function $l(){if(ei)return Ar;ei=1,Ar=e;var n={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},t=/([astvzqmhlc])([^astvzqmhlc]*)/ig;function e(s){var o=[];return s.replace(t,function(a,l,u){var c=l.toLowerCase();for(u=i(u),c=="m"&&u.length>2&&(o.push([l].concat(u.splice(0,2))),c="l",l=l=="m"?"l":"L");;){if(u.length==n[c])return u.unshift(l),o.push(u);if(u.length<n[c])throw new Error("malformed path data");o.push([l].concat(u.splice(0,n[c])))}}),o}var r=/-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;function i(s){var o=s.match(r);return o?o.map(Number):[]}return Ar}var Vl=$l();const Wl=un(Vl);function Xl(n,t){const e=Wl(n),r=[];let i=null,s=0,o=0;for(let a=0;a<e.length;a++){const l=e[a],u=l[0],c=l;switch(u){case"M":s=c[1],o=c[2],t.moveTo(s,o);break;case"m":s+=c[1],o+=c[2],t.moveTo(s,o);break;case"H":s=c[1],t.lineTo(s,o);break;case"h":s+=c[1],t.lineTo(s,o);break;case"V":o=c[1],t.lineTo(s,o);break;case"v":o+=c[1],t.lineTo(s,o);break;case"L":s=c[1],o=c[2],t.lineTo(s,o);break;case"l":s+=c[1],o+=c[2],t.lineTo(s,o);break;case"C":s=c[5],o=c[6],t.bezierCurveTo(c[1],c[2],c[3],c[4],s,o);break;case"c":t.bezierCurveTo(s+c[1],o+c[2],s+c[3],o+c[4],s+c[5],o+c[6]),s+=c[5],o+=c[6];break;case"S":s=c[3],o=c[4],t.bezierCurveToShort(c[1],c[2],s,o);break;case"s":t.bezierCurveToShort(s+c[1],o+c[2],s+c[3],o+c[4]),s+=c[3],o+=c[4];break;case"Q":s=c[3],o=c[4],t.quadraticCurveTo(c[1],c[2],s,o);break;case"q":t.quadraticCurveTo(s+c[1],o+c[2],s+c[3],o+c[4]),s+=c[3],o+=c[4];break;case"T":s=c[1],o=c[2],t.quadraticCurveToShort(s,o);break;case"t":s+=c[1],o+=c[2],t.quadraticCurveToShort(s,o);break;case"A":s=c[6],o=c[7],t.arcToSvg(c[1],c[2],c[3],c[4],c[5],s,o);break;case"a":s+=c[6],o+=c[7],t.arcToSvg(c[1],c[2],c[3],c[4],c[5],s,o);break;case"Z":case"z":t.closePath(),r.length>0&&(i=r.pop(),i?(s=i.startX,o=i.startY):(s=0,o=0)),i=null;break;default:et(`Unknown SVG path command: ${u}`)}u!=="Z"&&u!=="z"&&i===null&&(i={startX:s,startY:o},r.push(i))}return t}class gn{constructor(t=0,e=0,r=0){this.type="circle",this.x=t,this.y=e,this.radius=r}clone(){return new gn(this.x,this.y,this.radius)}contains(t,e){if(this.radius<=0)return!1;const r=this.radius*this.radius;let i=this.x-t,s=this.y-e;return i*=i,s*=s,i+s<=r}strokeContains(t,e,r,i=.5){if(this.radius===0)return!1;const s=this.x-t,o=this.y-e,a=this.radius,l=(1-i)*r,u=Math.sqrt(s*s+o*o);return u<=a+l&&u>a-(r-l)}getBounds(t){return t||(t=new lt),t.x=this.x-this.radius,t.y=this.y-this.radius,t.width=this.radius*2,t.height=this.radius*2,t}copyFrom(t){return this.x=t.x,this.y=t.y,this.radius=t.radius,this}copyTo(t){return t.copyFrom(this),t}toString(){return`[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`}}class xn{constructor(t=0,e=0,r=0,i=0){this.type="ellipse",this.x=t,this.y=e,this.halfWidth=r,this.halfHeight=i}clone(){return new xn(this.x,this.y,this.halfWidth,this.halfHeight)}contains(t,e){if(this.halfWidth<=0||this.halfHeight<=0)return!1;let r=(t-this.x)/this.halfWidth,i=(e-this.y)/this.halfHeight;return r*=r,i*=i,r+i<=1}strokeContains(t,e,r,i=.5){const{halfWidth:s,halfHeight:o}=this;if(s<=0||o<=0)return!1;const a=r*(1-i),l=r-a,u=s-l,c=o-l,h=s+a,d=o+a,f=t-this.x,g=e-this.y,x=f*f/(u*u)+g*g/(c*c),p=f*f/(h*h)+g*g/(d*d);return x>1&&p<=1}getBounds(t){return t||(t=new lt),t.x=this.x-this.halfWidth,t.y=this.y-this.halfHeight,t.width=this.halfWidth*2,t.height=this.halfHeight*2,t}copyFrom(t){return this.x=t.x,this.y=t.y,this.halfWidth=t.halfWidth,this.halfHeight=t.halfHeight,this}copyTo(t){return t.copyFrom(this),t}toString(){return`[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`}}function Yl(n,t,e,r,i,s){const o=n-e,a=t-r,l=i-e,u=s-r,c=o*l+a*u,h=l*l+u*u;let d=-1;h!==0&&(d=c/h);let f,g;d<0?(f=e,g=r):d>1?(f=i,g=s):(f=e+d*l,g=r+d*u);const x=n-f,p=t-g;return x*x+p*p}let Hl,jl;class _e{constructor(...t){this.type="polygon";let e=Array.isArray(t[0])?t[0]:t;if(typeof e[0]!="number"){const r=[];for(let i=0,s=e.length;i<s;i++)r.push(e[i].x,e[i].y);e=r}this.points=e,this.closePath=!0}isClockwise(){let t=0;const e=this.points,r=e.length;for(let i=0;i<r;i+=2){const s=e[i],o=e[i+1],a=e[(i+2)%r],l=e[(i+3)%r];t+=(a-s)*(l+o)}return t<0}containsPolygon(t){const e=this.getBounds(Hl),r=t.getBounds(jl);if(!e.containsRect(r))return!1;const i=t.points;for(let s=0;s<i.length;s+=2){const o=i[s],a=i[s+1];if(!this.contains(o,a))return!1}return!0}clone(){const t=this.points.slice(),e=new _e(t);return e.closePath=this.closePath,e}contains(t,e){let r=!1;const i=this.points.length/2;for(let s=0,o=i-1;s<i;o=s++){const a=this.points[s*2],l=this.points[s*2+1],u=this.points[o*2],c=this.points[o*2+1];l>e!=c>e&&t<(u-a)*((e-l)/(c-l))+a&&(r=!r)}return r}strokeContains(t,e,r,i=.5){const s=r*r,o=s*(1-i),a=s-o,{points:l}=this,u=l.length-(this.closePath?0:2);for(let c=0;c<u;c+=2){const h=l[c],d=l[c+1],f=l[(c+2)%l.length],g=l[(c+3)%l.length],x=Yl(t,e,h,d,f,g),p=Math.sign((f-h)*(e-d)-(g-d)*(t-h));if(x<=(p<0?a:o))return!0}return!1}getBounds(t){t||(t=new lt);const e=this.points;let r=1/0,i=-1/0,s=1/0,o=-1/0;for(let a=0,l=e.length;a<l;a+=2){const u=e[a],c=e[a+1];r=u<r?u:r,i=u>i?u:i,s=c<s?c:s,o=c>o?c:o}return t.x=r,t.width=i-r,t.y=s,t.height=o-s,t}copyFrom(t){return this.points=t.points.slice(),this.closePath=t.closePath,this}copyTo(t){return t.copyFrom(this),t}toString(){return`[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((t,e)=>`${t}, ${e}`,"")}]`}get lastX(){return this.points[this.points.length-2]}get lastY(){return this.points[this.points.length-1]}get x(){return this.points[this.points.length-2]}get y(){return this.points[this.points.length-1]}}const Ge=(n,t,e,r,i,s,o)=>{const a=n-e,l=t-r,u=Math.sqrt(a*a+l*l);return u>=i-s&&u<=i+o};class yn{constructor(t=0,e=0,r=0,i=0,s=20){this.type="roundedRectangle",this.x=t,this.y=e,this.width=r,this.height=i,this.radius=s}getBounds(t){return t||(t=new lt),t.x=this.x,t.y=this.y,t.width=this.width,t.height=this.height,t}clone(){return new yn(this.x,this.y,this.width,this.height,this.radius)}copyFrom(t){return this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height,this}copyTo(t){return t.copyFrom(this),t}contains(t,e){if(this.width<=0||this.height<=0)return!1;if(t>=this.x&&t<=this.x+this.width&&e>=this.y&&e<=this.y+this.height){const r=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(e>=this.y+r&&e<=this.y+this.height-r||t>=this.x+r&&t<=this.x+this.width-r)return!0;let i=t-(this.x+r),s=e-(this.y+r);const o=r*r;if(i*i+s*s<=o||(i=t-(this.x+this.width-r),i*i+s*s<=o)||(s=e-(this.y+this.height-r),i*i+s*s<=o)||(i=t-(this.x+r),i*i+s*s<=o))return!0}return!1}strokeContains(t,e,r,i=.5){const{x:s,y:o,width:a,height:l,radius:u}=this,c=r*(1-i),h=r-c,d=s+u,f=o+u,g=a-u*2,x=l-u*2,p=s+a,v=o+l;return(t>=s-c&&t<=s+h||t>=p-h&&t<=p+c)&&e>=f&&e<=f+x||(e>=o-c&&e<=o+h||e>=v-h&&e<=v+c)&&t>=d&&t<=d+g?!0:t<d&&e<f&&Ge(t,e,d,f,u,h,c)||t>p-u&&e<f&&Ge(t,e,p-u,f,u,h,c)||t>p-u&&e>v-u&&Ge(t,e,p-u,v-u,u,h,c)||t<d&&e>v-u&&Ge(t,e,d,v-u,u,h,c)}toString(){return`[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`}}const ql=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join(`
`);function Kl(n){let t="";for(let e=0;e<n;++e)e>0&&(t+=`
else `),e<n-1&&(t+=`if(test == ${e}.0){}`);return t}function Zl(n,t){if(n===0)throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");const e=t.createShader(t.FRAGMENT_SHADER);try{for(;;){const r=ql.replace(/%forloop%/gi,Kl(n));if(t.shaderSource(e,r),t.compileShader(e),!t.getShaderParameter(e,t.COMPILE_STATUS))n=n/2|0;else break}}finally{t.deleteShader(e)}return n}let te=null;function Gs(){if(te)return te;const n=bs();return te=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),te=Zl(te,n),n.getExtension("WEBGL_lose_context")?.loseContext(),te}const Us={};function Ql(n,t){let e=2166136261;for(let r=0;r<t;r++)e^=n[r].uid,e=Math.imul(e,16777619),e>>>=0;return Us[e]||Jl(n,t,e)}let Cr=0;function Jl(n,t,e){const r={};let i=0;Cr||(Cr=Gs());for(let o=0;o<Cr;o++){const a=o<t?n[o]:N.EMPTY.source;r[i++]=a.source,r[i++]=a.style}const s=new $e(r);return Us[e]=s,s}class ri{constructor(t){typeof t=="number"?this.rawBinaryData=new ArrayBuffer(t):t instanceof Uint8Array?this.rawBinaryData=t.buffer:this.rawBinaryData=t,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(t){return this[`${t}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(t){switch(t){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${t} isn't a valid view type`)}}}function ni(n,t){const e=n.byteLength/8|0,r=new Float64Array(n,0,e);new Float64Array(t,0,e).set(r);const s=n.byteLength-e*8;if(s>0){const o=new Uint8Array(n,e*8,s);new Uint8Array(t,e*8,s).set(o)}}const tu={normal:"normal-npm",add:"add-npm",screen:"screen-npm"};var eu=(n=>(n[n.DISABLED=0]="DISABLED",n[n.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",n[n.MASK_ACTIVE=2]="MASK_ACTIVE",n[n.INVERSE_MASK_ACTIVE=3]="INVERSE_MASK_ACTIVE",n[n.RENDERING_MASK_REMOVE=4]="RENDERING_MASK_REMOVE",n[n.NONE=5]="NONE",n))(eu||{});function ii(n,t){return t.alphaMode==="no-premultiply-alpha"&&tu[n]||n}class ru{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let t=0;t<this.count;t++){const e=this.textures[t];this.textures[t]=null,this.ids[e.uid]=null}this.count=0}}class nu{constructor(){this.renderPipeId="batch",this.action="startBatch",this.start=0,this.size=0,this.textures=new ru,this.blendMode="normal",this.topology="triangle-strip",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}const Ds=[];let Kr=0;function si(){return Kr>0?Ds[--Kr]:new nu}function oi(n){Ds[Kr++]=n}let fe=0;const Ls=class Ve{constructor(t={}){this.uid=ut("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._elements=[],Ve.defaultOptions.maxTextures=Ve.defaultOptions.maxTextures??Gs(),t={...Ve.defaultOptions,...t};const{maxTextures:e,attributesInitialSize:r,indicesInitialSize:i}=t;this.attributeBuffer=new ri(r*4),this.indexBuffer=new Uint16Array(i),this.maxTextures=e}begin(){this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0;for(let t=0;t<this.batchIndex;t++)oi(this.batches[t]);this.batchIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(t){this._elements[this.elementSize++]=t,t._indexStart=this.indexSize,t._attributeStart=this.attributeSize,t._batcher=this,this.indexSize+=t.indexSize,this.attributeSize+=t.attributeSize*this.vertexSize}checkAndUpdateTexture(t,e){const r=t._batch.textures.ids[e._source.uid];return!r&&r!==0?!1:(t._textureId=r,t.texture=e,!0)}updateElement(t){this.dirty=!0;const e=this.attributeBuffer;t.packAsQuad?this.packQuadAttributes(t,e.float32View,e.uint32View,t._attributeStart,t._textureId):this.packAttributes(t,e.float32View,e.uint32View,t._attributeStart,t._textureId)}break(t){const e=this._elements;if(!e[this.elementStart])return;let r=si(),i=r.textures;i.clear();const s=e[this.elementStart];let o=ii(s.blendMode,s.texture._source),a=s.topology;this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const l=this.attributeBuffer.float32View,u=this.attributeBuffer.uint32View,c=this.indexBuffer;let h=this._batchIndexSize,d=this._batchIndexStart,f="startBatch";const g=this.maxTextures;for(let x=this.elementStart;x<this.elementSize;++x){const p=e[x];e[x]=null;const b=p.texture._source,S=ii(p.blendMode,b),C=o!==S||a!==p.topology;if(b._batchTick===fe&&!C){p._textureId=b._textureBindLocation,h+=p.indexSize,p.packAsQuad?(this.packQuadAttributes(p,l,u,p._attributeStart,p._textureId),this.packQuadIndex(c,p._indexStart,p._attributeStart/this.vertexSize)):(this.packAttributes(p,l,u,p._attributeStart,p._textureId),this.packIndex(p,c,p._indexStart,p._attributeStart/this.vertexSize)),p._batch=r;continue}b._batchTick=fe,(i.count>=g||C)&&(this._finishBatch(r,d,h-d,i,o,a,t,f),f="renderBatch",d=h,o=S,a=p.topology,r=si(),i=r.textures,i.clear(),++fe),p._textureId=b._textureBindLocation=i.count,i.ids[b.uid]=i.count,i.textures[i.count++]=b,p._batch=r,h+=p.indexSize,p.packAsQuad?(this.packQuadAttributes(p,l,u,p._attributeStart,p._textureId),this.packQuadIndex(c,p._indexStart,p._attributeStart/this.vertexSize)):(this.packAttributes(p,l,u,p._attributeStart,p._textureId),this.packIndex(p,c,p._indexStart,p._attributeStart/this.vertexSize))}i.count>0&&(this._finishBatch(r,d,h-d,i,o,a,t,f),d=h,++fe),this.elementStart=this.elementSize,this._batchIndexStart=d,this._batchIndexSize=h}_finishBatch(t,e,r,i,s,o,a,l){t.gpuBindGroup=null,t.bindGroup=null,t.action=l,t.batcher=this,t.textures=i,t.blendMode=s,t.topology=o,t.start=e,t.size=r,++fe,this.batches[this.batchIndex++]=t,a.add(t)}finish(t){this.break(t)}ensureAttributeBuffer(t){t*4<=this.attributeBuffer.size||this._resizeAttributeBuffer(t*4)}ensureIndexBuffer(t){t<=this.indexBuffer.length||this._resizeIndexBuffer(t)}_resizeAttributeBuffer(t){const e=Math.max(t,this.attributeBuffer.size*2),r=new ri(e);ni(this.attributeBuffer.rawBinaryData,r.rawBinaryData),this.attributeBuffer=r}_resizeIndexBuffer(t){const e=this.indexBuffer;let r=Math.max(t,e.length*1.5);r+=r%2;const i=r>65535?new Uint32Array(r):new Uint16Array(r);if(i.BYTES_PER_ELEMENT!==e.BYTES_PER_ELEMENT)for(let s=0;s<e.length;s++)i[s]=e[s];else ni(e.buffer,i.buffer);this.indexBuffer=i}packQuadIndex(t,e,r){t[e]=r+0,t[e+1]=r+1,t[e+2]=r+2,t[e+3]=r+0,t[e+4]=r+2,t[e+5]=r+3}packIndex(t,e,r,i){const s=t.indices,o=t.indexSize,a=t.indexOffset,l=t.attributeOffset;for(let u=0;u<o;u++)e[r++]=i+s[u+a]-l}destroy(){for(let t=0;t<this.batches.length;t++)oi(this.batches[t]);this.batches=null;for(let t=0;t<this._elements.length;t++)this._elements[t]._batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}};Ls.defaultOptions={maxTextures:null,attributesInitialSize:4,indicesInitialSize:6};let iu=Ls;var yt=(n=>(n[n.MAP_READ=1]="MAP_READ",n[n.MAP_WRITE=2]="MAP_WRITE",n[n.COPY_SRC=4]="COPY_SRC",n[n.COPY_DST=8]="COPY_DST",n[n.INDEX=16]="INDEX",n[n.VERTEX=32]="VERTEX",n[n.UNIFORM=64]="UNIFORM",n[n.STORAGE=128]="STORAGE",n[n.INDIRECT=256]="INDIRECT",n[n.QUERY_RESOLVE=512]="QUERY_RESOLVE",n[n.STATIC=1024]="STATIC",n))(yt||{});class Ae extends Ft{constructor(t){let{data:e,size:r}=t;const{usage:i,label:s,shrinkToFit:o}=t;super(),this.uid=ut("buffer"),this._resourceType="buffer",this._resourceId=ut("resource"),this._touched=0,this._updateID=1,this._dataInt32=null,this.shrinkToFit=!0,this.destroyed=!1,e instanceof Array&&(e=new Float32Array(e)),this._data=e,r??(r=e?.byteLength);const a=!!e;this.descriptor={size:r,usage:i,mappedAtCreation:a,label:s},this.shrinkToFit=o??!0}get data(){return this._data}set data(t){this.setDataWithSize(t,t.length,!0)}get dataInt32(){return this._dataInt32||(this._dataInt32=new Int32Array(this.data.buffer)),this._dataInt32}get static(){return!!(this.descriptor.usage&yt.STATIC)}set static(t){t?this.descriptor.usage|=yt.STATIC:this.descriptor.usage&=~yt.STATIC}setDataWithSize(t,e,r){if(this._updateID++,this._updateSize=e*t.BYTES_PER_ELEMENT,this._data===t){r&&this.emit("update",this);return}const i=this._data;if(this._data=t,this._dataInt32=null,!i||i.length!==t.length){!this.shrinkToFit&&i&&t.byteLength<i.byteLength?r&&this.emit("update",this):(this.descriptor.size=t.byteLength,this._resourceId=ut("resource"),this.emit("change",this));return}r&&this.emit("update",this)}update(t){this._updateSize=t??this._updateSize,this._updateID++,this.emit("update",this)}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}function Ns(n,t){if(!(n instanceof Ae)){let e=t?yt.INDEX:yt.VERTEX;n instanceof Array&&(t?(n=new Uint32Array(n),e=yt.INDEX|yt.COPY_DST):(n=new Float32Array(n),e=yt.VERTEX|yt.COPY_DST)),n=new Ae({data:n,label:t?"index-mesh-buffer":"vertex-mesh-buffer",usage:e})}return n}function su(n,t,e){const r=n.getAttribute(t);if(!r)return e.minX=0,e.minY=0,e.maxX=0,e.maxY=0,e;const i=r.buffer.data;let s=1/0,o=1/0,a=-1/0,l=-1/0;const u=i.BYTES_PER_ELEMENT,c=(r.offset||0)/u,h=(r.stride||2*4)/u;for(let d=c;d<i.length;d+=h){const f=i[d],g=i[d+1];f>a&&(a=f),g>l&&(l=g),f<s&&(s=f),g<o&&(o=g)}return e.minX=s,e.minY=o,e.maxX=a,e.maxY=l,e}function ou(n){return(n instanceof Ae||Array.isArray(n)||n.BYTES_PER_ELEMENT)&&(n={buffer:n}),n.buffer=Ns(n.buffer,!1),n}class au extends Ft{constructor(t={}){super(),this.uid=ut("geometry"),this._layoutKey=0,this.instanceCount=1,this._bounds=new Pt,this._boundsDirty=!0;const{attributes:e,indexBuffer:r,topology:i}=t;if(this.buffers=[],this.attributes={},e)for(const s in e)this.addAttribute(s,e[s]);this.instanceCount=t.instanceCount??1,r&&this.addIndex(r),this.topology=i||"triangle-list"}onBufferUpdate(){this._boundsDirty=!0,this.emit("update",this)}getAttribute(t){return this.attributes[t]}getIndex(){return this.indexBuffer}getBuffer(t){return this.getAttribute(t).buffer}getSize(){for(const t in this.attributes){const e=this.attributes[t];return e.buffer.data.length/(e.stride/4||e.size)}return 0}addAttribute(t,e){const r=ou(e);this.buffers.indexOf(r.buffer)===-1&&(this.buffers.push(r.buffer),r.buffer.on("update",this.onBufferUpdate,this),r.buffer.on("change",this.onBufferUpdate,this)),this.attributes[t]=r}addIndex(t){this.indexBuffer=Ns(t,!0),this.buffers.push(this.indexBuffer)}get bounds(){return this._boundsDirty?(this._boundsDirty=!1,su(this,"aPosition",this._bounds)):this._bounds}destroy(t=!1){this.emit("destroy",this),this.removeAllListeners(),t&&this.buffers.forEach(e=>e.destroy()),this.attributes=null,this.buffers=null,this.indexBuffer=null,this._bounds=null}}const lu=new Float32Array(1),uu=new Uint32Array(1);class cu extends au{constructor(){const e=new Ae({data:lu,label:"attribute-batch-buffer",usage:yt.VERTEX|yt.COPY_DST,shrinkToFit:!1}),r=new Ae({data:uu,label:"index-batch-buffer",usage:yt.INDEX|yt.COPY_DST,shrinkToFit:!1}),i=6*4;super({attributes:{aPosition:{buffer:e,format:"float32x2",stride:i,offset:0},aUV:{buffer:e,format:"float32x2",stride:i,offset:2*4},aColor:{buffer:e,format:"unorm8x4",stride:i,offset:4*4},aTextureIdAndRound:{buffer:e,format:"uint16x2",stride:i,offset:5*4}},indexBuffer:r})}}function ai(n,t,e){if(n)for(const r in n){const i=r.toLocaleLowerCase(),s=t[i];if(s){let o=n[r];r==="header"&&(o=o.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),e&&s.push(`//----${e}----//`),s.push(o)}else et(`${r} placement hook does not exist in shader`)}}const hu=/\{\{(.*?)\}\}/g;function li(n){const t={};return(n.match(hu)?.map(r=>r.replace(/[{()}]/g,""))??[]).forEach(r=>{t[r]=[]}),t}function ui(n,t){let e;const r=/@in\s+([^;]+);/g;for(;(e=r.exec(n))!==null;)t.push(e[1])}function ci(n,t,e=!1){const r=[];ui(t,r),n.forEach(a=>{a.header&&ui(a.header,r)});const i=r;e&&i.sort();const s=i.map((a,l)=>`       @location(${l}) ${a},`).join(`
`);let o=t.replace(/@in\s+[^;]+;\s*/g,"");return o=o.replace("{{in}}",`
${s}
`),o}function hi(n,t){let e;const r=/@out\s+([^;]+);/g;for(;(e=r.exec(n))!==null;)t.push(e[1])}function fu(n){const e=/\b(\w+)\s*:/g.exec(n);return e?e[1]:""}function du(n){const t=/@.*?\s+/g;return n.replace(t,"")}function pu(n,t){const e=[];hi(t,e),n.forEach(l=>{l.header&&hi(l.header,e)});let r=0;const i=e.sort().map(l=>l.indexOf("builtin")>-1?l:`@location(${r++}) ${l}`).join(`,
`),s=e.sort().map(l=>`       var ${du(l)};`).join(`
`),o=`return VSOutput(
            ${e.sort().map(l=>` ${fu(l)}`).join(`,
`)});`;let a=t.replace(/@out\s+[^;]+;\s*/g,"");return a=a.replace("{{struct}}",`
${i}
`),a=a.replace("{{start}}",`
${s}
`),a=a.replace("{{return}}",`
${o}
`),a}function fi(n,t){let e=n;for(const r in t){const i=t[r];i.join(`
`).length?e=e.replace(`{{${r}}}`,`//-----${r} START-----//
${i.join(`
`)}
//----${r} FINISH----//`):e=e.replace(`{{${r}}}`,"")}return e}const Lt=Object.create(null),Tr=new Map;let mu=0;function gu({template:n,bits:t}){const e=$s(n,t);if(Lt[e])return Lt[e];const{vertex:r,fragment:i}=yu(n,t);return Lt[e]=Vs(r,i,t),Lt[e]}function xu({template:n,bits:t}){const e=$s(n,t);return Lt[e]||(Lt[e]=Vs(n.vertex,n.fragment,t)),Lt[e]}function yu(n,t){const e=t.map(o=>o.vertex).filter(o=>!!o),r=t.map(o=>o.fragment).filter(o=>!!o);let i=ci(e,n.vertex,!0);i=pu(e,i);const s=ci(r,n.fragment,!0);return{vertex:i,fragment:s}}function $s(n,t){return t.map(e=>(Tr.has(e)||Tr.set(e,mu++),Tr.get(e))).sort((e,r)=>e-r).join("-")+n.vertex+n.fragment}function Vs(n,t,e){const r=li(n),i=li(t);return e.forEach(s=>{ai(s.vertex,r,s.name),ai(s.fragment,i,s.name)}),{vertex:fi(n,r),fragment:fi(t,i)}}const vu=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,_u=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`,bu=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,Su=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
        
        {{end}}
    }
`,wu={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},Au={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function Cu({bits:n,name:t}){const e=gu({template:{fragment:_u,vertex:vu},bits:[wu,...n]});return K.from({name:t,vertex:{source:e.vertex,entryPoint:"main"},fragment:{source:e.fragment,entryPoint:"main"}})}function Tu({bits:n,name:t}){return new J({name:t,...xu({template:{vertex:bu,fragment:Su},bits:[Au,...n]})})}const Pu={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},Fu={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},Pr={};function Mu(n){const t=[];if(n===1)t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),t.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let e=0;for(let r=0;r<n;r++)t.push(`@group(1) @binding(${e++}) var textureSource${r+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${e++}) var textureSampler${r+1}: sampler;`)}return t.join(`
`)}function Iu(n){const t=[];if(n===1)t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{t.push("switch vTextureId {");for(let e=0;e<n;e++)e===n-1?t.push("  default:{"):t.push(`  case ${e}:{`),t.push(`      outColor = textureSampleGrad(textureSource${e+1}, textureSampler${e+1}, vUV, uvDx, uvDy);`),t.push("      break;}");t.push("}")}return t.join(`
`)}function zu(n){return Pr[n]||(Pr[n]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;

                ${Mu(n)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${Iu(n)}
            `}}),Pr[n]}const Fr={};function Ru(n){const t=[];for(let e=0;e<n;e++)e>0&&t.push("else"),e<n-1&&t.push(`if(vTextureId < ${e}.5)`),t.push("{"),t.push(`	outColor = texture(uTextures[${e}], vUV);`),t.push("}");return t.join(`
`)}function Eu(n){return Fr[n]||(Fr[n]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;

                uniform sampler2D uTextures[${n}];

            `,main:`

                ${Ru(n)}
            `}}),Fr[n]}const ku={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},Bu={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},di={};function Ou(n){let t=di[n];if(t)return t;const e=new Int32Array(n);for(let r=0;r<n;r++)e[r]=r;return t=di[n]=new Ke({uTextures:{value:e,type:"i32",size:n}},{isStatic:!0}),t}class Gu extends Ze{constructor(t){const e=Tu({name:"batch",bits:[Fu,Eu(t),Bu]}),r=Cu({name:"batch",bits:[Pu,zu(t),ku]});super({glProgram:e,gpuProgram:r,resources:{batchSamplers:Ou(t)}})}}let pi=null;const Ws=class Xs extends iu{constructor(){super(...arguments),this.geometry=new cu,this.shader=pi||(pi=new Gu(this.maxTextures)),this.name=Xs.extension.name,this.vertexSize=6}packAttributes(t,e,r,i,s){const o=s<<16|t.roundPixels&65535,a=t.transform,l=a.a,u=a.b,c=a.c,h=a.d,d=a.tx,f=a.ty,{positions:g,uvs:x}=t,p=t.color,v=t.attributeOffset,b=v+t.attributeSize;for(let S=v;S<b;S++){const C=S*2,I=g[C],T=g[C+1];e[i++]=l*I+c*T+d,e[i++]=h*T+u*I+f,e[i++]=x[C],e[i++]=x[C+1],r[i++]=p,r[i++]=o}}packQuadAttributes(t,e,r,i,s){const o=t.texture,a=t.transform,l=a.a,u=a.b,c=a.c,h=a.d,d=a.tx,f=a.ty,g=t.bounds,x=g.maxX,p=g.minX,v=g.maxY,b=g.minY,S=o.uvs,C=t.color,I=s<<16|t.roundPixels&65535;e[i+0]=l*p+c*b+d,e[i+1]=h*b+u*p+f,e[i+2]=S.x0,e[i+3]=S.y0,r[i+4]=C,r[i+5]=I,e[i+6]=l*x+c*b+d,e[i+7]=h*b+u*x+f,e[i+8]=S.x1,e[i+9]=S.y1,r[i+10]=C,r[i+11]=I,e[i+12]=l*x+c*v+d,e[i+13]=h*v+u*x+f,e[i+14]=S.x2,e[i+15]=S.y2,r[i+16]=C,r[i+17]=I,e[i+18]=l*p+c*v+d,e[i+19]=h*v+u*p+f,e[i+20]=S.x3,e[i+21]=S.y3,r[i+22]=C,r[i+23]=I}};Ws.extension={type:[B.Batcher],name:"default"};let Uu=Ws;function Du(n,t,e,r,i,s,o,a=null){let l=0;e*=t,i*=s;const u=a.a,c=a.b,h=a.c,d=a.d,f=a.tx,g=a.ty;for(;l<o;){const x=n[e],p=n[e+1];r[i]=u*x+h*p+f,r[i+1]=c*x+d*p+g,i+=s,e+=t,l++}}function Lu(n,t,e,r){let i=0;for(t*=e;i<r;)n[t]=0,n[t+1]=0,t+=e,i++}function Ys(n,t,e,r,i){const s=t.a,o=t.b,a=t.c,l=t.d,u=t.tx,c=t.ty;e||(e=0),r||(r=2),i||(i=n.length/r-e);let h=e*r;for(let d=0;d<i;d++){const f=n[h],g=n[h+1];n[h]=s*f+a*g+u,n[h+1]=o*f+l*g+c,h+=r}}const Nu=new V;class Hs{constructor(){this.packAsQuad=!1,this.batcherName="default",this.topology="triangle-list",this.applyTransform=!0,this.roundPixels=0,this._batcher=null,this._batch=null}get uvs(){return this.geometryData.uvs}get positions(){return this.geometryData.vertices}get indices(){return this.geometryData.indices}get blendMode(){return this.applyTransform?this.renderable.groupBlendMode:"normal"}get color(){const t=this.baseColor,e=t>>16|t&65280|(t&255)<<16,r=this.renderable;return r?ns(e,r.groupColor)+(this.alpha*r.groupAlpha*255<<24):e+(this.alpha*255<<24)}get transform(){return this.renderable?.groupTransform||Nu}copyTo(t){t.indexOffset=this.indexOffset,t.indexSize=this.indexSize,t.attributeOffset=this.attributeOffset,t.attributeSize=this.attributeSize,t.baseColor=this.baseColor,t.alpha=this.alpha,t.texture=this.texture,t.geometryData=this.geometryData,t.topology=this.topology}reset(){this.applyTransform=!0,this.renderable=null,this.topology="triangle-list"}}const Ce={extension:{type:B.ShapeBuilder,name:"circle"},build(n,t){let e,r,i,s,o,a;if(n.type==="circle"){const C=n;e=C.x,r=C.y,o=a=C.radius,i=s=0}else if(n.type==="ellipse"){const C=n;e=C.x,r=C.y,o=C.halfWidth,a=C.halfHeight,i=s=0}else{const C=n,I=C.width/2,T=C.height/2;e=C.x+I,r=C.y+T,o=a=Math.max(0,Math.min(C.radius,Math.min(I,T))),i=I-o,s=T-a}if(!(o>=0&&a>=0&&i>=0&&s>=0))return t;const l=Math.ceil(2.3*Math.sqrt(o+a)),u=l*8+(i?4:0)+(s?4:0);if(u===0)return t;if(l===0)return t[0]=t[6]=e+i,t[1]=t[3]=r+s,t[2]=t[4]=e-i,t[5]=t[7]=r-s,t;let c=0,h=l*4+(i?2:0)+2,d=h,f=u,g=i+o,x=s,p=e+g,v=e-g,b=r+x;if(t[c++]=p,t[c++]=b,t[--h]=b,t[--h]=v,s){const C=r-x;t[d++]=v,t[d++]=C,t[--f]=C,t[--f]=p}for(let C=1;C<l;C++){const I=Math.PI/2*(C/l),T=i+Math.cos(I)*o,F=s+Math.sin(I)*a,L=e+T,G=e-T,R=r+F,E=r-F;t[c++]=L,t[c++]=R,t[--h]=R,t[--h]=G,t[d++]=G,t[d++]=E,t[--f]=E,t[--f]=L}g=i,x=s+a,p=e+g,v=e-g,b=r+x;const S=r-x;return t[c++]=p,t[c++]=b,t[--f]=S,t[--f]=p,i&&(t[c++]=v,t[c++]=b,t[--f]=S,t[--f]=v),t},triangulate(n,t,e,r,i,s){if(n.length===0)return;let o=0,a=0;for(let c=0;c<n.length;c+=2)o+=n[c],a+=n[c+1];o/=n.length/2,a/=n.length/2;let l=r;t[l*e]=o,t[l*e+1]=a;const u=l++;for(let c=0;c<n.length;c+=2)t[l*e]=n[c],t[l*e+1]=n[c+1],c>0&&(i[s++]=l,i[s++]=u,i[s++]=l-1),l++;i[s++]=u+1,i[s++]=u,i[s++]=l-1}},$u={...Ce,extension:{...Ce.extension,name:"ellipse"}},Vu={...Ce,extension:{...Ce.extension,name:"roundedRectangle"}},js=1e-4,mi=1e-4;function Wu(n){const t=n.length;if(t<6)return 1;let e=0;for(let r=0,i=n[t-2],s=n[t-1];r<t;r+=2){const o=n[r],a=n[r+1];e+=(o-i)*(a+s),i=o,s=a}return e<0?-1:1}function gi(n,t,e,r,i,s,o,a){const l=n-e*i,u=t-r*i,c=n+e*s,h=t+r*s;let d,f;o?(d=r,f=-e):(d=-r,f=e);const g=l+d,x=u+f,p=c+d,v=h+f;return a.push(g,x),a.push(p,v),2}function Xt(n,t,e,r,i,s,o,a){const l=e-n,u=r-t;let c=Math.atan2(l,u),h=Math.atan2(i-n,s-t);a&&c<h?c+=Math.PI*2:!a&&c>h&&(h+=Math.PI*2);let d=c;const f=h-c,g=Math.abs(f),x=Math.sqrt(l*l+u*u),p=(15*g*Math.sqrt(x)/Math.PI>>0)+1,v=f/p;if(d+=v,a){o.push(n,t),o.push(e,r);for(let b=1,S=d;b<p;b++,S+=v)o.push(n,t),o.push(n+Math.sin(S)*x,t+Math.cos(S)*x);o.push(n,t),o.push(i,s)}else{o.push(e,r),o.push(n,t);for(let b=1,S=d;b<p;b++,S+=v)o.push(n+Math.sin(S)*x,t+Math.cos(S)*x),o.push(n,t);o.push(i,s),o.push(n,t)}return p*2}function Xu(n,t,e,r,i,s){const o=js;if(n.length===0)return;const a=t;let l=a.alignment;if(t.alignment!==.5){let w=Wu(n);l=(l-.5)*w+.5}const u=new pt(n[0],n[1]),c=new pt(n[n.length-2],n[n.length-1]),h=r,d=Math.abs(u.x-c.x)<o&&Math.abs(u.y-c.y)<o;if(h){n=n.slice(),d&&(n.pop(),n.pop(),c.set(n[n.length-2],n[n.length-1]));const w=(u.x+c.x)*.5,A=(c.y+u.y)*.5;n.unshift(w,A),n.push(w,A)}const f=i,g=n.length/2;let x=n.length;const p=f.length/2,v=a.width/2,b=v*v,S=a.miterLimit*a.miterLimit;let C=n[0],I=n[1],T=n[2],F=n[3],L=0,G=0,R=-(I-F),E=C-T,Z=0,q=0,ct=Math.sqrt(R*R+E*E);R/=ct,E/=ct,R*=v,E*=v;const Bt=l,m=(1-Bt)*2,y=Bt*2;h||(a.cap==="round"?x+=Xt(C-R*(m-y)*.5,I-E*(m-y)*.5,C-R*m,I-E*m,C+R*y,I+E*y,f,!0)+2:a.cap==="square"&&(x+=gi(C,I,R,E,m,y,!0,f))),f.push(C-R*m,I-E*m),f.push(C+R*y,I+E*y);for(let w=1;w<g-1;++w){C=n[(w-1)*2],I=n[(w-1)*2+1],T=n[w*2],F=n[w*2+1],L=n[(w+1)*2],G=n[(w+1)*2+1],R=-(I-F),E=C-T,ct=Math.sqrt(R*R+E*E),R/=ct,E/=ct,R*=v,E*=v,Z=-(F-G),q=T-L,ct=Math.sqrt(Z*Z+q*q),Z/=ct,q/=ct,Z*=v,q*=v;const A=T-C,P=I-F,M=T-L,z=G-F,U=A*M+P*z,O=P*M-z*A,H=O<0;if(Math.abs(O)<.001*Math.abs(U)){f.push(T-R*m,F-E*m),f.push(T+R*y,F+E*y),U>=0&&(a.join==="round"?x+=Xt(T,F,T-R*m,F-E*m,T-Z*m,F-q*m,f,!1)+4:x+=2,f.push(T-Z*y,F-q*y),f.push(T+Z*m,F+q*m));continue}const j=(-R+C)*(-E+F)-(-R+T)*(-E+I),W=(-Z+L)*(-q+F)-(-Z+T)*(-q+G),ot=(A*W-M*j)/O,Y=(z*j-P*W)/O,Ot=(ot-T)*(ot-T)+(Y-F)*(Y-F),vt=T+(ot-T)*m,It=F+(Y-F)*m,zt=T-(ot-T)*y,$=F-(Y-F)*y,X=Math.min(A*A+P*P,M*M+z*z),Tn=H?m:y,oa=X+Tn*Tn*b;Ot<=oa?a.join==="bevel"||Ot/b>S?(H?(f.push(vt,It),f.push(T+R*y,F+E*y),f.push(vt,It),f.push(T+Z*y,F+q*y)):(f.push(T-R*m,F-E*m),f.push(zt,$),f.push(T-Z*m,F-q*m),f.push(zt,$)),x+=2):a.join==="round"?H?(f.push(vt,It),f.push(T+R*y,F+E*y),x+=Xt(T,F,T+R*y,F+E*y,T+Z*y,F+q*y,f,!0)+4,f.push(vt,It),f.push(T+Z*y,F+q*y)):(f.push(T-R*m,F-E*m),f.push(zt,$),x+=Xt(T,F,T-R*m,F-E*m,T-Z*m,F-q*m,f,!1)+4,f.push(T-Z*m,F-q*m),f.push(zt,$)):(f.push(vt,It),f.push(zt,$)):(f.push(T-R*m,F-E*m),f.push(T+R*y,F+E*y),a.join==="round"?H?x+=Xt(T,F,T+R*y,F+E*y,T+Z*y,F+q*y,f,!0)+2:x+=Xt(T,F,T-R*m,F-E*m,T-Z*m,F-q*m,f,!1)+2:a.join==="miter"&&Ot/b<=S&&(H?(f.push(zt,$),f.push(zt,$)):(f.push(vt,It),f.push(vt,It)),x+=2),f.push(T-Z*m,F-q*m),f.push(T+Z*y,F+q*y),x+=2)}C=n[(g-2)*2],I=n[(g-2)*2+1],T=n[(g-1)*2],F=n[(g-1)*2+1],R=-(I-F),E=C-T,ct=Math.sqrt(R*R+E*E),R/=ct,E/=ct,R*=v,E*=v,f.push(T-R*m,F-E*m),f.push(T+R*y,F+E*y),h||(a.cap==="round"?x+=Xt(T-R*(m-y)*.5,F-E*(m-y)*.5,T-R*m,F-E*m,T+R*y,F+E*y,f,!1)+2:a.cap==="square"&&(x+=gi(T,F,R,E,m,y,!1,f)));const _=mi*mi;for(let w=p;w<x+p-2;++w)C=f[w*2],I=f[w*2+1],T=f[(w+1)*2],F=f[(w+1)*2+1],L=f[(w+2)*2],G=f[(w+2)*2+1],!(Math.abs(C*(F-G)+T*(G-I)+L*(I-F))<_)&&s.push(w,w+1,w+2)}function Yu(n,t,e,r){const i=js;if(n.length===0)return;const s=n[0],o=n[1],a=n[n.length-2],l=n[n.length-1],u=t||Math.abs(s-a)<i&&Math.abs(o-l)<i,c=e,h=n.length/2,d=c.length/2;for(let f=0;f<h;f++)c.push(n[f*2]),c.push(n[f*2+1]);for(let f=0;f<h-1;f++)r.push(d+f,d+f+1);u&&r.push(d+h-1,d)}function qs(n,t,e,r,i,s,o){const a=kl(n,t,2);if(!a)return;for(let u=0;u<a.length;u+=3)s[o++]=a[u]+i,s[o++]=a[u+1]+i,s[o++]=a[u+2]+i;let l=i*r;for(let u=0;u<n.length;u+=2)e[l]=n[u],e[l+1]=n[u+1],l+=r}const Hu=[],ju={extension:{type:B.ShapeBuilder,name:"polygon"},build(n,t){for(let e=0;e<n.points.length;e++)t[e]=n.points[e];return t},triangulate(n,t,e,r,i,s){qs(n,Hu,t,e,r,i,s)}},qu={extension:{type:B.ShapeBuilder,name:"rectangle"},build(n,t){const e=n,r=e.x,i=e.y,s=e.width,o=e.height;return s>=0&&o>=0&&(t[0]=r,t[1]=i,t[2]=r+s,t[3]=i,t[4]=r+s,t[5]=i+o,t[6]=r,t[7]=i+o),t},triangulate(n,t,e,r,i,s){let o=0;r*=e,t[r+o]=n[0],t[r+o+1]=n[1],o+=e,t[r+o]=n[2],t[r+o+1]=n[3],o+=e,t[r+o]=n[6],t[r+o+1]=n[7],o+=e,t[r+o]=n[4],t[r+o+1]=n[5],o+=e;const a=r/e;i[s++]=a,i[s++]=a+1,i[s++]=a+2,i[s++]=a+1,i[s++]=a+3,i[s++]=a+2}},Ku={extension:{type:B.ShapeBuilder,name:"triangle"},build(n,t){return t[0]=n.x,t[1]=n.y,t[2]=n.x2,t[3]=n.y2,t[4]=n.x3,t[5]=n.y3,t},triangulate(n,t,e,r,i,s){let o=0;r*=e,t[r+o]=n[0],t[r+o+1]=n[1],o+=e,t[r+o]=n[2],t[r+o+1]=n[3],o+=e,t[r+o]=n[4],t[r+o+1]=n[5];const a=r/e;i[s++]=a,i[s++]=a+1,i[s++]=a+2}},Zu=new V,Qu=new lt;function Ju(n,t,e,r){const i=t.matrix?n.copyFrom(t.matrix).invert():n.identity();if(t.textureSpace==="local"){const s=e.getBounds(Qu);i.translate(-s.x,-s.y),i.scale(1/s.width,1/s.height)}else{i.translate(t.texture.frame.x,t.texture.frame.y),i.scale(1/t.texture.source.width,1/t.texture.source.height);const s=t.texture.source.style;s.addressMode==="clamp-to-edge"&&(s.addressMode="repeat",s.update())}return r&&i.append(Zu.copyFrom(r).invert()),i}const Je={};mt.handleByMap(B.ShapeBuilder,Je);mt.add(qu,ju,Ku,Ce,$u,Vu);const tc=new lt,ec=new V;function rc(n,t){const{geometryData:e,batches:r}=t;r.length=0,e.indices.length=0,e.vertices.length=0,e.uvs.length=0;for(let i=0;i<n.instructions.length;i++){const s=n.instructions[i];if(s.action==="texture")nc(s.data,r,e);else if(s.action==="fill"||s.action==="stroke"){const o=s.action==="stroke",a=s.data.path.shapePath,l=s.data.style,u=s.data.hole;o&&u&&xi(u.shapePath,l,!0,r,e),u&&(a.shapePrimitives[a.shapePrimitives.length-1].holes=u.shapePath.shapePrimitives),xi(a,l,o,r,e)}}}function nc(n,t,e){const{vertices:r,uvs:i,indices:s}=e,o=s.length,a=r.length/2,l=[],u=Je.rectangle,c=tc,h=n.image;c.x=n.dx,c.y=n.dy,c.width=n.dw,c.height=n.dh;const d=n.transform;u.build(c,l),d&&Ys(l,d),u.triangulate(l,r,2,a,s,o);const f=h.uvs;i.push(f.x0,f.y0,f.x1,f.y1,f.x3,f.y3,f.x2,f.y2);const g=Ut.get(Hs);g.indexOffset=o,g.indexSize=s.length-o,g.attributeOffset=a,g.attributeSize=r.length/2-a,g.baseColor=n.style,g.alpha=n.alpha,g.texture=h,g.geometryData=e,t.push(g)}function xi(n,t,e,r,i){const{vertices:s,uvs:o,indices:a}=i;n.shapePrimitives.forEach(({shape:l,transform:u,holes:c})=>{const h=a.length,d=s.length/2,f=[],g=Je[l.type];let x="triangle-list";if(g.build(l,f),u&&Ys(f,u),e){const S=l.closePath??!0,C=t;C.pixelLine?(Yu(f,S,s,a),x="line-list"):Xu(f,C,!1,S,s,a)}else if(c){const S=[],C=f.slice();ic(c).forEach(T=>{S.push(C.length/2),C.push(...T)}),qs(C,S,s,2,d,a,h)}else g.triangulate(f,s,2,d,a,h);const p=o.length/2,v=t.texture;if(v!==N.WHITE){const S=Ju(ec,t,l,u);Du(s,2,d,o,p,2,s.length/2-d,S)}else Lu(o,p,2,s.length/2-d);const b=Ut.get(Hs);b.indexOffset=h,b.indexSize=a.length-h,b.attributeOffset=d,b.attributeSize=s.length/2-d,b.baseColor=t.color,b.alpha=t.alpha,b.texture=v,b.geometryData=i,b.topology=x,r.push(b)})}function ic(n){const t=[];for(let e=0;e<n.length;e++){const r=n[e].shape,i=[];Je[r.type].build(r,i),t.push(i)}return t}class sc{constructor(){this.batches=[],this.geometryData={vertices:[],uvs:[],indices:[]}}}class oc{constructor(){this.batcher=new Uu,this.instructions=new as}init(){this.instructions.reset()}get geometry(){return D(ga,"GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead."),this.batcher.geometry}}const vn=class Zr{constructor(t){this._gpuContextHash={},this._graphicsDataContextHash=Object.create(null),t.renderableGC.addManagedHash(this,"_gpuContextHash"),t.renderableGC.addManagedHash(this,"_graphicsDataContextHash")}init(t){Zr.defaultOptions.bezierSmoothness=t?.bezierSmoothness??Zr.defaultOptions.bezierSmoothness}getContextRenderData(t){return this._graphicsDataContextHash[t.uid]||this._initContextRenderData(t)}updateGpuContext(t){let e=this._gpuContextHash[t.uid]||this._initContext(t);if(t.dirty){e?this._cleanGraphicsContextData(t):e=this._initContext(t),rc(t,e);const r=t.batchMode;t.customShader||r==="no-batch"?e.isBatchable=!1:r==="auto"&&(e.isBatchable=e.geometryData.vertices.length<400),t.dirty=!1}return e}getGpuContext(t){return this._gpuContextHash[t.uid]||this._initContext(t)}_initContextRenderData(t){const e=Ut.get(oc),{batches:r,geometryData:i}=this._gpuContextHash[t.uid],s=i.vertices.length,o=i.indices.length;for(let c=0;c<r.length;c++)r[c].applyTransform=!1;const a=e.batcher;a.ensureAttributeBuffer(s),a.ensureIndexBuffer(o),a.begin();for(let c=0;c<r.length;c++){const h=r[c];a.add(h)}a.finish(e.instructions);const l=a.geometry;l.indexBuffer.setDataWithSize(a.indexBuffer,a.indexSize,!0),l.buffers[0].setDataWithSize(a.attributeBuffer.float32View,a.attributeSize,!0);const u=a.batches;for(let c=0;c<u.length;c++){const h=u[c];h.bindGroup=Ql(h.textures.textures,h.textures.count)}return this._graphicsDataContextHash[t.uid]=e,e}_initContext(t){const e=new sc;return e.context=t,this._gpuContextHash[t.uid]=e,t.on("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[t.uid]}onGraphicsContextDestroy(t){this._cleanGraphicsContextData(t),t.off("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[t.uid]=null}_cleanGraphicsContextData(t){const e=this._gpuContextHash[t.uid];e.isBatchable||this._graphicsDataContextHash[t.uid]&&(Ut.return(this.getContextRenderData(t)),this._graphicsDataContextHash[t.uid]=null),e.batches&&e.batches.forEach(r=>{Ut.return(r)})}destroy(){for(const t in this._gpuContextHash)this._gpuContextHash[t]&&this.onGraphicsContextDestroy(this._gpuContextHash[t].context)}};vn.extension={type:[B.WebGLSystem,B.WebGPUSystem,B.CanvasSystem],name:"graphicsContext"};vn.defaultOptions={bezierSmoothness:.5};let Ks=vn;const ac=8,Ue=11920929e-14,lc=1;function Zs(n,t,e,r,i,s,o,a,l,u){const h=Math.min(.99,Math.max(0,u??Ks.defaultOptions.bezierSmoothness));let d=(lc-h)/1;return d*=d,uc(t,e,r,i,s,o,a,l,n,d),n}function uc(n,t,e,r,i,s,o,a,l,u){Qr(n,t,e,r,i,s,o,a,l,u,0),l.push(o,a)}function Qr(n,t,e,r,i,s,o,a,l,u,c){if(c>ac)return;const h=(n+e)/2,d=(t+r)/2,f=(e+i)/2,g=(r+s)/2,x=(i+o)/2,p=(s+a)/2,v=(h+f)/2,b=(d+g)/2,S=(f+x)/2,C=(g+p)/2,I=(v+S)/2,T=(b+C)/2;if(c>0){let F=o-n,L=a-t;const G=Math.abs((e-o)*L-(r-a)*F),R=Math.abs((i-o)*L-(s-a)*F);if(G>Ue&&R>Ue){if((G+R)*(G+R)<=u*(F*F+L*L)){l.push(I,T);return}}else if(G>Ue){if(G*G<=u*(F*F+L*L)){l.push(I,T);return}}else if(R>Ue){if(R*R<=u*(F*F+L*L)){l.push(I,T);return}}else if(F=I-(n+o)/2,L=T-(t+a)/2,F*F+L*L<=u){l.push(I,T);return}}Qr(n,t,h,d,v,b,I,T,l,u,c+1),Qr(I,T,S,C,x,p,o,a,l,u,c+1)}const cc=8,hc=11920929e-14,fc=1;function dc(n,t,e,r,i,s,o,a){const u=Math.min(.99,Math.max(0,a??Ks.defaultOptions.bezierSmoothness));let c=(fc-u)/1;return c*=c,pc(t,e,r,i,s,o,n,c),n}function pc(n,t,e,r,i,s,o,a){Jr(o,n,t,e,r,i,s,a,0),o.push(i,s)}function Jr(n,t,e,r,i,s,o,a,l){if(l>cc)return;const u=(t+r)/2,c=(e+i)/2,h=(r+s)/2,d=(i+o)/2,f=(u+h)/2,g=(c+d)/2;let x=s-t,p=o-e;const v=Math.abs((r-s)*p-(i-o)*x);if(v>hc){if(v*v<=a*(x*x+p*p)){n.push(f,g);return}}else if(x=f-(t+s)/2,p=g-(e+o)/2,x*x+p*p<=a){n.push(f,g);return}Jr(n,t,e,u,c,f,g,a,l+1),Jr(n,f,g,h,d,s,o,a,l+1)}function Qs(n,t,e,r,i,s,o,a){let l=Math.abs(i-s);(!o&&i>s||o&&s>i)&&(l=2*Math.PI-l),a||(a=Math.max(6,Math.floor(6*Math.pow(r,1/3)*(l/Math.PI)))),a=Math.max(a,3);let u=l/a,c=i;u*=o?-1:1;for(let h=0;h<a+1;h++){const d=Math.cos(c),f=Math.sin(c),g=t+d*r,x=e+f*r;n.push(g,x),c+=u}}function mc(n,t,e,r,i,s){const o=n[n.length-2],l=n[n.length-1]-e,u=o-t,c=i-e,h=r-t,d=Math.abs(l*h-u*c);if(d<1e-8||s===0){(n[n.length-2]!==t||n[n.length-1]!==e)&&n.push(t,e);return}const f=l*l+u*u,g=c*c+h*h,x=l*c+u*h,p=s*Math.sqrt(f)/d,v=s*Math.sqrt(g)/d,b=p*x/f,S=v*x/g,C=p*h+v*u,I=p*c+v*l,T=u*(v+b),F=l*(v+b),L=h*(p+S),G=c*(p+S),R=Math.atan2(F-I,T-C),E=Math.atan2(G-I,L-C);Qs(n,C+t,I+e,s,R,E,u*c>h*l)}const be=Math.PI*2,Mr={centerX:0,centerY:0,ang1:0,ang2:0},Ir=({x:n,y:t},e,r,i,s,o,a,l)=>{n*=e,t*=r;const u=i*n-s*t,c=s*n+i*t;return l.x=u+o,l.y=c+a,l};function gc(n,t){const e=t===-1.5707963267948966?-.551915024494:1.3333333333333333*Math.tan(t/4),r=t===1.5707963267948966?.551915024494:e,i=Math.cos(n),s=Math.sin(n),o=Math.cos(n+t),a=Math.sin(n+t);return[{x:i-s*r,y:s+i*r},{x:o+a*r,y:a-o*r},{x:o,y:a}]}const yi=(n,t,e,r)=>{const i=n*r-t*e<0?-1:1;let s=n*e+t*r;return s>1&&(s=1),s<-1&&(s=-1),i*Math.acos(s)},xc=(n,t,e,r,i,s,o,a,l,u,c,h,d)=>{const f=Math.pow(i,2),g=Math.pow(s,2),x=Math.pow(c,2),p=Math.pow(h,2);let v=f*g-f*p-g*x;v<0&&(v=0),v/=f*p+g*x,v=Math.sqrt(v)*(o===a?-1:1);const b=v*i/s*h,S=v*-s/i*c,C=u*b-l*S+(n+e)/2,I=l*b+u*S+(t+r)/2,T=(c-b)/i,F=(h-S)/s,L=(-c-b)/i,G=(-h-S)/s,R=yi(1,0,T,F);let E=yi(T,F,L,G);a===0&&E>0&&(E-=be),a===1&&E<0&&(E+=be),d.centerX=C,d.centerY=I,d.ang1=R,d.ang2=E};function yc(n,t,e,r,i,s,o,a=0,l=0,u=0){if(s===0||o===0)return;const c=Math.sin(a*be/360),h=Math.cos(a*be/360),d=h*(t-r)/2+c*(e-i)/2,f=-c*(t-r)/2+h*(e-i)/2;if(d===0&&f===0)return;s=Math.abs(s),o=Math.abs(o);const g=Math.pow(d,2)/Math.pow(s,2)+Math.pow(f,2)/Math.pow(o,2);g>1&&(s*=Math.sqrt(g),o*=Math.sqrt(g)),xc(t,e,r,i,s,o,l,u,c,h,d,f,Mr);let{ang1:x,ang2:p}=Mr;const{centerX:v,centerY:b}=Mr;let S=Math.abs(p)/(be/4);Math.abs(1-S)<1e-7&&(S=1);const C=Math.max(Math.ceil(S),1);p/=C;let I=n[n.length-2],T=n[n.length-1];const F={x:0,y:0};for(let L=0;L<C;L++){const G=gc(x,p),{x:R,y:E}=Ir(G[0],s,o,h,c,v,b,F),{x:Z,y:q}=Ir(G[1],s,o,h,c,v,b,F),{x:ct,y:Bt}=Ir(G[2],s,o,h,c,v,b,F);Zs(n,I,T,R,E,Z,q,ct,Bt),I=ct,T=Bt,x+=p}}function vc(n,t,e){const r=(o,a)=>{const l=a.x-o.x,u=a.y-o.y,c=Math.sqrt(l*l+u*u),h=l/c,d=u/c;return{len:c,nx:h,ny:d}},i=(o,a)=>{o===0?n.moveTo(a.x,a.y):n.lineTo(a.x,a.y)};let s=t[t.length-1];for(let o=0;o<t.length;o++){const a=t[o%t.length],l=a.radius??e;if(l<=0){i(o,a),s=a;continue}const u=t[(o+1)%t.length],c=r(a,s),h=r(a,u);if(c.len<1e-4||h.len<1e-4){i(o,a),s=a;continue}let d=Math.asin(c.nx*h.ny-c.ny*h.nx),f=1,g=!1;c.nx*h.nx-c.ny*-h.ny<0?d<0?d=Math.PI+d:(d=Math.PI-d,f=-1,g=!0):d>0&&(f=-1,g=!0);const x=d/2;let p,v=Math.abs(Math.cos(x)*l/Math.sin(x));v>Math.min(c.len/2,h.len/2)?(v=Math.min(c.len/2,h.len/2),p=Math.abs(v*Math.sin(x)/Math.cos(x))):p=l;const b=a.x+h.nx*v+-h.ny*p*f,S=a.y+h.ny*v+h.nx*p*f,C=Math.atan2(c.ny,c.nx)+Math.PI/2*f,I=Math.atan2(h.ny,h.nx)-Math.PI/2*f;o===0&&n.moveTo(b+Math.cos(C)*p,S+Math.sin(C)*p),n.arc(b,S,p,C,I,g),s=a}}function _c(n,t,e,r){const i=(a,l)=>Math.sqrt((a.x-l.x)**2+(a.y-l.y)**2),s=(a,l,u)=>({x:a.x+(l.x-a.x)*u,y:a.y+(l.y-a.y)*u}),o=t.length;for(let a=0;a<o;a++){const l=t[(a+1)%o],u=l.radius??e;if(u<=0){a===0?n.moveTo(l.x,l.y):n.lineTo(l.x,l.y);continue}const c=t[a],h=t[(a+2)%o],d=i(c,l);let f;if(d<1e-4)f=l;else{const p=Math.min(d/2,u);f=s(l,c,p/d)}const g=i(h,l);let x;if(g<1e-4)x=l;else{const p=Math.min(g/2,u);x=s(l,h,p/g)}a===0?n.moveTo(f.x,f.y):n.lineTo(f.x,f.y),n.quadraticCurveTo(l.x,l.y,x.x,x.y,r)}}const bc=new lt;class Sc{constructor(t){this.shapePrimitives=[],this._currentPoly=null,this._bounds=new Pt,this._graphicsPath2D=t,this.signed=t.checkForHoles}moveTo(t,e){return this.startPoly(t,e),this}lineTo(t,e){this._ensurePoly();const r=this._currentPoly.points,i=r[r.length-2],s=r[r.length-1];return(i!==t||s!==e)&&r.push(t,e),this}arc(t,e,r,i,s,o){this._ensurePoly(!1);const a=this._currentPoly.points;return Qs(a,t,e,r,i,s,o),this}arcTo(t,e,r,i,s){this._ensurePoly();const o=this._currentPoly.points;return mc(o,t,e,r,i,s),this}arcToSvg(t,e,r,i,s,o,a){const l=this._currentPoly.points;return yc(l,this._currentPoly.lastX,this._currentPoly.lastY,o,a,t,e,r,i,s),this}bezierCurveTo(t,e,r,i,s,o,a){this._ensurePoly();const l=this._currentPoly;return Zs(this._currentPoly.points,l.lastX,l.lastY,t,e,r,i,s,o,a),this}quadraticCurveTo(t,e,r,i,s){this._ensurePoly();const o=this._currentPoly;return dc(this._currentPoly.points,o.lastX,o.lastY,t,e,r,i,s),this}closePath(){return this.endPoly(!0),this}addPath(t,e){this.endPoly(),e&&!e.isIdentity()&&(t=t.clone(!0),t.transform(e));const r=this.shapePrimitives,i=r.length;for(let s=0;s<t.instructions.length;s++){const o=t.instructions[s];this[o.action](...o.data)}if(t.checkForHoles&&r.length-i>1){let s=null;for(let o=i;o<r.length;o++){const a=r[o];if(a.shape.type==="polygon"){const l=a.shape,u=s?.shape;u&&u.containsPolygon(l)?(s.holes||(s.holes=[]),s.holes.push(a),r.copyWithin(o,o+1),r.length--,o--):s=a}}}return this}finish(t=!1){this.endPoly(t)}rect(t,e,r,i,s){return this.drawShape(new lt(t,e,r,i),s),this}circle(t,e,r,i){return this.drawShape(new gn(t,e,r),i),this}poly(t,e,r){const i=new _e(t);return i.closePath=e,this.drawShape(i,r),this}regularPoly(t,e,r,i,s=0,o){i=Math.max(i|0,3);const a=-1*Math.PI/2+s,l=Math.PI*2/i,u=[];for(let c=0;c<i;c++){const h=a-c*l;u.push(t+r*Math.cos(h),e+r*Math.sin(h))}return this.poly(u,!0,o),this}roundPoly(t,e,r,i,s,o=0,a){if(i=Math.max(i|0,3),s<=0)return this.regularPoly(t,e,r,i,o);const l=r*Math.sin(Math.PI/i)-.001;s=Math.min(s,l);const u=-1*Math.PI/2+o,c=Math.PI*2/i,h=(i-2)*Math.PI/i/2;for(let d=0;d<i;d++){const f=d*c+u,g=t+r*Math.cos(f),x=e+r*Math.sin(f),p=f+Math.PI+h,v=f-Math.PI-h,b=g+s*Math.cos(p),S=x+s*Math.sin(p),C=g+s*Math.cos(v),I=x+s*Math.sin(v);d===0?this.moveTo(b,S):this.lineTo(b,S),this.quadraticCurveTo(g,x,C,I,a)}return this.closePath()}roundShape(t,e,r=!1,i){return t.length<3?this:(r?_c(this,t,e,i):vc(this,t,e),this.closePath())}filletRect(t,e,r,i,s){if(s===0)return this.rect(t,e,r,i);const o=Math.min(r,i)/2,a=Math.min(o,Math.max(-o,s)),l=t+r,u=e+i,c=a<0?-a:0,h=Math.abs(a);return this.moveTo(t,e+h).arcTo(t+c,e+c,t+h,e,h).lineTo(l-h,e).arcTo(l-c,e+c,l,e+h,h).lineTo(l,u-h).arcTo(l-c,u-c,t+r-h,u,h).lineTo(t+h,u).arcTo(t+c,u-c,t,u-h,h).closePath()}chamferRect(t,e,r,i,s,o){if(s<=0)return this.rect(t,e,r,i);const a=Math.min(s,Math.min(r,i)/2),l=t+r,u=e+i,c=[t+a,e,l-a,e,l,e+a,l,u-a,l-a,u,t+a,u,t,u-a,t,e+a];for(let h=c.length-1;h>=2;h-=2)c[h]===c[h-2]&&c[h-1]===c[h-3]&&c.splice(h-1,2);return this.poly(c,!0,o)}ellipse(t,e,r,i,s){return this.drawShape(new xn(t,e,r,i),s),this}roundRect(t,e,r,i,s,o){return this.drawShape(new yn(t,e,r,i,s),o),this}drawShape(t,e){return this.endPoly(),this.shapePrimitives.push({shape:t,transform:e}),this}startPoly(t,e){let r=this._currentPoly;return r&&this.endPoly(),r=new _e,r.points.push(t,e),this._currentPoly=r,this}endPoly(t=!1){const e=this._currentPoly;return e&&e.points.length>2&&(e.closePath=t,this.shapePrimitives.push({shape:e})),this._currentPoly=null,this}_ensurePoly(t=!0){if(!this._currentPoly&&(this._currentPoly=new _e,t)){const e=this.shapePrimitives[this.shapePrimitives.length-1];if(e){let r=e.shape.x,i=e.shape.y;if(e.transform&&!e.transform.isIdentity()){const s=e.transform,o=r;r=s.a*r+s.c*i+s.tx,i=s.b*o+s.d*i+s.ty}this._currentPoly.points.push(r,i)}else this._currentPoly.points.push(0,0)}}buildPath(){const t=this._graphicsPath2D;this.shapePrimitives.length=0,this._currentPoly=null;for(let e=0;e<t.instructions.length;e++){const r=t.instructions[e];this[r.action](...r.data)}this.finish()}get bounds(){const t=this._bounds;t.clear();const e=this.shapePrimitives;for(let r=0;r<e.length;r++){const i=e[r],s=i.shape.getBounds(bc);i.transform?t.addRect(s,i.transform):t.addRect(s)}return t}}class oe{constructor(t,e=!1){this.instructions=[],this.uid=ut("graphicsPath"),this._dirty=!0,this.checkForHoles=e,typeof t=="string"?Xl(t,this):this.instructions=t?.slice()??[]}get shapePath(){return this._shapePath||(this._shapePath=new Sc(this)),this._dirty&&(this._dirty=!1,this._shapePath.buildPath()),this._shapePath}addPath(t,e){return t=t.clone(),this.instructions.push({action:"addPath",data:[t,e]}),this._dirty=!0,this}arc(...t){return this.instructions.push({action:"arc",data:t}),this._dirty=!0,this}arcTo(...t){return this.instructions.push({action:"arcTo",data:t}),this._dirty=!0,this}arcToSvg(...t){return this.instructions.push({action:"arcToSvg",data:t}),this._dirty=!0,this}bezierCurveTo(...t){return this.instructions.push({action:"bezierCurveTo",data:t}),this._dirty=!0,this}bezierCurveToShort(t,e,r,i,s){const o=this.instructions[this.instructions.length-1],a=this.getLastPoint(pt.shared);let l=0,u=0;if(!o||o.action!=="bezierCurveTo")l=a.x,u=a.y;else{l=o.data[2],u=o.data[3];const c=a.x,h=a.y;l=c+(c-l),u=h+(h-u)}return this.instructions.push({action:"bezierCurveTo",data:[l,u,t,e,r,i,s]}),this._dirty=!0,this}closePath(){return this.instructions.push({action:"closePath",data:[]}),this._dirty=!0,this}ellipse(...t){return this.instructions.push({action:"ellipse",data:t}),this._dirty=!0,this}lineTo(...t){return this.instructions.push({action:"lineTo",data:t}),this._dirty=!0,this}moveTo(...t){return this.instructions.push({action:"moveTo",data:t}),this}quadraticCurveTo(...t){return this.instructions.push({action:"quadraticCurveTo",data:t}),this._dirty=!0,this}quadraticCurveToShort(t,e,r){const i=this.instructions[this.instructions.length-1],s=this.getLastPoint(pt.shared);let o=0,a=0;if(!i||i.action!=="quadraticCurveTo")o=s.x,a=s.y;else{o=i.data[0],a=i.data[1];const l=s.x,u=s.y;o=l+(l-o),a=u+(u-a)}return this.instructions.push({action:"quadraticCurveTo",data:[o,a,t,e,r]}),this._dirty=!0,this}rect(t,e,r,i,s){return this.instructions.push({action:"rect",data:[t,e,r,i,s]}),this._dirty=!0,this}circle(t,e,r,i){return this.instructions.push({action:"circle",data:[t,e,r,i]}),this._dirty=!0,this}roundRect(...t){return this.instructions.push({action:"roundRect",data:t}),this._dirty=!0,this}poly(...t){return this.instructions.push({action:"poly",data:t}),this._dirty=!0,this}regularPoly(...t){return this.instructions.push({action:"regularPoly",data:t}),this._dirty=!0,this}roundPoly(...t){return this.instructions.push({action:"roundPoly",data:t}),this._dirty=!0,this}roundShape(...t){return this.instructions.push({action:"roundShape",data:t}),this._dirty=!0,this}filletRect(...t){return this.instructions.push({action:"filletRect",data:t}),this._dirty=!0,this}chamferRect(...t){return this.instructions.push({action:"chamferRect",data:t}),this._dirty=!0,this}star(t,e,r,i,s,o,a){s||(s=i/2);const l=-1*Math.PI/2+o,u=r*2,c=Math.PI*2/u,h=[];for(let d=0;d<u;d++){const f=d%2?s:i,g=d*c+l;h.push(t+f*Math.cos(g),e+f*Math.sin(g))}return this.poly(h,!0,a),this}clone(t=!1){const e=new oe;if(e.checkForHoles=this.checkForHoles,!t)e.instructions=this.instructions.slice();else for(let r=0;r<this.instructions.length;r++){const i=this.instructions[r];e.instructions.push({action:i.action,data:i.data.slice()})}return e}clear(){return this.instructions.length=0,this._dirty=!0,this}transform(t){if(t.isIdentity())return this;const e=t.a,r=t.b,i=t.c,s=t.d,o=t.tx,a=t.ty;let l=0,u=0,c=0,h=0,d=0,f=0,g=0,x=0;for(let p=0;p<this.instructions.length;p++){const v=this.instructions[p],b=v.data;switch(v.action){case"moveTo":case"lineTo":l=b[0],u=b[1],b[0]=e*l+i*u+o,b[1]=r*l+s*u+a;break;case"bezierCurveTo":c=b[0],h=b[1],d=b[2],f=b[3],l=b[4],u=b[5],b[0]=e*c+i*h+o,b[1]=r*c+s*h+a,b[2]=e*d+i*f+o,b[3]=r*d+s*f+a,b[4]=e*l+i*u+o,b[5]=r*l+s*u+a;break;case"quadraticCurveTo":c=b[0],h=b[1],l=b[2],u=b[3],b[0]=e*c+i*h+o,b[1]=r*c+s*h+a,b[2]=e*l+i*u+o,b[3]=r*l+s*u+a;break;case"arcToSvg":l=b[5],u=b[6],g=b[0],x=b[1],b[0]=e*g+i*x,b[1]=r*g+s*x,b[5]=e*l+i*u+o,b[6]=r*l+s*u+a;break;case"circle":b[4]=de(b[3],t);break;case"rect":b[4]=de(b[4],t);break;case"ellipse":b[8]=de(b[8],t);break;case"roundRect":b[5]=de(b[5],t);break;case"addPath":b[0].transform(t);break;case"poly":b[2]=de(b[2],t);break;default:et("unknown transform action",v.action);break}}return this._dirty=!0,this}get bounds(){return this.shapePath.bounds}getLastPoint(t){let e=this.instructions.length-1,r=this.instructions[e];if(!r)return t.x=0,t.y=0,t;for(;r.action==="closePath";){if(e--,e<0)return t.x=0,t.y=0,t;r=this.instructions[e]}switch(r.action){case"moveTo":case"lineTo":t.x=r.data[0],t.y=r.data[1];break;case"quadraticCurveTo":t.x=r.data[2],t.y=r.data[3];break;case"bezierCurveTo":t.x=r.data[4],t.y=r.data[5];break;case"arc":case"arcToSvg":t.x=r.data[5],t.y=r.data[6];break;case"addPath":r.data[0].getLastPoint(t);break}return t}}function de(n,t){return n?n.prepend(t):t.clone()}function nt(n,t,e){const r=n.getAttribute(t);return r?Number(r):e}function wc(n,t){const e=n.querySelectorAll("defs");for(let r=0;r<e.length;r++){const i=e[r];for(let s=0;s<i.children.length;s++){const o=i.children[s];switch(o.nodeName.toLowerCase()){case"lineargradient":t.defs[o.id]=Ac(o);break;case"radialgradient":t.defs[o.id]=Cc();break}}}}function Ac(n){const t=nt(n,"x1",0),e=nt(n,"y1",0),r=nt(n,"x2",1),i=nt(n,"y2",0),s=n.getAttribute("gradientUnits")||"objectBoundingBox",o=new $t(t,e,r,i,s==="objectBoundingBox"?"local":"global");for(let a=0;a<n.children.length;a++){const l=n.children[a],u=nt(l,"offset",0),c=Q.shared.setValue(l.getAttribute("stop-color")).toNumber();o.addColorStop(u,c)}return o}function Cc(n){return et("[SVG Parser] Radial gradients are not yet supported"),new $t(0,0,1,0)}function vi(n){const t=n.match(/url\s*\(\s*['"]?\s*#([^'"\s)]+)\s*['"]?\s*\)/i);return t?t[1]:""}const _i={fill:{type:"paint",default:0},"fill-opacity":{type:"number",default:1},stroke:{type:"paint",default:0},"stroke-width":{type:"number",default:1},"stroke-opacity":{type:"number",default:1},"stroke-linecap":{type:"string",default:"butt"},"stroke-linejoin":{type:"string",default:"miter"},"stroke-miterlimit":{type:"number",default:10},"stroke-dasharray":{type:"string",default:"none"},"stroke-dashoffset":{type:"number",default:0},opacity:{type:"number",default:1}};function Js(n,t){const e=n.getAttribute("style"),r={},i={},s={strokeStyle:r,fillStyle:i,useFill:!1,useStroke:!1};for(const o in _i){const a=n.getAttribute(o);a&&bi(t,s,o,a.trim())}if(e){const o=e.split(";");for(let a=0;a<o.length;a++){const l=o[a].trim(),[u,c]=l.split(":");_i[u]&&bi(t,s,u,c.trim())}}return{strokeStyle:s.useStroke?r:null,fillStyle:s.useFill?i:null,useFill:s.useFill,useStroke:s.useStroke}}function bi(n,t,e,r){switch(e){case"stroke":if(r!=="none"){if(r.startsWith("url(")){const i=vi(r);t.strokeStyle.fill=n.defs[i]}else t.strokeStyle.color=Q.shared.setValue(r).toNumber();t.useStroke=!0}break;case"stroke-width":t.strokeStyle.width=Number(r);break;case"fill":if(r!=="none"){if(r.startsWith("url(")){const i=vi(r);t.fillStyle.fill=n.defs[i]}else t.fillStyle.color=Q.shared.setValue(r).toNumber();t.useFill=!0}break;case"fill-opacity":t.fillStyle.alpha=Number(r);break;case"stroke-opacity":t.strokeStyle.alpha=Number(r);break;case"opacity":t.fillStyle.alpha=Number(r),t.strokeStyle.alpha=Number(r);break}}function Tc(n,t){if(typeof n=="string"){const o=document.createElement("div");o.innerHTML=n.trim(),n=o.querySelector("svg")}const e={context:t,defs:{},path:new oe};wc(n,e);const r=n.children,{fillStyle:i,strokeStyle:s}=Js(n,e);for(let o=0;o<r.length;o++){const a=r[o];a.nodeName.toLowerCase()!=="defs"&&to(a,e,i,s)}return t}function to(n,t,e,r){const i=n.children,{fillStyle:s,strokeStyle:o}=Js(n,t);s&&e?e={...e,...s}:s&&(e=s),o&&r?r={...r,...o}:o&&(r=o);const a=!e&&!r;a&&(e={color:0});let l,u,c,h,d,f,g,x,p,v,b,S,C,I,T,F,L;switch(n.nodeName.toLowerCase()){case"path":I=n.getAttribute("d"),n.getAttribute("fill-rule")==="evenodd"&&et("SVG Evenodd fill rule not supported, your svg may render incorrectly"),T=new oe(I,!0),t.context.path(T),e&&t.context.fill(e),r&&t.context.stroke(r);break;case"circle":g=nt(n,"cx",0),x=nt(n,"cy",0),p=nt(n,"r",0),t.context.ellipse(g,x,p,p),e&&t.context.fill(e),r&&t.context.stroke(r);break;case"rect":l=nt(n,"x",0),u=nt(n,"y",0),F=nt(n,"width",0),L=nt(n,"height",0),v=nt(n,"rx",0),b=nt(n,"ry",0),v||b?t.context.roundRect(l,u,F,L,v||b):t.context.rect(l,u,F,L),e&&t.context.fill(e),r&&t.context.stroke(r);break;case"ellipse":g=nt(n,"cx",0),x=nt(n,"cy",0),v=nt(n,"rx",0),b=nt(n,"ry",0),t.context.beginPath(),t.context.ellipse(g,x,v,b),e&&t.context.fill(e),r&&t.context.stroke(r);break;case"line":c=nt(n,"x1",0),h=nt(n,"y1",0),d=nt(n,"x2",0),f=nt(n,"y2",0),t.context.beginPath(),t.context.moveTo(c,h),t.context.lineTo(d,f),r&&t.context.stroke(r);break;case"polygon":C=n.getAttribute("points"),S=C.match(/\d+/g).map(G=>parseInt(G,10)),t.context.poly(S,!0),e&&t.context.fill(e),r&&t.context.stroke(r);break;case"polyline":C=n.getAttribute("points"),S=C.match(/\d+/g).map(G=>parseInt(G,10)),t.context.poly(S,!1),r&&t.context.stroke(r);break;case"g":case"svg":break;default:{et(`[SVG parser] <${n.nodeName}> elements unsupported`);break}}a&&(e=null);for(let G=0;G<i.length;G++)to(i[G],t,e,r)}function Pc(n){return Q.isColorLike(n)}function Si(n){return n instanceof Qe}function wi(n){return n instanceof $t}function Fc(n){return n instanceof N}function Mc(n,t,e){const r=Q.shared.setValue(t??0);return n.color=r.toNumber(),n.alpha=r.alpha===1?e.alpha:r.alpha,n.texture=N.WHITE,{...e,...n}}function Ic(n,t,e){return n.texture=t,{...e,...n}}function Ai(n,t,e){return n.fill=t,n.color=16777215,n.texture=t.texture,n.matrix=t.transform,{...e,...n}}function Ci(n,t,e){return t.buildGradient(),n.fill=t,n.color=16777215,n.texture=t.texture,n.matrix=t.transform,n.textureSpace=t.textureSpace,{...e,...n}}function zc(n,t){const e={...t,...n},r=Q.shared.setValue(e.color);return e.alpha*=r.alpha,e.color=r.toNumber(),e}function Qt(n,t){if(n==null)return null;const e={},r=n;return Pc(n)?Mc(e,n,t):Fc(n)?Ic(e,n,t):Si(n)?Ai(e,n,t):wi(n)?Ci(e,n,t):r.fill&&Si(r.fill)?Ai(r,r.fill,t):r.fill&&wi(r.fill)?Ci(r,r.fill,t):zc(r,t)}function je(n,t){const{width:e,alignment:r,miterLimit:i,cap:s,join:o,pixelLine:a,...l}=t,u=Qt(n,l);return u?{width:e,alignment:r,miterLimit:i,cap:s,join:o,pixelLine:a,...u}:null}const Rc=new pt,Ti=new V,_n=class Et extends Ft{constructor(){super(...arguments),this.uid=ut("graphicsContext"),this.dirty=!0,this.batchMode="auto",this.instructions=[],this._activePath=new oe,this._transform=new V,this._fillStyle={...Et.defaultFillStyle},this._strokeStyle={...Et.defaultStrokeStyle},this._stateStack=[],this._tick=0,this._bounds=new Pt,this._boundsDirty=!0}clone(){const t=new Et;return t.batchMode=this.batchMode,t.instructions=this.instructions.slice(),t._activePath=this._activePath.clone(),t._transform=this._transform.clone(),t._fillStyle={...this._fillStyle},t._strokeStyle={...this._strokeStyle},t._stateStack=this._stateStack.slice(),t._bounds=this._bounds.clone(),t._boundsDirty=!0,t}get fillStyle(){return this._fillStyle}set fillStyle(t){this._fillStyle=Qt(t,Et.defaultFillStyle)}get strokeStyle(){return this._strokeStyle}set strokeStyle(t){this._strokeStyle=je(t,Et.defaultStrokeStyle)}setFillStyle(t){return this._fillStyle=Qt(t,Et.defaultFillStyle),this}setStrokeStyle(t){return this._strokeStyle=Qt(t,Et.defaultStrokeStyle),this}texture(t,e,r,i,s,o){return this.instructions.push({action:"texture",data:{image:t,dx:r||0,dy:i||0,dw:s||t.frame.width,dh:o||t.frame.height,transform:this._transform.clone(),alpha:this._fillStyle.alpha,style:e?Q.shared.setValue(e).toNumber():16777215}}),this.onUpdate(),this}beginPath(){return this._activePath=new oe,this}fill(t,e){let r;const i=this.instructions[this.instructions.length-1];return this._tick===0&&i&&i.action==="stroke"?r=i.data.path:r=this._activePath.clone(),r?(t!=null&&(e!==void 0&&typeof t=="number"&&(D(at,"GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"),t={color:t,alpha:e}),this._fillStyle=Qt(t,Et.defaultFillStyle)),this.instructions.push({action:"fill",data:{style:this.fillStyle,path:r}}),this.onUpdate(),this._initNextPathLocation(),this._tick=0,this):this}_initNextPathLocation(){const{x:t,y:e}=this._activePath.getLastPoint(pt.shared);this._activePath.clear(),this._activePath.moveTo(t,e)}stroke(t){let e;const r=this.instructions[this.instructions.length-1];return this._tick===0&&r&&r.action==="fill"?e=r.data.path:e=this._activePath.clone(),e?(t!=null&&(this._strokeStyle=je(t,Et.defaultStrokeStyle)),this.instructions.push({action:"stroke",data:{style:this.strokeStyle,path:e}}),this.onUpdate(),this._initNextPathLocation(),this._tick=0,this):this}cut(){for(let t=0;t<2;t++){const e=this.instructions[this.instructions.length-1-t],r=this._activePath.clone();if(e&&(e.action==="stroke"||e.action==="fill"))if(e.data.hole)e.data.hole.addPath(r);else{e.data.hole=r;break}}return this._initNextPathLocation(),this}arc(t,e,r,i,s,o){this._tick++;const a=this._transform;return this._activePath.arc(a.a*t+a.c*e+a.tx,a.b*t+a.d*e+a.ty,r,i,s,o),this}arcTo(t,e,r,i,s){this._tick++;const o=this._transform;return this._activePath.arcTo(o.a*t+o.c*e+o.tx,o.b*t+o.d*e+o.ty,o.a*r+o.c*i+o.tx,o.b*r+o.d*i+o.ty,s),this}arcToSvg(t,e,r,i,s,o,a){this._tick++;const l=this._transform;return this._activePath.arcToSvg(t,e,r,i,s,l.a*o+l.c*a+l.tx,l.b*o+l.d*a+l.ty),this}bezierCurveTo(t,e,r,i,s,o,a){this._tick++;const l=this._transform;return this._activePath.bezierCurveTo(l.a*t+l.c*e+l.tx,l.b*t+l.d*e+l.ty,l.a*r+l.c*i+l.tx,l.b*r+l.d*i+l.ty,l.a*s+l.c*o+l.tx,l.b*s+l.d*o+l.ty,a),this}closePath(){return this._tick++,this._activePath?.closePath(),this}ellipse(t,e,r,i){return this._tick++,this._activePath.ellipse(t,e,r,i,this._transform.clone()),this}circle(t,e,r){return this._tick++,this._activePath.circle(t,e,r,this._transform.clone()),this}path(t){return this._tick++,this._activePath.addPath(t,this._transform.clone()),this}lineTo(t,e){this._tick++;const r=this._transform;return this._activePath.lineTo(r.a*t+r.c*e+r.tx,r.b*t+r.d*e+r.ty),this}moveTo(t,e){this._tick++;const r=this._transform,i=this._activePath.instructions,s=r.a*t+r.c*e+r.tx,o=r.b*t+r.d*e+r.ty;return i.length===1&&i[0].action==="moveTo"?(i[0].data[0]=s,i[0].data[1]=o,this):(this._activePath.moveTo(s,o),this)}quadraticCurveTo(t,e,r,i,s){this._tick++;const o=this._transform;return this._activePath.quadraticCurveTo(o.a*t+o.c*e+o.tx,o.b*t+o.d*e+o.ty,o.a*r+o.c*i+o.tx,o.b*r+o.d*i+o.ty,s),this}rect(t,e,r,i){return this._tick++,this._activePath.rect(t,e,r,i,this._transform.clone()),this}roundRect(t,e,r,i,s){return this._tick++,this._activePath.roundRect(t,e,r,i,s,this._transform.clone()),this}poly(t,e){return this._tick++,this._activePath.poly(t,e,this._transform.clone()),this}regularPoly(t,e,r,i,s=0,o){return this._tick++,this._activePath.regularPoly(t,e,r,i,s,o),this}roundPoly(t,e,r,i,s,o){return this._tick++,this._activePath.roundPoly(t,e,r,i,s,o),this}roundShape(t,e,r,i){return this._tick++,this._activePath.roundShape(t,e,r,i),this}filletRect(t,e,r,i,s){return this._tick++,this._activePath.filletRect(t,e,r,i,s),this}chamferRect(t,e,r,i,s,o){return this._tick++,this._activePath.chamferRect(t,e,r,i,s,o),this}star(t,e,r,i,s=0,o=0){return this._tick++,this._activePath.star(t,e,r,i,s,o,this._transform.clone()),this}svg(t){return this._tick++,Tc(t,this),this}restore(){const t=this._stateStack.pop();return t&&(this._transform=t.transform,this._fillStyle=t.fillStyle,this._strokeStyle=t.strokeStyle),this}save(){return this._stateStack.push({transform:this._transform.clone(),fillStyle:{...this._fillStyle},strokeStyle:{...this._strokeStyle}}),this}getTransform(){return this._transform}resetTransform(){return this._transform.identity(),this}rotate(t){return this._transform.rotate(t),this}scale(t,e=t){return this._transform.scale(t,e),this}setTransform(t,e,r,i,s,o){return t instanceof V?(this._transform.set(t.a,t.b,t.c,t.d,t.tx,t.ty),this):(this._transform.set(t,e,r,i,s,o),this)}transform(t,e,r,i,s,o){return t instanceof V?(this._transform.append(t),this):(Ti.set(t,e,r,i,s,o),this._transform.append(Ti),this)}translate(t,e=t){return this._transform.translate(t,e),this}clear(){return this._activePath.clear(),this.instructions.length=0,this.resetTransform(),this.onUpdate(),this}onUpdate(){this.dirty||(this.emit("update",this,16),this.dirty=!0,this._boundsDirty=!0)}get bounds(){if(!this._boundsDirty)return this._bounds;const t=this._bounds;t.clear();for(let e=0;e<this.instructions.length;e++){const r=this.instructions[e],i=r.action;if(i==="fill"){const s=r.data;t.addBounds(s.path.bounds)}else if(i==="texture"){const s=r.data;t.addFrame(s.dx,s.dy,s.dx+s.dw,s.dy+s.dh,s.transform)}if(i==="stroke"){const s=r.data,o=s.style.alignment,a=s.style.width*(1-o),l=s.path.bounds;t.addFrame(l.minX-a,l.minY-a,l.maxX+a,l.maxY+a)}}return t}containsPoint(t){if(!this.bounds.containsPoint(t.x,t.y))return!1;const e=this.instructions;let r=!1;for(let i=0;i<e.length;i++){const s=e[i],o=s.data,a=o.path;if(!s.action||!a)continue;const l=o.style,u=a.shapePath.shapePrimitives;for(let c=0;c<u.length;c++){const h=u[c].shape;if(!l||!h)continue;const d=u[c].transform,f=d?d.applyInverse(t,Rc):t;if(s.action==="fill")r=h.contains(f.x,f.y);else{const x=l;r=h.strokeContains(f.x,f.y,x.width,x.alignment)}const g=o.hole;if(g){const x=g.shapePath?.shapePrimitives;if(x)for(let p=0;p<x.length;p++)x[p].shape.contains(f.x,f.y)&&(r=!1)}if(r)return!0}}return r}destroy(t=!1){if(this._stateStack.length=0,this._transform=null,this.emit("destroy",this),this.removeAllListeners(),typeof t=="boolean"?t:t?.texture){const r=typeof t=="boolean"?t:t?.textureSource;this._fillStyle.texture&&this._fillStyle.texture.destroy(r),this._strokeStyle.texture&&this._strokeStyle.texture.destroy(r)}this._fillStyle=null,this._strokeStyle=null,this.instructions=null,this._activePath=null,this._bounds=null,this._stateStack=null,this.customShader=null,this._transform=null}};_n.defaultFillStyle={color:16777215,alpha:1,texture:N.WHITE,matrix:null,fill:null,textureSpace:"local"};_n.defaultStrokeStyle={width:1,color:16777215,alpha:1,alignment:.5,miterLimit:10,cap:"butt",join:"miter",texture:N.WHITE,matrix:null,fill:null,textureSpace:"local",pixelLine:!1};let Kt=_n;const Pi=["align","breakWords","cssOverrides","fontVariant","fontWeight","leading","letterSpacing","lineHeight","padding","textBaseline","trim","whiteSpace","wordWrap","wordWrapWidth","fontFamily","fontStyle","fontSize"];function Ec(n){const t=[];let e=0;for(let r=0;r<Pi.length;r++){const i=`_${Pi[r]}`;t[e++]=n[i]}return e=eo(n._fill,t,e),e=kc(n._stroke,t,e),e=Bc(n.dropShadow,t,e),t.join("-")}function eo(n,t,e){return n&&(t[e++]=n.color,t[e++]=n.alpha,t[e++]=n.fill?.styleKey),e}function kc(n,t,e){return n&&(e=eo(n,t,e),t[e++]=n.width,t[e++]=n.alignment,t[e++]=n.cap,t[e++]=n.join,t[e++]=n.miterLimit),e}function Bc(n,t,e){return n&&(t[e++]=n.alpha,t[e++]=n.angle,t[e++]=n.blur,t[e++]=n.distance,t[e++]=Q.shared.setValue(n.color).toNumber()),e}const bn=class ee extends Ft{constructor(t={}){super(),Oc(t);const e={...ee.defaultTextStyle,...t};for(const r in e){const i=r;this[i]=e[r]}this.update()}get align(){return this._align}set align(t){this._align=t,this.update()}get breakWords(){return this._breakWords}set breakWords(t){this._breakWords=t,this.update()}get dropShadow(){return this._dropShadow}set dropShadow(t){t!==null&&typeof t=="object"?this._dropShadow=this._createProxy({...ee.defaultDropShadow,...t}):this._dropShadow=t?this._createProxy({...ee.defaultDropShadow}):null,this.update()}get fontFamily(){return this._fontFamily}set fontFamily(t){this._fontFamily=t,this.update()}get fontSize(){return this._fontSize}set fontSize(t){typeof t=="string"?this._fontSize=parseInt(t,10):this._fontSize=t,this.update()}get fontStyle(){return this._fontStyle}set fontStyle(t){this._fontStyle=t.toLowerCase(),this.update()}get fontVariant(){return this._fontVariant}set fontVariant(t){this._fontVariant=t,this.update()}get fontWeight(){return this._fontWeight}set fontWeight(t){this._fontWeight=t,this.update()}get leading(){return this._leading}set leading(t){this._leading=t,this.update()}get letterSpacing(){return this._letterSpacing}set letterSpacing(t){this._letterSpacing=t,this.update()}get lineHeight(){return this._lineHeight}set lineHeight(t){this._lineHeight=t,this.update()}get padding(){return this._padding}set padding(t){this._padding=t,this.update()}get trim(){return this._trim}set trim(t){this._trim=t,this.update()}get textBaseline(){return this._textBaseline}set textBaseline(t){this._textBaseline=t,this.update()}get whiteSpace(){return this._whiteSpace}set whiteSpace(t){this._whiteSpace=t,this.update()}get wordWrap(){return this._wordWrap}set wordWrap(t){this._wordWrap=t,this.update()}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(t){this._wordWrapWidth=t,this.update()}get fill(){return this._originalFill}set fill(t){t!==this._originalFill&&(this._originalFill=t,this._isFillStyle(t)&&(this._originalFill=this._createProxy({...Kt.defaultFillStyle,...t},()=>{this._fill=Qt({...this._originalFill},Kt.defaultFillStyle)})),this._fill=Qt(t===0?"black":t,Kt.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(t){t!==this._originalStroke&&(this._originalStroke=t,this._isFillStyle(t)&&(this._originalStroke=this._createProxy({...Kt.defaultStrokeStyle,...t},()=>{this._stroke=je({...this._originalStroke},Kt.defaultStrokeStyle)})),this._stroke=je(t,Kt.defaultStrokeStyle),this.update())}_generateKey(){return this._styleKey=Ec(this),this._styleKey}update(){this._styleKey=null,this.emit("update",this)}reset(){const t=ee.defaultTextStyle;for(const e in t)this[e]=t[e]}get styleKey(){return this._styleKey||this._generateKey()}clone(){return new ee({align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,textBaseline:this.textBaseline,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth})}destroy(t=!1){if(this.removeAllListeners(),typeof t=="boolean"?t:t?.texture){const r=typeof t=="boolean"?t:t?.textureSource;this._fill?.texture&&this._fill.texture.destroy(r),this._originalFill?.texture&&this._originalFill.texture.destroy(r),this._stroke?.texture&&this._stroke.texture.destroy(r),this._originalStroke?.texture&&this._originalStroke.texture.destroy(r)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(t,e){return new Proxy(t,{set:(r,i,s)=>(r[i]=s,e?.(i,s),this.update(),!0)})}_isFillStyle(t){return(t??null)!==null&&!(Q.isColorLike(t)||t instanceof $t||t instanceof Qe)}};bn.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5};bn.defaultTextStyle={align:"left",breakWords:!1,dropShadow:null,fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};let Te=bn;function Oc(n){const t=n;if(typeof t.dropShadow=="boolean"&&t.dropShadow){const e=Te.defaultDropShadow;n.dropShadow={alpha:t.dropShadowAlpha??e.alpha,angle:t.dropShadowAngle??e.angle,blur:t.dropShadowBlur??e.blur,color:t.dropShadowColor??e.color,distance:t.dropShadowDistance??e.distance}}if(t.strokeThickness!==void 0){D(at,"strokeThickness is now a part of stroke");const e=t.stroke;let r={};if(Q.isColorLike(e))r.color=e;else if(e instanceof $t||e instanceof Qe)r.fill=e;else if(Object.hasOwnProperty.call(e,"color")||Object.hasOwnProperty.call(e,"fill"))r=e;else throw new Error("Invalid stroke value.");n.stroke={...r,width:t.strokeThickness}}if(Array.isArray(t.fillGradientStops)){D(at,"gradient fill is now a fill pattern: `new FillGradient(...)`");let e;n.fontSize==null?n.fontSize=Te.defaultTextStyle.fontSize:typeof n.fontSize=="string"?e=parseInt(n.fontSize,10):e=n.fontSize;const r=new $t({start:{x:0,y:0},end:{x:0,y:(e||0)*1.7}}),i=t.fillGradientStops.map(s=>Q.shared.setValue(s).toNumber());i.forEach((s,o)=>{const a=o/(i.length-1);r.addColorStop(a,s)}),n.fill={fill:r}}}class Gc{constructor(t){this._canvasPool=Object.create(null),this.canvasOptions=t||{},this.enableFullScreen=!1}_createCanvasAndContext(t,e){const r=rt.get().createCanvas();r.width=t,r.height=e;const i=r.getContext("2d");return{canvas:r,context:i}}getOptimalCanvasAndContext(t,e,r=1){t=Math.ceil(t*r-1e-6),e=Math.ceil(e*r-1e-6),t=Ye(t),e=Ye(e);const i=(t<<17)+(e<<1);this._canvasPool[i]||(this._canvasPool[i]=[]);let s=this._canvasPool[i].pop();return s||(s=this._createCanvasAndContext(t,e)),s}returnCanvasAndContext(t){const e=t.canvas,{width:r,height:i}=e,s=(r<<17)+(i<<1);t.context.clearRect(0,0,r,i),this._canvasPool[s].push(t)}clear(){this._canvasPool={}}}const Fi=new Gc,Uc=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function tn(n){const t=typeof n.fontSize=="number"?`${n.fontSize}px`:n.fontSize;let e=n.fontFamily;Array.isArray(n.fontFamily)||(e=n.fontFamily.split(","));for(let r=e.length-1;r>=0;r--){let i=e[r].trim();!/([\"\'])[^\'\"]+\1/.test(i)&&!Uc.includes(i)&&(i=`"${i}"`),e[r]=i}return`${n.fontStyle} ${n.fontVariant} ${n.fontWeight} ${t} ${e.join(",")}`}const zr={willReadFrequently:!0},Mt=class k{static get experimentalLetterSpacingSupported(){let t=k._experimentalLetterSpacingSupported;if(t!==void 0){const e=rt.get().getCanvasRenderingContext2D().prototype;t=k._experimentalLetterSpacingSupported="letterSpacing"in e||"textLetterSpacing"in e}return t}constructor(t,e,r,i,s,o,a,l,u){this.text=t,this.style=e,this.width=r,this.height=i,this.lines=s,this.lineWidths=o,this.lineHeight=a,this.maxLineWidth=l,this.fontProperties=u}static measureText(t=" ",e,r=k._canvas,i=e.wordWrap){const s=`${t}:${e.styleKey}`;if(k._measurementCache[s])return k._measurementCache[s];const o=tn(e),a=k.measureFont(o);a.fontSize===0&&(a.fontSize=e.fontSize,a.ascent=e.fontSize);const l=k.__context;l.font=o;const c=(i?k._wordWrap(t,e,r):t).split(/(?:\r\n|\r|\n)/),h=new Array(c.length);let d=0;for(let b=0;b<c.length;b++){const S=k._measureText(c[b],e.letterSpacing,l);h[b]=S,d=Math.max(d,S)}const f=e._stroke?.width||0;let g=d+f;e.dropShadow&&(g+=e.dropShadow.distance);const x=e.lineHeight||a.fontSize;let p=Math.max(x,a.fontSize+f)+(c.length-1)*(x+e.leading);return e.dropShadow&&(p+=e.dropShadow.distance),new k(t,e,g,p,c,h,x+e.leading,d,a)}static _measureText(t,e,r){let i=!1;k.experimentalLetterSpacingSupported&&(k.experimentalLetterSpacing?(r.letterSpacing=`${e}px`,r.textLetterSpacing=`${e}px`,i=!0):(r.letterSpacing="0px",r.textLetterSpacing="0px"));const s=r.measureText(t);let o=s.width;const a=-s.actualBoundingBoxLeft;let u=s.actualBoundingBoxRight-a;if(o>0)if(i)o-=e,u-=e;else{const c=(k.graphemeSegmenter(t).length-1)*e;o+=c,u+=c}return Math.max(o,u)}static _wordWrap(t,e,r=k._canvas){const i=r.getContext("2d",zr);let s=0,o="",a="";const l=Object.create(null),{letterSpacing:u,whiteSpace:c}=e,h=k._collapseSpaces(c),d=k._collapseNewlines(c);let f=!h;const g=e.wordWrapWidth+u,x=k._tokenize(t);for(let p=0;p<x.length;p++){let v=x[p];if(k._isNewline(v)){if(!d){a+=k._addLine(o),f=!h,o="",s=0;continue}v=" "}if(h){const S=k.isBreakingSpace(v),C=k.isBreakingSpace(o[o.length-1]);if(S&&C)continue}const b=k._getFromCache(v,u,l,i);if(b>g)if(o!==""&&(a+=k._addLine(o),o="",s=0),k.canBreakWords(v,e.breakWords)){const S=k.wordWrapSplit(v);for(let C=0;C<S.length;C++){let I=S[C],T=I,F=1;for(;S[C+F];){const G=S[C+F];if(!k.canBreakChars(T,G,v,C,e.breakWords))I+=G;else break;T=G,F++}C+=F-1;const L=k._getFromCache(I,u,l,i);L+s>g&&(a+=k._addLine(o),f=!1,o="",s=0),o+=I,s+=L}}else{o.length>0&&(a+=k._addLine(o),o="",s=0);const S=p===x.length-1;a+=k._addLine(v,!S),f=!1,o="",s=0}else b+s>g&&(f=!1,a+=k._addLine(o),o="",s=0),(o.length>0||!k.isBreakingSpace(v)||f)&&(o+=v,s+=b)}return a+=k._addLine(o,!1),a}static _addLine(t,e=!0){return t=k._trimRight(t),t=e?`${t}
`:t,t}static _getFromCache(t,e,r,i){let s=r[t];return typeof s!="number"&&(s=k._measureText(t,e,i)+e,r[t]=s),s}static _collapseSpaces(t){return t==="normal"||t==="pre-line"}static _collapseNewlines(t){return t==="normal"}static _trimRight(t){if(typeof t!="string")return"";for(let e=t.length-1;e>=0;e--){const r=t[e];if(!k.isBreakingSpace(r))break;t=t.slice(0,-1)}return t}static _isNewline(t){return typeof t!="string"?!1:k._newlines.includes(t.charCodeAt(0))}static isBreakingSpace(t,e){return typeof t!="string"?!1:k._breakingSpaces.includes(t.charCodeAt(0))}static _tokenize(t){const e=[];let r="";if(typeof t!="string")return e;for(let i=0;i<t.length;i++){const s=t[i],o=t[i+1];if(k.isBreakingSpace(s,o)||k._isNewline(s)){r!==""&&(e.push(r),r=""),e.push(s);continue}r+=s}return r!==""&&e.push(r),e}static canBreakWords(t,e){return e}static canBreakChars(t,e,r,i,s){return!0}static wordWrapSplit(t){return k.graphemeSegmenter(t)}static measureFont(t){if(k._fonts[t])return k._fonts[t];const e=k._context;e.font=t;const r=e.measureText(k.METRICS_STRING+k.BASELINE_SYMBOL),i={ascent:r.actualBoundingBoxAscent,descent:r.actualBoundingBoxDescent,fontSize:r.actualBoundingBoxAscent+r.actualBoundingBoxDescent};return k._fonts[t]=i,i}static clearMetrics(t=""){t?delete k._fonts[t]:k._fonts={}}static get _canvas(){if(!k.__canvas){let t;try{const e=new OffscreenCanvas(0,0);if(e.getContext("2d",zr)?.measureText)return k.__canvas=e,e;t=rt.get().createCanvas()}catch{t=rt.get().createCanvas()}t.width=t.height=10,k.__canvas=t}return k.__canvas}static get _context(){return k.__context||(k.__context=k._canvas.getContext("2d",zr)),k.__context}};Mt.METRICS_STRING="|ÉqÅ";Mt.BASELINE_SYMBOL="M";Mt.BASELINE_MULTIPLIER=1.4;Mt.HEIGHT_MULTIPLIER=2;Mt.graphemeSegmenter=(()=>{if(typeof Intl?.Segmenter=="function"){const n=new Intl.Segmenter;return t=>[...n.segment(t)].map(e=>e.segment)}return n=>[...n]})();Mt.experimentalLetterSpacing=!1;Mt._fonts={};Mt._newlines=[10,13];Mt._breakingSpaces=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288];Mt._measurementCache={};let Mi=Mt;const Ii=1e5;function zi(n,t,e,r=0){if(n.texture===N.WHITE&&!n.fill)return Q.shared.setValue(n.color).setAlpha(n.alpha??1).toHexa();if(n.fill){if(n.fill instanceof Qe){const i=n.fill,s=t.createPattern(i.texture.source.resource,"repeat"),o=i.transform.copyTo(V.shared);return o.scale(i.texture.frame.width,i.texture.frame.height),s.setTransform(o),s}else if(n.fill instanceof $t){const i=n.fill,s=i.type==="linear",o=i.textureSpace==="local";let a=1,l=1;o&&e&&(a=e.width+r,l=e.height+r);let u,c=!1;if(s){const{start:h,end:d}=i;u=t.createLinearGradient(h.x*a,h.y*l,d.x*a,d.y*l),c=Math.abs(d.x-h.x)<Math.abs((d.y-h.y)*.1)}else{const{center:h,innerRadius:d,outerCenter:f,outerRadius:g}=i;u=t.createRadialGradient(h.x*a,h.y*l,d*a,f.x*a,f.y*l,g*a)}if(c&&o&&e){const h=e.lineHeight/l;for(let d=0;d<e.lines.length;d++){const f=(d*e.lineHeight+r/2)/l;i.colorStops.forEach(g=>{const x=f+g.offset*h;u.addColorStop(Math.floor(x*Ii)/Ii,Q.shared.setValue(g.color).toHex())})}}else i.colorStops.forEach(h=>{u.addColorStop(h.offset,Q.shared.setValue(h.color).toHex())});return u}}else{const i=t.createPattern(n.texture.source.resource,"repeat"),s=n.matrix.copyTo(V.shared);return s.scale(n.texture.frame.width,n.texture.frame.height),i.setTransform(s),i}return et("FillStyle not recognised",n),"red"}function ro(n){if(n==="")return[];typeof n=="string"&&(n=[n]);const t=[];for(let e=0,r=n.length;e<r;e++){const i=n[e];if(Array.isArray(i)){if(i.length!==2)throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`);if(i[0].length===0||i[1].length===0)throw new Error("[BitmapFont]: Invalid character delimiter.");const s=i[0].charCodeAt(0),o=i[1].charCodeAt(0);if(o<s)throw new Error("[BitmapFont]: Invalid character range.");for(let a=s,l=o;a<=l;a++)t.push(String.fromCharCode(a))}else t.push(...Array.from(i))}if(t.length===0)throw new Error("[BitmapFont]: Empty set when resolving characters.");return t}const no=class io extends Os{constructor(t){super(),this.resolution=1,this.pages=[],this._padding=0,this._measureCache=Object.create(null),this._currentChars=[],this._currentX=0,this._currentY=0,this._currentPageIndex=-1,this._skipKerning=!1;const e={...io.defaultOptions,...t};this._textureSize=e.textureSize,this._mipmap=e.mipmap;const r=e.style.clone();e.overrideFill&&(r._fill.color=16777215,r._fill.alpha=1,r._fill.texture=N.WHITE,r._fill.fill=null),this.applyFillAsTint=e.overrideFill;const i=r.fontSize;r.fontSize=this.baseMeasurementFontSize;const s=tn(r);e.overrideSize?r._stroke&&(r._stroke.width*=this.baseRenderedFontSize/i):r.fontSize=this.baseRenderedFontSize=i,this._style=r,this._skipKerning=e.skipKerning??!1,this.resolution=e.resolution??1,this._padding=e.padding??4,this.fontMetrics=Mi.measureFont(s),this.lineHeight=r.lineHeight||this.fontMetrics.fontSize||r.fontSize}ensureCharacters(t){const e=ro(t).filter(p=>!this._currentChars.includes(p)).filter((p,v,b)=>b.indexOf(p)===v);if(!e.length)return;this._currentChars=[...this._currentChars,...e];let r;this._currentPageIndex===-1?r=this._nextPage():r=this.pages[this._currentPageIndex];let{canvas:i,context:s}=r.canvasAndContext,o=r.texture.source;const a=this._style;let l=this._currentX,u=this._currentY;const c=this.baseRenderedFontSize/this.baseMeasurementFontSize,h=this._padding*c;let d=0,f=!1;const g=i.width/this.resolution,x=i.height/this.resolution;for(let p=0;p<e.length;p++){const v=e[p],b=Mi.measureText(v,a,i,!1);b.lineHeight=b.height;const S=b.width*c,C=Math.ceil((a.fontStyle==="italic"?2:1)*S),I=b.height*c,T=C+h*2,F=I+h*2;if(f=!1,v!==`
`&&v!=="\r"&&v!=="	"&&v!==" "&&(f=!0,d=Math.ceil(Math.max(F,d))),l+T>g&&(u+=d,d=F,l=0,u+d>x)){o.update();const G=this._nextPage();i=G.canvasAndContext.canvas,s=G.canvasAndContext.context,o=G.texture.source,u=0}const L=S/c-(a.dropShadow?.distance??0)-(a._stroke?.width??0);if(this.chars[v]={id:v.codePointAt(0),xOffset:-this._padding,yOffset:-this._padding,xAdvance:L,kerning:{}},f){this._drawGlyph(s,b,l+h,u+h,c,a);const G=o.width*c,R=o.height*c,E=new lt(l/G*o.width,u/R*o.height,T/G*o.width,F/R*o.height);this.chars[v].texture=new N({source:o,frame:E}),l+=Math.ceil(T)}}o.update(),this._currentX=l,this._currentY=u,this._skipKerning&&this._applyKerning(e,s)}get pageTextures(){return D(at,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}_applyKerning(t,e){const r=this._measureCache;for(let i=0;i<t.length;i++){const s=t[i];for(let o=0;o<this._currentChars.length;o++){const a=this._currentChars[o];let l=r[s];l||(l=r[s]=e.measureText(s).width);let u=r[a];u||(u=r[a]=e.measureText(a).width);let c=e.measureText(s+a).width,h=c-(l+u);h&&(this.chars[s].kerning[a]=h),c=e.measureText(s+a).width,h=c-(l+u),h&&(this.chars[a].kerning[s]=h)}}}_nextPage(){this._currentPageIndex++;const t=this.resolution,e=Fi.getOptimalCanvasAndContext(this._textureSize,this._textureSize,t);this._setupContext(e.context,this._style,t);const r=t*(this.baseRenderedFontSize/this.baseMeasurementFontSize),i=new N({source:new Nt({resource:e.canvas,resolution:r,alphaMode:"premultiply-alpha-on-upload",autoGenerateMipmaps:this._mipmap})}),s={canvasAndContext:e,texture:i};return this.pages[this._currentPageIndex]=s,s}_setupContext(t,e,r){e.fontSize=this.baseRenderedFontSize,t.scale(r,r),t.font=tn(e),e.fontSize=this.baseMeasurementFontSize,t.textBaseline=e.textBaseline;const i=e._stroke,s=i?.width??0;if(i&&(t.lineWidth=s,t.lineJoin=i.join,t.miterLimit=i.miterLimit,t.strokeStyle=zi(i,t)),e._fill&&(t.fillStyle=zi(e._fill,t)),e.dropShadow){const o=e.dropShadow,a=Q.shared.setValue(o.color).toArray(),l=o.blur*r,u=o.distance*r;t.shadowColor=`rgba(${a[0]*255},${a[1]*255},${a[2]*255},${o.alpha})`,t.shadowBlur=l,t.shadowOffsetX=Math.cos(o.angle)*u,t.shadowOffsetY=Math.sin(o.angle)*u}else t.shadowColor="black",t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0}_drawGlyph(t,e,r,i,s,o){const a=e.text,l=e.fontProperties,c=(o._stroke?.width??0)*s,h=r+c/2,d=i-c/2,f=l.descent*s,g=e.lineHeight*s;o.stroke&&c&&t.strokeText(a,h,d+g-f),o._fill&&t.fillText(a,h,d+g-f)}destroy(){super.destroy();for(let t=0;t<this.pages.length;t++){const{canvasAndContext:e,texture:r}=this.pages[t];Fi.returnCanvasAndContext(e),r.destroy(!0)}this.pages=null}};no.defaultOptions={textureSize:512,style:new Te,mipmap:!0};let Ri=no;function Dc(n,t,e,r){const i={width:0,height:0,offsetY:0,scale:t.fontSize/e.baseMeasurementFontSize,lines:[{width:0,charPositions:[],spaceWidth:0,spacesIndex:[],chars:[]}]};i.offsetY=e.baseLineOffset;let s=i.lines[0],o=null,a=!0;const l={width:0,start:0,index:0,positions:[],chars:[]},u=g=>{const x=s.width;for(let p=0;p<l.index;p++){const v=g.positions[p];s.chars.push(g.chars[p]),s.charPositions.push(v+x)}s.width+=g.width,a=!1,l.width=0,l.index=0,l.chars.length=0},c=()=>{let g=s.chars.length-1;if(r){let x=s.chars[g];for(;x===" ";)s.width-=e.chars[x].xAdvance,x=s.chars[--g]}i.width=Math.max(i.width,s.width),s={width:0,charPositions:[],chars:[],spaceWidth:0,spacesIndex:[]},a=!0,i.lines.push(s),i.height+=e.lineHeight},h=e.baseMeasurementFontSize/t.fontSize,d=t.letterSpacing*h,f=t.wordWrapWidth*h;for(let g=0;g<n.length+1;g++){let x;const p=g===n.length;p||(x=n[g]);const v=e.chars[x]||e.chars[" "];if(/(?:\s)/.test(x)||x==="\r"||x===`
`||p){if(!a&&t.wordWrap&&s.width+l.width-d>f?(c(),u(l),p||s.charPositions.push(0)):(l.start=s.width,u(l),p||s.charPositions.push(0)),x==="\r"||x===`
`)s.width!==0&&c();else if(!p){const I=v.xAdvance+(v.kerning[o]||0)+d;s.width+=I,s.spaceWidth=I,s.spacesIndex.push(s.charPositions.length),s.chars.push(x)}}else{const C=v.kerning[o]||0,I=v.xAdvance+C+d;l.positions[l.index++]=l.width+C,l.chars.push(x),l.width+=I}o=x}return c(),t.align==="center"?Lc(i):t.align==="right"?Nc(i):t.align==="justify"&&$c(i),i}function Lc(n){for(let t=0;t<n.lines.length;t++){const e=n.lines[t],r=n.width/2-e.width/2;for(let i=0;i<e.charPositions.length;i++)e.charPositions[i]+=r}}function Nc(n){for(let t=0;t<n.lines.length;t++){const e=n.lines[t],r=n.width-e.width;for(let i=0;i<e.charPositions.length;i++)e.charPositions[i]+=r}}function $c(n){const t=n.width;for(let e=0;e<n.lines.length;e++){const r=n.lines[e];let i=0,s=r.spacesIndex[i++],o=0;const a=r.spacesIndex.length,u=(t-r.width)/a;for(let c=0;c<r.charPositions.length;c++)c===s&&(s=r.spacesIndex[i++],o+=u),r.charPositions[c]+=o}}let De=0;class Vc{constructor(){this.ALPHA=[["a","z"],["A","Z"]," "],this.NUMERIC=[["0","9"]],this.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],this.ASCII=[[" ","~"]],this.defaultOptions={chars:this.ALPHANUMERIC,resolution:1,padding:4,skipKerning:!1}}getFont(t,e){let r=`${e.fontFamily}-bitmap`,i=!0;if(e._fill.fill&&!e._stroke)r+=e._fill.fill.styleKey,i=!1;else if(e._stroke||e.dropShadow){let o=e.styleKey;o=o.substring(0,o.lastIndexOf("-")),r=`${o}-bitmap`,i=!1}if(!it.has(r)){const o=new Ri({style:e,overrideFill:i,overrideSize:!0,...this.defaultOptions});De++,De>50&&et("BitmapText",`You have dynamically created ${De} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``),o.once("destroy",()=>{De--,it.remove(r)}),it.set(r,o)}const s=it.get(r);return s.ensureCharacters?.(t),s}getLayout(t,e,r=!0){const i=this.getFont(t,e);return Dc([...t],e,i,r)}measureText(t,e,r=!0){return this.getLayout(t,e,r)}install(...t){let e=t[0];typeof e=="string"&&(e={name:e,style:t[1],chars:t[2]?.chars,resolution:t[2]?.resolution,padding:t[2]?.padding,skipKerning:t[2]?.skipKerning},D(at,"BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));const r=e?.name;if(!r)throw new Error("[BitmapFontManager] Property `name` is required.");e={...this.defaultOptions,...e};const i=e.style,s=i instanceof Te?i:new Te(i),o=s._fill.fill!==null&&s._fill.fill!==void 0,a=new Ri({style:s,overrideFill:o,skipKerning:e.skipKerning,padding:e.padding,resolution:e.resolution,overrideSize:!1}),l=ro(e.chars);return a.ensureCharacters(l.join("")),it.set(`${r}-bitmap`,a),a.once("destroy",()=>it.remove(`${r}-bitmap`)),a}uninstall(t){const e=`${t}-bitmap`,r=it.get(e);r&&r.destroy()}}const Ei=new Vc;class so extends Os{constructor(t,e){super();const{textures:r,data:i}=t;Object.keys(i.pages).forEach(s=>{const o=i.pages[parseInt(s,10)],a=r[o.id];this.pages.push({texture:a})}),Object.keys(i.chars).forEach(s=>{const o=i.chars[s],{frame:a,source:l}=r[o.page],u=new lt(o.x+a.x,o.y+a.y,o.width,o.height),c=new N({source:l,frame:u});this.chars[s]={id:s.codePointAt(0),xOffset:o.xOffset,yOffset:o.yOffset,xAdvance:o.xAdvance,kerning:o.kerning??{},texture:c}}),this.baseRenderedFontSize=i.fontSize,this.baseMeasurementFontSize=i.fontSize,this.fontMetrics={ascent:0,descent:0,fontSize:i.fontSize},this.baseLineOffset=i.baseLineOffset,this.lineHeight=i.lineHeight,this.fontFamily=i.fontFamily,this.distanceField=i.distanceField??{type:"none",range:0},this.url=e}destroy(){super.destroy();for(let t=0;t<this.pages.length;t++){const{texture:e}=this.pages[t];e.destroy(!0)}this.pages=null}static install(t){Ei.install(t)}static uninstall(t){Ei.uninstall(t)}}const Rr={test(n){return typeof n=="string"&&n.startsWith("info face=")},parse(n){const t=n.match(/^[a-z]+\s+.+$/gm),e={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(const h in t){const d=t[h].match(/^[a-z]+/gm)[0],f=t[h].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),g={};for(const x in f){const p=f[x].split("="),v=p[0],b=p[1].replace(/"/gm,""),S=parseFloat(b),C=isNaN(S)?b:S;g[v]=C}e[d].push(g)}const r={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},[i]=e.info,[s]=e.common,[o]=e.distanceField??[];o&&(r.distanceField={range:parseInt(o.distanceRange,10),type:o.fieldType}),r.fontSize=parseInt(i.size,10),r.fontFamily=i.face,r.lineHeight=parseInt(s.lineHeight,10);const a=e.page;for(let h=0;h<a.length;h++)r.pages.push({id:parseInt(a[h].id,10)||0,file:a[h].file});const l={};r.baseLineOffset=r.lineHeight-parseInt(s.base,10);const u=e.char;for(let h=0;h<u.length;h++){const d=u[h],f=parseInt(d.id,10);let g=d.letter??d.char??String.fromCharCode(f);g==="space"&&(g=" "),l[f]=g,r.chars[g]={id:f,page:parseInt(d.page,10)||0,x:parseInt(d.x,10),y:parseInt(d.y,10),width:parseInt(d.width,10),height:parseInt(d.height,10),xOffset:parseInt(d.xoffset,10),yOffset:parseInt(d.yoffset,10),xAdvance:parseInt(d.xadvance,10),kerning:{}}}const c=e.kerning||[];for(let h=0;h<c.length;h++){const d=parseInt(c[h].first,10),f=parseInt(c[h].second,10),g=parseInt(c[h].amount,10);r.chars[l[f]].kerning[l[d]]=g}return r}},ki={test(n){const t=n;return typeof t!="string"&&"getElementsByTagName"in t&&t.getElementsByTagName("page").length&&t.getElementsByTagName("info")[0].getAttribute("face")!==null},parse(n){const t={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},e=n.getElementsByTagName("info")[0],r=n.getElementsByTagName("common")[0],i=n.getElementsByTagName("distanceField")[0];i&&(t.distanceField={type:i.getAttribute("fieldType"),range:parseInt(i.getAttribute("distanceRange"),10)});const s=n.getElementsByTagName("page"),o=n.getElementsByTagName("char"),a=n.getElementsByTagName("kerning");t.fontSize=parseInt(e.getAttribute("size"),10),t.fontFamily=e.getAttribute("face"),t.lineHeight=parseInt(r.getAttribute("lineHeight"),10);for(let u=0;u<s.length;u++)t.pages.push({id:parseInt(s[u].getAttribute("id"),10)||0,file:s[u].getAttribute("file")});const l={};t.baseLineOffset=t.lineHeight-parseInt(r.getAttribute("base"),10);for(let u=0;u<o.length;u++){const c=o[u],h=parseInt(c.getAttribute("id"),10);let d=c.getAttribute("letter")??c.getAttribute("char")??String.fromCharCode(h);d==="space"&&(d=" "),l[h]=d,t.chars[d]={id:h,page:parseInt(c.getAttribute("page"),10)||0,x:parseInt(c.getAttribute("x"),10),y:parseInt(c.getAttribute("y"),10),width:parseInt(c.getAttribute("width"),10),height:parseInt(c.getAttribute("height"),10),xOffset:parseInt(c.getAttribute("xoffset"),10),yOffset:parseInt(c.getAttribute("yoffset"),10),xAdvance:parseInt(c.getAttribute("xadvance"),10),kerning:{}}}for(let u=0;u<a.length;u++){const c=parseInt(a[u].getAttribute("first"),10),h=parseInt(a[u].getAttribute("second"),10),d=parseInt(a[u].getAttribute("amount"),10);t.chars[l[h]].kerning[l[c]]=d}return t}},Bi={test(n){return typeof n=="string"&&n.includes("<font>")?ki.test(rt.get().parseXML(n)):!1},parse(n){return ki.parse(rt.get().parseXML(n))}},Wc=[".xml",".fnt"],Xc={extension:{type:B.CacheParser,name:"cacheBitmapFont"},test:n=>n instanceof so,getCacheableAssets(n,t){const e={};return n.forEach(r=>{e[r]=t,e[`${r}-bitmap`]=t}),e[`${t.fontFamily}-bitmap`]=t,e}},Yc={extension:{type:B.LoadParser,priority:Wt.Normal},name:"loadBitmapFont",test(n){return Wc.includes(St.extname(n).toLowerCase())},async testParse(n){return Rr.test(n)||Bi.test(n)},async parse(n,t,e){const r=Rr.test(n)?Rr.parse(n):Bi.parse(n),{src:i}=t,{pages:s}=r,o=[],a=r.distanceField?{scaleMode:"linear",alphaMode:"premultiply-alpha-on-upload",autoGenerateMipmaps:!1,resolution:1}:{};for(let h=0;h<s.length;++h){const d=s[h].file;let f=St.join(St.dirname(i),d);f=Vr(f,i),o.push({src:f,data:a})}const l=await e.load(o),u=o.map(h=>l[h.src]);return new so({data:r,textures:u},i)},async load(n,t){return await(await rt.get().fetch(n)).text()},async unload(n,t,e){await Promise.all(n.pages.map(r=>e.unload(r.texture.source._sourceOrigin))),n.destroy()}};class Hc{constructor(t,e=!1){this._loader=t,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=e}add(t){t.forEach(e=>{this._assetList.push(e)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;const t=[],e=Math.min(this._assetList.length,this._maxConcurrent);for(let r=0;r<e;r++)t.push(this._assetList.pop());await this._loader.load(t),this._isLoading=!1,this._next()}}get active(){return this._isActive}set active(t){this._isActive!==t&&(this._isActive=t,t&&!this._isLoading&&this._next())}}const jc={extension:{type:B.CacheParser,name:"cacheTextureArray"},test:n=>Array.isArray(n)&&n.every(t=>t instanceof N),getCacheableAssets:(n,t)=>{const e={};return n.forEach(r=>{t.forEach((i,s)=>{e[r+(s===0?"":s+1)]=i})}),e}};async function oo(n){if("Image"in globalThis)return new Promise(t=>{const e=new Image;e.onload=()=>{t(!0)},e.onerror=()=>{t(!1)},e.src=n});if("createImageBitmap"in globalThis&&"fetch"in globalThis){try{const t=await(await fetch(n)).blob();await createImageBitmap(t)}catch{return!1}return!0}return!1}const qc={extension:{type:B.DetectionParser,priority:1},test:async()=>oo("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),add:async n=>[...n,"avif"],remove:async n=>n.filter(t=>t!=="avif")},Oi=["png","jpg","jpeg"],Kc={extension:{type:B.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async n=>[...n,...Oi],remove:async n=>n.filter(t=>!Oi.includes(t))},Zc="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function Sn(n){return Zc?!1:document.createElement("video").canPlayType(n)!==""}const Qc={extension:{type:B.DetectionParser,priority:0},test:async()=>Sn("video/mp4"),add:async n=>[...n,"mp4","m4v"],remove:async n=>n.filter(t=>t!=="mp4"&&t!=="m4v")},Jc={extension:{type:B.DetectionParser,priority:0},test:async()=>Sn("video/ogg"),add:async n=>[...n,"ogv"],remove:async n=>n.filter(t=>t!=="ogv")},th={extension:{type:B.DetectionParser,priority:0},test:async()=>Sn("video/webm"),add:async n=>[...n,"webm"],remove:async n=>n.filter(t=>t!=="webm")},eh={extension:{type:B.DetectionParser,priority:0},test:async()=>oo("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="),add:async n=>[...n,"webp"],remove:async n=>n.filter(t=>t!=="webp")};class rh{constructor(){this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(t,e,r)=>(this._parsersValidated=!1,t[e]=r,!0)}),this.promiseCache={}}reset(){this._parsersValidated=!1,this.promiseCache={}}_getLoadPromiseAndParser(t,e){const r={promise:null,parser:null};return r.promise=(async()=>{let i=null,s=null;if(e.loadParser&&(s=this._parserHash[e.loadParser],s||et(`[Assets] specified load parser "${e.loadParser}" not found while loading ${t}`)),!s){for(let o=0;o<this.parsers.length;o++){const a=this.parsers[o];if(a.load&&a.test?.(t,e,this)){s=a;break}}if(!s)return et(`[Assets] ${t} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`),null}i=await s.load(t,e,this),r.parser=s;for(let o=0;o<this.parsers.length;o++){const a=this.parsers[o];a.parse&&a.parse&&await a.testParse?.(i,e,this)&&(i=await a.parse(i,e,this)||i,r.parser=a)}return i})(),r}async load(t,e){this._parsersValidated||this._validateParsers();let r=0;const i={},s=He(t),o=Tt(t,u=>({alias:[u],src:u,data:{}})),a=o.length,l=o.map(async u=>{const c=St.toAbsolute(u.src);if(!i[u.src])try{this.promiseCache[c]||(this.promiseCache[c]=this._getLoadPromiseAndParser(c,u)),i[u.src]=await this.promiseCache[c].promise,e&&e(++r/a)}catch(h){throw delete this.promiseCache[c],delete i[u.src],new Error(`[Loader.load] Failed to load ${c}.
${h}`)}});return await Promise.all(l),s?i[o[0].src]:i}async unload(t){const r=Tt(t,i=>({alias:[i],src:i})).map(async i=>{const s=St.toAbsolute(i.src),o=this.promiseCache[s];if(o){const a=await o.promise;delete this.promiseCache[s],await o.parser?.unload?.(a,i,this)}});await Promise.all(r)}_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(t=>t.name).reduce((t,e)=>(e.name?t[e.name]&&et(`[Assets] loadParser name conflict "${e.name}"`):et("[Assets] loadParser should have a name"),{...t,[e.name]:e}),{})}}function le(n,t){if(Array.isArray(t)){for(const e of t)if(n.startsWith(`data:${e}`))return!0;return!1}return n.startsWith(`data:${t}`)}function ue(n,t){const e=n.split("?")[0],r=St.extname(e).toLowerCase();return Array.isArray(t)?t.includes(r):r===t}const nh=".json",ih="application/json",sh={extension:{type:B.LoadParser,priority:Wt.Low},name:"loadJson",test(n){return le(n,ih)||ue(n,nh)},async load(n){return await(await rt.get().fetch(n)).json()}},oh=".txt",ah="text/plain",lh={name:"loadTxt",extension:{type:B.LoadParser,priority:Wt.Low,name:"loadTxt"},test(n){return le(n,ah)||ue(n,oh)},async load(n){return await(await rt.get().fetch(n)).text()}},uh=["normal","bold","100","200","300","400","500","600","700","800","900"],ch=[".ttf",".otf",".woff",".woff2"],hh=["font/ttf","font/otf","font/woff","font/woff2"],fh=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function dh(n){const t=St.extname(n),i=St.basename(n,t).replace(/(-|_)/g," ").toLowerCase().split(" ").map(a=>a.charAt(0).toUpperCase()+a.slice(1));let s=i.length>0;for(const a of i)if(!a.match(fh)){s=!1;break}let o=i.join(" ");return s||(o=`"${o.replace(/[\\"]/g,"\\$&")}"`),o}const ph=/^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;function mh(n){return ph.test(n)?n:encodeURI(n)}const gh={extension:{type:B.LoadParser,priority:Wt.Low},name:"loadWebFont",test(n){return le(n,hh)||ue(n,ch)},async load(n,t){const e=rt.get().getFontFaceSet();if(e){const r=[],i=t.data?.family??dh(n),s=t.data?.weights?.filter(a=>uh.includes(a))??["normal"],o=t.data??{};for(let a=0;a<s.length;a++){const l=s[a],u=new FontFace(i,`url(${mh(n)})`,{...o,weight:l});await u.load(),e.add(u),r.push(u)}return it.set(`${i}-and-url`,{url:n,fontFaces:r}),r.length===1?r[0]:r}return et("[loadWebFont] FontFace API is not supported. Skipping loading font"),null},unload(n){(Array.isArray(n)?n:[n]).forEach(t=>{it.remove(`${t.family}-and-url`),rt.get().getFontFaceSet().delete(t)})}};function wn(n,t=1){const e=ae.RETINA_PREFIX?.exec(n);return e?parseFloat(e[1]):t}function An(n,t,e){n.label=e,n._sourceOrigin=e;const r=new N({source:n,label:e}),i=()=>{delete t.promiseCache[e],it.has(e)&&it.remove(e)};return r.source.once("destroy",()=>{t.promiseCache[e]&&(et("[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource."),i())}),r.once("destroy",()=>{n.destroyed||(et("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."),i())}),r}const xh=".svg",yh="image/svg+xml",vh={extension:{type:B.LoadParser,priority:Wt.Low,name:"loadSVG"},name:"loadSVG",config:{crossOrigin:"anonymous",parseAsGraphicsContext:!1},test(n){return le(n,yh)||ue(n,xh)},async load(n,t,e){return t.data?.parseAsGraphicsContext??this.config.parseAsGraphicsContext?bh(n):_h(n,t,e,this.config.crossOrigin)},unload(n){n.destroy(!0)}};async function _h(n,t,e,r){const s=await(await rt.get().fetch(n)).blob(),o=URL.createObjectURL(s),a=new Image;a.src=o,a.crossOrigin=r,await a.decode(),URL.revokeObjectURL(o);const l=document.createElement("canvas"),u=l.getContext("2d"),c=t.data?.resolution||wn(n),h=t.data?.width??a.width,d=t.data?.height??a.height;l.width=h*c,l.height=d*c,u.drawImage(a,0,0,h*c,d*c);const{parseAsGraphicsContext:f,...g}=t.data??{},x=new Nt({resource:l,alphaMode:"premultiply-alpha-on-upload",resolution:c,...g});return An(x,e,n)}async function bh(n){const e=await(await rt.get().fetch(n)).text(),r=new Kt;return r.svg(e),r}const Sh=`(function () {
    'use strict';

    const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    async function checkImageBitmap() {
      try {
        if (typeof createImageBitmap !== "function")
          return false;
        const response = await fetch(WHITE_PNG);
        const imageBlob = await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);
        return imageBitmap.width === 1 && imageBitmap.height === 1;
      } catch (_e) {
        return false;
      }
    }
    void checkImageBitmap().then((result) => {
      self.postMessage(result);
    });

})();
`;let ne=null,en=class{constructor(){ne||(ne=URL.createObjectURL(new Blob([Sh],{type:"application/javascript"}))),this.worker=new Worker(ne)}};en.revokeObjectURL=function(){ne&&(URL.revokeObjectURL(ne),ne=null)};const wh=`(function () {
    'use strict';

    async function loadImageBitmap(url, alphaMode) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \${response.status} \${response.statusText}\`);
      }
      const imageBlob = await response.blob();
      return alphaMode === "premultiplied-alpha" ? createImageBitmap(imageBlob, { premultiplyAlpha: "none" }) : createImageBitmap(imageBlob);
    }
    self.onmessage = async (event) => {
      try {
        const imageBitmap = await loadImageBitmap(event.data.data[0], event.data.data[1]);
        self.postMessage({
          data: imageBitmap,
          uuid: event.data.uuid,
          id: event.data.id
        }, [imageBitmap]);
      } catch (e) {
        self.postMessage({
          error: e,
          uuid: event.data.uuid,
          id: event.data.id
        });
      }
    };

})();
`;let ie=null;class ao{constructor(){ie||(ie=URL.createObjectURL(new Blob([wh],{type:"application/javascript"}))),this.worker=new Worker(ie)}}ao.revokeObjectURL=function(){ie&&(URL.revokeObjectURL(ie),ie=null)};let Gi=0,Er;class Ah{constructor(){this._initialized=!1,this._createdWorkers=0,this._workerPool=[],this._queue=[],this._resolveHash={}}isImageBitmapSupported(){return this._isImageBitmapSupported!==void 0?this._isImageBitmapSupported:(this._isImageBitmapSupported=new Promise(t=>{const{worker:e}=new en;e.addEventListener("message",r=>{e.terminate(),en.revokeObjectURL(),t(r.data)})}),this._isImageBitmapSupported)}loadImageBitmap(t,e){return this._run("loadImageBitmap",[t,e?.data?.alphaMode])}async _initWorkers(){this._initialized||(this._initialized=!0)}_getWorker(){Er===void 0&&(Er=navigator.hardwareConcurrency||4);let t=this._workerPool.pop();return!t&&this._createdWorkers<Er&&(this._createdWorkers++,t=new ao().worker,t.addEventListener("message",e=>{this._complete(e.data),this._returnWorker(e.target),this._next()})),t}_returnWorker(t){this._workerPool.push(t)}_complete(t){t.error!==void 0?this._resolveHash[t.uuid].reject(t.error):this._resolveHash[t.uuid].resolve(t.data),this._resolveHash[t.uuid]=null}async _run(t,e){await this._initWorkers();const r=new Promise((i,s)=>{this._queue.push({id:t,arguments:e,resolve:i,reject:s})});return this._next(),r}_next(){if(!this._queue.length)return;const t=this._getWorker();if(!t)return;const e=this._queue.pop(),r=e.id;this._resolveHash[Gi]={resolve:e.resolve,reject:e.reject},t.postMessage({data:e.arguments,uuid:Gi++,id:r})}}const Ui=new Ah,Ch=[".jpeg",".jpg",".png",".webp",".avif"],Th=["image/jpeg","image/png","image/webp","image/avif"];async function Ph(n,t){const e=await rt.get().fetch(n);if(!e.ok)throw new Error(`[loadImageBitmap] Failed to fetch ${n}: ${e.status} ${e.statusText}`);const r=await e.blob();return t?.data?.alphaMode==="premultiplied-alpha"?createImageBitmap(r,{premultiplyAlpha:"none"}):createImageBitmap(r)}const lo={name:"loadTextures",extension:{type:B.LoadParser,priority:Wt.High,name:"loadTextures"},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test(n){return le(n,Th)||ue(n,Ch)},async load(n,t,e){let r=null;globalThis.createImageBitmap&&this.config.preferCreateImageBitmap?this.config.preferWorkers&&await Ui.isImageBitmapSupported()?r=await Ui.loadImageBitmap(n,t):r=await Ph(n,t):r=await new Promise((s,o)=>{r=new Image,r.crossOrigin=this.config.crossOrigin,r.src=n,r.complete?s(r):(r.onload=()=>{s(r)},r.onerror=o)});const i=new Nt({resource:r,alphaMode:"premultiply-alpha-on-upload",resolution:t.data?.resolution||wn(n),...t.data});return An(i,e,n)},unload(n){n.destroy(!0)}},uo=[".mp4",".m4v",".webm",".ogg",".ogv",".h264",".avi",".mov"],Fh=uo.map(n=>`video/${n.substring(1)}`);function Mh(n,t,e){e===void 0&&!t.startsWith("data:")?n.crossOrigin=zh(t):e!==!1&&(n.crossOrigin=typeof e=="string"?e:"anonymous")}function Ih(n){return new Promise((t,e)=>{n.addEventListener("canplaythrough",r),n.addEventListener("error",i),n.load();function r(){s(),t()}function i(o){s(),e(o)}function s(){n.removeEventListener("canplaythrough",r),n.removeEventListener("error",i)}})}function zh(n,t=globalThis.location){if(n.startsWith("data:"))return"";t||(t=globalThis.location);const e=new URL(n,document.baseURI);return e.hostname!==t.hostname||e.port!==t.port||e.protocol!==t.protocol?"anonymous":""}const Rh={name:"loadVideo",extension:{type:B.LoadParser,name:"loadVideo"},test(n){const t=le(n,Fh),e=ue(n,uo);return t||e},async load(n,t,e){const r={...Ne.defaultOptions,resolution:t.data?.resolution||wn(n),alphaMode:t.data?.alphaMode||await ms(),...t.data},i=document.createElement("video"),s={preload:r.autoLoad!==!1?"auto":void 0,"webkit-playsinline":r.playsinline!==!1?"":void 0,playsinline:r.playsinline!==!1?"":void 0,muted:r.muted===!0?"":void 0,loop:r.loop===!0?"":void 0,autoplay:r.autoPlay!==!1?"":void 0};Object.keys(s).forEach(l=>{const u=s[l];u!==void 0&&i.setAttribute(l,u)}),r.muted===!0&&(i.muted=!0),Mh(i,n,r.crossorigin);const o=document.createElement("source");let a;if(n.startsWith("data:"))a=n.slice(5,n.indexOf(";"));else if(!n.startsWith("blob:")){const l=n.split("?")[0].slice(n.lastIndexOf(".")+1).toLowerCase();a=Ne.MIME_TYPES[l]||`video/${l}`}return o.src=n,a&&(o.type=a),new Promise(l=>{const u=async()=>{const c=new Ne({...r,resource:i});i.removeEventListener("canplay",u),t.data.preload&&await Ih(i),l(An(c,e,n))};i.addEventListener("canplay",u),i.appendChild(o)})},unload(n){n.destroy(!0)}},co={extension:{type:B.ResolveParser,name:"resolveTexture"},test:lo.test,parse:n=>({resolution:parseFloat(ae.RETINA_PREFIX.exec(n)?.[1]??"1"),format:n.split(".").pop(),src:n})},Eh={extension:{type:B.ResolveParser,priority:-2,name:"resolveJson"},test:n=>ae.RETINA_PREFIX.test(n)&&n.endsWith(".json"),parse:co.parse};class kh{constructor(){this._detections=[],this._initialized=!1,this.resolver=new ae,this.loader=new rh,this.cache=it,this._backgroundLoader=new Hc(this.loader),this._backgroundLoader.active=!0,this.reset()}async init(t={}){if(this._initialized){et("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");return}if(this._initialized=!0,t.defaultSearchParams&&this.resolver.setDefaultSearchParams(t.defaultSearchParams),t.basePath&&(this.resolver.basePath=t.basePath),t.bundleIdentifier&&this.resolver.setBundleIdentifier(t.bundleIdentifier),t.manifest){let s=t.manifest;typeof s=="string"&&(s=await this.load(s)),this.resolver.addManifest(s)}const e=t.texturePreference?.resolution??1,r=typeof e=="number"?[e]:e,i=await this._detectFormats({preferredFormats:t.texturePreference?.format,skipDetections:t.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:i,resolution:r}}),t.preferences&&this.setPreferences(t.preferences)}add(t){this.resolver.add(t)}async load(t,e){this._initialized||await this.init();const r=He(t),i=Tt(t).map(a=>{if(typeof a!="string"){const l=this.resolver.getAlias(a);return l.some(u=>!this.resolver.hasKey(u))&&this.add(a),Array.isArray(l)?l[0]:l}return this.resolver.hasKey(a)||this.add({alias:a,src:a}),a}),s=this.resolver.resolve(i),o=await this._mapLoadToResolve(s,e);return r?o[i[0]]:o}addBundle(t,e){this.resolver.addBundle(t,e)}async loadBundle(t,e){this._initialized||await this.init();let r=!1;typeof t=="string"&&(r=!0,t=[t]);const i=this.resolver.resolveBundle(t),s={},o=Object.keys(i);let a=0,l=0;const u=()=>{e?.(++a/l)},c=o.map(h=>{const d=i[h];return l+=Object.keys(d).length,this._mapLoadToResolve(d,u).then(f=>{s[h]=f})});return await Promise.all(c),r?s[t[0]]:s}async backgroundLoad(t){this._initialized||await this.init(),typeof t=="string"&&(t=[t]);const e=this.resolver.resolve(t);this._backgroundLoader.add(Object.values(e))}async backgroundLoadBundle(t){this._initialized||await this.init(),typeof t=="string"&&(t=[t]);const e=this.resolver.resolveBundle(t);Object.values(e).forEach(r=>{this._backgroundLoader.add(Object.values(r))})}reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(t){if(typeof t=="string")return it.get(t);const e={};for(let r=0;r<t.length;r++)e[r]=it.get(t[r]);return e}async _mapLoadToResolve(t,e){const r=[...new Set(Object.values(t))];this._backgroundLoader.active=!1;const i=await this.loader.load(r,e);this._backgroundLoader.active=!0;const s={};return r.forEach(o=>{const a=i[o.src],l=[o.src];o.alias&&l.push(...o.alias),l.forEach(u=>{s[u]=a}),it.set(l,a)}),s}async unload(t){this._initialized||await this.init();const e=Tt(t).map(i=>typeof i!="string"?i.src:i),r=this.resolver.resolve(e);await this._unloadFromResolved(r)}async unloadBundle(t){this._initialized||await this.init(),t=Tt(t);const e=this.resolver.resolveBundle(t),r=Object.keys(e).map(i=>this._unloadFromResolved(e[i]));await Promise.all(r)}async _unloadFromResolved(t){const e=Object.values(t);e.forEach(r=>{it.remove(r.src)}),await this.loader.unload(e)}async _detectFormats(t){let e=[];t.preferredFormats&&(e=Array.isArray(t.preferredFormats)?t.preferredFormats:[t.preferredFormats]);for(const r of t.detections)t.skipDetections||await r.test()?e=await r.add(e):t.skipDetections||(e=await r.remove(e));return e=e.filter((r,i)=>e.indexOf(r)===i),e}get detections(){return this._detections}setPreferences(t){this.loader.parsers.forEach(e=>{e.config&&Object.keys(e.config).filter(r=>r in t).forEach(r=>{e.config[r]=t[r]})})}}const ye=new kh;mt.handleByList(B.LoadParser,ye.loader.parsers).handleByList(B.ResolveParser,ye.resolver.parsers).handleByList(B.CacheParser,ye.cache.parsers).handleByList(B.DetectionParser,ye.detections);mt.add(jc,Kc,qc,eh,Qc,Jc,th,sh,lh,gh,vh,lo,Rh,Yc,Xc,co,Eh);const Di={loader:B.LoadParser,resolver:B.ResolveParser,cache:B.CacheParser,detection:B.DetectionParser};mt.handle(B.Asset,n=>{const t=n.ref;Object.entries(Di).filter(([e])=>!!t[e]).forEach(([e,r])=>mt.add(Object.assign(t[e],{extension:t[e].extension??r})))},n=>{const t=n.ref;Object.keys(Di).filter(e=>!!t[e]).forEach(e=>mt.remove(t[e]))});var ho=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,Bh=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,Li=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct AlphaUniforms {
  uAlpha:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> alphaUniforms : AlphaUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
 
    var sample = textureSample(uTexture, uSampler, uv);
    
    return sample * alphaUniforms.uAlpha;
}`;const fo=class po extends st{constructor(t){t={...po.defaultOptions,...t};const e=K.from({vertex:{source:Li,entryPoint:"mainVertex"},fragment:{source:Li,entryPoint:"mainFragment"}}),r=J.from({vertex:ho,fragment:Bh,name:"alpha-filter"}),{alpha:i,...s}=t,o=new Ke({uAlpha:{value:i,type:"f32"}});super({...s,gpuProgram:e,glProgram:r,resources:{alphaUniforms:o}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(t){this.resources.alphaUniforms.uniforms.uAlpha=t}};fo.defaultOptions={alpha:1};let Oh=fo;const mo={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},Gh=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uTexture;","out vec4 finalColor;","void main(void)","{","    finalColor = vec4(0.0);","    %blur%","}"].join(`
`);function Uh(n){const t=mo[n],e=t.length;let r=Gh,i="";const s="finalColor += texture(uTexture, vBlurTexCoords[%index%]) * %value%;";let o;for(let a=0;a<n;a++){let l=s.replace("%index%",a.toString());o=a,a>=e&&(o=n-a-1),l=l.replace("%value%",t[o].toString()),i+=l,i+=`
`}return r=r.replace("%blur%",i),r=r.replace("%size%",n.toString()),r}const Dh=`
    in vec2 aPosition;

    uniform float uStrength;

    out vec2 vBlurTexCoords[%size%];

    uniform vec4 uInputSize;
    uniform vec4 uOutputFrame;
    uniform vec4 uOutputTexture;

    vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

    vec2 filterTextureCoord( void )
    {
        return aPosition * (uOutputFrame.zw * uInputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        float pixelStrength = uInputSize.%dimension% * uStrength;

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;function Lh(n,t){const e=Math.ceil(n/2);let r=Dh,i="",s;t?s="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":s="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let o=0;o<n;o++){let a=s.replace("%index%",o.toString());a=a.replace("%sampleIndex%",`${o-(e-1)}.0`),i+=a,i+=`
`}return r=r.replace("%blur%",i),r=r.replace("%size%",n.toString()),r=r.replace("%dimension%",t?"z":"w"),r}function Nh(n,t){const e=Lh(t,n),r=Uh(t);return J.from({vertex:e,fragment:r,name:`blur-${n?"horizontal":"vertical"}-pass-filter`})}var $h=`

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct BlurUniforms {
  uStrength:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> blurUniforms : BlurUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    %blur-struct%
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}


@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {

  let filteredCord = filterTextureCoord(aPosition);

  let pixelStrength = gfu.uInputSize.%dimension% * blurUniforms.uStrength;

  return VSOutput(
   filterVertexPosition(aPosition),
    %blur-vertex-out%
  );
}

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  %blur-fragment-in%
) -> @location(0) vec4<f32> {

    var   finalColor = vec4(0.0);

    %blur-sampling%

    return finalColor;
}`;function Vh(n,t){const e=mo[t],r=e.length,i=[],s=[],o=[];for(let h=0;h<t;h++){i[h]=`@location(${h}) offset${h}: vec2<f32>,`,n?s[h]=`filteredCord + vec2(${h-r+1} * pixelStrength, 0.0),`:s[h]=`filteredCord + vec2(0.0, ${h-r+1} * pixelStrength),`;const d=h<r?h:t-h-1,f=e[d].toString();o[h]=`finalColor += textureSample(uTexture, uSampler, offset${h}) * ${f};`}const a=i.join(`
`),l=s.join(`
`),u=o.join(`
`),c=$h.replace("%blur-struct%",a).replace("%blur-vertex-out%",l).replace("%blur-fragment-in%",a).replace("%blur-sampling%",u).replace("%dimension%",n?"z":"w");return K.from({vertex:{source:c,entryPoint:"mainVertex"},fragment:{source:c,entryPoint:"mainFragment"}})}const go=class xo extends st{constructor(t){t={...xo.defaultOptions,...t};const e=Nh(t.horizontal,t.kernelSize),r=Vh(t.horizontal,t.kernelSize);super({glProgram:e,gpuProgram:r,resources:{blurUniforms:{uStrength:{value:0,type:"f32"}}},...t}),this.horizontal=t.horizontal,this._quality=0,this.quality=t.quality,this.blur=t.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(t,e,r,i){if(this._uniforms.uStrength=this.strength/this.passes,this.passes===1)t.applyFilter(this,e,r,i);else{const s=wt.getSameSizeTexture(e);let o=e,a=s;this._state.blend=!1;const l=t.renderer.type===we.WEBGPU;for(let u=0;u<this.passes-1;u++){t.applyFilter(this,o,a,u===0?!0:l);const c=a;a=o,o=c}this._state.blend=!0,t.applyFilter(this,o,r,i),wt.returnTexture(s)}}get blur(){return this.strength}set blur(t){this.padding=1+Math.abs(t)*2,this.strength=t}get quality(){return this._quality}set quality(t){this._quality=t,this.passes=t}};go.defaultOptions={strength:8,quality:4,kernelSize:5};let Se=go;class yo extends st{constructor(...t){let e=t[0]??{};typeof e=="number"&&(D(at,"BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }"),e={strength:e},t[1]!==void 0&&(e.quality=t[1]),t[2]!==void 0&&(e.resolution=t[2]||"inherit"),t[3]!==void 0&&(e.kernelSize=t[3])),e={...Se.defaultOptions,...e};const{strength:r,strengthX:i,strengthY:s,quality:o,...a}=e;super({...a,compatibleRenderers:we.BOTH,resources:{}}),this._repeatEdgePixels=!1,this.blurXFilter=new Se({horizontal:!0,...e}),this.blurYFilter=new Se({horizontal:!1,...e}),this.quality=o,this.strengthX=i??r,this.strengthY=s??r,this.repeatEdgePixels=!1}apply(t,e,r,i){const s=Math.abs(this.blurXFilter.strength),o=Math.abs(this.blurYFilter.strength);if(s&&o){const a=wt.getSameSizeTexture(e);this.blurXFilter.blendMode="normal",this.blurXFilter.apply(t,e,a,!0),this.blurYFilter.blendMode=this.blendMode,this.blurYFilter.apply(t,a,r,i),wt.returnTexture(a)}else o?(this.blurYFilter.blendMode=this.blendMode,this.blurYFilter.apply(t,e,r,i)):(this.blurXFilter.blendMode=this.blendMode,this.blurXFilter.apply(t,e,r,i))}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=Math.max(Math.abs(this.blurXFilter.blur),Math.abs(this.blurYFilter.blur))*2}get strength(){if(this.strengthX!==this.strengthY)throw new Error("BlurFilter's strengthX and strengthY are different");return this.strengthX}set strength(t){this.blurXFilter.blur=this.blurYFilter.blur=t,this.updatePadding()}get quality(){return this.blurXFilter.quality}set quality(t){this.blurXFilter.quality=this.blurYFilter.quality=t}get strengthX(){return this.blurXFilter.blur}set strengthX(t){this.blurXFilter.blur=t,this.updatePadding()}get strengthY(){return this.blurYFilter.blur}set strengthY(t){this.blurYFilter.blur=t,this.updatePadding()}get blur(){return D("8.3.0","BlurFilter.blur is deprecated, please use BlurFilter.strength instead."),this.strength}set blur(t){D("8.3.0","BlurFilter.blur is deprecated, please use BlurFilter.strength instead."),this.strength=t}get blurX(){return D("8.3.0","BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead."),this.strengthX}set blurX(t){D("8.3.0","BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead."),this.strengthX=t}get blurY(){return D("8.3.0","BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead."),this.strengthY}set blurY(t){D("8.3.0","BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead."),this.strengthY=t}get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(t){this._repeatEdgePixels=t,this.updatePadding()}}yo.defaultOptions={strength:8,quality:4,kernelSize:5};var Wh=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 finalColor;

uniform float uColorMatrix[20];
uniform float uAlpha;

uniform sampler2D uTexture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * 0.2);
    float diff = (randomValue - 0.5) *  0.5;

    if (uAlpha == 0.0) {
        finalColor = color;
        return;
    }

    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    vec4 result;

    result.r = (uColorMatrix[0] * color.r);
        result.r += (uColorMatrix[1] * color.g);
        result.r += (uColorMatrix[2] * color.b);
        result.r += (uColorMatrix[3] * color.a);
        result.r += uColorMatrix[4];

    result.g = (uColorMatrix[5] * color.r);
        result.g += (uColorMatrix[6] * color.g);
        result.g += (uColorMatrix[7] * color.b);
        result.g += (uColorMatrix[8] * color.a);
        result.g += uColorMatrix[9];

    result.b = (uColorMatrix[10] * color.r);
       result.b += (uColorMatrix[11] * color.g);
       result.b += (uColorMatrix[12] * color.b);
       result.b += (uColorMatrix[13] * color.a);
       result.b += uColorMatrix[14];

    result.a = (uColorMatrix[15] * color.r);
       result.a += (uColorMatrix[16] * color.g);
       result.a += (uColorMatrix[17] * color.b);
       result.a += (uColorMatrix[18] * color.a);
       result.a += uColorMatrix[19];

    vec3 rgb = mix(color.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    finalColor = vec4(rgb, result.a);
}
`,Ni=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct ColorMatrixUniforms {
  uColorMatrix:array<vec4<f32>, 5>,
  uAlpha:f32,
};


@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;
@group(1) @binding(0) var<uniform> colorMatrixUniforms : ColorMatrixUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
  };
  
fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
  );
}


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {


  var c = textureSample(uTexture, uSampler, uv);
  
  if (colorMatrixUniforms.uAlpha == 0.0) {
    return c;
  }

 
    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.r /= c.a;
      c.g /= c.a;
      c.b /= c.a;
    }

    var cm = colorMatrixUniforms.uColorMatrix;


    var result = vec4<f32>(0.);

    result.r = (cm[0][0] * c.r);
    result.r += (cm[0][1] * c.g);
    result.r += (cm[0][2] * c.b);
    result.r += (cm[0][3] * c.a);
    result.r += cm[1][0];

    result.g = (cm[1][1] * c.r);
    result.g += (cm[1][2] * c.g);
    result.g += (cm[1][3] * c.b);
    result.g += (cm[2][0] * c.a);
    result.g += cm[2][1];

    result.b = (cm[2][2] * c.r);
    result.b += (cm[2][3] * c.g);
    result.b += (cm[3][0] * c.b);
    result.b += (cm[3][1] * c.a);
    result.b += cm[3][2];

    result.a = (cm[3][3] * c.r);
    result.a += (cm[4][0] * c.g);
    result.a += (cm[4][1] * c.b);
    result.a += (cm[4][2] * c.a);
    result.a += cm[4][3];

    var rgb = mix(c.rgb, result.rgb, colorMatrixUniforms.uAlpha);

    rgb.r *= result.a;
    rgb.g *= result.a;
    rgb.b *= result.a;

    return vec4(rgb, result.a);
}`;class $i extends st{constructor(t={}){const e=new Ke({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"f32",size:20},uAlpha:{value:1,type:"f32"}}),r=K.from({vertex:{source:Ni,entryPoint:"mainVertex"},fragment:{source:Ni,entryPoint:"mainFragment"}}),i=J.from({vertex:ho,fragment:Wh,name:"color-matrix-filter"});super({...t,gpuProgram:r,glProgram:i,resources:{colorMatrixUniforms:e}}),this.alpha=1}_loadMatrix(t,e=!1){let r=t;e&&(this._multiply(r,this.matrix,t),r=this._colorMatrix(r)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=r,this.resources.colorMatrixUniforms.update()}_multiply(t,e,r){return t[0]=e[0]*r[0]+e[1]*r[5]+e[2]*r[10]+e[3]*r[15],t[1]=e[0]*r[1]+e[1]*r[6]+e[2]*r[11]+e[3]*r[16],t[2]=e[0]*r[2]+e[1]*r[7]+e[2]*r[12]+e[3]*r[17],t[3]=e[0]*r[3]+e[1]*r[8]+e[2]*r[13]+e[3]*r[18],t[4]=e[0]*r[4]+e[1]*r[9]+e[2]*r[14]+e[3]*r[19]+e[4],t[5]=e[5]*r[0]+e[6]*r[5]+e[7]*r[10]+e[8]*r[15],t[6]=e[5]*r[1]+e[6]*r[6]+e[7]*r[11]+e[8]*r[16],t[7]=e[5]*r[2]+e[6]*r[7]+e[7]*r[12]+e[8]*r[17],t[8]=e[5]*r[3]+e[6]*r[8]+e[7]*r[13]+e[8]*r[18],t[9]=e[5]*r[4]+e[6]*r[9]+e[7]*r[14]+e[8]*r[19]+e[9],t[10]=e[10]*r[0]+e[11]*r[5]+e[12]*r[10]+e[13]*r[15],t[11]=e[10]*r[1]+e[11]*r[6]+e[12]*r[11]+e[13]*r[16],t[12]=e[10]*r[2]+e[11]*r[7]+e[12]*r[12]+e[13]*r[17],t[13]=e[10]*r[3]+e[11]*r[8]+e[12]*r[13]+e[13]*r[18],t[14]=e[10]*r[4]+e[11]*r[9]+e[12]*r[14]+e[13]*r[19]+e[14],t[15]=e[15]*r[0]+e[16]*r[5]+e[17]*r[10]+e[18]*r[15],t[16]=e[15]*r[1]+e[16]*r[6]+e[17]*r[11]+e[18]*r[16],t[17]=e[15]*r[2]+e[16]*r[7]+e[17]*r[12]+e[18]*r[17],t[18]=e[15]*r[3]+e[16]*r[8]+e[17]*r[13]+e[18]*r[18],t[19]=e[15]*r[4]+e[16]*r[9]+e[17]*r[14]+e[18]*r[19]+e[19],t}_colorMatrix(t){const e=new Float32Array(t);return e[4]/=255,e[9]/=255,e[14]/=255,e[19]/=255,e}brightness(t,e){const r=[t,0,0,0,0,0,t,0,0,0,0,0,t,0,0,0,0,0,1,0];this._loadMatrix(r,e)}tint(t,e){const[r,i,s]=Q.shared.setValue(t).toArray(),o=[r,0,0,0,0,0,i,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(o,e)}greyscale(t,e){const r=[t,t,t,0,0,t,t,t,0,0,t,t,t,0,0,0,0,0,1,0];this._loadMatrix(r,e)}grayscale(t,e){this.greyscale(t,e)}blackAndWhite(t){const e=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(e,t)}hue(t,e){t=(t||0)/180*Math.PI;const r=Math.cos(t),i=Math.sin(t),s=Math.sqrt,o=1/3,a=s(o),l=r+(1-r)*o,u=o*(1-r)-a*i,c=o*(1-r)+a*i,h=o*(1-r)+a*i,d=r+o*(1-r),f=o*(1-r)-a*i,g=o*(1-r)-a*i,x=o*(1-r)+a*i,p=r+o*(1-r),v=[l,u,c,0,0,h,d,f,0,0,g,x,p,0,0,0,0,0,1,0];this._loadMatrix(v,e)}contrast(t,e){const r=(t||0)+1,i=-.5*(r-1),s=[r,0,0,0,i,0,r,0,0,i,0,0,r,0,i,0,0,0,1,0];this._loadMatrix(s,e)}saturate(t=0,e){const r=t*2/3+1,i=(r-1)*-.5,s=[r,i,i,0,0,i,r,i,0,0,i,i,r,0,0,0,0,0,1,0];this._loadMatrix(s,e)}desaturate(){this.saturate(-1)}negative(t){const e=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(e,t)}sepia(t){const e=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(e,t)}technicolor(t){const e=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(e,t)}polaroid(t){const e=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(e,t)}toBGR(t){const e=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(e,t)}kodachrome(t){const e=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(e,t)}browni(t){const e=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(e,t)}vintage(t){const e=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(e,t)}colorTone(t,e,r,i,s){t||(t=.2),e||(e=.15),r||(r=16770432),i||(i=3375104);const o=Q.shared,[a,l,u]=o.setValue(r).toArray(),[c,h,d]=o.setValue(i).toArray(),f=[.3,.59,.11,0,0,a,l,u,t,0,c,h,d,e,0,a-c,l-h,u-d,0,0];this._loadMatrix(f,s)}night(t,e){t||(t=.1);const r=[t*-2,-t,0,0,0,-t,0,t,0,0,0,t,t*2,0,0,0,0,0,1,0];this._loadMatrix(r,e)}predator(t,e){const r=[11.224130630493164*t,-4.794486999511719*t,-2.8746118545532227*t,0*t,.40342438220977783*t,-3.6330697536468506*t,9.193157196044922*t,-2.951810836791992*t,0*t,-1.316135048866272*t,-3.2184197902679443*t,-4.2375030517578125*t,7.476448059082031*t,0*t,.8044459223747253*t,0,0,0,1,0];this._loadMatrix(r,e)}lsd(t){const e=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(e,t)}reset(){const t=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(t,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(t){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=t}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(t){this.resources.colorMatrixUniforms.uniforms.uAlpha=t}}const pe=new Map;function Xh(n,t){if(!pe.has(n)){const e=new N({source:new dn({resource:n,...t})}),r=()=>{pe.get(n)===e&&pe.delete(n)};e.once("destroy",r),e.source.once("destroy",r),pe.set(n,e)}return pe.get(n)}const vo=class _o{constructor(t={}){if(this.uid=ut("renderTarget"),this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._size=new Float32Array(2),this._managedColorTextures=!1,t={..._o.defaultOptions,...t},this.stencil=t.stencil,this.depth=t.depth,this.isRoot=t.isRoot,typeof t.colorTextures=="number"){this._managedColorTextures=!0;for(let e=0;e<t.colorTextures;e++)this.colorTextures.push(new bt({width:t.width,height:t.height,resolution:t.resolution,antialias:t.antialias}))}else{this.colorTextures=[...t.colorTextures.map(r=>r.source)];const e=this.colorTexture.source;this.resize(e.width,e.height,e._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),(t.depthStencilTexture||this.stencil)&&(t.depthStencilTexture instanceof N||t.depthStencilTexture instanceof bt?this.depthStencilTexture=t.depthStencilTexture.source:this.ensureDepthStencilTexture())}get size(){const t=this._size;return t[0]=this.pixelWidth,t[1]=this.pixelHeight,t}get width(){return this.colorTexture.source.width}get height(){return this.colorTexture.source.height}get pixelWidth(){return this.colorTexture.source.pixelWidth}get pixelHeight(){return this.colorTexture.source.pixelHeight}get resolution(){return this.colorTexture.source._resolution}get colorTexture(){return this.colorTextures[0]}onSourceResize(t){this.resize(t.width,t.height,t._resolution,!0)}ensureDepthStencilTexture(){this.depthStencilTexture||(this.depthStencilTexture=new bt({width:this.width,height:this.height,resolution:this.resolution,format:"depth24plus-stencil8",autoGenerateMipmaps:!1,antialias:!1,mipLevelCount:1}))}resize(t,e,r=this.resolution,i=!1){this.dirtyId++,this.colorTextures.forEach((s,o)=>{i&&o===0||s.source.resize(t,e,r)}),this.depthStencilTexture&&this.depthStencilTexture.source.resize(t,e,r)}destroy(){this.colorTexture.source.off("resize",this.onSourceResize,this),this._managedColorTextures&&this.colorTextures.forEach(t=>{t.destroy()}),this.depthStencilTexture&&(this.depthStencilTexture.destroy(),delete this.depthStencilTexture)}};vo.defaultOptions={width:0,height:0,resolution:1,colorTextures:1,stencil:!1,depth:!1,antialias:!1,isRoot:!1};let Yh=vo;const Cn=class bo{get autoDensity(){return this.texture.source.autoDensity}set autoDensity(t){this.texture.source.autoDensity=t}get resolution(){return this.texture.source._resolution}set resolution(t){this.texture.source.resize(this.texture.source.width,this.texture.source.height,t)}init(t){t={...bo.defaultOptions,...t},t.view&&(D(at,"ViewSystem.view has been renamed to ViewSystem.canvas"),t.canvas=t.view),this.screen=new lt(0,0,t.width,t.height),this.canvas=t.canvas||rt.get().createCanvas(),this.antialias=!!t.antialias,this.texture=Xh(this.canvas,t),this.renderTarget=new Yh({colorTextures:[this.texture],depth:!!t.depth,isRoot:!0}),this.texture.source.transparent=t.backgroundAlpha<1,this.resolution=t.resolution}resize(t,e,r){this.texture.source.resize(t,e,r),this.screen.width=this.texture.frame.width,this.screen.height=this.texture.frame.height}destroy(t=!1){(typeof t=="boolean"?t:!!t?.removeView)&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}};Cn.extension={type:[B.WebGLSystem,B.WebGPUSystem,B.CanvasSystem],name:"view",priority:0};Cn.defaultOptions={width:800,height:600,autoDensity:!1,antialias:!1};let Hh=Cn;mt.add(aa,la);var ft=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,dt=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}`,jh=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uGamma;
uniform float uContrast;
uniform float uSaturation;
uniform float uBrightness;
uniform vec4 uColor;

void main()
{
    vec4 c = texture(uTexture, vTextureCoord);

    if (c.a > 0.0) {
        c.rgb /= c.a;

        vec3 rgb = pow(c.rgb, vec3(1. / uGamma));
        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, uSaturation), uContrast);
        rgb.r *= uColor.r;
        rgb.g *= uColor.g;
        rgb.b *= uColor.b;
        c.rgb = rgb * uBrightness;

        c.rgb *= c.a;
    }

    finalColor = c * uColor.a;
}
`,qh=`struct AdjustmentUniforms {
  uGamma: f32,
  uContrast: f32,
  uSaturation: f32,
  uBrightness: f32,
  uColor: vec4<f32>,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> adjustmentUniforms : AdjustmentUniforms;

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
  var sample = textureSample(uTexture, uSampler, uv);
  let color = adjustmentUniforms.uColor;

  if (sample.a > 0.0) 
  {
    sample = vec4<f32>(sample.rgb / sample.a, sample.a);
    var rgb: vec3<f32> = pow(sample.rgb, vec3<f32>(1. / adjustmentUniforms.uGamma));
    rgb = mix(vec3<f32>(.5), mix(vec3<f32>(dot(vec3<f32>(.2125, .7154, .0721), rgb)), rgb, adjustmentUniforms.uSaturation), adjustmentUniforms.uContrast);
    rgb.r *= color.r;
    rgb.g *= color.g;
    rgb.b *= color.b;
    sample = vec4<f32>(rgb.rgb * adjustmentUniforms.uBrightness, sample.a);
    sample = vec4<f32>(sample.rgb * sample.a, sample.a);
  }

  return sample * color.a;
}`,Kh=Object.defineProperty,Zh=(n,t,e)=>t in n?Kh(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,So=(n,t,e)=>(Zh(n,typeof t!="symbol"?t+"":t,e),e);const wo=class Ao extends st{constructor(t){t={...Ao.DEFAULT_OPTIONS,...t};const e=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:qh,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:jh,name:"adjustment-filter"});super({gpuProgram:e,glProgram:r,resources:{adjustmentUniforms:{uGamma:{value:t.gamma,type:"f32"},uContrast:{value:t.contrast,type:"f32"},uSaturation:{value:t.saturation,type:"f32"},uBrightness:{value:t.brightness,type:"f32"},uColor:{value:[t.red,t.green,t.blue,t.alpha],type:"vec4<f32>"}}}}),So(this,"uniforms"),this.uniforms=this.resources.adjustmentUniforms.uniforms}get gamma(){return this.uniforms.uGamma}set gamma(t){this.uniforms.uGamma=t}get contrast(){return this.uniforms.uContrast}set contrast(t){this.uniforms.uContrast=t}get saturation(){return this.uniforms.uSaturation}set saturation(t){this.uniforms.uSaturation=t}get brightness(){return this.uniforms.uBrightness}set brightness(t){this.uniforms.uBrightness=t}get red(){return this.uniforms.uColor[0]}set red(t){this.uniforms.uColor[0]=t}get green(){return this.uniforms.uColor[1]}set green(t){this.uniforms.uColor[1]=t}get blue(){return this.uniforms.uColor[2]}set blue(t){this.uniforms.uColor[2]=t}get alpha(){return this.uniforms.uColor[3]}set alpha(t){this.uniforms.uColor[3]=t}};So(wo,"DEFAULT_OPTIONS",{gamma:1,contrast:1,saturation:1,brightness:1,red:1,green:1,blue:1,alpha:1});let Qh=wo;var Jh=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uOffset;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture(uTexture, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample top right pixel
    color += texture(uTexture, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample bottom right pixel
    color += texture(uTexture, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));

    // Sample bottom left pixel
    color += texture(uTexture, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));

    // Average
    color *= 0.25;

    finalColor = color;
}`,tf=`struct KawaseBlurUniforms {
  uOffset:vec2<f32>,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> kawaseBlurUniforms : KawaseBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOffset = kawaseBlurUniforms.uOffset;
  var color: vec4<f32> = vec4<f32>(0.0);

  // Sample top left pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y));
  // Sample top right pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y));
  // Sample bottom right pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y));
  // Sample bottom left pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y));
  // Average
  color *= 0.25;

  return color;
}`,ef=`
precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uOffset;

uniform vec4 uInputClamp;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample top right pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample bottom right pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample bottom left pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Average
    color *= 0.25;

    finalColor = color;
}
`,rf=`struct KawaseBlurUniforms {
  uOffset:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> kawaseBlurUniforms : KawaseBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOffset = kawaseBlurUniforms.uOffset;
  var color: vec4<f32> = vec4(0.0);

  // Sample top left pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample top right pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample bottom right pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample bottom left pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Average
  color *= 0.25;
    
  return color;
}`,nf=Object.defineProperty,sf=(n,t,e)=>t in n?nf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,Zt=(n,t,e)=>(sf(n,typeof t!="symbol"?t+"":t,e),e);const Co=class To extends st{constructor(...t){let e=t[0]??{};(typeof e=="number"||Array.isArray(e))&&(D("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),e={strength:e},t[1]!==void 0&&(e.quality=t[1]),t[2]!==void 0&&(e.clamp=t[2])),e={...To.DEFAULT_OPTIONS,...e};const r=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:e?.clamp?rf:tf,entryPoint:"mainFragment"}}),i=J.from({vertex:ft,fragment:e?.clamp?ef:Jh,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:i,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Zt(this,"uniforms"),Zt(this,"_pixelSize",{x:0,y:0}),Zt(this,"_clamp"),Zt(this,"_kernels",[]),Zt(this,"_blur"),Zt(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=e.pixelSize??{x:1,y:1},Array.isArray(e.strength)?this.kernels=e.strength:typeof e.strength=="number"&&(this._blur=e.strength,this.quality=e.quality??3),this._clamp=!!e.clamp}apply(t,e,r,i){const s=this.pixelSizeX/e.source.width,o=this.pixelSizeY/e.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*s,this.uniforms.uOffset[1]=a*o,t.applyFilter(this,e,r,i);else{const l=wt.getSameSizeTexture(e);let u=e,c=l,h;const d=this._quality-1;for(let f=0;f<d;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*s,this.uniforms.uOffset[1]=a*o,t.applyFilter(this,u,c,!0),h=u,u=c,c=h;a=this._kernels[d]+.5,this.uniforms.uOffset[0]=a*s,this.uniforms.uOffset[1]=a*o,t.applyFilter(this,u,r,i),wt.returnTexture(l)}}get strength(){return this._blur}set strength(t){this._blur=t,this._generateKernels()}get quality(){return this._quality}set quality(t){this._quality=Math.max(1,Math.round(t)),this._generateKernels()}get kernels(){return this._kernels}set kernels(t){Array.isArray(t)&&t.length>0?(this._kernels=t,this._quality=t.length,this._blur=Math.max(...t)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(t){if(typeof t=="number"){this.pixelSizeX=this.pixelSizeY=t;return}if(Array.isArray(t)){this.pixelSizeX=t[0],this.pixelSizeY=t[1];return}this._pixelSize=t}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(t){this.pixelSize.x=t}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(t){this.pixelSize.y=t}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((t,e)=>t+e+.5,0))}_generateKernels(){const t=this._blur,e=this._quality,r=[t];if(t>0){let i=t;const s=t/e;for(let o=1;o<e;o++)i-=s,r.push(i)}this._kernels=r,this._updatePadding()}};Zt(Co,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Po=Co;var of=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uSize;
uniform vec3 uColor;
uniform float uReplaceColor;

uniform vec4 uInputSize;

vec2 mapCoord( vec2 coord )
{
    coord *= uInputSize.xy;
    coord += uInputSize.zw;

    return coord;
}

vec2 unmapCoord( vec2 coord )
{
    coord -= uInputSize.zw;
    coord /= uInputSize.xy;

    return coord;
}

vec2 pixelate(vec2 coord, vec2 size)
{
    return floor(coord / size) * size;
}

vec2 getMod(vec2 coord, vec2 size)
{
    return mod(coord, size) / size;
}

float character(float n, vec2 p)
{
    p = floor(p*vec2(4.0, 4.0) + 2.5);

    if (clamp(p.x, 0.0, 4.0) == p.x)
    {
        if (clamp(p.y, 0.0, 4.0) == p.y)
        {
            if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;
        }
    }
    return 0.0;
}

void main()
{
    vec2 coord = mapCoord(vTextureCoord);

    // get the grid position
    vec2 pixCoord = pixelate(coord, vec2(uSize));
    pixCoord = unmapCoord(pixCoord);

    // sample the color at grid position
    vec4 color = texture(uTexture, pixCoord);

    // brightness of the color as it's perceived by the human eye
    float gray = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;

    // determine the character to use
    float n =  65536.0;             // .
    if (gray > 0.2) n = 65600.0;    // :
    if (gray > 0.3) n = 332772.0;   // *
    if (gray > 0.4) n = 15255086.0; // o
    if (gray > 0.5) n = 23385164.0; // &
    if (gray > 0.6) n = 15252014.0; // 8
    if (gray > 0.7) n = 13199452.0; // @
    if (gray > 0.8) n = 11512810.0; // #

    // get the mod..
    vec2 modd = getMod(coord, vec2(uSize));

    finalColor = (uReplaceColor > 0.5 ? vec4(uColor, 1.) : color) * character( n, vec2(-1.0) + modd * 2.0);
}
`,af=`struct AsciiUniforms {
    uSize: f32,
    uColor: vec3<f32>,
    uReplaceColor: f32,
};

struct GlobalFilterUniforms {
    uInputSize:vec4<f32>,
    uInputPixel:vec4<f32>,
    uInputClamp:vec4<f32>,
    uOutputFrame:vec4<f32>,
    uGlobalFrame:vec4<f32>,
    uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> asciiUniforms : AsciiUniforms;

@fragment
fn mainFragment(
    @location(0) uv: vec2<f32>,
    @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
    let pixelSize: f32 = asciiUniforms.uSize;
    let coord: vec2<f32> = mapCoord(uv);

    // get the rounded color..
    var pixCoord: vec2<f32> = pixelate(coord, vec2<f32>(pixelSize));
    pixCoord = unmapCoord(pixCoord);

    var color = textureSample(uTexture, uSampler, pixCoord);

    // determine the character to use
    let gray: f32 = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;
    
    var n: f32 = 65536.0; // .
    if (gray > 0.2) {
        n = 65600.0;    // :
    }
    if (gray > 0.3) {
        n = 332772.0;   // *
    }
    if (gray > 0.4) {
        n = 15255086.0; // o
    }
    if (gray > 0.5) {
        n = 23385164.0; // &
    }
    if (gray > 0.6) {
        n = 15252014.0; // 8
    }
    if (gray > 0.7) {
        n = 13199452.0; // @
    }
    if (gray > 0.8) {
        n = 11512810.0; // #
    }

    // get the mod..
    let modd: vec2<f32> = getMod(coord, vec2<f32>(pixelSize));
    return select(color, vec4<f32>(asciiUniforms.uColor, 1.), asciiUniforms.uReplaceColor > 0.5) * character(n, vec2<f32>(-1.0) + modd * 2.0);
}

fn pixelate(coord: vec2<f32>, size: vec2<f32>) -> vec2<f32>
{
    return floor( coord / size ) * size;
}

fn getMod(coord: vec2<f32>, size: vec2<f32>) -> vec2<f32>
{
    return moduloVec2( coord , size) / size;
}

fn character(n: f32, p: vec2<f32>) -> f32
{
    var q: vec2<f32> = floor(p*vec2<f32>(4.0, 4.0) + 2.5);

    if (clamp(q.x, 0.0, 4.0) == q.x)
    {
        if (clamp(q.y, 0.0, 4.0) == q.y)
        {
        if (i32(modulo(n/exp2(q.x + 5.0*q.y), 2.0)) == 1)
        {
            return 1.0;
        }
        }
    }

    return 0.0;
}

fn modulo(x: f32, y: f32) -> f32
{
  return x - y * floor(x/y);
}

fn moduloVec2(x: vec2<f32>, y: vec2<f32>) -> vec2<f32>
{
  return x - y * floor(x/y);
}

fn mapCoord(coord: vec2<f32> ) -> vec2<f32>
{
    var mappedCoord: vec2<f32> = coord;
    mappedCoord *= gfu.uInputSize.xy;
    mappedCoord += gfu.uOutputFrame.xy;
    return mappedCoord;
}

fn unmapCoord(coord: vec2<f32> ) -> vec2<f32>
{
    var mappedCoord: vec2<f32> = coord;
    mappedCoord -= gfu.uOutputFrame.xy;
    mappedCoord /= gfu.uInputSize.xy;
    return mappedCoord;
}`,lf=Object.defineProperty,uf=(n,t,e)=>t in n?lf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,rn=(n,t,e)=>(uf(n,typeof t!="symbol"?t+"":t,e),e);const Fo=class Mo extends st{constructor(...t){let e=t[0]??{};typeof e=="number"&&(D("6.0.0","AsciiFilter constructor params are now options object. See params: { size, color, replaceColor }"),e={size:e});const r=e?.color&&e.replaceColor!==!1;e={...Mo.DEFAULT_OPTIONS,...e};const i=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:af,entryPoint:"mainFragment"}}),s=J.from({vertex:ft,fragment:of,name:"ascii-filter"});super({gpuProgram:i,glProgram:s,resources:{asciiUniforms:{uSize:{value:e.size,type:"f32"},uColor:{value:new Float32Array(3),type:"vec3<f32>"},uReplaceColor:{value:Number(r),type:"f32"}}}}),rn(this,"uniforms"),rn(this,"_color"),this.uniforms=this.resources.asciiUniforms.uniforms,this._color=new Q,this.color=e.color??16777215}get size(){return this.uniforms.uSize}set size(t){this.uniforms.uSize=t}get color(){return this._color.value}set color(t){this._color.setValue(t);const[e,r,i]=this._color.toArray();this.uniforms.uColor[0]=e,this.uniforms.uColor[1]=r,this.uniforms.uColor[2]=i}get replaceColor(){return this.uniforms.uReplaceColor>.5}set replaceColor(t){this.uniforms.uReplaceColor=t?1:0}};rn(Fo,"DEFAULT_OPTIONS",{size:8,color:16777215,replaceColor:!1});let cf=Fo;var hf=Object.defineProperty,ff=(n,t,e)=>t in n?hf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,We=(n,t,e)=>(ff(n,typeof t!="symbol"?t+"":t,e),e);const Io=class zo extends Oh{constructor(...t){let e=t[0]??{};if(typeof e=="number"||Array.isArray(e)||"x"in e&&"y"in e){D("6.0.0","BloomFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }");let r=e;Array.isArray(r)&&(r={x:r[0],y:r[1]}),e={strength:r},t[1]!==void 0&&(e.quality=t[1]),t[2]!==void 0&&(e.resolution=t[2]),t[3]!==void 0&&(e.kernelSize=t[3])}e={...zo.DEFAULT_OPTIONS,...e},super(),We(this,"_blurXFilter"),We(this,"_blurYFilter"),We(this,"_strength"),this._strength={x:2,y:2},e.strength&&(typeof e.strength=="number"?(this._strength.x=e.strength,this._strength.y=e.strength):(this._strength.x=e.strength.x,this._strength.y=e.strength.y)),this._blurXFilter=new Se({...e,horizontal:!0,strength:this.strengthX}),this._blurYFilter=new Se({...e,horizontal:!1,strength:this.strengthY}),this._blurYFilter.blendMode="screen",Object.assign(this,e)}apply(t,e,r,i){const s=wt.getSameSizeTexture(e);t.applyFilter(this,e,r,i),this._blurXFilter.apply(t,e,s,!0),this._blurYFilter.apply(t,s,r,!1),wt.returnTexture(s)}get strength(){return this._strength}set strength(t){this._strength=typeof t=="number"?{x:t,y:t}:t,this._updateStrength()}get strengthX(){return this.strength.x}set strengthX(t){this.strength.x=t,this._updateStrength()}get strengthY(){return this.strength.y}set strengthY(t){this.strength.y=t,this._updateStrength()}_updateStrength(){this._blurXFilter.blur=this.strengthX,this._blurYFilter.blur=this.strengthY}get blur(){return D("6.0.0","BloomFilter.blur is deprecated, please use BloomFilter.strength instead"),this.strengthX}set blur(t){D("6.0.0","BloomFilter.blur is deprecated, please use BloomFilter.strength instead"),this.strength=t}get blurX(){return D("6.0.0","BloomFilter.blurX is deprecated, please use BloomFilter.strengthX instead"),this.strengthX}set blurX(t){D("6.0.0","BloomFilter.blurX is deprecated, please use BloomFilter.strengthX instead"),this.strengthX=t}get blurY(){return D("6.0.0","BloomFilter.blurY is deprecated, please use BloomFilter.strengthY instead"),this.strengthY}set blurY(t){D("6.0.0","BloomFilter.blurY is deprecated, please use BloomFilter.strengthY instead"),this.strengthY=t}};We(Io,"DEFAULT_OPTIONS",{strength:{x:2,y:2},quality:4,resolution:1,kernelSize:5});let df=Io;var pf=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uDimensions;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uStrength;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

void main()
{
    vec2 coord = vTextureCoord * uInputSize.xy;
    coord -= uCenter * uDimensions.xy;
    float distance = length(coord);

    if (distance < uRadius) {
        float percent = distance / uRadius;
        if (uStrength > 0.0) {
            coord *= mix(1.0, smoothstep(0.0, uRadius / distance, percent), uStrength * 0.75);
        } else {
            coord *= mix(1.0, pow(percent, 1.0 + uStrength * 0.75) * uRadius / distance, 1.0 - percent);
        }
    }

    coord += uCenter * uDimensions.xy;
    coord /= uInputSize.xy;
    vec2 clampedCoord = clamp(coord, uInputClamp.xy, uInputClamp.zw);
    vec4 color = texture(uTexture, clampedCoord);

    if (coord != clampedCoord) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    finalColor = color;
}
`,mf=`struct BulgePinchUniforms {
  uDimensions: vec2<f32>,
  uCenter: vec2<f32>,
  uRadius: f32,
  uStrength: f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> bulgePinchUniforms : BulgePinchUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let dimensions: vec2<f32> = bulgePinchUniforms.uDimensions;
  let center: vec2<f32> = bulgePinchUniforms.uCenter;
  let radius: f32 = bulgePinchUniforms.uRadius;
  let strength: f32 = bulgePinchUniforms.uStrength;
  var coord: vec2<f32> = (uv * gfu.uInputSize.xy) - center * dimensions.xy;

  let distance: f32 = length(coord);

  if (distance < radius) {
      let percent: f32 = distance / radius;
      if (strength > 0.0) {
          coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);
      } else {
          coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);
      }
  }
    coord += (center * dimensions.xy);
    coord /= gfu.uInputSize.xy;

    let clampedCoord: vec2<f32> = clamp(coord, gfu.uInputClamp.xy, gfu.uInputClamp.zw);
    var color: vec4<f32> = textureSample(uTexture, uSampler, clampedCoord);
    if (coord.x != clampedCoord.x && coord.y != clampedCoord.y) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    return color;
}

fn compareVec2(x: vec2<f32>, y: vec2<f32>) -> bool
{
  if (x.x == y.x && x.y == y.y)
  {
    return true;
  }

  return false;
}`,gf=Object.defineProperty,xf=(n,t,e)=>t in n?gf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,Ro=(n,t,e)=>(xf(n,typeof t!="symbol"?t+"":t,e),e);const Eo=class ko extends st{constructor(t){t={...ko.DEFAULT_OPTIONS,...t};const e=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:mf,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:pf,name:"bulge-pinch-filter"});super({gpuProgram:e,glProgram:r,resources:{bulgePinchUniforms:{uDimensions:{value:[0,0],type:"vec2<f32>"},uCenter:{value:t.center,type:"vec2<f32>"},uRadius:{value:t.radius,type:"f32"},uStrength:{value:t.strength,type:"f32"}}}}),Ro(this,"uniforms"),this.uniforms=this.resources.bulgePinchUniforms.uniforms,Object.assign(this,t)}apply(t,e,r,i){this.uniforms.uDimensions[0]=e.frame.width,this.uniforms.uDimensions[1]=e.frame.height,t.applyFilter(this,e,r,i)}get center(){return this.uniforms.uCenter}set center(t){typeof t=="number"&&(t={x:t,y:t}),Array.isArray(t)&&(t={x:t[0],y:t[1]}),this.uniforms.uCenter=t}get centerX(){return this.uniforms.uCenter.x}set centerX(t){this.uniforms.uCenter.x=t}get centerY(){return this.uniforms.uCenter.y}set centerY(t){this.uniforms.uCenter.y=t}get radius(){return this.uniforms.uRadius}set radius(t){this.uniforms.uRadius=t}get strength(){return this.uniforms.uStrength}set strength(t){this.uniforms.uStrength=t}};Ro(Eo,"DEFAULT_OPTIONS",{center:{x:.5,y:.5},radius:100,strength:1});let yf=Eo;var vf=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uAngle;
uniform float uScale;
uniform bool uGrayScale;

uniform vec4 uInputSize;

float pattern()
{
    float s = sin(uAngle), c = cos(uAngle);
    vec2 tex = vTextureCoord * uInputSize.xy;
    vec2 point = vec2(
        c * tex.x - s * tex.y,
        s * tex.x + c * tex.y
    ) * uScale;
    return (sin(point.x) * sin(point.y)) * 4.0;
    }

    void main()
    {
    vec4 color = texture(uTexture, vTextureCoord);
    vec3 colorRGB = vec3(color);

    if (uGrayScale)
    {
        colorRGB = vec3(color.r + color.g + color.b) / 3.0;
    }

    finalColor = vec4(colorRGB * 10.0 - 5.0 + pattern(), color.a);
}
`,_f=`struct DotUniforms {
  uScale:f32,
  uAngle:f32,
  uGrayScale:f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> dotUniforms : DotUniforms;

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
  let color: vec4<f32> = textureSample(uTexture, uSampler, uv);
  let gray: vec3<f32> = vec3<f32>(dot(color.rgb, vec3<f32>(0.299, 0.587, 0.114)));
  // dotUniforms.uGrayScale == 1 doesn't ever pass so it is converted to a float and compared to 0.5 instead 
  let finalColor: vec3<f32> = select(color.rgb, gray, f32(dotUniforms.uGrayScale) >= 0.5);

  return vec4<f32>(finalColor * 10.0 - 5.0 + pattern(uv), color.a);
}

fn pattern(uv: vec2<f32>) -> f32
{
  let s: f32 = sin(dotUniforms.uAngle);
  let c: f32 = cos(dotUniforms.uAngle);
  
  let tex: vec2<f32> = uv * gfu.uInputSize.xy;
  
  let p: vec2<f32> = vec2<f32>(
      c * tex.x - s * tex.y,
      s * tex.x + c * tex.y
  ) * dotUniforms.uScale;

  return (sin(p.x) * sin(p.y)) * 4.0;
}`,bf=Object.defineProperty,Sf=(n,t,e)=>t in n?bf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,wf=(n,t,e)=>(Sf(n,t+"",e),e);const Bo=class Oo extends st{constructor(...t){let e=t[0]??{};typeof e=="number"&&(D("6.0.0","DotFilter constructor params are now options object. See params: { scale, angle, grayscale }"),e={scale:e},t[1]!==void 0&&(e.angle=t[1]),t[2]!==void 0&&(e.grayscale=t[2])),e={...Oo.DEFAULT_OPTIONS,...e};const r={uScale:{value:e.scale,type:"f32"},uAngle:{value:e.angle,type:"f32"},uGrayScale:{value:e.grayscale?1:0,type:"f32"}},i=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:_f,entryPoint:"mainFragment"}}),s=J.from({vertex:ft,fragment:vf,name:"dot-filter"});super({gpuProgram:i,glProgram:s,resources:{dotUniforms:r}})}get scale(){return this.resources.dotUniforms.uniforms.uScale}set scale(t){this.resources.dotUniforms.uniforms.uScale=t}get angle(){return this.resources.dotUniforms.uniforms.uAngle}set angle(t){this.resources.dotUniforms.uniforms.uAngle=t}get grayscale(){return this.resources.dotUniforms.uniforms.uGrayScale===1}set grayscale(t){this.resources.dotUniforms.uniforms.uGrayScale=t?1:0}};wf(Bo,"DEFAULT_OPTIONS",{scale:1,angle:5,grayscale:!0});let Af=Bo;var Cf=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec3 uColor;
uniform vec2 uOffset;

uniform vec4 uInputSize;

void main(void){
    vec4 sample = texture(uTexture, vTextureCoord - uOffset * uInputSize.zw);

    // Premultiply alpha
    sample.rgb = uColor.rgb * sample.a;

    // alpha user alpha
    sample *= uAlpha;

    finalColor = sample;
}`,Tf=`struct DropShadowUniforms {
  uAlpha: f32,
  uColor: vec3<f32>,
  uOffset: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> dropShadowUniforms : DropShadowUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  var color: vec4<f32> = textureSample(uTexture, uSampler, uv - dropShadowUniforms.uOffset * gfu.uInputSize.zw);

  // Premultiply alpha
  color = vec4<f32>(vec3<f32>(dropShadowUniforms.uColor.rgb * color.a), color.a);
  // alpha user alpha
  color *= dropShadowUniforms.uAlpha;

  return color;
}`,Pf=Object.defineProperty,Ff=(n,t,e)=>t in n?Pf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,re=(n,t,e)=>(Ff(n,typeof t!="symbol"?t+"":t,e),e);const Go=class Uo extends st{constructor(t){t={...Uo.DEFAULT_OPTIONS,...t};const e=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:Tf,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:Cf,name:"drop-shadow-filter"});super({gpuProgram:e,glProgram:r,resources:{dropShadowUniforms:{uAlpha:{value:t.alpha,type:"f32"},uColor:{value:new Float32Array(3),type:"vec3<f32>"},uOffset:{value:t.offset,type:"vec2<f32>"}}},resolution:t.resolution}),re(this,"uniforms"),re(this,"shadowOnly",!1),re(this,"_color"),re(this,"_blurFilter"),re(this,"_basePass"),this.uniforms=this.resources.dropShadowUniforms.uniforms,this._color=new Q,this.color=t.color??0,this._blurFilter=new Po({strength:t.kernels??t.blur,quality:t.kernels?void 0:t.quality}),this._basePass=new st({gpuProgram:K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:`
                    @group(0) @binding(1) var uTexture: texture_2d<f32>; 
                    @group(0) @binding(2) var uSampler: sampler;
                    @fragment
                    fn mainFragment(
                        @builtin(position) position: vec4<f32>,
                        @location(0) uv : vec2<f32>
                    ) -> @location(0) vec4<f32> {
                        return textureSample(uTexture, uSampler, uv);
                    }
                    `,entryPoint:"mainFragment"}}),glProgram:J.from({vertex:ft,fragment:`
                in vec2 vTextureCoord;
                out vec4 finalColor;
                uniform sampler2D uTexture;

                void main(void){
                    finalColor = texture(uTexture, vTextureCoord);
                }
                `,name:"drop-shadow-filter"}),resources:{}}),Object.assign(this,t)}apply(t,e,r,i){const s=wt.getSameSizeTexture(e);t.applyFilter(this,e,s,!0),this._blurFilter.apply(t,s,r,i),this.shadowOnly||t.applyFilter(this._basePass,e,r,!1),wt.returnTexture(s)}get offset(){return this.uniforms.uOffset}set offset(t){this.uniforms.uOffset=t,this._updatePadding()}get offsetX(){return this.offset.x}set offsetX(t){this.offset.x=t,this._updatePadding()}get offsetY(){return this.offset.y}set offsetY(t){this.offset.y=t,this._updatePadding()}get color(){return this._color.value}set color(t){this._color.setValue(t);const[e,r,i]=this._color.toArray();this.uniforms.uColor[0]=e,this.uniforms.uColor[1]=r,this.uniforms.uColor[2]=i}get alpha(){return this.uniforms.uAlpha}set alpha(t){this.uniforms.uAlpha=t}get blur(){return this._blurFilter.strength}set blur(t){this._blurFilter.strength=t,this._updatePadding()}get quality(){return this._blurFilter.quality}set quality(t){this._blurFilter.quality=t,this._updatePadding()}get kernels(){return this._blurFilter.kernels}set kernels(t){this._blurFilter.kernels=t}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(t){typeof t=="number"&&(t={x:t,y:t}),Array.isArray(t)&&(t={x:t[0],y:t[1]}),this._blurFilter.pixelSize=t}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(t){this._blurFilter.pixelSizeX=t}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(t){this._blurFilter.pixelSizeY=t}_updatePadding(){const t=Math.max(Math.abs(this.offsetX),Math.abs(this.offsetY));this.padding=t+this.blur*2+this.quality*4}};re(Go,"DEFAULT_OPTIONS",{offset:{x:4,y:4},color:0,alpha:.5,shadowOnly:!1,kernels:void 0,blur:2,quality:3,pixelSize:{x:1,y:1},resolution:1});let Mf=Go;var If=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uStrength;

uniform vec4 uInputSize;

void main(void)
{
	vec2 onePixel = vec2(1.0 / uInputSize);

	vec4 color;

	color.rgb = vec3(0.5);

	color -= texture(uTexture, vTextureCoord - onePixel) * uStrength;
	color += texture(uTexture, vTextureCoord + onePixel) * uStrength;

	color.rgb = vec3((color.r + color.g + color.b) / 3.0);

	float alpha = texture(uTexture, vTextureCoord).a;

	finalColor = vec4(color.rgb * alpha, alpha);
}
`,zf=`struct EmbossUniforms {
  uStrength:f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> embossUniforms : EmbossUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let onePixel: vec2<f32> = vec2<f32>(1.0 / gfu.uInputSize.xy);
	var color: vec3<f32> = vec3<f32>(0.5);

	color -= (textureSample(uTexture, uSampler, uv - onePixel) * embossUniforms.uStrength).rgb;
	color += (textureSample(uTexture, uSampler, uv + onePixel) * embossUniforms.uStrength).rgb;

	color = vec3<f32>((color.r + color.g + color.b) / 3.0);

	let blendColor: vec4<f32> = textureSample(uTexture, uSampler, uv);

	return vec4<f32>(color.rgb * blendColor.a, blendColor.a);
}`,Rf=Object.defineProperty,Ef=(n,t,e)=>t in n?Rf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,kf=(n,t,e)=>(Ef(n,t+"",e),e);class Bf extends st{constructor(t=5){const e=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:zf,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:If,name:"emboss-filter"});super({gpuProgram:e,glProgram:r,resources:{embossUniforms:{uStrength:{value:t,type:"f32"}}}}),kf(this,"uniforms"),this.uniforms=this.resources.embossUniforms.uniforms}get strength(){return this.uniforms.uStrength}set strength(t){this.uniforms.uStrength=t}}var Of=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uDisplacementMap;
uniform float uSeed;
uniform vec2 uDimensions;
uniform float uAspect;
uniform float uFillMode;
uniform float uOffset;
uniform float uDirection;
uniform vec2 uRed;
uniform vec2 uGreen;
uniform vec2 uBlue;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

const int TRANSPARENT = 0;
const int ORIGINAL = 1;
const int LOOP = 2;
const int CLAMP = 3;
const int MIRROR = 4;

void main(void)
{
    vec2 coord = (vTextureCoord * uInputSize.xy) / uDimensions;

    if (coord.x > 1.0 || coord.y > 1.0) {
        return;
    }

    float sinDir = sin(uDirection);
    float cosDir = cos(uDirection);

    float cx = coord.x - 0.5;
    float cy = (coord.y - 0.5) * uAspect;
    float ny = (-sinDir * cx + cosDir * cy) / uAspect + 0.5;

    // displacementMap: repeat
    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);

    // displacementMap: mirror
    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);

    vec4 dc = texture(uDisplacementMap, vec2(0.5, ny));

    float displacement = (dc.r - dc.g) * (uOffset / uInputSize.x);

    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * uAspect);

    int fillMode = int(uFillMode);

    if (fillMode == CLAMP) {
        coord = clamp(coord, uInputClamp.xy, uInputClamp.zw);
    } else {
        if( coord.x > uInputClamp.z ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.x -= uInputClamp.z;
            } else if (fillMode == MIRROR) {
                coord.x = uInputClamp.z * 2.0 - coord.x;
            }
        } else if( coord.x < uInputClamp.x ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.x += uInputClamp.z;
            } else if (fillMode == MIRROR) {
                coord.x *= -uInputClamp.z;
            }
        }

        if( coord.y > uInputClamp.w ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.y -= uInputClamp.w;
            } else if (fillMode == MIRROR) {
                coord.y = uInputClamp.w * 2.0 - coord.y;
            }
        } else if( coord.y < uInputClamp.y ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.y += uInputClamp.w;
            } else if (fillMode == MIRROR) {
                coord.y *= -uInputClamp.w;
            }
        }
    }

    finalColor.r = texture(uTexture, coord + uRed * (1.0 - uSeed * 0.4) / uInputSize.xy).r;
    finalColor.g = texture(uTexture, coord + uGreen * (1.0 - uSeed * 0.3) / uInputSize.xy).g;
    finalColor.b = texture(uTexture, coord + uBlue * (1.0 - uSeed * 0.2) / uInputSize.xy).b;
    finalColor.a = texture(uTexture, coord).a;
}
`,Gf=`struct GlitchUniforms {
  uSeed: f32,
  uDimensions: vec2<f32>,
  uAspect: f32,
  uFillMode: f32,
  uOffset: f32,
  uDirection: f32,
  uRed: vec2<f32>,
  uGreen: vec2<f32>,
  uBlue: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> glitchUniforms : GlitchUniforms;
@group(1) @binding(1) var uDisplacementMap: texture_2d<f32>; 
@group(1) @binding(2) var uDisplacementSampler: sampler; 

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uSeed: f32 = glitchUniforms.uSeed;
  let uDimensions: vec2<f32> = glitchUniforms.uDimensions;
  let uAspect: f32 = glitchUniforms.uAspect;
  let uOffset: f32 = glitchUniforms.uOffset;
  let uDirection: f32 = glitchUniforms.uDirection;
  let uRed: vec2<f32> = glitchUniforms.uRed;
  let uGreen: vec2<f32> = glitchUniforms.uGreen;
  let uBlue: vec2<f32> = glitchUniforms.uBlue;

  let uInputSize: vec4<f32> = gfu.uInputSize;
  let uInputClamp: vec4<f32> = gfu.uInputClamp;

  var discarded: bool = false;
  var coord: vec2<f32> = (uv * uInputSize.xy) / uDimensions;

    if (coord.x > 1.0 || coord.y > 1.0) {
      discarded = true;
    }

    let sinDir: f32 = sin(uDirection);
    let cosDir: f32 = cos(uDirection);

    let cx: f32 = coord.x - 0.5;
    let cy: f32 = (coord.y - 0.5) * uAspect;
    var ny: f32 = (-sinDir * cx + cosDir * cy) / uAspect + 0.5;

    ny = select(select(ny, -ny, ny < 0.0), 2.0 - ny, ny > 1.0);

    let dc: vec4<f32> = textureSample(uDisplacementMap, uDisplacementSampler, vec2<f32>(0.5, ny));

    let displacement: f32 = (dc.r - dc.g) * (uOffset / uInputSize.x);

    coord = uv + vec2<f32>(cosDir * displacement, sinDir * displacement * uAspect);

    let fillMode: i32 = i32(glitchUniforms.uFillMode);

    if (fillMode == CLAMP) {
      coord = clamp(coord, uInputClamp.xy, uInputClamp.zw);
    } else {
      if (coord.x > uInputClamp.z) {
        if (fillMode == TRANSPARENT) {
          discarded = true;
        } else if (fillMode == LOOP) {
          coord.x = coord.x - uInputClamp.z;
        } else if (fillMode == MIRROR) {
          coord.x = uInputClamp.z * 2.0 - coord.x;
        }
      } else if (coord.x < uInputClamp.x) {
        if (fillMode == TRANSPARENT) {
          discarded = true;
        } else if (fillMode == LOOP) {
          coord.x = coord.x + uInputClamp.z;
        } else if (fillMode == MIRROR) {
          coord.x = coord.x * -uInputClamp.z;
        }
      }

      if (coord.y > uInputClamp.w) {
        if (fillMode == TRANSPARENT) {
          discarded = true;
        } else if (fillMode == LOOP) {
          coord.y = coord.y - uInputClamp.w;
        } else if (fillMode == MIRROR) {
          coord.y = uInputClamp.w * 2.0 - coord.y;
        }
      } else if (coord.y < uInputClamp.y) {
        if (fillMode == TRANSPARENT) {
          discarded = true;
        } else if (fillMode == LOOP) {
          coord.y = coord.y + uInputClamp.w;
        } else if (fillMode == MIRROR) {
          coord.y = coord.y * -uInputClamp.w;
        }
      }
    }

    let seedR: f32 = 1.0 - uSeed * 0.4;
    let seedG: f32 = 1.0 - uSeed * 0.3;
    let seedB: f32 = 1.0 - uSeed * 0.2;

    let offsetR: vec2<f32> = vec2(uRed.x * seedR / uInputSize.x, uRed.y * seedR / uInputSize.y);
    let offsetG: vec2<f32> = vec2(uGreen.x * seedG / uInputSize.x, uGreen.y * seedG / uInputSize.y);
    let offsetB: vec2<f32> = vec2(uBlue.x * seedB / uInputSize.x, uBlue.y * seedB / uInputSize.y);

    let r = textureSample(uTexture, uSampler, coord + offsetR).r;
    let g = textureSample(uTexture, uSampler, coord + offsetG).g;
    let b = textureSample(uTexture, uSampler, coord + offsetB).b;
    let a = textureSample(uTexture, uSampler, coord).a;

    return select(vec4<f32>(r, g, b, a), vec4<f32>(0.0,0.0,0.0,0.0), discarded);
}

const TRANSPARENT: i32 = 0;
const ORIGINAL: i32 = 1;
const LOOP: i32 = 2;
const CLAMP: i32 = 3;
const MIRROR: i32 = 4;`,Uf=Object.defineProperty,Df=(n,t,e)=>t in n?Uf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,kt=(n,t,e)=>(Df(n,typeof t!="symbol"?t+"":t,e),e);const Do=class Lo extends st{constructor(t){t={...Lo.defaults,...t};const e=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:Gf,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:Of,name:"glitch-filter"}),i=document.createElement("canvas");i.width=4,i.height=t.sampleSize??512;const s=new N({source:new Nt({resource:i})});super({gpuProgram:e,glProgram:r,resources:{glitchUniforms:{uSeed:{value:t?.seed??0,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"},uAspect:{value:1,type:"f32"},uFillMode:{value:t?.fillMode??0,type:"f32"},uOffset:{value:t?.offset??100,type:"f32"},uDirection:{value:t?.direction??0,type:"f32"},uRed:{value:t.red,type:"vec2<f32>"},uGreen:{value:t.green,type:"vec2<f32>"},uBlue:{value:t.blue,type:"vec2<f32>"}},uDisplacementMap:s.source,uDisplacementSampler:s.source.style}}),kt(this,"uniforms"),kt(this,"average",!1),kt(this,"minSize",8),kt(this,"sampleSize",512),kt(this,"_canvas"),kt(this,"texture"),kt(this,"_slices",0),kt(this,"_sizes",new Float32Array(1)),kt(this,"_offsets",new Float32Array(1)),this.uniforms=this.resources.glitchUniforms.uniforms,this._canvas=i,this.texture=s,Object.assign(this,t)}apply(t,e,r,i){const{width:s,height:o}=e.frame;this.uniforms.uDimensions[0]=s,this.uniforms.uDimensions[1]=o,this.uniforms.uAspect=o/s,t.applyFilter(this,e,r,i)}_randomizeSizes(){const t=this._sizes,e=this._slices-1,r=this.sampleSize,i=Math.min(this.minSize/r,.9/this._slices);if(this.average){const s=this._slices;let o=1;for(let a=0;a<e;a++){const l=o/(s-a),u=Math.max(l*(1-Math.random()*.6),i);t[a]=u,o-=u}t[e]=o}else{let s=1;const o=Math.sqrt(1/this._slices);for(let a=0;a<e;a++){const l=Math.max(o*s*Math.random(),i);t[a]=l,s-=l}t[e]=s}this.shuffle()}shuffle(){const t=this._sizes,e=this._slices-1;for(let r=e;r>0;r--){const i=Math.random()*r>>0,s=t[r];t[r]=t[i],t[i]=s}}_randomizeOffsets(){for(let t=0;t<this._slices;t++)this._offsets[t]=Math.random()*(Math.random()<.5?-1:1)}refresh(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()}redraw(){const t=this.sampleSize,e=this.texture,r=this._canvas.getContext("2d");r.clearRect(0,0,8,t);let i,s=0;for(let o=0;o<this._slices;o++){i=Math.floor(this._offsets[o]*256);const a=this._sizes[o]*t,l=i>0?i:0,u=i<0?-i:0;r.fillStyle=`rgba(${l}, ${u}, 0, 1)`,r.fillRect(0,s>>0,t,a+1>>0),s+=a}e.source.update()}set sizes(t){const e=Math.min(this._slices,t.length);for(let r=0;r<e;r++)this._sizes[r]=t[r]}get sizes(){return this._sizes}set offsets(t){const e=Math.min(this._slices,t.length);for(let r=0;r<e;r++)this._offsets[r]=t[r]}get offsets(){return this._offsets}get slices(){return this._slices}set slices(t){this._slices!==t&&(this._slices=t,this._sizes=new Float32Array(t),this._offsets=new Float32Array(t),this.refresh())}get offset(){return this.uniforms.uOffset}set offset(t){this.uniforms.uOffset=t}get seed(){return this.uniforms.uSeed}set seed(t){this.uniforms.uSeed=t}get fillMode(){return this.uniforms.uFillMode}set fillMode(t){this.uniforms.uFillMode=t}get direction(){return this.uniforms.uDirection/Or}set direction(t){this.uniforms.uDirection=t*Or}get red(){return this.uniforms.uRed}set red(t){Array.isArray(t)&&(t={x:t[0],y:t[1]}),this.uniforms.uRed=t}get green(){return this.uniforms.uGreen}set green(t){Array.isArray(t)&&(t={x:t[0],y:t[1]}),this.uniforms.uGreen=t}get blue(){return this.uniforms.uBlue}set blue(t){Array.isArray(t)&&(t={x:t[0],y:t[1]}),this.uniforms.uBlue=t}destroy(){this.texture?.destroy(!0),this.texture=this._canvas=this.red=this.green=this.blue=this._sizes=this._offsets=null}};kt(Do,"defaults",{slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:{x:0,y:0},green:{x:0,y:0},blue:{x:0,y:0},minSize:8,sampleSize:512});let Vi=Do;var Lf=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uStrength;
uniform vec3 uColor;
uniform float uKnockout;
uniform float uAlpha;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

const float PI = 3.14159265358979323846264;

// Hard-assignment of DIST and ANGLE_STEP_SIZE instead of using uDistance and uQuality to allow them to be use on GLSL loop conditions
const float DIST = __DIST__;
const float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.);
const float ANGLE_STEP_NUM = ceil(PI * 2. / ANGLE_STEP_SIZE);
const float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.) / 2.;

void main(void) {
    vec2 px = vec2(1.) / uInputSize.xy;

    float totalAlpha = 0.;

    vec2 direction;
    vec2 displaced;
    vec4 curColor;

    for (float angle = 0.; angle < PI * 2.; angle += ANGLE_STEP_SIZE) {
      direction = vec2(cos(angle), sin(angle)) * px;

      for (float curDistance = 0.; curDistance < DIST; curDistance++) {
          displaced = clamp(vTextureCoord + direction * (curDistance + 1.), uInputClamp.xy, uInputClamp.zw);
          curColor = texture(uTexture, displaced);
          totalAlpha += (DIST - curDistance) * curColor.a;
      }
    }
    
    curColor = texture(uTexture, vTextureCoord);

    vec4 glowColor = vec4(uColor, uAlpha);
    bool knockout = uKnockout > .5;
    float innerStrength = uStrength[0];
    float outerStrength = uStrength[1];

    float alphaRatio = totalAlpha / MAX_TOTAL_ALPHA;
    float innerGlowAlpha = (1. - alphaRatio) * innerStrength * curColor.a * uAlpha;
    float innerGlowStrength = min(1., innerGlowAlpha);
    
    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);
    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a) * uAlpha;
    float outerGlowStrength = min(1. - innerColor.a, outerGlowAlpha);
    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;

    if (knockout) {
      float resultAlpha = outerGlowAlpha + innerGlowAlpha;
      finalColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);
    }
    else {
      finalColor = innerColor + outerGlowColor;
    }
}
`,Nf=`struct GlowUniforms {
  uDistance: f32,
  uStrength: vec2<f32>,
  uColor: vec3<f32>,
  uAlpha: f32,
  uQuality: f32,
  uKnockout: f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> glowUniforms : GlowUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let quality = glowUniforms.uQuality;
  let distance = glowUniforms.uDistance;

  let dist: f32 = glowUniforms.uDistance;
  let angleStepSize: f32 = min(1. / quality / distance, PI * 2.0);
  let angleStepNum: f32 = ceil(PI * 2.0 / angleStepSize);

  let px: vec2<f32> = vec2<f32>(1.0 / gfu.uInputSize.xy);

  var totalAlpha: f32 = 0.0;

  var direction: vec2<f32>;
  var displaced: vec2<f32>;
  var curColor: vec4<f32>;

  for (var angle = 0.0; angle < PI * 2.0; angle += angleStepSize) {
    direction = vec2<f32>(cos(angle), sin(angle)) * px;
    for (var curDistance = 0.0; curDistance < dist; curDistance+=1) {
      displaced = vec2<f32>(clamp(uv + direction * (curDistance + 1.0), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
      curColor = textureSample(uTexture, uSampler, displaced);
      totalAlpha += (dist - curDistance) * curColor.a;
    }
  }
    
  curColor = textureSample(uTexture, uSampler, uv);

  let glowColorRGB = glowUniforms.uColor;
  let glowAlpha = glowUniforms.uAlpha;
  let glowColor = vec4<f32>(glowColorRGB, glowAlpha);
  let knockout: bool = glowUniforms.uKnockout > 0.5;
  let innerStrength = glowUniforms.uStrength[0];
  let outerStrength = glowUniforms.uStrength[1];

  let alphaRatio: f32 = (totalAlpha / (angleStepNum * dist * (dist + 1.0) / 2.0));
  let innerGlowAlpha: f32 = (1.0 - alphaRatio) * innerStrength * curColor.a * glowAlpha;
  let innerGlowStrength: f32 = min(1.0, innerGlowAlpha);
  
  let innerColor: vec4<f32> = mix(curColor, glowColor, innerGlowStrength);
  let outerGlowAlpha: f32 = alphaRatio * outerStrength * (1. - curColor.a) * glowAlpha;
  let outerGlowStrength: f32 = min(1.0 - innerColor.a, outerGlowAlpha);
  let outerGlowColor: vec4<f32> = outerGlowStrength * glowColor.rgba;
  
  if (knockout) {
    let resultAlpha: f32 = outerGlowAlpha + innerGlowAlpha;
    return vec4<f32>(glowColor.rgb * resultAlpha, resultAlpha);
  }
  else {
    return innerColor + outerGlowColor;
  }
}

const PI: f32 = 3.14159265358979323846264;`,$f=Object.defineProperty,Vf=(n,t,e)=>t in n?$f(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,nn=(n,t,e)=>(Vf(n,typeof t!="symbol"?t+"":t,e),e);const No=class $o extends st{constructor(t){t={...$o.DEFAULT_OPTIONS,...t};const e=t.distance??10,r=t.quality??.1,i=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:Nf,entryPoint:"mainFragment"}}),s=J.from({vertex:ft,fragment:Lf.replace(/__ANGLE_STEP_SIZE__/gi,`${(1/r/e).toFixed(7)}`).replace(/__DIST__/gi,`${e.toFixed(0)}.0`),name:"glow-filter"});super({gpuProgram:i,glProgram:s,resources:{glowUniforms:{uDistance:{value:e,type:"f32"},uStrength:{value:[t.innerStrength,t.outerStrength],type:"vec2<f32>"},uColor:{value:new Float32Array(3),type:"vec3<f32>"},uAlpha:{value:t.alpha,type:"f32"},uQuality:{value:r,type:"f32"},uKnockout:{value:t?.knockout??!1?1:0,type:"f32"}}},padding:e}),nn(this,"uniforms"),nn(this,"_color"),this.uniforms=this.resources.glowUniforms.uniforms,this._color=new Q,this.color=t.color??16777215}get distance(){return this.uniforms.uDistance}set distance(t){this.uniforms.uDistance=this.padding=t}get innerStrength(){return this.uniforms.uStrength[0]}set innerStrength(t){this.uniforms.uStrength[0]=t}get outerStrength(){return this.uniforms.uStrength[1]}set outerStrength(t){this.uniforms.uStrength[1]=t}get color(){return this._color.value}set color(t){this._color.setValue(t);const[e,r,i]=this._color.toArray();this.uniforms.uColor[0]=e,this.uniforms.uColor[1]=r,this.uniforms.uColor[2]=i}get alpha(){return this.uniforms.uAlpha}set alpha(t){this.uniforms.uAlpha=t}get quality(){return this.uniforms.uQuality}set quality(t){this.uniforms.uQuality=t}get knockout(){return this.uniforms.uKnockout===1}set knockout(t){this.uniforms.uKnockout=t?1:0}};nn(No,"DEFAULT_OPTIONS",{distance:10,outerStrength:4,innerStrength:0,color:16777215,alpha:1,quality:.1,knockout:!1});let Wf=No;var Xf=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uVelocity;
uniform int uKernelSize;
uniform float uOffset;

uniform vec4 uInputSize;

const int MAX_KERNEL_SIZE = 2048;

// Notice:
// the perfect way:
//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);
// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.
// So use uKernelSize directly.

void main(void)
{
    vec4 color = texture(uTexture, vTextureCoord);

    if (uKernelSize == 0)
    {
        finalColor = color;
        return;
    }

    vec2 velocity = uVelocity / uInputSize.xy;
    float offset = -uOffset / length(uVelocity) - 0.5;
    int k = uKernelSize - 1;

    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {
        if (i == k) {
            break;
        }
        vec2 bias = velocity * (float(i) / float(k) + offset);
        color += texture(uTexture, vTextureCoord + bias);
    }
    finalColor = color / float(uKernelSize);
}
`,Yf=`struct MotionBlurUniforms {
  uVelocity: vec2<f32>,
  uKernelSize: f32,
  uOffset: f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> motionBlurUniforms : MotionBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uVelocity = motionBlurUniforms.uVelocity;
  let uKernelSize = motionBlurUniforms.uKernelSize;
  let uOffset = motionBlurUniforms.uOffset;

  let velocity: vec2<f32> = uVelocity / gfu.uInputSize.xy;
  let offset: f32 = -uOffset / length(uVelocity) - 0.5;
  let k: i32 = i32(min(uKernelSize - 1, MAX_KERNEL_SIZE - 1));

  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);

  for(var i: i32 = 0; i < k; i += 1) {
    let bias: vec2<f32> = velocity * (f32(i) / f32(k) + offset);
    color += textureSample(uTexture, uSampler, uv + bias);
  }
  
  return select(color / f32(uKernelSize), textureSample(uTexture, uSampler, uv), uKernelSize == 0);
}

const MAX_KERNEL_SIZE: f32 = 2048;`,Hf=Object.defineProperty,jf=(n,t,e)=>t in n?Hf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,sn=(n,t,e)=>(jf(n,typeof t!="symbol"?t+"":t,e),e);const Vo=class Wo extends st{constructor(...t){let e=t[0]??{};if(Array.isArray(e)||"x"in e&&"y"in e||e instanceof xt){D("6.0.0","MotionBlurFilter constructor params are now options object. See params: { velocity, kernelSize, offset }");const s="x"in e?e.x:e[0],o="y"in e?e.y:e[1];e={velocity:{x:s,y:o}},t[1]!==void 0&&(e.kernelSize=t[1]),t[2]!==void 0&&(e.offset=t[2])}e={...Wo.DEFAULT_OPTIONS,...e};const r=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:Yf,entryPoint:"mainFragment"}}),i=J.from({vertex:ft,fragment:Xf,name:"motion-blur-filter"});super({gpuProgram:r,glProgram:i,resources:{motionBlurUniforms:{uVelocity:{value:e.velocity,type:"vec2<f32>"},uKernelSize:{value:Math.trunc(e.kernelSize??5),type:"i32"},uOffset:{value:e.offset,type:"f32"}}}}),sn(this,"uniforms"),sn(this,"_kernelSize"),this.uniforms=this.resources.motionBlurUniforms.uniforms,Object.assign(this,e)}get velocity(){return this.uniforms.uVelocity}set velocity(t){Array.isArray(t)&&(t={x:t[0],y:t[1]}),this.uniforms.uVelocity=t,this._updateDirty()}get velocityX(){return this.velocity.x}set velocityX(t){this.velocity.x=t,this._updateDirty()}get velocityY(){return this.velocity.y}set velocityY(t){this.velocity.y=t,this._updateDirty()}get kernelSize(){return this._kernelSize}set kernelSize(t){this._kernelSize=t,this._updateDirty()}get offset(){return this.uniforms.uOffset}set offset(t){this.uniforms.uOffset=t}_updateDirty(){this.padding=(Math.max(Math.abs(this.velocityX),Math.abs(this.velocityY))>>0)+1,this.uniforms.uKernelSize=this.velocityX!==0||this.velocityY!==0?this._kernelSize:0}};sn(Vo,"DEFAULT_OPTIONS",{velocity:{x:0,y:0},kernelSize:5,offset:0});let qf=Vo;var Kf=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uSepia;
uniform vec2 uNoise;
uniform vec3 uScratch;
uniform vec3 uVignetting;
uniform float uSeed;
uniform vec2 uDimensions;

uniform vec4 uInputSize;

const float SQRT_2 = 1.414213;
const vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 Overlay(vec3 src, vec3 dst)
{
    // if (dst <= 0.5) then: 2 * src * dst
    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)
    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),
                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),
                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));
}


void main()
{
    finalColor = texture(uTexture, vTextureCoord);
    vec3 color = finalColor.rgb;

    if (uSepia > 0.0)
    {
        float gray = (color.x + color.y + color.z) / 3.0;
        vec3 grayscale = vec3(gray);

        color = Overlay(SEPIA_RGB, grayscale);

        color = grayscale + uSepia * (color - grayscale);
    }

    vec2 coord = vTextureCoord * uInputSize.xy / uDimensions.xy;

    float vignette = uVignetting[0];
    float vignetteAlpha = uVignetting[1];
    float vignetteBlur = uVignetting[2];

    if (vignette > 0.0)
    {
        float outter = SQRT_2 - vignette * SQRT_2;
        vec2 dir = vec2(vec2(0.5, 0.5) - coord);
        dir.y *= uDimensions.y / uDimensions.x;
        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignetteBlur * SQRT_2), 0.0, 1.0);
        color.rgb *= darker + (1.0 - darker) * (1.0 - vignetteAlpha);
    }

    float scratch = uScratch[0];
    float scratchDensity = uScratch[1];
    float scratchWidth = uScratch[2];

    if (scratchDensity > uSeed && scratch != 0.0)
    {
        float phase = uSeed * 256.0;
        float s = mod(floor(phase), 2.0);
        float dist = 1.0 / scratchDensity;
        float d = distance(coord, vec2(uSeed * dist, abs(s - uSeed * dist)));
        if (d < uSeed * 0.6 + 0.4)
        {
            highp float period = scratchDensity * 10.0;

            float xx = coord.x * period + phase;
            float aa = abs(mod(xx, 0.5) * 4.0);
            float bb = mod(floor(xx / 0.5), 2.0);
            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);

            float kk = 2.0 * period;
            float dw = scratchWidth / uDimensions.x * (0.75 + uSeed);
            float dh = dw * kk;

            float tine = (yy - (2.0 - dh));

            if (tine > 0.0) {
                float _sign = sign(scratch);

                tine = s * tine / period + scratch + 0.1;
                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);

                color.rgb *= tine;
            }
        }
    }

    float noise = uNoise[0];
    float noiseSize = uNoise[1];

    if (noise > 0.0 && noiseSize > 0.0)
    {
        vec2 pixelCoord = vTextureCoord.xy * uInputSize.xy;
        pixelCoord.x = floor(pixelCoord.x / noiseSize);
        pixelCoord.y = floor(pixelCoord.y / noiseSize);
        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + uSeed * 512.0, 1024.0 - uSeed * 512.0);
        // float _noise = snoise(d) * 0.5;
        float _noise = rand(pixelCoord * noiseSize * uSeed) - 0.5;
        color += _noise * noise;
    }

    finalColor.rgb = color;
}`,Zf=`struct OldFilmUniforms {
    uSepia: f32,
    uNoise: vec2<f32>,
    uScratch: vec3<f32>,
    uVignetting: vec3<f32>,
    uSeed: f32,
    uDimensions: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> oldFilmUniforms : OldFilmUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);

  if (oldFilmUniforms.uSepia > 0.)
  {
    color = vec4<f32>(sepia(color.rgb), color.a);
  }

  let coord: vec2<f32> = uv * gfu.uInputSize.xy / oldFilmUniforms.uDimensions;

  if (oldFilmUniforms.uVignetting[0] > 0.)
  {
    color *= vec4<f32>(vec3<f32>(vignette(color.rgb, coord)), color.a);
  }

  let uScratch = oldFilmUniforms.uScratch; 

  if (uScratch[1] > oldFilmUniforms.uSeed && uScratch[0] != 0.)
  {
    color = vec4<f32>(scratch(color.rgb, coord), color.a);
  }

  let uNoise = oldFilmUniforms.uNoise;

  if (uNoise[0] > 0.0 && uNoise[1] > 0.0)
  {
    color += vec4<f32>(vec3<f32>(noise(uv)), color.a);
  }

  return color;
}

const SQRT_2: f32 = 1.414213;
const SEPIA_RGB: vec3<f32> = vec3<f32>(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);

fn modulo(x: f32, y: f32) -> f32
{
  return x - y * floor(x/y);
}

fn rand(co: vec2<f32>) -> f32
{
  return fract(sin(dot(co, vec2<f32>(12.9898, 78.233))) * 43758.5453);
}

fn overlay(src: vec3<f32>, dst: vec3<f32>) -> vec3<f32>
{
    // if (dst <= 0.5) then: 2 * src * dst
    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)

    return vec3<f32>(
      select((1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)), (2.0 * src.x * dst.x), (dst.x <= 0.5)), 
      select((1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)), (2.0 * src.y * dst.y), (dst.y <= 0.5)),
      select((1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)), (2.0 * src.z * dst.z), (dst.z <= 0.5))
    );
}

fn sepia(co: vec3<f32>) -> vec3<f32>
{
  let gray: f32 = (co.x + co.y + co.z) / 3.0;
  let grayscale: vec3<f32> = vec3<f32>(gray);
  let color = overlay(SEPIA_RGB, grayscale);
  return grayscale + oldFilmUniforms.uSepia * (color - grayscale);
}

fn vignette(co: vec3<f32>, coord: vec2<f32>) -> f32
{
  let uVignetting = oldFilmUniforms.uVignetting;
  let uDimensions = oldFilmUniforms.uDimensions;
  
  let outter: f32 = SQRT_2 - uVignetting[0] * SQRT_2;
  var dir: vec2<f32> = vec2<f32>(vec2<f32>(0.5) - coord);
  dir.y *= uDimensions.y / uDimensions.x;
  let darker: f32 = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + uVignetting[2] * SQRT_2), 0.0, 1.0);
  return darker + (1.0 - darker) * (1.0 - uVignetting[1]);
}

fn scratch(co: vec3<f32>, coord: vec2<f32>) -> vec3<f32>
{
  var color = co;
  let uScratch = oldFilmUniforms.uScratch;
  let uSeed = oldFilmUniforms.uSeed;
  let uDimensions = oldFilmUniforms.uDimensions;

  let phase: f32 = uSeed * 256.0;
  let s: f32 = modulo(floor(phase), 2.0);
  let dist: f32 = 1.0 / uScratch[1];
  let d: f32 = distance(coord, vec2<f32>(uSeed * dist, abs(s - uSeed * dist)));

  if (d < uSeed * 0.6 + 0.4)
  {
    let period: f32 = uScratch[1] * 10.0;

    let xx: f32 = coord.x * period + phase;
    let aa: f32 = abs(modulo(xx, 0.5) * 4.0);
    let bb: f32 = modulo(floor(xx / 0.5), 2.0);
    let yy: f32 = (1.0 - bb) * aa + bb * (2.0 - aa);

    let kk: f32 = 2.0 * period;
    let dw: f32 = uScratch[2] / uDimensions.x * (0.75 + uSeed);
    let dh: f32 = dw * kk;

    var tine: f32 = (yy - (2.0 - dh));

    if (tine > 0.0) {
        let _sign: f32 = sign(uScratch[0]);

        tine = s * tine / period + uScratch[0] + 0.1;
        tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);

        color *= tine;
    }
  }

  return color;
}

fn noise(coord: vec2<f32>) -> f32
{
  let uNoise = oldFilmUniforms.uNoise;
  let uSeed = oldFilmUniforms.uSeed;

  var pixelCoord: vec2<f32> = coord * gfu.uInputSize.xy;
  pixelCoord.x = floor(pixelCoord.x / uNoise[1]);
  pixelCoord.y = floor(pixelCoord.y / uNoise[1]);
  return (rand(pixelCoord * uNoise[1] * uSeed) - 0.5) * uNoise[0];
}`,Qf=Object.defineProperty,Jf=(n,t,e)=>t in n?Qf(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,on=(n,t,e)=>(Jf(n,typeof t!="symbol"?t+"":t,e),e);const Xo=class Yo extends st{constructor(t){t={...Yo.DEFAULT_OPTIONS,...t};const e=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:Zf,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:Kf,name:"old-film-filter"});super({gpuProgram:e,glProgram:r,resources:{oldFilmUniforms:{uSepia:{value:t.sepia,type:"f32"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uScratch:{value:new Float32Array(3),type:"vec3<f32>"},uVignetting:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:t.seed,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),on(this,"uniforms"),on(this,"seed"),this.uniforms=this.resources.oldFilmUniforms.uniforms,Object.assign(this,t)}apply(t,e,r,i){this.uniforms.uDimensions[0]=e.frame.width,this.uniforms.uDimensions[1]=e.frame.height,this.uniforms.uSeed=this.seed,t.applyFilter(this,e,r,i)}get sepia(){return this.uniforms.uSepia}set sepia(t){this.uniforms.uSepia=t}get noise(){return this.uniforms.uNoise[0]}set noise(t){this.uniforms.uNoise[0]=t}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(t){this.uniforms.uNoise[1]=t}get scratch(){return this.uniforms.uScratch[0]}set scratch(t){this.uniforms.uScratch[0]=t}get scratchDensity(){return this.uniforms.uScratch[1]}set scratchDensity(t){this.uniforms.uScratch[1]=t}get scratchWidth(){return this.uniforms.uScratch[2]}set scratchWidth(t){this.uniforms.uScratch[2]=t}get vignetting(){return this.uniforms.uVignetting[0]}set vignetting(t){this.uniforms.uVignetting[0]=t}get vignettingAlpha(){return this.uniforms.uVignetting[1]}set vignettingAlpha(t){this.uniforms.uVignetting[1]=t}get vignettingBlur(){return this.uniforms.uVignetting[2]}set vignettingBlur(t){this.uniforms.uVignetting[2]=t}};on(Xo,"DEFAULT_OPTIONS",{sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,seed:0});let td=Xo;var ed=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform vec2 uSize;
uniform sampler2D uTexture;
uniform vec4 uInputSize;

vec2 mapCoord( vec2 coord )
{
    coord *= uInputSize.xy;
    coord += uInputSize.zw;

    return coord;
}

vec2 unmapCoord( vec2 coord )
{
    coord -= uInputSize.zw;
    coord /= uInputSize.xy;

    return coord;
}

vec2 pixelate(vec2 coord, vec2 uSize)
{
	return floor( coord / uSize ) * uSize;
}

void main(void)
{
    vec2 coord = mapCoord(vTextureCoord);
    coord = pixelate(coord, uSize);
    coord = unmapCoord(coord);
    finalColor = texture(uTexture, coord);
}
`,rd=`struct PixelateUniforms {
  uSize:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> pixelateUniforms : PixelateUniforms;

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
  let pixelSize: vec2<f32> = pixelateUniforms.uSize;
  let coord: vec2<f32> = mapCoord(uv);

  var pixCoord: vec2<f32> = pixelate(coord, pixelSize);
  pixCoord = unmapCoord(pixCoord);

  return textureSample(uTexture, uSampler, pixCoord);
}

fn mapCoord(coord: vec2<f32> ) -> vec2<f32>
{
  var mappedCoord: vec2<f32> = coord;
  mappedCoord *= gfu.uInputSize.xy;
  mappedCoord += gfu.uOutputFrame.xy;
  return mappedCoord;
}

fn unmapCoord(coord: vec2<f32> ) -> vec2<f32>
{
  var mappedCoord: vec2<f32> = coord;
  mappedCoord -= gfu.uOutputFrame.xy;
  mappedCoord /= gfu.uInputSize.xy;
  return mappedCoord;
}

fn pixelate(coord: vec2<f32>, size: vec2<f32>) -> vec2<f32>
{
  return floor( coord / size ) * size;
}

`;class nd extends st{constructor(t=10){const e=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:rd,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:ed,name:"pixelate-filter"});super({gpuProgram:e,glProgram:r,resources:{pixelateUniforms:{uSize:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.size=t}get size(){return this.resources.pixelateUniforms.uniforms.uSize}set size(t){t instanceof pt?(this.sizeX=t.x,this.sizeY=t.y):Array.isArray(t)?this.resources.pixelateUniforms.uniforms.uSize=t:this.sizeX=this.sizeY=t}get sizeX(){return this.resources.pixelateUniforms.uniforms.uSize[0]}set sizeX(t){this.resources.pixelateUniforms.uniforms.uSize[0]=t}get sizeY(){return this.resources.pixelateUniforms.uniforms.uSize[1]}set sizeY(t){this.resources.pixelateUniforms.uniforms.uSize[1]=t}}var id=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec4 uInputSize;
uniform vec2 uRed;
uniform vec2 uGreen;
uniform vec2 uBlue;

void main(void)
{
   float r = texture(uTexture, vTextureCoord + uRed/uInputSize.xy).r;
   float g = texture(uTexture, vTextureCoord + uGreen/uInputSize.xy).g;
   float b = texture(uTexture, vTextureCoord + uBlue/uInputSize.xy).b;
   float a = texture(uTexture, vTextureCoord).a;
   finalColor = vec4(r, g, b, a);
}
`,sd=`struct RgbSplitUniforms {
    uRed: vec2<f32>,
    uGreen: vec2<f32>,
    uBlue: vec3<f32>,
};

struct GlobalFilterUniforms {
    uInputSize:vec4<f32>,
    uInputPixel:vec4<f32>,
    uInputClamp:vec4<f32>,
    uOutputFrame:vec4<f32>,
    uGlobalFrame:vec4<f32>,
    uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> rgbSplitUniforms : RgbSplitUniforms;

@fragment
fn mainFragment(
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
    let r = textureSample(uTexture, uSampler, uv + vec2<f32>(rgbSplitUniforms.uRed.x / gfu.uInputSize.x, rgbSplitUniforms.uRed.y / gfu.uInputSize.y)).r;
    let g = textureSample(uTexture, uSampler, uv + vec2<f32>(rgbSplitUniforms.uGreen.x / gfu.uInputSize.x, rgbSplitUniforms.uGreen.y / gfu.uInputSize.y)).g;
    let b = textureSample(uTexture, uSampler, uv + vec2<f32>(rgbSplitUniforms.uBlue.x / gfu.uInputSize.x, rgbSplitUniforms.uBlue.y / gfu.uInputSize.y)).b;
    let a = textureSample(uTexture, uSampler, uv).a;
    return vec4<f32>(r, g, b, a);
}
`,od=Object.defineProperty,ad=(n,t,e)=>t in n?od(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,Ho=(n,t,e)=>(ad(n,typeof t!="symbol"?t+"":t,e),e);const jo=class qo extends st{constructor(...t){let e=t[0]??{};(Array.isArray(e)||"x"in e&&"y"in e)&&(D("6.0.0","RGBSplitFilter constructor params are now options object. See params: { red, green, blue }"),e={red:e},t[1]!==void 0&&(e.green=t[1]),t[2]!==void 0&&(e.blue=t[2])),e={...qo.DEFAULT_OPTIONS,...e};const r=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:sd,entryPoint:"mainFragment"}}),i=J.from({vertex:ft,fragment:id,name:"rgb-split-filter"});super({gpuProgram:r,glProgram:i,resources:{rgbSplitUniforms:{uRed:{value:e.red,type:"vec2<f32>"},uGreen:{value:e.green,type:"vec2<f32>"},uBlue:{value:e.blue,type:"vec2<f32>"}}}}),Ho(this,"uniforms"),this.uniforms=this.resources.rgbSplitUniforms.uniforms,Object.assign(this,e)}get red(){return this.uniforms.uRed}set red(t){Array.isArray(t)&&(t={x:t[0],y:t[1]}),this.uniforms.uRed=t}get redX(){return this.red.x}set redX(t){this.red.x=t}get redY(){return this.red.y}set redY(t){this.red.y=t}get green(){return this.uniforms.uGreen}set green(t){Array.isArray(t)&&(t={x:t[0],y:t[1]}),this.uniforms.uGreen=t}get greenX(){return this.green.x}set greenX(t){this.green.x=t}get greenY(){return this.green.y}set greenY(t){this.green.y=t}get blue(){return this.uniforms.uBlue}set blue(t){Array.isArray(t)&&(t={x:t[0],y:t[1]}),this.uniforms.uBlue=t}get blueX(){return this.blue.x}set blueX(t){this.blue.x=t}get blueY(){return this.blue.y}set blueY(t){this.blue.y=t}};Ho(jo,"DEFAULT_OPTIONS",{red:{x:-10,y:0},green:{x:0,y:10},blue:{x:0,y:0}});let ld=jo;var ud=`
precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uCenter;
uniform float uTime;
uniform float uSpeed;
uniform vec4 uWave;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

const float PI = 3.14159;

void main()
{
    float uAmplitude = uWave[0];
    float uWavelength = uWave[1];
    float uBrightness = uWave[2];
    float uRadius = uWave[3];

    float halfWavelength = uWavelength * 0.5 / uInputSize.x;
    float maxRadius = uRadius / uInputSize.x;
    float currentRadius = uTime * uSpeed / uInputSize.x;

    float fade = 1.0;

    if (maxRadius > 0.0) {
        if (currentRadius > maxRadius) {
            finalColor = texture(uTexture, vTextureCoord);
            return;
        }
        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);
    }

    vec2 dir = vec2(vTextureCoord - uCenter / uInputSize.xy);
    dir.y *= uInputSize.y / uInputSize.x;
    float dist = length(dir);

    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {
        finalColor = texture(uTexture, vTextureCoord);
        return;
    }

    vec2 diffUV = normalize(dir);

    float diff = (dist - currentRadius) / halfWavelength;

    float p = 1.0 - pow(abs(diff), 2.0);

    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );
    float powDiff = 1.25 * sin(diff * PI) * p * ( uAmplitude * fade );

    vec2 offset = diffUV * powDiff / uInputSize.xy;

    // Do clamp :
    vec2 coord = vTextureCoord + offset;
    vec2 clampedCoord = clamp(coord, uInputClamp.xy, uInputClamp.zw);
    vec4 color = texture(uTexture, clampedCoord);
    if (coord != clampedCoord) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    // No clamp :
    // finalColor = texture(uTexture, vTextureCoord + offset);

    color.rgb *= 1.0 + (uBrightness - 1.0) * p * fade;

    finalColor = color;
}
`,cd=`
struct ShockWaveUniforms {
    uTime: f32,
    uOffset: vec2<f32>,
    uSpeed: f32,
    uWave: vec4<f32>,
};

struct GlobalFilterUniforms {
    uInputSize:vec4<f32>,
    uInputPixel:vec4<f32>,
    uInputClamp:vec4<f32>,
    uOutputFrame:vec4<f32>,
    uGlobalFrame:vec4<f32>,
    uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> shockwaveUniforms : ShockWaveUniforms;

@fragment
fn mainFragment(
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {

    let uTime = shockwaveUniforms.uTime;
    let uOffset = shockwaveUniforms.uOffset;
    let uSpeed = shockwaveUniforms.uSpeed;
    let uAmplitude = shockwaveUniforms.uWave[0];
    let uWavelength = shockwaveUniforms.uWave[1];
    let uBrightness = shockwaveUniforms.uWave[2];
    let uRadius = shockwaveUniforms.uWave[3];
    let halfWavelength: f32 = uWavelength * 0.5 / gfu.uInputSize.x;
    let maxRadius: f32 = uRadius / gfu.uInputSize.x;
    let currentRadius: f32 = uTime * uSpeed / gfu.uInputSize.x;
    var fade: f32 = 1.0;
    var returnColorOnly: bool = false;
    
    if (maxRadius > 0.0) {
        if (currentRadius > maxRadius) {
            returnColorOnly = true;
        }
        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);
    }
    var dir: vec2<f32> = vec2<f32>(uv - uOffset / gfu.uInputSize.xy);
    dir.y *= gfu.uInputSize.y / gfu.uInputSize.x;

    let dist:f32 = length(dir);

    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {
        returnColorOnly = true;
    }

    let diffUV: vec2<f32> = normalize(dir);
    let diff: f32 = (dist - currentRadius) / halfWavelength;
    let p: f32 = 1.0 - pow(abs(diff), 2.0);
    let powDiff: f32 = 1.25 * sin(diff * PI) * p * ( uAmplitude * fade );
    let offset: vec2<f32> = diffUV * powDiff / gfu.uInputSize.xy;
    // Do clamp :
    let coord: vec2<f32> = uv + offset;
    let clampedCoord: vec2<f32> = clamp(coord, gfu.uInputClamp.xy, gfu.uInputClamp.zw);

    var clampedColor: vec4<f32> = textureSample(uTexture, uSampler, clampedCoord);
    
    if (boolVec2(coord, clampedCoord)) 
    {
        clampedColor *= max(0.0, 1.0 - length(coord - clampedCoord));
    }
    // No clamp :
    var finalColor = clampedColor;

    return select(finalColor, textureSample(uTexture, uSampler, uv), returnColorOnly);
}

fn boolVec2(x: vec2<f32>, y: vec2<f32>) -> bool
{
    if (x.x == y.x && x.y == y.y)
    {
        return true;
    }
    
    return false;
}

const PI: f32 = 3.14159265358979323846264;
`,hd=Object.defineProperty,fd=(n,t,e)=>t in n?hd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,an=(n,t,e)=>(fd(n,typeof t!="symbol"?t+"":t,e),e);const Ko=class Zo extends st{constructor(...t){let e=t[0]??{};(Array.isArray(e)||"x"in e&&"y"in e)&&(D("6.0.0","ShockwaveFilter constructor params are now options object. See params: { center, speed, amplitude, wavelength, brightness, radius, time }"),e={center:e,...t[1]},t[2]!==void 0&&(e.time=t[2])),e={...Zo.DEFAULT_OPTIONS,...e};const r=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:cd,entryPoint:"mainFragment"}}),i=J.from({vertex:ft,fragment:ud,name:"shockwave-filter"});super({gpuProgram:r,glProgram:i,resources:{shockwaveUniforms:{uTime:{value:e.time,type:"f32"},uCenter:{value:e.center,type:"vec2<f32>"},uSpeed:{value:e.speed,type:"f32"},uWave:{value:new Float32Array(4),type:"vec4<f32>"}}}}),an(this,"uniforms"),an(this,"time"),this.time=0,this.uniforms=this.resources.shockwaveUniforms.uniforms,Object.assign(this,e)}apply(t,e,r,i){this.uniforms.uTime=this.time,t.applyFilter(this,e,r,i)}get center(){return this.uniforms.uCenter}set center(t){Array.isArray(t)&&(t={x:t[0],y:t[1]}),this.uniforms.uCenter=t}get centerX(){return this.uniforms.uCenter.x}set centerX(t){this.uniforms.uCenter.x=t}get centerY(){return this.uniforms.uCenter.y}set centerY(t){this.uniforms.uCenter.y=t}get speed(){return this.uniforms.uSpeed}set speed(t){this.uniforms.uSpeed=t}get amplitude(){return this.uniforms.uWave[0]}set amplitude(t){this.uniforms.uWave[0]=t}get wavelength(){return this.uniforms.uWave[1]}set wavelength(t){this.uniforms.uWave[1]=t}get brightness(){return this.uniforms.uWave[2]}set brightness(t){this.uniforms.uWave[2]=t}get radius(){return this.uniforms.uWave[3]}set radius(t){this.uniforms.uWave[3]=t}};an(Ko,"DEFAULT_OPTIONS",{center:{x:0,y:0},speed:500,amplitude:30,wavelength:160,brightness:1,radius:-1});let Wi=Ko;var dd=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uBlur;
uniform vec2 uStart;
uniform vec2 uEnd;
uniform vec2 uDelta;
uniform vec4 uInputSize;

float random(vec3 scale, float seed)
{
    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}

void main(void)
{
    vec4 color = vec4(0.0);
    float total = 0.0;

    float blur = uBlur[0];
    float gradientBlur = uBlur[1];

    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
    vec2 normal = normalize(vec2(uStart.y - uEnd.y, uEnd.x - uStart.x));
    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * uInputSize.xy - uStart, normal)) / gradientBlur) * blur;

    for (float t = -30.0; t <= 30.0; t++)
    {
        float percent = (t + offset - 0.5) / 30.0;
        float weight = 1.0 - abs(percent);
        vec4 sample = texture(uTexture, vTextureCoord + uDelta / uInputSize.xy * percent * radius);
        sample.rgb *= sample.a;
        color += sample * weight;
        total += weight;
    }

    color /= total;
    color.rgb /= color.a + 0.00001;

    finalColor = color;
}
`,pd=`struct TiltShiftUniforms {
  uBlur: vec2<f32>,
  uStart: vec2<f32>,
  uEnd: vec2<f32>,
  uDelta: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> tiltShiftUniforms : TiltShiftUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uBlur = tiltShiftUniforms.uBlur[0];
  let uBlurGradient = tiltShiftUniforms.uBlur[1];
  let uStart = tiltShiftUniforms.uStart;
  let uEnd = tiltShiftUniforms.uEnd;
  let uDelta = tiltShiftUniforms.uDelta;

  var color: vec4<f32> = vec4<f32>(0.0);
  var total: f32 = 0.0;

  let offset: f32 = random(position, vec3<f32>(12.9898, 78.233, 151.7182), 0.0);
  let normal: vec2<f32> = normalize(vec2<f32>(uStart.y - uEnd.y, uEnd.x - uStart.x));
  let radius: f32 = smoothstep(0.0, 1.0, abs(dot(uv * gfu.uInputSize.xy - uStart, normal)) / uBlurGradient) * uBlur;

  for (var t: f32 = -30.0; t <= 30.0; t += 1.0)
  {
    var percent: f32 = (t + offset - 0.5) / 30.0;
    var weight: f32 = 1.0 - abs(percent);
    var sample: vec4<f32> = textureSample(uTexture, uSampler, uv + uDelta / gfu.uInputSize.xy * percent * radius);
    sample = vec4<f32>(sample.xyz * sample.a, sample.a); // multiply sample.rgb with sample.a
    color += sample * weight;
    total += weight;
  }

  color /= total;
  color = vec4<f32>(color.xyz / (color.a + 0.00001), color.a); // divide color.rgb by color.a + 0.00001

  return color;
}


fn random(position: vec4<f32>, scale: vec3<f32>, seed: f32) -> f32
{
  return fract(sin(dot(position.xyz + seed, scale)) * 43758.5453 + seed);
}`,md=Object.defineProperty,gd=(n,t,e)=>t in n?md(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,ln=(n,t,e)=>(gd(n,typeof t!="symbol"?t+"":t,e),e);const Qo=class Jo extends st{constructor(t){const{width:e,height:r}=Hh.defaultOptions;t={...Jo.DEFAULT_OPTIONS,start:{x:0,y:r/2},end:{x:e,y:r/2},...t};const i=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:pd,entryPoint:"mainFragment"}}),s=J.from({vertex:ft,fragment:dd,name:"tilt-shift-axis-filter"});super({gpuProgram:i,glProgram:s,resources:{tiltShiftUniforms:{uBlur:{value:new Float32Array([t.blur,t.gradientBlur]),type:"vec2<f32>"},uStart:{value:t.start,type:"vec2<f32>"},uEnd:{value:t.end,type:"vec2<f32>"},uDelta:{value:new Float32Array([0,0]),type:"vec2<f32>"}}}}),ln(this,"uniforms"),ln(this,"_tiltAxis"),this.uniforms=this.resources.tiltShiftUniforms.uniforms,this._tiltAxis=t.axis}updateDelta(){if(this.uniforms.uDelta[0]=0,this.uniforms.uDelta[1]=0,this._tiltAxis===void 0)return;const t=this.uniforms.uEnd,e=this.uniforms.uStart,r=t.x-e.x,i=t.y-e.y,s=Math.sqrt(r*r+i*i),o=this._tiltAxis==="vertical";this.uniforms.uDelta[0]=o?-i/s:r/s,this.uniforms.uDelta[1]=o?r/s:i/s}};ln(Qo,"DEFAULT_OPTIONS",{blur:100,gradientBlur:600});let kr=Qo;var xd=Object.defineProperty,yd=(n,t,e)=>t in n?xd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,vd=(n,t,e)=>(yd(n,t+"",e),e);class _d extends kr{constructor(t){t={...kr.DEFAULT_OPTIONS,...t},super({...t,axis:"horizontal"}),vd(this,"_tiltShiftYFilter"),this._tiltShiftYFilter=new kr({...t,axis:"vertical"}),this.updateDelta(),Object.assign(this,t)}apply(t,e,r,i){const s=wt.getSameSizeTexture(e);t.applyFilter(this,e,s,!0),t.applyFilter(this._tiltShiftYFilter,s,r,i),wt.returnTexture(s)}updateDelta(){super.updateDelta(),this._tiltShiftYFilter.updateDelta()}get blur(){return this.uniforms.uBlur[0]}set blur(t){this.uniforms.uBlur[0]=this._tiltShiftYFilter.uniforms.uBlur[0]=t}get gradientBlur(){return this.uniforms.uBlur[1]}set gradientBlur(t){this.uniforms.uBlur[1]=this._tiltShiftYFilter.uniforms.uBlur[1]=t}get start(){return this.uniforms.uStart}set start(t){this.uniforms.uStart=this._tiltShiftYFilter.uniforms.uStart=t,this.updateDelta()}get startX(){return this.start.x}set startX(t){this.start.x=t,this.updateDelta()}get startY(){return this.start.y}set startY(t){this.start.y=t,this.updateDelta()}get end(){return this.uniforms.uEnd}set end(t){this.uniforms.uEnd=this._tiltShiftYFilter.uniforms.uEnd=t,this.updateDelta()}get endX(){return this.end.x}set endX(t){this.end.x=t,this.updateDelta()}get endY(){return this.end.y}set endY(t){this.end.y=t,this.updateDelta()}}var bd=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTwist;
uniform vec2 uOffset;
uniform vec4 uInputSize;

vec2 mapCoord( vec2 coord )
{
    coord *= uInputSize.xy;
    coord += uInputSize.zw;

    return coord;
}

vec2 unmapCoord( vec2 coord )
{
    coord -= uInputSize.zw;
    coord /= uInputSize.xy;

    return coord;
}

vec2 twist(vec2 coord)
{
    coord -= uOffset;

    float dist = length(coord);
    float uRadius = uTwist[0];
    float uAngle = uTwist[1];

    if (dist < uRadius)
    {
        float ratioDist = (uRadius - dist) / uRadius;
        float angleMod = ratioDist * ratioDist * uAngle;
        float s = sin(angleMod);
        float c = cos(angleMod);
        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);
    }

    coord += uOffset;

    return coord;
}

void main(void)
{
    vec2 coord = mapCoord(vTextureCoord);
    coord = twist(coord);
    coord = unmapCoord(coord);
    finalColor = texture(uTexture, coord);
}
`,Sd=`struct TwistUniforms {
  uTwist:vec2<f32>,
  uOffset:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> twistUniforms : TwistUniforms;

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
  return textureSample(uTexture, uSampler, unmapCoord(twist(mapCoord(uv))));
}

fn mapCoord(coord: vec2<f32> ) -> vec2<f32>
{
  var mappedCoord: vec2<f32> = coord;
  mappedCoord *= gfu.uInputSize.xy;
  mappedCoord += gfu.uOutputFrame.xy;
  return mappedCoord;
}

fn unmapCoord(coord: vec2<f32> ) -> vec2<f32>
{
  var mappedCoord: vec2<f32> = coord;
  mappedCoord -= gfu.uOutputFrame.xy;
  mappedCoord /= gfu.uInputSize.xy;
  return mappedCoord;
}

fn twist(coord: vec2<f32>) -> vec2<f32>
{
  var twistedCoord: vec2<f32> = coord;
  let uRadius = twistUniforms.uTwist[0];
  let uAngle = twistUniforms.uTwist[1];
  let uOffset = twistUniforms.uOffset;

  twistedCoord -= uOffset;
  
  let dist = length(twistedCoord);

  if (dist < uRadius)
  {
    let ratioDist: f32 = (uRadius - dist) / uRadius;
    let angleMod: f32 = ratioDist * ratioDist * uAngle;
    let s: f32 = sin(angleMod);
    let c: f32 = cos(angleMod);
    twistedCoord = vec2<f32>(twistedCoord.x * c - twistedCoord.y * s, twistedCoord.x * s + twistedCoord.y * c);
  }

  twistedCoord += uOffset;
  return twistedCoord;
}
`,wd=Object.defineProperty,Ad=(n,t,e)=>t in n?wd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,ta=(n,t,e)=>(Ad(n,typeof t!="symbol"?t+"":t,e),e);const ea=class ra extends st{constructor(t){t={...ra.DEFAULT_OPTIONS,...t};const e=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:Sd,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:bd,name:"twist-filter"});super({gpuProgram:e,glProgram:r,resources:{twistUniforms:{uTwist:{value:[t.radius??0,t.angle??0],type:"vec2<f32>"},uOffset:{value:t.offset,type:"vec2<f32>"}}},...t}),ta(this,"uniforms"),this.uniforms=this.resources.twistUniforms.uniforms}get radius(){return this.uniforms.uTwist[0]}set radius(t){this.uniforms.uTwist[0]=t}get angle(){return this.uniforms.uTwist[1]}set angle(t){this.uniforms.uTwist[1]=t}get offset(){return this.uniforms.uOffset}set offset(t){this.uniforms.uOffset=t}get offsetX(){return this.offset.x}set offsetX(t){this.offset.x=t}get offsetY(){return this.offset.y}set offsetY(t){this.offset.y=t}};ta(ea,"DEFAULT_OPTIONS",{padding:20,radius:200,angle:4,offset:{x:0,y:0}});let Cd=ea;var Td=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uStrength;
uniform vec2 uCenter;
uniform vec2 uRadii;

uniform vec4 uInputSize;

const float MAX_KERNEL_SIZE = \${MAX_KERNEL_SIZE};

// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand(vec2 co, float seed) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);
    return fract(sin(sn) * c + seed);
}

void main() {
    float minGradient = uRadii[0] * 0.3;
    float innerRadius = (uRadii[0] + minGradient * 0.5) / uInputSize.x;

    float gradient = uRadii[1] * 0.3;
    float radius = (uRadii[1] - gradient * 0.5) / uInputSize.x;

    float countLimit = MAX_KERNEL_SIZE;

    vec2 dir = vec2(uCenter.xy / uInputSize.xy - vTextureCoord);
    float dist = length(vec2(dir.x, dir.y * uInputSize.y / uInputSize.x));

    float strength = uStrength;

    float delta = 0.0;
    float gap;
    if (dist < innerRadius) {
        delta = innerRadius - dist;
        gap = minGradient;
    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity
        delta = dist - radius;
        gap = gradient;
    }

    if (delta > 0.0) {
        float normalCount = gap / uInputSize.x;
        delta = (normalCount - delta) / normalCount;
        countLimit *= delta;
        strength *= delta;
        if (countLimit < 1.0)
        {
            gl_FragColor = texture(uTexture, vTextureCoord);
            return;
        }
    }

    // randomize the lookup values to hide the fixed number of samples
    float offset = rand(vTextureCoord, 0.0);

    float total = 0.0;
    vec4 color = vec4(0.0);

    dir *= strength;

    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {
        float percent = (t + offset) / MAX_KERNEL_SIZE;
        float weight = 4.0 * (percent - percent * percent);
        vec2 p = vTextureCoord + dir * percent;
        vec4 sample = texture(uTexture, p);

        // switch to pre-multiplied alpha to correctly blur transparent images
        // sample.rgb *= sample.a;

        color += sample * weight;
        total += weight;

        if (t > countLimit){
            break;
        }
    }

    color /= total;
    // switch back from pre-multiplied alpha
    // color.rgb /= color.a + 0.00001;

    gl_FragColor = color;
}
`,Pd=`struct ZoomBlurUniforms {
    uStrength:f32,
    uCenter:vec2<f32>,
    uRadii:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> zoomBlurUniforms : ZoomBlurUniforms;

@fragment
fn mainFragment(
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uStrength = zoomBlurUniforms.uStrength;
  let uCenter = zoomBlurUniforms.uCenter;
  let uRadii = zoomBlurUniforms.uRadii;

  let minGradient: f32 = uRadii[0] * 0.3;
  let innerRadius: f32 = (uRadii[0] + minGradient * 0.5) / gfu.uInputSize.x;

  let gradient: f32 = uRadii[1] * 0.3;
  let radius: f32 = (uRadii[1] - gradient * 0.5) / gfu.uInputSize.x;

  let MAX_KERNEL_SIZE: f32 = \${MAX_KERNEL_SIZE};

  var countLimit: f32 = MAX_KERNEL_SIZE;

  var dir: vec2<f32> = vec2<f32>(uCenter / gfu.uInputSize.xy - uv);
  let dist: f32 = length(vec2<f32>(dir.x, dir.y * gfu.uInputSize.y / gfu.uInputSize.x));

  var strength: f32 = uStrength;

  var delta: f32 = 0.0;
  var gap: f32;

  if (dist < innerRadius) {
      delta = innerRadius - dist;
      gap = minGradient;
  } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity
      delta = dist - radius;
      gap = gradient;
  }

  var returnColorOnly: bool = false;

  if (delta > 0.0) {
    let normalCount: f32 = gap / gfu.uInputSize.x;
    delta = (normalCount - delta) / normalCount;
    countLimit *= delta;
    strength *= delta;
    
    if (countLimit < 1.0)
    {
      returnColorOnly = true;;
    }
  }

  // randomize the lookup values to hide the fixed number of samples
  let offset: f32 = rand(uv, 0.0);

  var total: f32 = 0.0;
  var color: vec4<f32> = vec4<f32>(0.);

  dir *= strength;

  for (var t = 0.0; t < MAX_KERNEL_SIZE; t += 1.0) {
    let percent: f32 = (t + offset) / MAX_KERNEL_SIZE;
    let weight: f32 = 4.0 * (percent - percent * percent);
    let p: vec2<f32> = uv + dir * percent;
    let sample: vec4<f32> = textureSample(uTexture, uSampler, p);
    
    if (t < countLimit)
    {
      color += sample * weight;
      total += weight;
    }
  }

  color /= total;

  return select(color, textureSample(uTexture, uSampler, uv), returnColorOnly);
}

fn modulo(x: f32, y: f32) -> f32
{
  return x - y * floor(x/y);
}

// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
fn rand(co: vec2<f32>, seed: f32) -> f32
{
  let a: f32 = 12.9898;
  let b: f32 = 78.233;
  let c: f32 = 43758.5453;
  let dt: f32 = dot(co + seed, vec2<f32>(a, b));
  let sn: f32 = modulo(dt, 3.14159);
  return fract(sin(sn) * c + seed);
}`,Fd=Object.defineProperty,Md=(n,t,e)=>t in n?Fd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,na=(n,t,e)=>(Md(n,typeof t!="symbol"?t+"":t,e),e);const ia=class sa extends st{constructor(t){t={...sa.DEFAULT_OPTIONS,...t};const e=t.maxKernelSize??32,r=K.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:Pd.replace("${MAX_KERNEL_SIZE}",e.toFixed(1)),entryPoint:"mainFragment"}}),i=J.from({vertex:ft,fragment:Td.replace("${MAX_KERNEL_SIZE}",e.toFixed(1)),name:"zoom-blur-filter"});super({gpuProgram:r,glProgram:i,resources:{zoomBlurUniforms:{uStrength:{value:t.strength,type:"f32"},uCenter:{value:t.center,type:"vec2<f32>"},uRadii:{value:new Float32Array(2),type:"vec2<f32>"}}}}),na(this,"uniforms"),this.uniforms=this.resources.zoomBlurUniforms.uniforms,Object.assign(this,t)}get strength(){return this.uniforms.uStrength}set strength(t){this.uniforms.uStrength=t}get center(){return this.uniforms.uCenter}set center(t){Array.isArray(t)&&(t={x:t[0],y:t[1]}),this.uniforms.uCenter=t}get centerX(){return this.uniforms.uCenter.x}set centerX(t){this.uniforms.uCenter.x=t}get centerY(){return this.uniforms.uCenter.y}set centerY(t){this.uniforms.uCenter.y=t}get innerRadius(){return this.uniforms.uRadii[0]}set innerRadius(t){this.uniforms.uRadii[0]=t}get radius(){return this.uniforms.uRadii[1]}set radius(t){this.uniforms.uRadii[1]=t<0||t===1/0?-1:t}};na(ia,"DEFAULT_OPTIONS",{strength:.1,center:{x:0,y:0},innerRadius:0,radius:-1,maxKernelSize:32});let Id=ia;(async()=>{const n=new Bs;await n.init({background:"#cc88ee",width:800,height:600});const t=document.getElementById("pixi-container");t&&t.appendChild(n.canvas);const e=await ye.load("/img/bunny.png"),r=new Jt(e);r.anchor.set(.5),r.x=n.screen.width/2,r.y=n.screen.height/2,r.scale.set(3);const i=new Vt;i.addChild(r),n.stage.addChild(i);const s={None:null,Adjustment:new Qh({gamma:1.5,saturation:2}),ASCII:new cf,Bloom:new df,Blur:new yo,"Bulge Pinch":new yf({radius:200,strength:.5}),"Color Matrix - Sepia":function(){const h=new $i;return h.sepia(!0),h}(),"Color Matrix - Negative":function(){const h=new $i;return h.negative(!0),h}(),Dot:new Af,"Drop Shadow":new Mf,Emboss:new Bf,Glitch:new Vi,Glow:new Wf({distance:15,outerStrength:2}),"Kawase Blur":new Po({strength:5,quality:9}),"Motion Blur":new qf({velocity:[40,40],kernelSize:15}),"Old Film":new td,Pixelate:new nd(5),"RGB Split":new ld({red:[5,0],green:[0,5],blue:[8,0]}),Shockwave:new Wi,"Tilt Shift":new _d({blur:200,gradientBlur:300}),Twist:new Cd({angle:4,radius:200,offset:{x:n.screen.width/2,y:n.screen.height/2}}),"Zoom Blur":new Id({strength:.1,center:[n.screen.width/2,n.screen.height/2]})};i.filters=[s.ASCII];const o=document.getElementById("current-filter");o&&(o.textContent="Current Filter: ASCII"),setTimeout(()=>{const h=document.querySelector("select-value");h&&(h.textContent="ASCII")},100),document.addEventListener("DOMContentLoaded",()=>{console.log("DOM fully loaded, looking for select component"),a()}),a(),setTimeout(a,500);function a(){const h=[".starwind-select","#filter-select","select","[data-radix-select-trigger]",".select-value","select-trigger"];for(const f of h){const g=document.querySelectorAll(f);g.length>0&&(console.log(`Found ${g.length} elements with selector '${f}':`,g),g.forEach(x=>{["starwind-select:change","change","input"].forEach(p=>{x.addEventListener(p,function(v){console.log(`${f} ${p} event:`,v);const b=v,S=b.detail?.value||b.target?.value;if(S&&typeof S=="string"&&(console.log(`Selected filter '${S}' via ${p}`),s.hasOwnProperty(S))){console.log("Applying filter:",S),i.filters=s[S]?[s[S]]:[];const C=document.getElementById("current-filter");C&&(C.textContent=`Current Filter: ${S}`)}})}),x.addEventListener("click",function(){console.log(`Click on ${f}:`,this)})}))}document.addEventListener("starwind-select:change",function(f){console.log("Document-level starwind-select:change event:",f);const x=f.detail?.value;if(x&&s.hasOwnProperty(x)){console.log("Applying filter from document listener:",x),i.filters=s[x]?[s[x]]:[];const p=document.getElementById("current-filter");p&&(p.textContent=`Current Filter: ${x}`)}});const d=document.querySelectorAll(".filter-button");d.length>0&&(console.log("Found fallback filter buttons:",d),setTimeout(()=>{const f=document.querySelector(".filter-buttons");f&&(f.style.display="block")},2e3),d.forEach(f=>{f.addEventListener("click",function(){const g=this.getAttribute("data-filter");if(console.log("Filter button clicked:",g),g&&s.hasOwnProperty(g)){i.filters=s[g]?[s[g]]:[];const x=document.getElementById("current-filter");x&&(x.textContent=`Current Filter: ${g}`)}})}))}const l=document.getElementById("background-upload");l&&l.addEventListener("change",h=>{const d=h.target;if(d&&"files"in d&&d.files&&d.files[0]){const f=d.files[0],g=new FileReader;g.onload=x=>{if(x.target&&x.target.result)try{const p=new Image;p.src=x.target.result.toString(),p.onload=()=>{const v=document.createElement("canvas");v.width=p.width,v.height=p.height,v.getContext("2d").drawImage(p,0,0);const S=N.from(v),C=n.stage.children.find(T=>T.label==="background");C&&n.stage.removeChild(C);const I=new Jt(S);I.label="background",I.width=n.screen.width,I.height=n.screen.height,n.stage.addChildAt(I,0),console.log("Background image updated successfully")}}catch(p){console.error("Error loading background image:",p)}},g.readAsDataURL(f)}});const u=document.getElementById("sprite-upload");u&&u.addEventListener("change",h=>{const d=h.target;if(d&&"files"in d&&d.files&&d.files[0]){const f=d.files[0],g=new FileReader;g.onload=x=>{if(x.target&&x.target.result)try{const p=new Image;p.src=x.target.result.toString(),p.onload=()=>{const v=document.createElement("canvas");v.width=p.width,v.height=p.height,v.getContext("2d").drawImage(p,0,0);const S=N.from(v);r.texture=S,console.log("Sprite image updated successfully")}}catch(p){console.error("Error loading sprite image:",p)}},g.readAsDataURL(f)}});let c=0;n.ticker.add(h=>{if(c+=h.deltaTime/60,r.rotation+=.1*h.deltaTime,i.filters&&Array.isArray(i.filters)&&i.filters.length>0){const d=i.filters[0];d instanceof Wi&&(d.center||(d.center=[n.screen.width/2,n.screen.height/2],d.radius=80,d.amplitude=30,d.wavelength=40),d.time=c),d instanceof Vi&&(d.seed=Math.random())}})})();export{Wn as $,zs as A,yt as B,Vt as C,rt as D,B as E,st as F,K as G,es as H,Pt as I,wt as J,Ln as K,Jt as L,V as M,_l as N,zl as O,pt as P,lt as Q,we as R,Ml as S,ze as T,Nr as U,Bl as V,Xh as W,Yh as X,ut as Y,$n as Z,cr as _,Ft as a,Qa as a0,Q as a1,is as a2,Rs as a3,Hh as a4,Ll as a5,au as a6,Tu as a7,Fu as a8,Eu as a9,Bu as aa,Ou as ab,Ja as ac,Kt as ad,D as ae,at as af,Te as ag,Ec as ah,Hs as ai,ii as aj,ri as ak,ya as al,Ei as am,Dc as an,it as ao,_a as ap,Mi as aq,Ye as ar,tn as as,zi as at,Ks as au,eu as b,Ae as c,$e as d,mt as e,ni as f,Ql as g,pn as h,Fs as i,dn as j,bt as k,Ke as l,Fi as m,Cu as n,Pu as o,zu as p,ku as q,Ea as r,Gs as s,Ze as t,N as u,va as v,et as w,J as x,Uu as y,Ut as z};
