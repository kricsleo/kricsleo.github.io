let customSearch;!function(){"use strict";const e=document,t=window,s=e.getElementsByClassName("l_header")[0],n=s.getBoundingClientRect().bottom+20;function o(e){const s=e.getBoundingClientRect().top-n;t.scrollBy({behavior:"smooth",top:s})}function c(e,t,s){let n,o=new Date;return function(){const c=this,l=arguments;let a=new Date;clearTimeout(n),a-o>=s?(e.apply(c,l),o=a):n=setTimeout(()=>{e.apply(c,l)},t)}}const l=[...e.getElementsByTagName("img")];function a(){var e;l.forEach(t=>{(e=t.getBoundingClientRect()).top>=(window.innerHeight||document.documentElement.clientHeight)||e.left>=(window.innerWidth||document.documentElement.clientWidth)||e.bottom<=0||e.right<=0||""!==t.getAttribute("src")||t.setAttribute("src",t.getAttribute("data-src"))})}t.onload=(()=>a()),t.onscroll=c(a,100,150),function(){if(!t.subData)return;const n=s.querySelector(".wrapper");n.querySelector(".nav-sub .logo").innerHTML=t.subData.subtitle||t.subData.title;let l=e.documentElement.scrollTop;t.addEventListener("scroll",c(function(){const t=e.documentElement.scrollTop,s=t-l;s>20?(l=t,n.classList.add("sub")):s<-20&&(l=t,n.classList.remove("sub"))},100,150)),e.getElementsByClassName("s-top")[0].onclick=(()=>{o(document.body)});const a=s.getElementsByClassName("s-comment")[0],i=e.getElementById("comments");i?a.onclick=(()=>{o(i)}):a&&a.parentNode.removeChild(a)}(),function(){const t=s.getElementsByClassName("menu")[0],n=t.getElementsByClassName("underline")[0];function o(s=t.querySelector("li a.active"),o=!0){o||n.classList.add("disable-trans"),s?(e.querySelectorAll(".menu li").forEach(e=>{e.classList.remove("active")}),s.classList.add("active"),n.style.cssText=`left: ${s.offsetLeft}px; width: ${s.clientWidth}px;`):n.style.cssText="left: 0px; width: 0px;",o||setTimeout(()=>{n.classList.remove("disable-trans")},0)}[...t.getElementsByTagName("li")].forEach(e=>{e.onmouseenter=(e=>{o(e.currentTarget)}),e.onmouseout=(e=>{o()})});const c=location.pathname;let l=null;if("/"===c||c.startsWith("/page/"))l=s.querySelector(".nav-home");else{var a=c.match(/\/(.*?)\//);a.length>1&&(l=s.querySelector(`.nav-${a[1]}`))}o(l,!1)}(),function(){const t=s.getElementsByClassName("m_search")[0];s.getElementsByClassName("s-search")[0],t.onclick=(()=>{if(!customSearch){var t=e.createElement("script");t.type="text/javascript",t.src="https://store.kricsleo.com/blog/static/js/search.js",t.onload=function(){customSearch=new HexoSearch({imagePath:"/images/"})},e.body.appendChild(t)}s.classList.toggle("z_search-open")}),e.addEventListener("click",()=>{s.classList.remove("z_search-open")})}(),function(){const c=e.getElementsByClassName("toc-wrapper")[0],l=s.getElementsByClassName("s-toc")[0];if(!c||!c.childNodes.length||!l)return void l.parentNode.removeChild(l);l.onclick=(()=>{c.classList.toggle("active")});const a=[...c.getElementsByTagName("a")];a.forEach(t=>{t.onclick=(s=>{s.preventDefault(),s.stopPropagation(),o(e.getElementById(t.getAttribute("href").substring(1)))})});const i=()=>a.map(t=>{const s=t.getAttribute("href").substring(1);return e.getElementById(s).offsetTop-n});let r=i();const m=()=>{const t=e.documentElement.scrollTop;if(!r)return;let s,n=0,o=r.length-1;for(;n<o;)r[s=n+o+1>>1]===t?n=o=s:r[s]<t?n=s:o=s-1;a.forEach(e=>{e.classList.remove("active")}),a[n].classList.add("active")};t.addEventListener("resize",()=>{r=i(),m()}),t.addEventListener("scroll",()=>m()),m()}()}();