!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([function(e,t,o){},function(e,t,o){"use strict";o.r(t);o(0);var n=o.p+"src/asset/fire-magic.wav",r=o.p+"src/asset/fireplace.wav";window.load=async()=>{const e=new Audio(r);e.type="audio/wav",e.loop=!0,window.fireSound=e;const t=new Audio(n);t.type="audio/wav",window.explodeSound=t;try{await e.play(),document.querySelector(".content").classList.toggle("content--show"),document.querySelector(".load-btn").classList.toggle("load-btn--hide"),console.log("Playing...")}catch(e){console.log("Failed to play..."+e)}},window.cast=()=>{const e=document.querySelectorAll(".fire div");document.querySelector(".particle--explode")?window.fireSound.play():(window.fireSound.pause(),window.explodeSound.play()),e.forEach(e=>{e.classList.toggle("particle--explode"),setTimeout(()=>{e.classList.contains("particle--explode")?e.setAttribute("style",`transform: translate(\n            ${80*Math.random()-40}vw,\n            ${80*Math.random()-40}vh\n          ) scale(0);`):e.setAttribute("style","")},1)})}}]);