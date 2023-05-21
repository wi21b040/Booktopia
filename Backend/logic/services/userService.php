<?php

require (dirname(__FILE__,4) . "\config\dbaccess.php");
require (dirname(__FILE__,4) . "\models\user.php");

$salutation = $firstName = $lastName = $address = $postcode = $location = $creditCard = $email = $username = $password = "";


// UserService Class implements CRUD operations

class UserService {

    // get data from MySQL database with SQL statements
    private $con;
    private $tbl_user;

    public function __construct($con, $tbl_user) {
        $this->con = $con;
        $this->tbl_user = $tbl_user;
    }

    // find all users mit prepared statement
    public function findAll() {        
        $sql = "SELECT * FROM " . $this->tbl_user;
        $stmt = $this->con->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();

        $users = [];
        while ($row = $result->fetch_assoc()) {
            $user = new User($row['userid'], $row['salutation'], $row['firstName'], $row['lastName'], $row['address'], $row['postcode'], $row['location'], $row['creditCard'], $row['email'], $row['username'], $row['password']);
            $users[] = $user;
        }

        $stmt->close();

        return $users;
    }


    // find user by id mit prepared statement
    public function findByID(int $id) {        
        $sql = "SELECT * FROM " . $this->tbl_user . " WHERE userid = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        $row = $result->fetch_assoc();
        
        $stmt -> close();

        if (!$row) {
            return null; // Benutzer nicht gefunden
        }

        $user = new User($row['userid'], $row['salutation'], $row['firstName'], $row['lastName'], $row['address'], $row['postcode'], $row['location'], $row['creditCard'], $row['email'], $row['username'], $row['password']);
        return $user;
    }

    // create or update user mit prepared statement
    public function saveUser(User $user) {
        $salutation = $user->getSalutation();
        $firstName = $user->getFirstName();
        $lastName = $user->getLastName();
        $address = $user->getAddress();
        $postcode = $user->getPostcode();
        $location = $user->getLocation();
        $creditCard = $user->getCreditCard();
        $email = $user->getEmail();
        $username = $user->getUsername();
        $password = $user->getPassword();

        // check if user already exists with prepared statement
        $sql = "SELECT * FROM user WHERE username = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            // User already exists
            // update user with prepared statement
            $sqlUpd = "UPDATE user SET salutation = ?, firstName = ?, lastName = ?, address = ?, postcode = ?, location = ?, creditCard = ?, email = ?, username = ?, password = ? WHERE username = ?";
            $stmt = $this->con->prepare($sqlUpd);
            $stmt->bind_param("sssssssssss", $salutation, $firstName, $lastName, $address, $postcode, $location, $creditCard, $email, $username, $password, $username);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->affected_rows > 0) {
                // user updated
                header("Refresh:0; url=../index.php");
            } else {
                // error - user not updated
            }
        } else {
            // add user with prepared statement
            $sqlIns = "INSERT INTO user (salutation, firstName, lastName, address, postcode, location, creditCard, email, username, password, active, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0)";
            $stmt = $this->con->prepare($sqlIns);
            $stmt->bind_param("ssssssssss", $salutation, $firstName, $lastName, $address, $postcode, $location, $creditCard, $email, $username, $password);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->affected_rows > 0) {
                // user created
                header("Refresh:0; url=../index.php");
            } else {
                // error - user not created
            }
        }
    }


       
    /* public function delete(User $user) {
        
        // Implementieren Sie den Code, um einen vorhandenen Benutzer aus der Datenquelle zu löschen
        // Beispiel:
        // Database::execute("DELETE FROM users WHERE id = ?", [$user->getId()]);
        
        return true;
    } */

    // Close connection
    public function closeConnection() {
        $this->con->close();
    }
}