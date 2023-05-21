<?php

// User Model --> already adapted according to the database

class User {

    public $userid;
    public $salutation;
    public $firstName;
    public $lastName;
    public $address;
    public $postcode;
    public $location;
    public $creditCard;
    public $email;
    public $username;
    public $password; 


    public function __construct(int $userid, string $salutation, string $firstName,
                                string $lastName, string $address, string $postcode,
                                string $location, string $creditCard, string $email,
                                string $username, string $password) { 
        $this->userid         = $userid;
        $this->salutation     = $salutation;
        $this->firstName      = $firstName;
        $this->lastName       = $lastName;
        $this->address        = $address;
        $this->postcode       = $postcode;
        $this->location       = $location;
        $this->creditCard     = $creditCard;
        $this->email          = $email;
        $this->username       = $username;
        $this->password       = $password;
    }

    public function getUserid() {
        return $this->userid;
    }
    
    public function getSalutation() {
        return $this->salutation;
    }

    public function getFirstName() {
        return $this->firstName;
    }

    public function getLastName() {
        return $this->lastName;
    }

    public function getAddress() {
        return $this->address;
    }

    public function getPostcode() {
        return $this->postcode;
    }

    public function getLocation() {
        return $this->location;
    }

    public function getCreditCard() {
        return $this->creditCard;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }

}