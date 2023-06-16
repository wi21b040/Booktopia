$(document).ready(function () {

    console.log("Ready ... DOM loaded!");

    //loadHead();
    //loadFooter();
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


function loadNavBar() {
    getSessionVariables().then(function (userSession) {        

        var userSession = getSessionVariables();

        console.log("userSession in loadNavBar():")
        console.log(userSession);

        var sessionUsername = userSession['username'];
        var sessionUserid = userSession['userid'];
        var sessionAdmin = userSession['admin'];
        var sessionActive = userSession['active'];

        console.log("username: " + sessionUsername);
        console.log("userid: " + sessionUserid);
        console.log("admin: " + sessionAdmin);
        console.log("active: " + sessionActive);

        if (sessionUsername != null && sessionActive != 0) {
            
            if (sessionAdmin == 1) {
                console.log("returned admin from session.php");
                // show logout, profile, products, customers, vouchers / hide register, login, shopping cart
                /* $("#logout").show();
                $("#profile").show();
                $("#products").show();
                $("#customers").show();
                $("#vouchers").show(); */
                
                $("#navRegister").hide();
                $("#navShoppingCart").hide();
                $("#navLogin").hide();

                // append welcome message with <li> and <span> to id="navSearch"
                $("#navSearch").append("<li class='nav-item' id='navWelcomeUser'><span>Willkkommen " + sessionUsername + "!</span></li>");
                
                    
            } else if (sessionAdmin == 0){
        
                console.log("returned user from session.php");
        
        
                // show logout and profile / hide register, login, products, customers, vouchers
                /* $("#logout").show();
                $("#profile").show(); */
        
                $("#navRegister").hide();                
                $("#navManageProducts").hide();
                $("#navManageCustomers").hide();
                $("#navManageVouchers").hide();
                $("#navLogin").hide();
        
            }


        } else {

            console.log("returned guest from session.php");

            // show register and login / hide logout, profile, products, customers, vouchers
            /* $("#register").show();
            $("#login").show(); */

            $("#navManageProducts").hide();
            $("#navManageCustomers").hide();
            $("#navManageVouchers").hide();
            $("#navProfile").hide();
            $("#navLougout").hide();
        }

    }).catch(function () {
        console.log("Error in loadNavBar() in myFunctions.js");
    });
    
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

    console.log("username: " + username);

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
        success: function (response) {

            console.log("Response from api.php:");
            //console.log(response);


            // save responded array received via api.php
            console.log("test");
            // userSession = JSON.parse(response);
            userSession = response;
            console.log(userSession);
            // !!! BUG:
            // mit JSON.parse wird console.log("test2") nicht mehr ausgeführt
            // ohne JSON.parse schon, aber dann ist userSession undefined
            // wenn ich dataType auf json ändere komme ich in die error function
            // auch wenn ich in api.php sucess() header('Content-Type: application/json'); verwende komme ich in die error function
            console.log("test2");
            console.log("username returned from api.php in getSessionVariables() in function.js: " + userSession['sessionUsername']);
            ressolve(response);
        },

        error: function () {
            // Error handling
            console.log("Error in error function of getSessionVariables()");
            reject;
        }
    });

}

    








function hashPasswordWithSHA512(password) {
    var hashedPassword = CryptoJS.SHA512(password).toString();
    return hashedPassword;
}


/* function validate(input) {
    if (input == "") {
        // add following message to div 'errorRegistration'
        $("#errorRegistration").append("<p style='color:red; font-weight:bold;'>Bitte alle Felder ausfüllen!</p>");
        return;
    }
} */



/* function loadHead() {
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
} */

/* (function() {
    //$("head").load(".Frontend/sites/components/head.html");
    $("nav").load("./Frontend/sites/components/nav.html");
    $("footer").load("./Frontend/sites/components/nav.html");
   }); */