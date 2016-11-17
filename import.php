<?php
try
{
  $bdd = new PDO("mysql:host=localhost;dbname=u116577143_test;charset=utf8", 'u116577143_titi', 'TIti_080808_sql');
}
catch (Exception $e)
{
      die('Erreur : ' . $e->getMessage());
}

if(isset($_GET['add']) && $_GET['add'] == true){
  if(isset($_POST['data'])){
    addEvenement(json_decode($_POST['data']),$bdd);
  }
}

function addEvenement($data,$bdd){
  $req = $bdd->prepare('INSERT INTO evenement (titre,debut,fin,mailCreateur) VALUES (:titre,:debut,:fin,:mailCreateur)');
  $req->bindparam('titre',$data->titre,PDO::PARAM_STR);
  $req->bindparam('mailCreateur',$data->mailCreateur,PDO::PARAM_STR);
  $req->bindparam('debut',$data->debut);
  $req->bindparam('fin',$data->end);
  $req->execute();
}

if(isset($_GET['get']) && $_GET['get']=true){
   $req = $bdd->query('SELECT * FROM evenement ORDER BY debut ASC');
   $temp = [];
   while($data = $req->fetch()){
     array_push($temp,$data);
   }
   echo json_encode($temp);
}

if(isset($_GET['tri'])){
  if($_GET['tri'] == "asc"){
    $req = $bdd->query('SELECT * FROM evenement ORDER BY debut ASC');
    $temp = [];
    while($data = $req->fetch()){
      array_push($temp,$data);
    }
    echo json_encode($temp);
  }elseif ($_GET['tri'] == "desc") {
    $req = $bdd->query('SELECT * FROM evenement ORDER BY debut DESC');
    $temp = [];
    while($data = $req->fetch()){
      array_push($temp,$data);
    }
    echo json_encode($temp);
  }
}

?>
