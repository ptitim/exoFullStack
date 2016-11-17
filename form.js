class Evenement{
  constructor(titre,debut,end,mailCreateur,index){
    this.titre = titre;
    this.debut = debut;
    this.end = end;
    this.mailCreateur = mailCreateur;
    this.index = index || 0;
  }
  afficheEvenement(eleHtml){
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

    // if(callback){
    //   xhr.onloadend = callback.bind(this);
    // }else{
    //   xhr.onloadend = function(){};
    // }

    xhr.send("data="+JSON.stringify(this));
  }
}

function handleForm(){
  var titre = document.getElementById('titre').value;
  var mail = document.getElementById('mail').value;
  var dateDebut = document.getElementById('dateDebut').value;
  var datefin = document.getElementById('datefin').value;
  var timedebut = document.getElementById('timedebut').value;
  var timefin = document.getElementById('timefin').value;

  if(titre != "" && mail != "" &&  dateDebut != ""  && datefin != "" && timefin != "" && timedebut != ""){
    dateDebut += "T"+timedebut;
    datefin += "T"+timefin;
    console.log('dateDebut = ',dateDebut," dateFin : ",datefin);
    var tmp = new Evenement(titre,dateDebut,datefin,mail);
    tmp.send();
  }
}
