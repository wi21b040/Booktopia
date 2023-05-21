<?php

// This API is used to access the database
// The API is the controller of the MVC pattern
// The API is called by the frontend via AJAX requests
// The API returns JSON objects

// api.php executes tasks from frontend and calls the needed services

// include necessary files
require (dirname(__FILE__) . "\config\dbaccess.php"); //??
require (dirname(__FILE__) . "\models\user.php");
require (dirname(__FILE__) . "\logic\services\userService.php");
require (dirname(__FILE__) . "\models\book.php");
require (dirname(__FILE__) . "\logic\services\bookService.php");

// an instance of the API class is created
$api = new Api();

// call processRequest for working on requests
$api->processRequest();

class Api {
    // constructor
    private $userService;
    private $bookService;

    // is called when a new instance of the service calsses is created
    public function __construct($con, $tbl_user, $tbl_book) {
        // create instances of the services
        $this->userService = new UserService($con, $tbl_user);
        $this->bookService = new BookService($con, $tbl_book);
    }

    
    public function processRequest() {
        $method = $_SERVER['REQUEST_METHOD'];   // GET, POST, DELETE
            switch ($method) {
    
                case "GET":
                    $this->processGet();
                    break;
    
                case "POST":
                    $this->processPost();
                    break;
                
                case "DELETE":
                    $this->processDelete();
                    break;

                case "PUT":
                    $this->processUpdate();
                    break;
    
                default:
                    $this->error(405, ["Allow: GET, POST, DELETE"], "Method not allowed");                
            }
    }
    
    public function processGet() {
        // to be implemented

        // Verarbeitung von GET-Anfragen
        // Hier können verschiedene GET-Anfragen an die entsprechenden Services weitergeleitet werden.
        // Beispiel:
        if (isset($_GET["users"])) {
            $users = $this->userService->findAll();
            $this->success(200, $users);
        } elseif (isset($_GET["book"])) {
            $books = $this->bookService->findAll();
            $this->success(200, $books);
        } else {
            $this->error(400, [], "Bad Request - invalid parameters " . http_build_query($_GET));
        }
    }
    
    public function processPost() {
        // to be implemented

        // Verarbeitung von POST-Anfragen
        // Hier können verschiedene POST-Anfragen an die entsprechenden Services weitergeleitet werden.
        // Beispiel:
        if (isset($_GET["user"])) {
            // Verarbeite Benutzer erstellen
            // $this->userService->createUser();
        } elseif (isset($_GET["book"])) {
            // Verarbeite Produkt erstellen
            // $this->productService->createBook();
        } else {
            $this->error(400, [], "Bad Request - invalid parameters " . http_build_query($_GET));
        }
    }
    
    public function processDelete() {
        // to be implemented

        // Verarbeitung von DELETE-Anfragen
        // Hier können verschiedene DELETE-Anfragen an die entsprechenden Services weitergeleitet werden.
        // Beispiel:
        if (isset($_GET["user"])) {
            // Verarbeite Benutzer löschen
            // $this->userService->deleteUser();
        } elseif (isset($_GET["book"])) {
            // Verarbeite Produkt löschen
            // $this->productService->deleteBook();
        } else {
            $this->error(400, [], "Bad Request - invalid parameters " . http_build_query($_GET));
        }
    }

    private function processUpdate() {
        // to be implemented
        
        // Verarbeitung von PUT-Anfragen (Update)
        // Hier können verschiedene PUT-Anfragen an die entsprechenden Services weitergeleitet werden.
        // Beispiel:
        if (isset($_GET["user"])) {
            // Verarbeite Benutzer aktualisieren
            // $this->userService->updateUser();
        } elseif (isset($_GET["book"])) {
            // Verarbeite Produkt aktualisieren
            // $this->productService->updateBook();
        } else {
            $this->error(400, [], "Bad Request - invalid parameters " . http_build_query($_GET));
        }
    }
    
    
    // format sucess response
    private function success ($code, $data) {
        // to be implemented
    }
    
    // format error response
    private function error ($code, $message, $data) {
        // to be implemented
    }
}


?>