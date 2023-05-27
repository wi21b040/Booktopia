<?php

require(dirname(__FILE__, 3) . "/config/dbaccess.php");

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
    /* public function findAll() {        
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
    } */


    // find user by id mit prepared statement
    /* public function findByID(int $id) {        
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
    } */

    // create or update user mit prepared statement with array as input
    public function saveUser($user) {
        // get data from array
        $salutation = $user['salutation'];
        $firstName = $user['firstName'];
        $lastName = $user['lastName'];
        $address = $user['address'];
        $postcode = $user['postcode'];
        $location = $user['location'];
        $email = $user['email'];
        $username = $user['username'];
        $password = $user['password'];
        $creditCard = $user['creditCard'];
        $active = 1;
        $admin = 0;    

        echo "username in saveUser in userService.php: " . $username;

        // check if user already exists with prepared statement
        $sql = "SELECT * FROM user WHERE username = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        
        echo " " . $row['username'];
        
        if ($result -> num_rows > 0) {
            // User already exists

            echo " User exists";
            
            
            // update user with prepared statement
            /* $sqlUpd = "UPDATE user SET salutation = ?, firstName = ?, lastName = ?, address = ?, postcode = ?, location = ?, creditCard = ?, email = ?, username = ?, password = ? WHERE username = ?";
            $stmt = $this->con->prepare($sqlUpd);
            $stmt->bind_param("sssssssssss", $salutation, $firstName, $lastName, $address, $postcode, $location, $creditCard, $email, $username, $password, $username);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->affected_rows > 0) {
                // user updated
                header("Refresh:0; url=../index.php");
            } else {
                // error - user not updated
            } */
        } else {
            echo " User does not exist";
            // add user with prepared statement         
            $sqlIns = "INSERT INTO user (salutation, firstName, lastName, address, postcode, location, creditCard, email, username, password, active, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $this->con->prepare($sqlIns);
            $stmt->bind_param("ssssssssssii", $salutation, $firstName, $lastName, $address, $postcode, $location, $creditCard, $email, $username, $password, $active, $admin);
            $stmt->execute();
            $result = mysqli_stmt_affected_rows($stmt);
            
            if ($result == 1) {
                // user created
                echo " User created";
                header("Refresh:0; url=../index.php");
                echo "<script>alert('Bitte loggen Sie sich ein, um fortzufahren.');</script>";
            } else {
                // error - user not created
                echo " ERROR - User not created";
            }
        }
    } 

    // login user with prepared statement (username and password) and server validation
    public function loginUser($username, $password) {

        echo "<script>console.log('loginUser in userServie.php reached');</script>";
        // echo console.log $username and $password
        echo "<script>console.log('username: " . $username . "');</script>";
        echo "<script>console.log('password: " . $password . "');</script>";
        
        
        // check if user exists with prepared statement
        $sql = "SELECT * FROM user WHERE username = ?";
        $stmt = $this->con->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        echo "<script>console.log('result 1: " . $row['username'] . "');</script>";
        echo "<script>console.log('result 1: " . $row['password'] . "');</script>";


        
        if ($result -> num_rows > 0) {
            
            // !!! BUG --> Result is empty !!! --> siehe FH Unterlagen wie man hashed passwords vergleicht
            
            echo "<script>console.log('passed check if user exists in userServie.php reached');</script>";
            // User exists
            // check if password is correct with prepared statement (password is sha256 hashed)
            $sql = "SELECT * FROM user WHERE username = ? AND password = ?";
            $stmt = $this->con->prepare($sql);
            $stmt->bind_param("ss", $username, $password);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            echo "<script>console.log('passed check process executed in userServie.php reached');</script>";
            echo "<script>console.log('result username: " . $row['username'] . "');</script>";
            echo "<script>console.log('result password: " . $row['password'] . "');</script>";

            
            if ($result -> num_rows > 0) {
                echo "<script>console.log('passed check if password is correct in userServie.php reached');</script>";
                // password correct
                // login user
                session_start();
                $_SESSION['username'] = $username;
                // get userid, admin and active from query saved in $result
                $_SESSION['userid'] = $row['userid'];
                $_SESSION['admin'] = $row['admin'];
                $_SESSION['active'] = $row['active'];
                
                echo "<script>console.log('user successfully logged in in userServie.php reached');</script>";
                echo "<script>console.log('username: " . $_SESSION['username'] . "');</script>";
                echo "<script>console.log('userid: " . $_SESSION['userid'] . "');</script>";
                echo "<script>console.log('admin: " . $_SESSION['admin'] . "');</script>";
                echo "<script>console.log('active: " . $_SESSION['active'] . "');</script>";              
                
                //header("Refresh:0; url=../../../Booktopia/Frontend/sites/index.php");
                return true;
            } else {
                // password incorrect
                // error - password incorrect
                return false;
            }
        } else {
            // error - user not found
            return false;
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