// var de dev
var generals;

var containerEvenements;

function initTest(){
  containerEvenements = document.getElementById('container');
}


// var globale
var tabEvenements =[];
//
// function getData(){
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET",'https://www.googleapis.com/calendar/v3/calendars/simplon.co_7sc0sp073u3svukpopmhob9fmg%40group.calendar.google.com/events?key=AIzaSyADm7UvQFnHmkfo_sei1oZoLvx_X-_mhFI',true);
//
//   xhr.onloadend = handleGetResponse;
//   xhr.onerror = function(e){
//     console.log("erreur", e.error);
//   }
//   xhr.send();
// }

function getData(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",'import.php?get=true',true);

    xhr.onloadend = handleGetResponse;
    xhr.onerror = function(e){
      console.log("erreur", e.error);
    }
    xhr.send();
}



function init(){
  getData();
  initTest();
  document.getElementById('afficheEvenements').addEventListener('click',handleAfgEvenements);
  document.getElementById('ajoutUrl').addEventListener('click',afgFormUrl);
  document.getElementById('tri').addEventListener('click',handleTri);


}
// gestion de la reponse lors de l'init,
function handleGetResponse(){
  var data = JSON.parse(this.responseText);
  data = {items: data};
  console.log(data);
  generals = data;
  fillTabEvents(data);
}

// fonction de creation d'element html avec id class et text
function createHtmlElement(type,id = "",classe = "",texte = ""){
  var temp = document.createElement(type);
  if(temp){
    temp.id = id;
    temp.className = classe;
    temp.innerText = texte;
  }
  return temp;
}

//
function fillTabEvents(data){
  for (var i = 0; i < data.items.length; i++) {
    var temp = data.items[i];
    if(temp.summary &&
      (temp.start.dateTime || temp.start.date) &&
      (temp.end.dateTime || temp.end.date) &&
       temp.creator.email){

         tabEvenements.push(new Evenement(temp.summary,
                                          temp.start.dateTime || temp.start.date,
                                          temp.end.dateTime || temp.end.date,
                                          temp.creator.email,
                                          i));

       }else if (temp.titre && temp.debut && temp.fin && temp.mailCreateur) {
         var tmp = new Evenement(temp.titre,temp.debut,temp.fin,temp.mailCreateur,i);
         tabEvenements.push(tmp);
       }
  }
  handleAfgEvenements();
}


function afficheAllEvenements(tab,eleHtml){
  for (var i = 0; i < tab.length; i++) {
    tab[i].afficheEvenement(eleHtml);
  }
}

// affiche les evenements par ecoute du click sur le bouton de la navbar 'id=afficheEvenement'
function handleAfgEvenements(event){
  afficheAllEvenements(tabEvenements,containerEvenements);
  containerEvenements.style.height = "100%";

  var buttonAfgEvenement = document.getElementById('afficheEvenements');
  buttonAfgEvenement.innerText = "cacher les evenements";
  buttonAfgEvenement.removeEventListener('click',handleAfgEvenements);
  buttonAfgEvenement.addEventListener('click',handleHideEvenements);
}

// cache les evenements
function handleHideEvenements(event){
  containerEvenements.style.height = "0";
  var buttonAfgEvenement = document.getElementById('afficheEvenements');
  buttonAfgEvenement.innerText = "Afficher les evenements";
  buttonAfgEvenement.removeEventListener('click',handleHideEvenements);
  buttonAfgEvenement.addEventListener('click',handleAfgEvenements);

}

//envoie toute le tableau d'evenment a la base de donneeMusique
//utiliser uniquement lors de la premiere mise en place de la base donnée pour l'exercise
//
// function sendTable(tab){
//   for (var i = 0; i < tab.length; i++) {
//     post('import.php?add=true',"data="+JSON.stringify(tab[i]));
//   }
// }

//remplacer par send dans la class evenement
//
// function post(url,data,callback){
//   var xhr = new XMLHttpRequest();
//
//   xhr.open('POST',url,true);
//   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
//
//   if(callback){
//     xhr.onloadend = callback.bind(xhr);
//   }else{
//     xhr.onloadend = function(){};
//   }
//
//   xhr.send(data);
// }

class Evenement{
  constructor(titre,debut,end,mailCreateur,index){
    this.titre = titre;
    this.debut = debut;
    this.end = end;
    this.mailCreateur = mailCreateur;
    this.index = index;
  }
  afficheEvenement(eleHtml){
    //l'evenemnt sera ajouter a la suite dans eleHtml
    this.principal = createHtmlElement('div','evenement'+this.index,'evenements');
    this.titreHTML = createHtmlElement('p','','itemEvenementTitre',this.titre);
    this.debutHTML = createHtmlElement('p','','itemEvenementDebut',this.debut.toString());
    this.endHTML = createHtmlElement('p','','itemEvenementFin',this.end.toString());
    this.mailCreateurHTML = createHtmlElement('p','','itemEvenementMail',this.mailCreateur);

    this.principal.appendChild(this.titreHTML);
    this.principal.appendChild(this.debutHTML);
    this.principal.appendChild(this.endHTML);
    this.principal.appendChild(this.mailCreateurHTML);
    eleHtml.appendChild(this.principal);
  }
  send(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST','import.php?add=true',true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send("data="+JSON.stringify(this));
  }
}

// affichage du formulaire d'import par url
function afgFormUrl(){
  console.log("bonjour");
  let tmp = createHtmlElement('div','asup');
  let input = createHtmlElement('input','input');
  input.type = 'text';
  let submit = createHtmlElement('input','truc');
  submit.type = 'button';
  submit.onclick = 'pouet()';
  submit.value = 'valider';
  let cancel = createHtmlElement('input','cancel');
  cancel.type = 'button';
  cancel.addEventListener('click',hideForm);
  cancel.value ='annuler'

  tmp.appendChild(input);
  tmp.appendChild(submit);
  tmp.appendChild(cancel);
  document.body.appendChild(tmp);
  return tmp;
}

// cache du formulaire d'import par url
function hideForm(){
  let tmp = document.getElementById('asup');
  if(tmp){
    tmp.parentElement.removeChild(tmp);
    return "pouet";
  }

}

// traite l'entrée de l'utilisateur pour l'import d'evenement
function pouet(){
  var text = document.getElementById('input').value;
  if(text && text.test(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)){
    var xhr =new XMLHttpRequest();
    xhr.open('GET',text,true);
    xhr.onerror = function(e){
      console.log("error : ",e);
    }
    xhr.onloadend = handleGetResponseOut.bind(xhr);
  }
}


function handleGetResponseOut(){
  var data = JSON.parse(this.responseText);
  generals=data;
  for (var i = 0; i < data.items.length; i++) {
    if(data.items[i].summary &&
      (data.items[i].start.dateTime || data.items[i].start.date) &&
      (data.items[i].end.dateTime || data.items[i].end.date) &&
       data.items[i].creator.email){
         var tmp = new Evenement(data.items[i].summary,
                                 data.items[i].start.dateTime || data.items[i].start.date,
                                 data.items[i].end.dateTime || data.items[i].end.date,
                                 data.items[i].creator.email,
                                 i);
         tmp.afficheEvenement(container);
         tmp.send();//envoie l'evennement sur la base de donnee
         tabEvenements.push(tmp);
       }
  }
}

function handleTri(){
  var tri = document.getElementById('tri');
  var xhr = new XMLHttpRequest();
  containerEvenements.parentElement.removeChild(containerEvenements);
  containerEvenements = createHtmlElement('div','','container');
  document.body.appendChild(containerEvenements);

  console.log(tri.dataset.tri);
  if(tri.dataset.tri == "ASC"){
    tri.dataset.tri = "DESC";
    tri.innerText = "tri descendant";
    tabEvenements = [];
    xhr.open('GET','import.php?tri=desc',true);
    xhr.onloadend = function(){
      var data = JSON.parse(this.responseText);
      data = {items: data};
      generals = data;
      fillTabEvents(data);
    }
    xhr.send();
  }else if (tri.dataset.tri == "DESC") {
    console.log("desc");

    tri.dataset.tri = "ASC";
    tri.innerText = "tri ascendant";
    tabEvenements = [];
    xhr.open('GET','import.php?tri=asc',true);
    xhr.onloadend = function(){
      var data = JSON.parse(this.responseText);
      data = {items: data};
      generals = data;

      fillTabEvents(data);
    }
    xhr.send();
  }
}
