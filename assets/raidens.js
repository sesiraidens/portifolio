/* RAIDENS Design System v1.0 — comportamento compartilhado do portfólio */
(function(){
  var sun='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  var moon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var btn=document.getElementById('themeBtn');

  /* Tema */
  function setTheme(t){
    document.documentElement.setAttribute('data-theme',t);
    try{ localStorage.setItem('theme',t); }catch(e){}
    if(btn) btn.innerHTML = t==='dark'?sun:moon;
  }
  var saved=null; try{ saved=localStorage.getItem('theme'); }catch(e){}
  setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
  if(btn) btn.addEventListener('click',function(){
    setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark');
  });

  /* Título herói linha a linha */
  var hero=document.querySelector('.hero');
  if(hero) requestAnimationFrame(function(){ hero.classList.add('is-ready'); });

  /* Reveal */
  var items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:.12});
    items.forEach(function(el){ io.observe(el); });
  } else items.forEach(function(el){ el.classList.add('is-visible'); });

  /* Progresso + sombra da topbar */
  var fill=document.getElementById('progressFill'), bar=document.getElementById('topbar');
  function onScroll(){
    var h=document.documentElement.scrollHeight-innerHeight, y=scrollY;
    if(fill) fill.style.width=(h>0?Math.min(y/h,1)*100:0)+'%';
    if(bar) bar.classList.toggle('scrolled',y>20);
  }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
})();

