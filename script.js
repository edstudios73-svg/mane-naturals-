(function(){
  var nav=document.getElementById('nav'),burger=document.getElementById('burger'),sheet=document.getElementById('sheet'),dock=document.querySelector('.dock');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('y').textContent=new Date().getFullYear();

  function setMenu(open){burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Close menu':'Open menu');sheet.hidden=!open;document.body.style.overflow=open?'hidden':''}
  burger.addEventListener('click',function(){setMenu(sheet.hidden)});
  sheet.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false)});
  addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

  var hero=document.querySelector('.hero'),img=document.querySelector('.arch'),ticking=false;
  var vis0=document.getElementById('visual');
  function onScroll(){
    var y=scrollY;nav.classList.toggle('solid',y>30);
    if(dock)dock.classList.toggle('off',y<hero.offsetHeight*.5);
    if(!reduce&&y<innerHeight*1.2)vis0.style.transform='translateY('+(-y*.05)+'px)';
    ticking=false;
  }
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
  onScroll();

  var vis=document.getElementById('visual');
  if(!reduce&&matchMedia('(hover:hover)').matches){
    vis.addEventListener('pointermove',function(e){var r=vis.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;vis.style.transform='perspective(900px) rotateY('+x*10+'deg) rotateX('+-y*10+'deg)'});
    vis.addEventListener('pointerleave',function(){vis.style.transform=''});
    vis.style.transition='transform .25s';
  }

  // hero: load reveal, slideshow, spotlight, magnetic button
  requestAnimationFrame(function(){setTimeout(function(){document.documentElement.classList.add('loaded')},reduce?0:350)});
  var slides=document.querySelectorAll('.arch .s'),names=['Hair Oil Mix','Real hair, real glow','The full range'],cn=document.getElementById('cn'),ct=document.getElementById('ct'),cb=document.getElementById('cb'),cur=0,DUR=5000,t0=performance.now();
  function show(n){slides[cur].classList.remove('on');cur=n;var s=slides[cur];s.classList.remove('on');void s.offsetWidth;s.classList.add('on');cn.textContent='0'+(cur+1);ct.textContent=names[cur];t0=performance.now()}
  function tick(now){var p=Math.min((now-t0)/DUR,1);cb.style.width=(p*100)+'%';if(p>=1)show((cur+1)%slides.length);requestAnimationFrame(tick)}
  if(!reduce&&slides.length)requestAnimationFrame(tick);
  var spot=document.getElementById('spot');
  hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();spot.style.setProperty('--mx',(e.clientX-r.left)+'px');spot.style.setProperty('--my',(e.clientY-r.top)+'px')});
  if(!reduce&&matchMedia('(hover:hover)').matches){document.querySelectorAll('.magnet').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.2)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})})}

  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  }else els.forEach(function(el){el.classList.add('in')});
})();
