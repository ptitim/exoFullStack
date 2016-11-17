<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="form.js" charset="utf-8"></script>
  </head>
  <body>
    <form>
      <fieldset class="form-group">
        <label for="titre">Titre</label>
        <input type="text" class="form-control" id="titre" placeholder="Enter title">
      </fieldset>
      <fieldset>
        <label for="mail">Email</label>
        <input type="mail" class="form-control" id="mail" placeholder="Enter mail">
      </fieldset>
      <fieldset class="form-group">
        <label for="dateDebut">date debut</label>
        <input type="date" class="form-control" id="dateDebut">
        <input type="time" class="form-control" id="timedebut">

      </fieldset>
      <fieldset>
        <label for="datefin">date Fin</label>
        <input type="date" class="form-control" id="datefin">
        <input type="time" class="form-control" id="timefin">

      </fieldset>
      <button type="button" onclick="handleForm()">Submit</button>
    </form>

    <a href="index.php">Retour</a>
  </body>
</html>
