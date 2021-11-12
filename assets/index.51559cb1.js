var f=Object.defineProperty;var w=(i,e,s)=>e in i?f(i,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[e]=s;var n=(i,e,s)=>(w(i,typeof e!="symbol"?e+"":e,s),s);import{s as u,r as p,p as h,C as l}from"./vendor.2c4eedca.js";const m=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}};m();class a extends u{render(){return h`
        <style>
            :host {
                background-color: ${this.color}
            }
        </style>
        <slot></slot>
        `}}n(a,"styles",p`
        :host {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    `),n(a,"properties",{color:String});customElements.define("color-picker",a);class d extends u{constructor(){super();this.current=new l({h:180,s:50,l:50}),this.getColorsFromPreviousState()}connectedCallback(){super.connectedCallback(),window.scrollTo({top:window.innerHeight/2,behavior:"smooth"}),window.addEventListener("hashchange",e=>this.getColorsFromPreviousState(e))}render(){return h`${this.colors.map((e,s)=>h`<color-picker .color="${e.hex()}"><p>${e.hex()}</p><span title="remove" @click="${()=>this.removeColor(s)}">&times;</span></color-picker>`)}
        <color-picker .color="${this.current.hex()}" @mousemove="${this.getColor}" @click="${this.saveColor}" @wheel="${this.setSaturation}"></color-picker>`}saveColor(e){this.colors=[...this.colors,this.current],window.history.state?window.history.replaceState(this.colors,"",this.colors.map(t=>t.hex()).join()):window.history.pushState(this.colors,"",this.colors.map(t=>t.hex()).join())}removeColor(e){this.colors=[...this.colors.slice(0,e),...this.colors.slice(e+1)],window.history.state?this.colors.length!==0?window.history.replaceState(this.colors,"",this.colors.map(t=>t.hex()).join()):(window.location.hash="",window.history.replaceState(null,"")):this.colors.length!==0?window.history.pushState(this.colors,"",this.colors.map(t=>t.hex()).join()):window.location.hash=""}getColor(e){const s=e.target.getBoundingClientRect(),t=Math.floor(e.screenX/s.width*360),o=Math.floor(e.clientY/window.innerHeight*100);this.current=this.current.hue(t).lightness(o)}setSaturation(){const e=Math.floor(window.scrollY/window.innerHeight*100);this.current=this.current.saturationl(e)}getColorsFromPreviousState(e){const s=window.location.hash,t=window.history.state;try{t&&Array.isArray(t)&&t.length!==0?this.colors=t.map(o=>l(o.color)):s!==""?(this.colors=s.split(",").map(o=>l(o)),window.history.pushState(this.colors,"",this.colors.map(o=>o.hex()).join())):this.colors=[]}catch{console.warn("inconsistent state, fallback to defaults"),this.colors=[]}}}n(d,"styles",p`
        :host {
            display: flex;
            width: 100%;
            height: 100vh;
            position: fixed;
        }
        color-picker span {
            cursor: pointer;
        }
        color-picker > * {
            mix-blend-mode: difference;
            color: white;
            font-weight: bold;
        }
    `),n(d,"properties",{colors:{type:Array},current:{type:l}});customElements.define("colors-app",d);
