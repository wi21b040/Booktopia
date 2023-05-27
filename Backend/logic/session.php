<?php
//necessary for every session access
session_start();

require (dirname(__FILE__,2) . "..\config\dbaccess.php");

// check if DB access is available
$con = mysqli_connect($dbhost, $dbuser, $dbpassword, $db);
if(!$con){
	echo "Datenbankverbindung fehlgeschlagen!";
	exit();
}

// check if user is logged in and which role he has
if (isset($_SESSION["userid"]) && $_SESSION["active"] == 1) {
	if ($_SESSION["admin"] == 1){
		echo "admin";
	} else {
		echo "user";
	}
} else {
	echo "guest";
}
?>