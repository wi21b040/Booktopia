$(document).ready(function () {

    console.log("Ready ... DOM loaded!");

    //loadHead();
    //loadFooter();
    loadNavBar();

    // when clicked button with id="btnSubmitLogin" in login.php call function loginUser()"
    $("#btnSubmitLogin").on("click", function() {
        console.log("loginUser() called");
        var username = $("#usernameLogin").val();
        var password = $("#passwordLogin").val();
        loginUser(username, password);
    });

    $("#btnSubmitRegistration").on("click", function () {
        /* var salutation = $("#salutationRegistration").val();
        var firstName = $("#firstNameRegistration").val();
        var lastName = $("#lastNameRegistration").val();
        var address = $("#addressRegistration").val();
        var postcode = $("#postcodeRegistration").val();
        var location = $("#locationRegistration").val();
        var email = $("#emailRegistration").val();
        var username = $("#usernameRegistration").val();
        var password = $("#passwordRegistration").val();
        var passwordConfirmed = $("#passwordConfirmedRegistration").val();
        var creditCard = $("#creditCardRegistration").val();
        console.log("registerUser() called"); */
        registerUser();
        //registerUser(salutation, firstName, lastName, address, postcode, location, email, username, password, passwordConfirmed, creditCard);
    });


  });


function loadNavBar() {
    $.ajax({
        type: "GET",
        url: "../../Backend/logic/session.php",
        dataType: "html",
        cache: false,
        success: function (response) {

            console.log(response);

            if (response == "admin") {
                // show logout, profile, products, customers, vouchers / hide register, login, shopping cart
                /* $("#logout").show();
                $("#profile").show();
                $("#products").show();
                $("#customers").show();
                $("#vouchers").show(); */
                
                $("#navRegister").hide();
                $("#navShoppingCart").hide();
                $("#navLogin").hide();

            } else if (response == "user"){
                // show logout and profile / hide register, login, products, customers, vouchers
                /* $("#logout").show();
                $("#profile").show(); */

                $("#navRegister").hide();                
                $("#navManageProducts").hide();
                $("#navManageCustomers").hide();
                $("#navManageVouchers").hide();
                $("#navLogin").hide();

            } else if (response == "guest"){
                // show register and login / hide logout, profile, products, customers, vouchers
                /* $("#register").show();
                $("#login").show(); */

                $("#navManageProducts").hide();
                $("#navManageCustomers").hide();
                $("#navManageVouchers").hide();
                $("#navProfile").hide();
                $("#navLougout").hide();

            } else {
                //echo("Error: " + response);
            }
        },

        error: function () {
            // Error handling
        }
    });
}


function loginUser(username, password) {

    password = hashPasswordWithSHA512(password);
    console.log("HashedPassword before ajax call:");
    console.log(password);

    // Client validation username and password
    if (username == "" || password == "") {
        // Append error message to id="loginForm"
        $("#loginForm").append("<p style='color:red; font-weight:bold;'><small>Bitte Username und Passwort angeben!</small></p>");
        // noch ein hide einfügen, damit Error Nachricht wieder verschwindet
        return;
    }


    $.ajax({
        type: "POST",
        url: "../../Backend/api.php",
        data: {
            username: username,
            password: password
        },
        dataType: "html",
        cache: false,
        success: function (response) {

            console.log("Response from loginUser():");
            //if (response === "success") {
                // Erfolgreich eingeloggt
                // Hier kannst du entsprechende Aktionen durchführen, z.B. Weiterleitung zur Startseite

                // Set session variable for remember me
                /* if ($("#rememberMe").is(":checked")) {
                    sessionStorage.setItem("username", username);
                } */

                // Redirect to index.html

                //window.location.href = "../sites/index.php";
                console.log(response);


            //} else if (response === "error") {
                // Fehler beim Einloggen
                // Hier kannst du eine Fehlermeldung anzeigen oder andere Aktionen durchführen
                // Append error message to id="loginForm"
                //$("#loginForm").append("<p style='color:red; font-weight:bold;'>Fehler beim Einloggen!</p>");
            //} else {
                // Ungültige Antwort
                // Hier kannst du eine Fehlermeldung anzeigen oder andere Aktionen durchführen
                //alert("Ungültige Antwort vom Server");
            //}
        },
        error: function () {
            // Fehler beim AJAX-Aufruf
            // Hier kannst du eine Fehlermeldung anzeigen oder andere Aktionen durchführen
            $("#loginForm").append("<p style='color:red; font-weight:bold;'>Fehler beim Login AJAX Aufruf!</p>");
        }
    });
}



function registerUser() {

    /* var salutation = validate($("#salutationRegistration").val());
    var firstName = validate($("#firstNameRegistration").val());
    var lastName = validate($("#lastNameRegistration").val());
    var address = validate($("#addressRegistration").val());
    var postcode = validate($("#postcodeRegistration").val());
    var location = validate($("#locationRegistration").val());
    var email = validate($("#emailRegistration").val());
    var username = validate($("#usernameRegistration").val());
    var password = validate($("#passwordRegistration").val());
    var passwordConfirmed = validate($("#passwordConfirmedRegistration").val());
    var creditCard = validate($("#creditCardRegistration").val()); */

    var salutation = $("#salutationRegistration").val();
    var firstName = $("#firstNameRegistration").val();
    var lastName = $("#lastNameRegistration").val();
    var address = $("#addressRegistration").val();
    var postcode = $("#postcodeRegistration").val();
    var location = $("#locationRegistration").val();
    var email = $("#emailRegistration").val();
    var username = $("#usernameRegistration").val();
    var password = $("#passwordRegistration").val();
    var passwordConfirmed = $("#passwordConfirmedRegistration").val();
    var creditCard = $("#creditCardRegistration").val();
    
    console.log("registerUser() called");
    console.log("password: " + password);
    console.log("passwordConfirmed: " + passwordConfirmed);

    // Client validation
    if (salutation == null || firstName == "" || lastName == "" || address == "" || postcode == "" || location == "" || email == "" || username == "" || password == "" || passwordConfirmed == "" || creditCard == "") {
        console.log("Client validation failed!");
        $("#errorRegistration").append("<p style='color:red; font-weight:bold;'>Bitte alle Felder ausfüllen!</p>");
        // noch ein hide einfügen, damit Error Nachricht wieder verschwindet
        return;
    }

    if (password != passwordConfirmed) {
        console.log("Password and passwordConfirmed stimmen nicht überein!");
        $("#errorRegistration").append("<p style='color:red; font-weight:bold;'>Passwörter stimmen nicht überein!</p>");
        // noch ein hide einfügen, damit Error Nachricht wieder verschwindet
        return;
    }

    console.log("username: " + username);

    password = hashPasswordWithSHA512(password);
    console.log("HashedPassword before ajax call:");
    console.log(password);
    
    var user = {
        salutation: salutation,
        firstName: firstName,
        lastName: lastName,
        address: address,
        postcode: postcode,
        location: location,
        email: email,
        username: username,
        password: password,
        passwordConfirmed: passwordConfirmed,
        creditCard: creditCard
    }

    console.log(user);


    $.ajax({
        type: "POST",
        url: "../../Backend/api.php",
        data: {
            user: user
        },
        dataType: "html",
        cache: false,
        success: function (response) {

            console.log("Response from loginUser():");
            console.log(response);
            alert('Sie wurden erfolgreich registriert, bitte loggen Sie sich ein, um fortzufahren.');
            window.location.href = "../sites/index.php";

        },
        error: function () {
        }
    });

    }

    

    






function loadHead() {
    $.ajax({
        type: "GET",
        url: "../Frontend/sites/components/head.html",
        dataType: "html",
        cache: false,
        success: function (response) {
            //$("head").html(response);
            $("head").load("./Frontend/sites/components/head.html");
        }
    });
    //$("head").load("./Frontend/sites/components/head.html");
}

function loadFooter() {
    $.ajax({
        type: "GET",
        url: "../Frontend/sites/components/footer.html",
        dataType: "html",
        cache: false,
        success: function (response) {
            //$("footer").html(response);
            $("footer").load("../Frontend/sites/components/footer.html");
        }
    });
    //$("head").load("./Frontend/sites/components/head.html");
}

function hashPasswordWithSHA512(password) {
    var hashedPassword = CryptoJS.SHA512(password).toString();
    return hashedPassword;
}


function validate(input) {
    if (input == "") {
        // add following message to div 'errorRegistration'
        $("#errorRegistration").append("<p style='color:red; font-weight:bold;'>Bitte alle Felder ausfüllen!</p>");
        return;
    }
}












(function() {
    //$("head").load(".Frontend/sites/components/head.html");
    $("nav").load("./Frontend/sites/components/nav.html");
    $("footer").load("./Frontend/sites/components/nav.html");
   });