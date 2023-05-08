$(document).ready(function () {
    loadHead();
    loadFooter();  
  });

function loadHead() {
    $.$.ajax({
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
    $.$.ajax({
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









(function() {
    //$("head").load(".Frontend/sites/components/head.html");
    $("nav").load("./Frontend/sites/components/nav.html");
    $("footer").load("./Frontend/sites/components/nav.html");
   });