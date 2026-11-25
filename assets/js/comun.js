
/* ====== CONFIGURACIÓN DEL PANEL ====== */
const DEFAULTS={
  passHash:'',
  wa:'717703689',
  ig:'ElKoalaSan',
  hero:'Capturando momentos que cuentan historias',
  about:'Llevo más de 8 años capturando momentos inolvidables por toda la Comunidad Valenciana. Mi filosofía es simple: fotos naturales, emotivas y sin poses forzadas.',
  mostrar:{galeria:true,instagram:true,testimonios:true,redes:true}
};
let S=Object.assign({},DEFAULTS,JSON.parse(localStorage.getItem('fv_settings')||'{}'));
S.mostrar=Object.assign({},DEFAULTS.mostrar,S.mostrar||{});
function guardar(){localStorage.setItem('fv_settings',JSON.stringify(S));}
async function hash(texto){
  const bytes=new TextEncoder().encode(texto);
  const digest=await crypto.subtle.digest('SHA-256',bytes);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
function pintarTitulo(texto){
  const titulo=document.getElementById('titulo-hero');
  if(!titulo)return;
  titulo.textContent='';
  texto.trim().split(/\s+/).forEach((palabra,i)=>{
    const envelope=document.createElement('span');envelope.className='palabra';
    const inner=document.createElement('span');inner.textContent=palabra+' ';
    inner.style.animationDelay=(0.2+i*0.12)+'s';
    envelope.appendChild(inner);titulo.appendChild(envelope);
  });
}
function aplicar(){
  document.querySelectorAll('a[href*="wa.me"]').forEach(a=>{a.href=a.href.replace(/wa\.me\/\d+/,'wa.me/'+S.wa);});
  document.querySelectorAll('a[href*="instagram.com"]').forEach(a=>{a.href=a.href.replace(/instagram\.com\/[^/?"']+/,'instagram.com/'+S.ig);});
  const p=document.querySelector('.sobre-texto p');if(p)p.textContent=S.about;
  pintarTitulo(S.hero);
  document.querySelectorAll('nav a[data-section]').forEach(a=>{a.style.display=S.mostrar[a.dataset.section]?'':'none';});
}
aplicar();

/* ====== PRELOADER ====== */
window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('preloader').classList.add('oculto'),500);});

/* ====== CURSOR ====== */
const cursor=document.getElementById('cursor');
if(window.matchMedia('(hover:hover)').matches){
  document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';});
  document.addEventListener('mouseover',e=>{if(e.target.closest('a,button,.galeria-item,.insta-item'))cursor.classList.add('grande');});
  document.addEventListener('mouseout',e=>{if(e.target.closest('a,button,.galeria-item,.insta-item'))cursor.classList.remove('grande');});
}else{cursor.style.display='none';}

/* ====== HEADER Y MENÚ ====== */
const header=document.getElementById('header');
window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',window.scrollY>60);});
const burger=document.getElementById('burger'),nav=document.getElementById('nav');
burger.addEventListener('click',()=>{burger.classList.toggle('abierto');nav.classList.toggle('abierto');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('abierto');nav.classList.remove('abierto');}));

/* ====== REVEAL AL HACER SCROLL ====== */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('visible');observer.unobserve(en.target);}});
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

/* ====== CONTADORES ====== */
const contadorObs=new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(!en.isIntersecting)return;
    const el=en.target,fin=+el.dataset.contador,dur=1800,t0=performance.now();
    (function tick(t){
      const p=Math.min((t-t0)/dur,1);
      el.textContent=Math.round(fin*(1-Math.pow(1-p,3)));
      if(p<1)requestAnimationFrame(tick);
    })(t0);
    contadorObs.unobserve(el);
  });
},{threshold:.6});
document.querySelectorAll('[data-contador]').forEach(el=>contadorObs.observe(el));

/* ====== GALERÍA ====== */
const FOTOS=[{"c": "eventos", "t": "Rust Band en El Volander", "u": "assets/img/ig-DecKrf5iOYa-1.jpg"}, {"c": "eventos", "t": "Rust Band en El Volander", "u": "assets/img/ig-DecKrf5iOYa-2.jpg"}, {"c": "eventos", "t": "Rust Band en El Volander", "u": "assets/img/ig-DebkqMECGEK-1.jpg"}, {"c": "eventos", "t": "Rust Band en El Volander", "u": "assets/img/ig-DebkqMECGEK-2.jpg"}, {"c": "eventos", "t": "Sesión en Valencia", "u": "assets/img/ig-DbSx1hYiARg-1.jpg"}, {"c": "eventos", "t": "Sesión en Valencia", "u": "assets/img/ig-DbSx1hYiARg-2.jpg"}, {"c": "retratos", "t": "Sesión con @ayelenalc", "u": "assets/img/ig-DbFpvOJCAkN-1.jpg"}, {"c": "retratos", "t": "Sesión con @ayelenalc", "u": "assets/img/ig-DbFpvOJCAkN-2.jpg"}, {"c": "eventos", "t": "Fotografía de KoalaSan", "u": "assets/img/ig-DbXxRiyCN5--1.jpg"}, {"c": "eventos", "t": "Fotografía de KoalaSan", "u": "assets/img/ig-DbXxRiyCN5--2.jpg"}];
const grid=document.getElementById('galeria-grid');
if(grid){
  grid.innerHTML=FOTOS.map((f,i)=>`
    <div class="galeria-item" data-cat="${f.c}" data-i="${i}">
      <img src="${f.u}" alt="${f.t} - fotografía de KoalaSan" loading="lazy">
      <div class="galeria-overlay"><h4>${f.t}</h4></div>
    </div>`).join('');
  document.getElementById('filtros').addEventListener('click',e=>{
    const btn=e.target.closest('.filtro-btn');if(!btn)return;
    document.querySelectorAll('.filtro-btn').forEach(b=>b.classList.remove('activo'));
    btn.classList.add('activo');
    const f=btn.dataset.filtro;
    document.querySelectorAll('.galeria-item').forEach(item=>{
      const mostrar=f==='todo'||item.dataset.cat===f;
      item.classList.toggle('oculto',!mostrar);
      if(mostrar){item.style.opacity=0;setTimeout(()=>{item.style.transition='opacity .6s';item.style.opacity=1;},30);}
    });
  });
  const lightbox=document.getElementById('lightbox'),lbImg=document.getElementById('lightbox-img');
  let lbIndex=0;
  function lbAbrir(i){lbIndex=i;lbImg.src=FOTOS[i].u;lbImg.alt=FOTOS[i].t;lightbox.classList.add('abierto');document.body.style.overflow='hidden';}
  function lbCerrar(){lightbox.classList.remove('abierto');document.body.style.overflow='';}
  function lbNav(dir){
    const visibles=[...document.querySelectorAll('.galeria-item:not(.oculto)')].map(el=>+el.dataset.i);
    let pos=visibles.indexOf(lbIndex);pos=(pos+dir+visibles.length)%visibles.length;lbAbrir(visibles[pos]);
  }
  grid.addEventListener('click',e=>{const item=e.target.closest('.galeria-item');if(item)lbAbrir(+item.dataset.i);});
  document.getElementById('lightbox-cerrar').addEventListener('click',lbCerrar);
  document.getElementById('lightbox-prev').addEventListener('click',e=>{e.stopPropagation();lbNav(-1);});
  document.getElementById('lightbox-next').addEventListener('click',e=>{e.stopPropagation();lbNav(1);});
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)lbCerrar();});
  document.addEventListener('keydown',e=>{
    if(!lightbox.classList.contains('abierto'))return;
    if(e.key==='Escape')lbCerrar();
    if(e.key==='ArrowLeft')lbNav(-1);
    if(e.key==='ArrowRight')lbNav(1);
  });
}

/* ====== INSTAGRAM ====== */
const INSTA=[{"u": "assets/img/ig-DecKrf5iOYa-1.jpg", "t": "Parte 2 //0001 de las fotos a @rust_bandd increíble día @elvolander evento de @yovivonavegando en @elvolander", "p": "https://www.instagram.com/p/DecKrf5iOYa/"}, {"u": "assets/img/ig-DecKrf5iOYa-2.jpg", "t": "Parte 2 //0001 de las fotos a @rust_bandd increíble día @elvolander evento de @yovivonavegando en @elvolander", "p": "https://www.instagram.com/p/DecKrf5iOYa/"}, {"u": "assets/img/ig-DebkqMECGEK-1.jpg", "t": "Aquí tenemos ya las fotos de @rust_bandd en el @elvolander en el evento de @yovivonavegando", "p": "https://www.instagram.com/p/DebkqMECGEK/"}, {"u": "assets/img/ig-DebkqMECGEK-2.jpg", "t": "Aquí tenemos ya las fotos de @rust_bandd en el @elvolander en el evento de @yovivonavegando", "p": "https://www.instagram.com/p/DebkqMECGEK/"}, {"u": "assets/img/ig-DbSx1hYiARg-1.jpg", "t": "Por favor no miren la ultima foto no me hago responsable gracias fotos a @belentg22", "p": "https://www.instagram.com/p/DbSx1hYiARg/"}, {"u": "assets/img/ig-DbSx1hYiARg-2.jpg", "t": "Por favor no miren la ultima foto no me hago responsable gracias fotos a @belentg22", "p": "https://www.instagram.com/p/DbSx1hYiARg/"}, {"u": "assets/img/ig-DbFpvOJCAkN-1.jpg", "t": "Otra sesión de fotos y está vez a @ayelenalc espero que les guste .", "p": "https://www.instagram.com/p/DbFpvOJCAkN/"}, {"u": "assets/img/ig-DbFpvOJCAkN-2.jpg", "t": "Otra sesión de fotos y está vez a @ayelenalc espero que les guste .", "p": "https://www.instagram.com/p/DbFpvOJCAkN/"}, {"u": "assets/img/ig-DbXxRiyCN5--1.jpg", "t": "Hola mundo , hoy tenemos a @raul_barbecue . . . . . . . . .", "p": "https://www.instagram.com/p/DbXxRiyCN5-/"}, {"u": "assets/img/ig-DbXxRiyCN5--2.jpg", "t": "Hola mundo , hoy tenemos a @raul_barbecue . . . . . . . . .", "p": "https://www.instagram.com/p/DbXxRiyCN5-/"}];
const instaGrid=document.getElementById('insta-grid');
if(instaGrid){
  instaGrid.innerHTML=INSTA.map(f=>`
    <a class="insta-item" href="${f.p}" target="_blank" rel="noopener" title="${f.t}">
      <img src="${f.u}" alt="Foto de KoalaSan en Instagram" loading="lazy">
      <div class="insta-hover">📷</div>
    </a>`).join('');
}

/* ====== TESTIMONIOS ====== */
const testimonios=document.querySelectorAll('.testimonio'),dots=document.getElementById('dots');
if(testimonios.length){
  let tActivo=0,tTimer;
  testimonios.forEach((_,i)=>{
    const d=document.createElement('span');d.className='dot'+(i===0?' activo':'');
    d.addEventListener('click',()=>tIr(i));dots.appendChild(d);
  });
  function tIr(i){
    testimonios[tActivo].classList.remove('activo');dots.children[tActivo].classList.remove('activo');
    tActivo=i;testimonios[tActivo].classList.add('activo');dots.children[tActivo].classList.add('activo');
    clearInterval(tTimer);tAuto();
  }
  function tAuto(){tTimer=setInterval(()=>tIr((tActivo+1)%testimonios.length),5500);}
  tAuto();
}

/* ====== FORMULARIO ====== */
const form=document.getElementById('form-contacto');
if(form){
  const campoFecha=document.getElementById('fecha');
  const hoy=new Date();
  campoFecha.min=[hoy.getFullYear(),String(hoy.getMonth()+1).padStart(2,'0'),String(hoy.getDate()).padStart(2,'0')].join('-');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const msg=document.getElementById('form-mensaje');
    if(!form.nombre.value.trim()||!form.email.value.trim()||!form.mensaje.value.trim()){
      msg.textContent='Por favor, rellena todos los campos obligatorios.';
      msg.className='form-mensaje error';msg.style.display='block';return;
    }
    const fecha=form.fecha.value?' Fecha: '+form.fecha.value+'.':'';
    const texto='Hola! Soy '+form.nombre.value+'. Me interesa: '+form.tipo.value+'.'+fecha+' '+form.mensaje.value+' (Email: '+form.email.value+')';
    window.open('https://wa.me/'+S.wa+'?text='+encodeURIComponent(texto),'_blank');
    msg.textContent='¡Mensaje preparado! Se ha abierto WhatsApp para enviarlo.';
    msg.className='form-mensaje';msg.style.display='block';
    form.reset();
  });
}

/* ====== PANEL DE ADMINISTRACIÓN ====== */
const adminModal=document.getElementById('admin-modal'),
      adminPanel=document.getElementById('admin-panel'),
      loginForm=document.getElementById('login-form'),
      loginError=document.getElementById('login-error');
function abrirAdmin(){
  if(sessionStorage.getItem('fv_admin')==='1'){abrirPanel();}
  else{
    const nuevo=!S.passHash;
    document.getElementById('login-titulo').textContent=nuevo?'Crear contraseña de administrador':'Acceso administrador';
    document.getElementById('login-desc').textContent=nuevo?'Elige una contraseña de al menos 6 caracteres para gestionar la web desde este navegador.':'Introduce tu contraseña para gestionar la web.';
    document.getElementById('login-label').textContent=nuevo?'Nueva contraseña':'Contraseña';
    document.getElementById('login-submit').textContent=nuevo?'Crear y entrar':'Entrar al panel';
    document.getElementById('admin-pass').minLength=nuevo?6:1;
    adminModal.classList.add('abierto');
    setTimeout(()=>document.getElementById('admin-pass').focus(),100);
  }
}
function abrirPanel(){
  document.getElementById('adm-hero').value=S.hero;
  document.getElementById('adm-about').value=S.about;
  document.getElementById('adm-wa').value=S.wa;
  document.getElementById('adm-ig').value=S.ig;
  ['galeria','instagram','testimonios','redes'].forEach(k=>{document.getElementById('adm-chk-'+k).checked=S.mostrar[k];});
  adminPanel.classList.add('abierto');
}
document.getElementById('admin-fab').addEventListener('click',abrirAdmin);
document.getElementById('login-cancelar').addEventListener('click',()=>adminModal.classList.remove('abierto'));
adminModal.addEventListener('click',e=>{if(e.target===adminModal)adminModal.classList.remove('abierto');});
document.getElementById('admin-cerrar').addEventListener('click',()=>adminPanel.classList.remove('abierto'));
loginForm.addEventListener('submit',async e=>{
  e.preventDefault();
  const introdujo=document.getElementById('admin-pass').value;
  if(!S.passHash&&introdujo.length>=6){S.passHash=await hash(introdujo);guardar();}
  if(S.passHash&&await hash(introdujo)===S.passHash){
    sessionStorage.setItem('fv_admin','1');loginError.style.display='none';
    adminModal.classList.remove('abierto');loginForm.reset();abrirPanel();
  }else{
    loginError.textContent=S.passHash?'Contraseña incorrecta, inténtalo de nuevo.':'Escribe al menos 6 caracteres.';
    loginError.style.display='block';document.getElementById('admin-pass').value='';
  }
});
document.getElementById('admin-guardar').addEventListener('click',async()=>{
  const nuevoPass=document.getElementById('adm-pass').value.trim();
  if(nuevoPass)S.passHash=await hash(nuevoPass);
  S.hero=document.getElementById('adm-hero').value.trim()||DEFAULTS.hero;
  S.about=document.getElementById('adm-about').value.trim()||DEFAULTS.about;
  S.wa=document.getElementById('adm-wa').value.replace(/\D/g,'')||DEFAULTS.wa;
  S.ig=document.getElementById('adm-ig').value.trim().replace(/^@/,'')||DEFAULTS.ig;
  ['galeria','instagram','testimonios','redes'].forEach(k=>{S.mostrar[k]=document.getElementById('adm-chk-'+k).checked;});
  guardar();aplicar();
  const msg=document.getElementById('admin-msg');
  msg.textContent='Cambios guardados en este navegador. Para que los vean los visitantes, hay que publicar el código.';
  msg.className='form-mensaje';msg.style.display='block';
  document.getElementById('adm-pass').value='';
  setTimeout(()=>{msg.style.display='none';},4000);
});
document.getElementById('admin-logout').addEventListener('click',()=>{
  sessionStorage.removeItem('fv_admin');adminPanel.classList.remove('abierto');
});
