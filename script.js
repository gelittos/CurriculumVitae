"use strict";
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const stage=document.getElementById('portrait-stage'),photo=document.getElementById('portrait'),label=document.getElementById('portrait-name'),rings=document.querySelector('.rings');
const styles=[['foto-scontornata.png','Foto'],['anime.png','Anime'],['collage.png','Collage'],['incisione.png','Incisione'],['acquerello.png','Acquerello'],['illustrazione.png','Illustrato']];
let current=0,turn=0,busy=false;
styles.slice(1).forEach(([file])=>{const img=new Image();img.src='assets/portraits/'+file;});
stage.addEventListener('click',async()=>{
 if(busy)return;busy=true;
 const next=(current+1)%styles.length,[file,name]=styles[next];
 const preload=new Image();preload.src='assets/portraits/'+file;
 try{await preload.decode();}catch{busy=false;return;}
 current=next;photo.src=preload.src;
 photo.alt=next===0?'Gabriele Sottile con microfono e computer, foto scontornata':'Ritratto di Gabriele Sottile, stile '+name.toLowerCase();
 label.textContent=String(next+1).padStart(2,'0')+' / '+name;
 turn+=180;rings.style.setProperty('--ring-turn',turn+'deg');
 stage.classList.remove('changing');void stage.offsetWidth;stage.classList.add('changing');
 setTimeout(()=>{busy=false;stage.classList.remove('changing');},700);
});
