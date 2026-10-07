/**
 * Shows the media loader before the React bundle hydrates.
 * Images on a slow connection often finish before hydration, so a
 * client-only effect never gets to paint. This script starts from the head,
 * waits 150ms so cached media does not flash, then reveals the server-rendered
 * loader over anything still in flight.
 */
export function MediaLoaderBoot() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){
var DELAY=150, FADE=200, MIN=8;
var armed=[], active=[], stopped=false, raf=0;
function reduce(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches;}
function settled(el){
  if(el.tagName==="IMG") return el.complete;
  if(el.error) return true;
  return el.readyState>=2;
}
function clips(v){return v==="hidden"||v==="clip"||v==="auto"||v==="scroll";}
function visibleBox(el){
  var rect=el.getBoundingClientRect();
  var node=el.parentElement;
  while(node && node!==document.documentElement){
    var style=getComputedStyle(node);
    var clipX=clips(style.overflowX), clipY=clips(style.overflowY);
    if(clipX||clipY){
      var clip=node.getBoundingClientRect();
      var left=clipX?Math.max(rect.left,clip.left):rect.left;
      var right=clipX?Math.min(rect.right,clip.right):rect.right;
      var top=clipY?Math.max(rect.top,clip.top):rect.top;
      var bottom=clipY?Math.min(rect.bottom,clip.bottom):rect.bottom;
      rect={left:left,top:top,right:right,bottom:bottom,width:Math.max(0,right-left),height:Math.max(0,bottom-top)};
    }
    node=node.parentElement;
  }
  var view={left:0,top:0,right:window.innerWidth,bottom:window.innerHeight};
  var left=Math.max(rect.left,view.left), right=Math.min(rect.right,view.right);
  var top=Math.max(rect.top,view.top), bottom=Math.min(rect.bottom,view.bottom);
  var width=Math.max(0,right-left), height=Math.max(0,bottom-top);
  if(width>=MIN && height>=MIN) return {left:left,top:top,width:width,height:height};
  return rect.width>=MIN && rect.height>=MIN ? rect : null;
}
function loaderFor(el){
  var next=el.nextElementSibling;
  if(next && next.hasAttribute("data-media-loader")) return next;
  return null;
}
function place(el, loader){
  var box=visibleBox(el);
  if(!box) return false;
  var host=loader.offsetParent || document.body;
  var hostRect=host.getBoundingClientRect();
  var style=getComputedStyle(host);
  var borderLeft=parseFloat(style.borderLeftWidth)||0;
  var borderTop=parseFloat(style.borderTopWidth)||0;
  loader.style.left=(box.left-hostRect.left-borderLeft+host.scrollLeft)+"px";
  loader.style.top=(box.top-hostRect.top-borderTop+host.scrollTop)+"px";
  loader.style.width=box.width+"px";
  loader.style.height=box.height+"px";
  loader.style.setProperty("--media-loader-scale", String(Math.min(1, box.width/48, box.height/48)));
  return true;
}
function track(){
  if(stopped){raf=0; return;}
  for(var i=0;i<active.length;i++){
    var item=active[i];
    if(item.loader.__reactOwned) continue;
    place(item.el, item.loader);
  }
  if(active.length) raf=requestAnimationFrame(track);
  else raf=0;
}
function hide(el){
  var loader=loaderFor(el);
  active=active.filter(function(item){return item.el!==el;});
  if(!loader || loader.__reactOwned || loader.getAttribute("data-state")!=="visible") return;
  loader.setAttribute("data-state","fading");
  setTimeout(function(){
    if(loader.__reactOwned) return;
    if(loader.getAttribute("data-state")==="fading") loader.removeAttribute("data-state");
  }, reduce()?0:FADE);
}
function show(el){
  if(stopped || settled(el) || el.closest(".session-loader")) return;
  var loader=loaderFor(el);
  if(!loader || loader.__reactOwned) return;
  if(!place(el, loader)) return;
  loader.setAttribute("data-state","visible");
  el.__mediaLoaderBoot=1;
  if(!active.some(function(item){return item.el===el;})) active.push({el:el, loader:loader});
  if(!raf) raf=requestAnimationFrame(track);
}
function arm(el){
  if(el.__loaderArmed || el.closest(".session-loader")) return;
  el.__loaderArmed=1;
  armed.push(el);
  setTimeout(function(){ show(el); }, DELAY);
}
function scan(){
  var nodes=document.querySelectorAll("img, video");
  for(var i=0;i<nodes.length;i++) arm(nodes[i]);
}
function onDone(event){
  var target=event.target;
  if(!target || (target.tagName!=="IMG" && target.tagName!=="VIDEO")) return;
  hide(target);
}
["load","error","loadeddata","canplay"].forEach(function(type){
  document.addEventListener(type, onDone, true);
});
var poll=setInterval(function(){
  scan();
  if(document.readyState!=="loading"){ clearInterval(poll); scan(); }
}, 50);
setTimeout(function(){ clearInterval(poll); }, 20000);
window.__stopMediaLoaderBoot=function(){ stopped=true; active=[]; };
})();`,
      }}
    />
  );
}
