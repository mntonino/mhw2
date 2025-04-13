function apriModale(){
    modalView.classList.remove('hidden');
    modalView.style.top=window.pageYOffset + 'px';
    document.body.classList.add('no-scroll');
}

function chiudiModaleCliccandoFuori(event){
    if(!modalBox.contains(event.target)){
        modalView.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }
}

function chiudiModaleTramiteX(){
    modalView.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function cambiaImmagineDiCopertina(){
    let indice=copertineList.indexOf(imgCopertina.dataset.percorsoRelativo);
    indice=((indice+1)%(copertineList.length));
    imgCopertina.src=copertineList[indice];
    imgCopertina.setAttribute('data-percorso-relativo', copertineList[indice]);

    setTimeout(cambiaImmagineDiCopertina, 3000);
}

function tornaInAlto(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function gestioneComparsaPulsanteRitornoInAlto(){
    if(window.pageYOffset>210){
        scrollerUp.classList.remove('hidden');
    }

    if(window.pageYOffset<210){
        scrollerUp.classList.add('hidden');
    }
}

function scomparsaPulsanteCerca(){
    buttonCerca.classList.add('hidden');
}

function apparizionePulsanteCerca(event){
    if(!buttonIndirizzo.contains(event.target)){
        buttonCerca.classList.remove('hidden');
    }
}

function apriChiudiMenuOpzioni(event){
    const opzione=event.currentTarget;
    const box=opzione.parentNode;
    const sottoOpzioni = box.querySelector('.sotto-opzioni');
    sottoOpzioni.classList.toggle('hidden');

    const freccia=opzione.querySelector('.freccia'); /*Aggiornamento direzione freccia*/
    if(sottoOpzioni.classList.contains('hidden')){
        freccia.src=frecceMap['basso'];
    } else{
        freccia.src=frecceMap['alto'];
    }
}

function apriMenuBandiere(){
    menuBandiere.classList.toggle('hidden');
}

function chiudiMenuBandiereCliccandoFuori(event){
    if(!menuBandiere.contains(event.target) && !bandieraMostrata.contains(event.target)){
        menuBandiere.classList.add('hidden');
    }
}

function cambiaNazionalita(event){
    const nuovaNazione=event.currentTarget; /*Cambia la bandiera mostrata*/
    const nuovaImg=nuovaNazione.querySelector('.flag');
    const imgMostrata=bandieraMostrata.querySelector('.flag');
    imgMostrata.src=nuovaImg.src;

    const vecchiaNazione=menuBandiere.querySelector('#scelta'); /*Metti in grassetto la nuova nazione scelta*/
    vecchiaNazione.removeAttribute('id');
    nuovaNazione.id='scelta';

    const check=vecchiaNazione.querySelector('.check'); /*Aggiungi la spunta alla nuova nazione scelta*/
    vecchiaNazione.removeChild(check);
    nuovaNazione.appendChild(check);

    menuBandiere.classList.add('hidden');
}




const copertineList=['copertina_pizza.png', 'copertina_insalata.png', 'copertina_cheeseburger.png'];
const frecceMap={alto: 'freccia_alto.png', basso: 'freccia_basso.png'};

const modalView=document.querySelector('.modal-view');
const hamburgerMenu=document.querySelector('#hamburger-menu');
const modalBox=document.querySelector('#modal-box');
const x=document.querySelector('#modal-box .top .x');
const imgCopertina=document.querySelector('#half-2 img');
const scrollerUp=document.querySelector('.scroller-up');
const buttonIndirizzo=document.querySelector('#button-indirizzo');
const buttonCerca=document.querySelector('#button-cerca');
const listaOpzioni=document.querySelectorAll('.opzione');
const bandieraMostrata=document.querySelector('#bandiera-mostrata');
const menuBandiere=document.querySelector('#menu-bandiere');
const listaNazioni=document.querySelectorAll('.nazione');
const internationalMenu=document.querySelector('#international');


hamburgerMenu.addEventListener("click", apriModale);
modalView.addEventListener("click", chiudiModaleCliccandoFuori);
x.addEventListener("click", chiudiModaleTramiteX);
scrollerUp.addEventListener("click", tornaInAlto);
document.addEventListener("scroll", gestioneComparsaPulsanteRitornoInAlto);
buttonIndirizzo.addEventListener("click", scomparsaPulsanteCerca);
document.addEventListener("click", apparizionePulsanteCerca);
for(const opzione of listaOpzioni){
    opzione.addEventListener("click", apriChiudiMenuOpzioni);
}
bandieraMostrata.addEventListener("click", apriMenuBandiere);

for(const nazione of listaNazioni){
    nazione.addEventListener('click', cambiaNazionalita)
}
document.addEventListener('click', chiudiMenuBandiereCliccandoFuori);

setTimeout(cambiaImmagineDiCopertina, 3000);

/*Mostrare inizialmente chiuso il sottomenu International nel footer se si apre il sito in modalità mobile, ma non se lo si riduce*/
if(window.innerWidth<600){
    const internationalSottoMenu=document.querySelector('#international');
    internationalSottoMenu.classList.add('hidden');
}