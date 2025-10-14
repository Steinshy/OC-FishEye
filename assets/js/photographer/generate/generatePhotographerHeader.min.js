import {picture as a} from'../../config.js';import {getResponsiveImageUrls as b} from'../../helpers/responsiveImages.js';import {aria as c} from'../../utils/accessibility/aria.js';const{assign:d}=Object;let e=(A,_,B)=>{let D=A.querySelector(a.profile),E=A.querySelector(a.webpSource),F=A.querySelector(a.jpegSource);if(!D)return;let G=()=>A.classList.replace('loading','loaded');E&&(E.srcset=E.dataset.srcset||B);F&&(F.srcset=F.dataset.srcset||_);d(D,{src:_,fetchpriority:'high',decoding:'sync'});D.addEventListener('load',G,{once:!0});D.addEventListener('error',G,{once:!0});D.complete&&G()},f=C=>{let _b=document.createElement('div');_b.className='contact-container';_b.innerHTML=`<button id="contact-button" aria-label="Contacter ${C}" disabled aria-disabled="true">Contactez-moi</button>`;return _b},g=({name:_a,tagline:_B,city:_c,country:_d,price:_e})=>{let _f=document.createElement('div');_f.className='section-info';_f.id='bio-info';_f.innerHTML=`
    <h1 data-label="Nom du photographe">${_a}</h1>
    <p data-label="Ville, Pays">${_c}, ${_d}</p>
    <p data-label="Tagline">${_B}</p>
    <p data-label="Prix">${_e}€ / jour</p>
  `;return _f},h=({name:_A,jpgUrl:aA,webpUrl:_C})=>{let _D=document.createElement('div');_D.className='container-picture loading';const{webp:_E,jpg:_F}=b(_C,aA);_D.innerHTML=`
    <picture>
      <source data-srcset="${_E.url}" type="image/webp">
      <source data-srcset="${_F.url}" type="image/jpeg">
      <img
        class="profile-picture"
        alt="Portrait de ${_A}"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width="900"
        height="900"
      >
    </picture>
  `;e(_D,_F.url,_E.url);return _D};export let generatePhotographerHeader=aB=>{let aC=document.createElement('section');aC.id=aC.className='photographer-section';c.setLabel(aC,'Section du photographe');let aD=document.createElement('div');aD.className='section-container';aD.append(g(aB),f(aB.name),h({name:aB.name,...aB.portraits}));aC.appendChild(aD);return aC};