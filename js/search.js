var HexoSearch,SearchService="";function get(o,t){let{data:a={}}=t;return o.includes("?")||(o+="?"),Object.keys(a).forEach((e,t)=>{o+=`${0===t?"":"&"}${encodeURIComponent(e)}=${encodeURIComponent(a[e])}`}),fetch(o).then(t=>{if(t.ok)return t.json();throw new Error(`fetching ${o} error: ${e.toString()}`)}).catch(t=>{throw new Error(`fetching ${o} error: ${e.toString()}`)})}function fadeOut(e,o=400){const t=e.style,a=getComputedStyle(e),n=t.cssText,r=a.transition;t.display="none"!==a.display?a.display:"block",t.transition=`opacity ${o}ms`,t.opacity=0,setTimeout(()=>{t.cssText=n,t.display="none",t.transition=r},o)}function fadeIn(e,o=400){const t=e.style,a=getComputedStyle(e),n=t.cssText,r="none"!==a.display?a.display:"block",s="0"!==a.opacity?a.opacity:1,i=a.transition;t.display=r,t.opacity=0,requestAnimationFrame(()=>{t.cssText=n,t.transition=`opacity ${o}ms`,t.opacity=s,t.display=r,setTimeout(()=>t.transition=i,o)})}!function(){SearchService=function(o){var t=this;t.config=Object.assign({},{per_page:10,selectors:{body:"body",form:".u-search-form",input:".u-search-input",container:"#u-search",modal:"#u-search .modal",modal_body:"#u-search .modal-body",modal_footer:"#u-search .modal-footer",modal_overlay:"#u-search .modal-overlay",modal_results:"#u-search .modal-results",modal_metadata:"#u-search .modal-metadata",modal_error:"#u-search .modal-error",modal_loading_bar:"#u-search .modal-loading-bar",modal_ajax_content:"#u-search .modal-ajax-content",modal_logo:"#u-search .modal-footer .logo",btn_close:"#u-search .btn-close",btn_next:"#u-search .btn-next",btn_prev:"#u-search .btn-prev"},brands:{hexo:{logo:"",url:""}},imagePath:"/img/"},o),t.dom={},t.percentLoaded=0,t.open=!1,t.queryText="",t.nav={next:-1,prev:-1,total:0,current:1},t.parseSelectors=function(){for(var e in t.config.selectors)t.dom[e]=document.querySelector(t.config.selectors[e]);t.dom.form=document.querySelectorAll(t.config.selectors.form),t.dom.input=document.querySelectorAll(t.config.selectors.input)},t.beforeQuery=function(){t.open||(fadeIn(t.dom.container),t.dom.body.classList.add("modal-active"),t.open=!0),[...t.dom.input].forEach(e=>e.value=t.queryText),document.activeElement.blur(),t.dom.modal_error.style.display="none",t.dom.modal_ajax_content.classList.remove("loaded"),t.startLoading()},t.afterQuery=function(){t.dom.modal_body.scrollTop=0,t.dom.modal_ajax_content.classList.add("loaded"),t.stopLoading()},t.search=function(e,o){t.beforeQuery(),t.search instanceof Function?t.query(t.queryText,e,function(){t.afterQuery()}):(console.log("query() does not exist."),t.onQueryError(t.queryText,""),t.afterQuery())},t.onQueryError=function(e,o){var a="";a="success"===o?'No result found for "'+e+'".':"timeout"===o?"Unfortunate timeout.":"error"===o?"Something goes wrong.":"empty"===o?"Empty result.":"Mysterious failure.",t.dom.modal_results.innerHTML="",t.dom.modal_error.innerHTML=a,t.dom.modal_error.style.display="block"},t.nextPage=function(){-1!==t.nav.next&&t.search(t.nav.next)},t.prevPage=function(){-1!==t.nav.prev&&t.search(t.nav.prev)},t.buildResult=function(e,o,t){var a="";return a="<li>",a+="<a class='result' href='"+e+"'>",a+="<span class='title'>"+o+"</span>",a+="<span class='digest'>"+t+"</span>",a+="<span class='result-icon iconfont icon-arrow-circle-right'></span>",a+="</a>",a+="</li>"},t.close=function(){t.open=!1,fadeOut(t.dom.container),t.dom.body.classList.remove("modal-active")},t.onSubmit=function(e){e.preventDefault(),t.queryText=e.currentTarget.getElementsByClassName("u-search-input")[0].value,t.queryText&&t.search(1)},t.startLoading=function(){fadeOut(t.dom.modal_loading_bar),t.loadingTimer=setInterval(function(){t.percentLoaded=Math.min(t.percentLoaded+5,95),t.dom.modal_loading_bar.style.width=`${t.percentLoaded}%`},100)},t.stopLoading=function(){clearInterval(t.loadingTimer),t.dom.modal_loading_bar.style.width="100%",t.dom.modal_loading_bar.style.opacity=0,setTimeout(function(){t.percentLoaded=0,t.dom.modal_loading_bar.style.width="0"},300)},t.addLogo=function(e){var o="";t.config.brands[e]&&t.config.brands[e].logo&&(o+="<a href='"+t.config.brands[e].url+"' class='"+e+"'>",o+='<img src="'+t.config.imagePath+t.config.brands[e].logo+'" />',o+="</a>",t.dom.modal_logo.innerHTML=o)},t.destroy=function(){[...t.dom.form].forEach(e=>e.removeEventListener("click")),t.dom.modal_overlay.removeEventListener("click"),t.dom.btn_close.removeEventListener("click"),t.dom.btn_next.removeEventListener("click"),t.dom.btn_prev.removeEventListener("click"),t.dom.container.parentNode.removeChild(t.dom.container)},t.init=function(){const o=document.createElement("div");o.innerHTML=e,document.body.appendChild(o),t.parseSelectors(),t.dom.modal_footer.style.display="none",[...t.dom.form].forEach(e=>e.onsubmit=t.onSubmit),t.dom.modal_overlay.addEventListener("click",t.close),t.dom.btn_close.addEventListener("click",t.close),t.dom.btn_next.addEventListener("click",t.nextPage),t.dom.btn_prev.addEventListener("click",t.prevPage)},t.init()};var e='<div id="u-search"><div class="modal"> <header class="modal-header" class="clearfix"><form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm"> <input type="text" id="u-search-modal-input" class="u-search-input" /> <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit"> <span class="iconfont icon-search"></span> </button></form> <a class="btn-close"> <span class="iconfont icon-close"></span> </a><div class="modal-loading"><div class="modal-loading-bar"></div></div> </header> <main class="modal-body"><ul class="modal-results modal-ajax-content"></ul> </main> <footer class="modal-footer clearfix"><div class="modal-metadata modal-ajax-content"> <strong class="range"></strong> of <strong class="total"></strong></div><div class="modal-error"></div> <div class="logo"></div> <a class="nav btn-next modal-ajax-content"> <span class="text">NEXT</span> <span class="iconfont icon-chevron-right"></span> </a> <a class="nav btn-prev modal-ajax-content"> <span class="iconfont icon-chevron-left"></span> <span class="text">PREV</span> </a> </footer></div><div class="modal-overlay"></div></div>'}(),function(){"use strict";HexoSearch=function(e){SearchService.apply(this,arguments);var o=this;return o.config.endpoint="/"+((e||{}).endpoint||"content.json"),o.config.endpoint=o.config.endpoint.replace("//","/"),o.cache="",o.contentSearch=function(e,o){var t=e.title.trim().toLowerCase(),a=e.text.trim().toLowerCase(),n=o.trim().toLowerCase().split(" "),r=!1,s=-1,i=-1,c=-1;return""!==t&&""!==a&&n.forEach((o,l)=>{if(s=t.indexOf(o),i=a.indexOf(o),s<0&&i<0?r=!1:(r=!0,i<0&&(i=0),0===l&&(c=i)),r){a=e.text.trim();var d=0,m=0;if(c>=0){m=0===(d=Math.max(c-30,0))?Math.min(200,a.length):Math.min(c+170,a.length);var u=a.substring(d,m);n.forEach(function(e){var o=new RegExp(e,"gi");u=u.replace(o,"<b>"+e+"</b>")}),e.digest=u}else m=Math.min(200,a.length),e.digest=a.trim().substring(0,m)}}),r},o.buildResultList=function(e){var t="";return e.forEach(e=>t+=o.buildResult(e.path,e.title,Array.isArray(e.content)?e.content[0]:e.content)),t},o.buildMetadata=function(e){o.dom.modal_footer.style.display="none"},o.query=function(e,t,a){get(o.config.endpoint,{data:{q:e,start:t,size:o.config.per_page}}).then(e=>{let t="";t=(t+=o.buildResultList(e))||"Empty results.",o.dom.modal_results.innerHTML=t,o.buildMetadata(e),a&&a(e)}).catch(t=>{o.onQueryError(e,"error")})},o}}();