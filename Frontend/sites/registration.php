<!DOCTYPE html>

<?php
$page = basename($_SERVER['PHP_SELF'], '.php');

$errors = array();

$password = $passwordconfirmed = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!empty($_POST["salutation"])) {
    $salutation = $_POST["salutation"];
    }else{
        $errors['errorSalutation']="Das Feld Anrede muss ausgefüllt sein!";
    }

    if (!empty($_POST["firstName"])) {
    $firstName = $_POST["firstName"];
    }else{
        $errors['errorFirstName']="Das Feld Vorname muss ausgefüllt sein!";
    }

    if (!empty($_POST["lastName"])) {
    $lastName = $_POST["lastName"];
    }else{
        $errors['errorLastName']="Das Feld Nachname muss ausgefüllt sein!";
    }

    if (!empty($_POST["address"])) {
    $address = $_POST["address"];
    }else{
        $errors['errorAddress']="Das Feld Adresse muss ausgefüllt sein!";
    }

    if (!empty($_POST["postcode"])) {
    $postcode = $_POST["postcode"];
    }else{
        $errors['errorPostcode']="Das Feld PLZ muss ausgefüllt sein!";
    }

    if (!empty($_POST["location"])) {
    $location = $_POST["location"];
    }else{
        $errors['errorLocation']="Das Feld Ort muss ausgefüllt sein!";
    }

    if (!empty($_POST["email"])) {
    $email = $_POST["email"];
    }else{
        $errors['errorEmail']="Das Feld E-Mail muss ausgefüllt sein!";
    }

    if (!empty($_POST["username"])) {
    $username = $_POST["username"];
    }else{
        $errors['errorUsername']="Das Feld Benutzername muss ausgefüllt sein!";
    }

    if (!empty($_POST["password"])) {
    $password= $_POST["password"];
    }else{
        $errors['errorPassword']="Das Feld Passwort muss ausgefüllt sein!";
    }

    if (!empty($_POST["passwordConfirmed"])) {
    $passwordconfirmed= $_POST["passwordConfirmed"];
    }else{
        $errors['passwordConfirmedError']="Das Feld Passwort bestätigen muss ausgefüllt sein!";
    }
    
    if($password!=$passwordconfirmed){
        $errors['errorPassword']= "Die Passwörter stimmen nicht überein!";
    }

    if (!empty($_POST["creditCard"])) {
    $creditCard = $_POST["creditCard"];
    }

    if(empty($errors)){
        header('Location: submit.php'); 
        }
    }
?>



<html lang="EN">

<head>

    <?php include "components/head.php";?>

    <title>Booktopia</title>

</head>

<body>

    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <?php include "components/navGuest.php";?>
    </nav>

    <main>
        <div class="content">
            <div class="container">
                <section>
                    <div class="row">
                        <h1 class="headline">Registrierung</h1>
                        <form method="post" action="submit.php">

                            <div class="col-md-9 mb-md-0 mb-5">
                                <div class="col-md-6">
                                    <div class="md-form mb-2">
                                        <label for="salutation">Anrede:</label><br>
                                        <select name="salutation" style="padding-left: 40px;margin-bottom: 25px;"
                                            class="form-control">
                                            <option value="Frau">Frau</option>
                                            <option value="Herr">Herr</option>
                                        </select>

                                        <label for="firstName">Vorname:</label><br>
                                        <input type="text" name="firstName" id="firstName" placeholder="Vorname"
                                            class="form-control" required>
                                        <br>

                                        <label for="lastName">Nachname:</label><br>
                                        <input type="text" name="lastName" id="lastName" placeholder="Nachname"
                                            class="form-control" required>
                                        <br>

                                        <label for="address">Adresse:</label><br>
                                        <input type="text" name="address" id="address" placeholder="Musterstraße 1/1/1"
                                            class="form-control" required>
                                        <br>

                                        <label for="postcode">PLZ:</label><br>
                                        <input type="int" name="postcode" id="postcode" placeholder="1010"
                                            class="form-control" required>
                                        <br>

                                        <label for="location">Ort:</label><br>
                                        <input type="text" name="location" id="location" placeholder="Wien"
                                            class="form-control" required>
                                        <br>

                                        <label for="email">E-Mail-Adresse:</label><br>
                                        <input type="email" name="email" id="email" placeholder="musteremail@icloud.com"
                                            class="form-control" required>
                                        <br>

                                        <label for="username">Benutzername:</label><br>
                                        <input type="text" name="username" id="username" placeholder="Benutzername"
                                            class="form-control" required>

                                        <div class="col">
                                            <br>
                                            <label for="password">Passwort:</label><br>
                                            <input type="password" name="password" id="password" minlength="8"
                                                class="form-control" required>
                                            <br>
                                            <label for="passwordConfirmed">Passwort bestätigen:</label><br>
                                            <input type="password" name="passwordConfirmed" id="passwordConfirmed"
                                                minlength="8" class="form-control" required>
                                        </div>
                                        <div class="col">
                                            <br>

                                            <label for="creditCard">Kreditkartennummer:</label><br>
                                            <input type="int" name="creditCard" id="creditCard" placeholder="12345678"
                                                class="form-control">
                                            <br>
                                        </div>

                                        <div class="errors" style="color:red;">
                                            <?php 
                                                foreach($errors as $value){
                                                echo $value ."<br>";
                                                }
                                            ?>
                                        </div>

                                        <br>
                                        <button type="submit"
                                            style="background-color:black;color:white;">Registrieren</button>

                        </form>
                    </div>
                    <br><br><br>

                </section>
            </div>
        </div>

    </main>

    <footer class="py-3 my-4">
        <?php include "components/footer.php";?>
    </footer>



</body>

</html>