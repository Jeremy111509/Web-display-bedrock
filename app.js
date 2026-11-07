const $=id=>document.getElementById(id);
const address=$("address"), page=$("page"), home=$("home"), viewer=$("viewer");
let historyItems=JSON.parse(localStorage.getItem("wd_history")||"[]"), current="";
function normalize(v){v=v.trim();if(!v)return "";if(!/^https?:\/\//i.test(v)){if(v.includes(".")&&!v.includes(" "))v="https://"+v;else v="https://www.google.com/search?q="+encodeURIComponent(v)}return v}
function navigate(v,save=true){const url=normalize(v);if(!url)return;current=url;address.value=url;$("currentUrl").textContent=url;home.hidden=true;viewer.hidden=false;page.src=url;$("status").textContent="Abriendo";if(save){historyItems.unshift(url);historyItems=[...new Set(historyItems)].slice(0,40);localStorage.setItem("wd_history",JSON.stringify(historyItems))}}
$("addressForm").addEventListener("submit",e=>{e.preventDefault();navigate(address.value)});
$("back").onclick=()=>{try{page.contentWindow.history.back()}catch{}};
$("forward").onclick=()=>{try{page.contentWindow.history.forward()}catch{}};
$("reload").onclick=()=>{if(current)page.src=current};
$("openExternal").onclick=()=>{if(current)window.open(current,"_blank","noopener")};
$("newTab").onclick=()=>{page.src="about:blank";current="";address.value="";viewer.hidden=true;home.hidden=false;$("status").textContent="Nueva pestaña"};
$("bookmark").onclick=()=>{if(!current)return;let a=JSON.parse(localStorage.getItem("wd_favs")||"[]");if(!a.includes(current))a.push(current);localStorage.setItem("wd_favs",JSON.stringify(a));$("status").textContent="Favorito guardado"};
$("historyBtn").onclick=()=>{const list=$("historyList");list.innerHTML="";historyItems.forEach(url=>{const b=document.createElement("button");b.textContent=url;b.onclick=()=>{$("historyDialog").close();navigate(url,false)};list.append(b)});$("historyDialog").showModal()};
$("closeHistory").onclick=()=>$("historyDialog").close();
document.querySelectorAll("[data-url]").forEach(b=>b.onclick=()=>navigate(b.dataset.url));
page.addEventListener("load",()=>$("status").textContent="Página cargada (si el sitio permite iframe)");
