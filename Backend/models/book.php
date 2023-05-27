<?php

// Book Model --> only suggestion, needs to be adapted

class Book {

    public $bookid;
    public $title;
    public $author;
    public $publisher;
    public $isbn;
    public $year;
    public $genre;
    public $language;
    public $price;
    public $description;
    public $image;
    public $stock;
    


    public function __construct(int $bookid, string $title, string $author,
                                string $publisher, string $isbn, string $year,
                                string $genre, string $language, string $price,
                                string $description, string $image, string $stock) { 
        $this->bookid         = $bookid;
        $this->title          = $title;
        $this->author         = $author;
        $this->publisher      = $publisher;
        $this->isbn           = $isbn;
        $this->year           = $year;
        $this->genre          = $genre;
        $this->language       = $language;
        $this->price          = $price;
        $this->description    = $description;
        $this->image          = $image;
        $this->stock          = $stock;
    }

    public function getBookid() {
        return $this->bookid;
    }
    
    public function getTitle() {
        return $this->title;
    }

    public function getAuthor() {
        return $this->author;
    }

    public function getPublisher() {
        return $this->publisher;
    }

    public function getIsbn() {
        return $this->isbn;
    }

    public function getYear() {
        return $this->year;
    }

    public function getGenre() {
        return $this->genre;
    }

    public function getLanguage() {
        return $this->language;
    }

    public function getPrice() {
        return $this->price;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getImage() {
        return $this->image;
    }

    public function getStock() {
        return $this->stock;
    }    

}