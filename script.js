(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav=document.getElementById('nav'),burger=document.getElementById('burger'),sheet=document.getElementById('sheet'),dock=document.querySelector('.dock'),hero=document.getElementById('top');
  document.getElementById('y').textContent=new Date().getFullYear();

  function menu(open){burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Close menu':'Open menu');sheet.hidden=!open;document.body.style.overflow=open?'hidden':''}
  burger.addEventListener('click',function(){menu(sheet.hidden)});
  sheet.addEventListener('click',function(e){if(e.target.tagName==='A')menu(false)});
  addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});

  var ticking=false;
  function onScroll(){nav.classList.toggle('solid',scrollY>10);dock.classList.toggle('off',scrollY<hero.offsetHeight*.6);ticking=false}
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
  onScroll();

  var slides=document.querySelectorAll('.arch .s'),tabs=document.querySelectorAll('#tabs button'),bar=document.getElementById('cb'),box=document.getElementById('visual');
  var cur=0,DUR=3000,start=performance.now(),visible=false,raf;
  function show(n){
    slides[cur].classList.remove('on');tabs[cur].classList.remove('on');tabs[cur].setAttribute('aria-pressed','false');
    cur=n;slides[cur].classList.add('on');tabs[cur].classList.add('on');tabs[cur].setAttribute('aria-pressed','true');start=performance.now();bar.style.width='0';
  }
  function tick(now){
    if(!visible)return;
    var p=Math.min((now-start)/DUR,1);bar.style.width=p*100+'%';
    if(p>=1)show((cur+1)%slides.length);
    raf=requestAnimationFrame(tick);
  }
  tabs.forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.i)})});
  if('IntersectionObserver' in window&&!reduce){
    new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!visible){visible=true;start=performance.now();raf=requestAnimationFrame(tick)}else if(!v){visible=false;cancelAnimationFrame(raf)}},{threshold:.25}).observe(box);
  }

  var items=document.querySelectorAll('.show-copy,.item,.set-grid>*,.gallery img');
  if('IntersectionObserver' in window&&!reduce){
    items.forEach(function(el){el.classList.add('fade')});
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
    items.forEach(function(el){io.observe(el)});
  }
})();
