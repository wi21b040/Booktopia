$(document).ready(function () {

    console.log("Ready ... DOM loaded!");
    loadNavBar();

    // when clicked button with id="btnSubmitLogin" in login.php call function loginUser()"
    $("#btnSubmitLogin").on("click", function() {
        console.log("loginUser() called");
        loginUser();
    });

    $("#btnSubmitRegistration").on("click", function () {
        console.log("registerUser() called");
        registerUser();
    });

    $("#navLougout").on("click", function() {
        console.log("logoutUser() called");
        logoutUser();
    });

  });

// function to define which user can see which navbar items
function loadNavBar() {

    var userSession = getSessionVariables();

    var sessionUsername = userSession['sessionUsername'];
    var sessionUserid = userSession['sessionUserid'];
    var sessionAdmin = userSession['sessionAdmin'];
    var sessionActive = userSession['sessionActive'];

    console.log("user description:")
    console.log("username: " + sessionUsername);
    console.log("userid: " + sessionUserid);
    console.log("admin: " + sessionAdmin);
    console.log("active: " + sessionActive);

    if (sessionUsername != null && sessionActive != 0) {
        
        if (sessionAdmin == 1) {
            // show logout, profile, products, customers, vouchers / hide register, login, shopping cart            
            $("#navRegister").hide();
            $("#navShoppingCart").hide();
            $("#navLogin").hide();

            // append welcome message with <li> and <span> to id="navSearch"
            $("#navSearch").after("<li class='nav-item' id='navWelcomeUser'><span class='nav-link'><i>Willkommen " + sessionUsername + "!</i></span></li>");
            
                
        } else if (sessionAdmin == 0){
            // show logout, profile, shopping cart / hide register, login, products, customers, vouchers
            $("#navRegister").hide();                
            $("#navManageProducts").hide();
            $("#navManageCustomers").hide();
            $("#navManageVouchers").hide();
            $("#navLogin").hide();

            // append welcome message with <li> and <span> to id="navSearch"
            $("#navSearch").after("<li class='nav-item' id='navWelcomeUser'><span class='nav-link'><i>Willkommen " + sessionUsername + "!</i></span></li>");
    
        }

    } else {
        // show register and login / hide logout, profile, products, customers, vouchers
        $("#navManageProducts").hide();
        $("#navManageCustomers").hide();
        $("#navManageVouchers").hide();
        $("#navProfile").hide();
        $("#navLougout").hide();

    }
    
}


function loginUser() {

    var username = $("#usernameLogin").val();
    var password = $("#passwordLogin").val();

    // Client validation username and password
    if (username == "" || password == "") {
        console.log("Client validation failed!");
        $("#errorLogin").append("<p style='color:red; font-weight:bold;'>Bitte alle Felder ausfüllen!</p>");
        // noch ein hide einfügen, damit Error Nachricht wieder verschwindet
        return;
    }

    password = hashPasswordWithSHA512(password);
    console.log("Login - HashedPassword before ajax call:");
    console.log(password); 

    $.ajax({
        type: "GET",
        url: "../../Backend/api.php",
        data: {
            username: username,
            password: password
        },
        dataType: "html",
        cache: false,
        success: function (response) {

            console.log("Response from loginUser():");
            console.log(response);
            alert('Sie wurden erfolgreich eingeloggt.');
            window.location.href = "../sites/index.php";

            //if (response === "success") {
                // Erfolgreich eingeloggt
                // Hier kannst du entsprechende Aktionen durchführen, z.B. Weiterleitung zur Startseite

                // Set session variable for remember me
                /* if ($("#rememberMe").is(":checked")) {
                    sessionStorage.setItem("username", username);
                } */

                // Redirect to index.html

                //window.location.href = "../sites/index.php";

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
            //$("#errorLogin").append("<p style='color:red; font-weight:bold;'>Fehler beim Login AJAX Aufruf!</p>");
        }
    });
}



function registerUser() {

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

            console.log("Response from registerUser():");
            console.log(response);
            alert('Sie wurden erfolgreich registriert, bitte loggen Sie sich ein, um fortzufahren.');
            window.location.href = "../sites/index.php";

        },
        error: function () {
        }
    });

    }

    

function logoutUser() {

    console.log("logoutUser() reached in myFunctions.js");

    $.ajax({
        type: "GET",
        url: "../../Backend/logic/logout.php",
        dataType: "html",
        cache: false,
        success: function (response) {
            console.log("Response from logoutUser():");
            console.log(response);
            alert('Sie wurden erfolgreich ausgeloggt.');
        },

        error: function () {
            // Error handling
            console.log("Error in error function of logoutUser()");
            alert("Error in error function of logoutUser()");
        }
    });
    window.location.href = "../sites/index.php";
}


function getSessionVariables() {

    var userSession = [];

    $.ajax({
        type: "GET",
        url: "../../Backend/api.php" + "?getSession",
        dataType: "json",
        cache: false,
        async: false,
        success: function (response) {

            console.log("Response from api.php in getSessionVariables():");
            console.log(response);
            userSession = response;
            
        },

        error: function () {
            // Error handling
            console.log("Error in error function of getSessionVariables()");
        }
    });

    return userSession;    

}


function hashPasswordWithSHA512(password) {
    var hashedPassword = CryptoJS.SHA512(password).toString();
    return hashedPassword;
}
