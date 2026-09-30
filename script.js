(function(){
  var nav=document.getElementById('nav'),burger=document.getElementById('burger'),sheet=document.getElementById('sheet'),dock=document.querySelector('.dock');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('y').textContent=new Date().getFullYear();

  function setMenu(open){burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Close menu':'Open menu');sheet.hidden=!open;document.body.style.overflow=open?'hidden':''}
  burger.addEventListener('click',function(){setMenu(sheet.hidden)});
  sheet.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false)});
  addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

  var hero=document.querySelector('.hero'),img=document.querySelector('.arch img'),ticking=false;
  function onScroll(){
    var y=scrollY;nav.classList.toggle('solid',y>30);
    if(dock)dock.classList.toggle('off',y<hero.offsetHeight*.5);
    if(!reduce&&y<innerHeight*1.2)img.style.transform='translateY('+(-y*.06)+'px)';
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

  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  }else els.forEach(function(el){el.classList.add('in')});
})();
