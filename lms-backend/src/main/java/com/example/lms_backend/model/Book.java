package com.example.lms_backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "tbl_books")
public class Book {
    @Id
    private int book_id;
    private String title;
    private String author;
    private String isbn;
    private String genre;
    private int year_published;
    private String status;
    private String created_by;
    private Date created_dt;
    private String updated_by;
    private Date updated_dt;
    
    // Constructors
    public Book() {}
    public Book(int id, String title, String author
    	    , String isbn
    	    , String genre
    	    , int year_published
    	    , String status
    	    , String created_by
    	    , Date created_dt
    	    , String updated_by
    	    , Date updated_dt
    	    ) 
    {
        this.book_id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.genre = genre;
        this.year_published = year_published;
        this.status = status;
        this.created_by = created_by;
        this.created_dt = created_dt;
        this.updated_by = updated_by;
        this.updated_dt = updated_dt;
    }
    
    
    // Getters and Setters 
	public int getBook_id() {
		return book_id;
	}
	public void setBook_id(int book_id) {
		this.book_id = book_id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getIsbn() {
		return isbn;
	}
	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public int getYear_published() {
		return year_published;
	}
	public void setYear_published(int year_published) {
		this.year_published = year_published;
	}
	
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCreated_by() {
		return created_by;
	}
	public void setCreated_by(String created_by) {
		this.created_by = created_by;
	}
	public Date getCreated_dt() {
		return created_dt;
	}
	public void setCreated_dt(Date created_dt) {
		this.created_dt = created_dt;
	}
	public String getUpdated_by() {
		return updated_by;
	}
	public void setUpdated_by(String updated_by) {
		this.updated_by = updated_by;
	}
	public Date getUpdated_dt() {
		return updated_dt;
	}
	public void setUpdated_dt(Date updated_dt) {
		this.updated_dt = updated_dt;
	}
	public Book orElse(Object object) {
		// TODO Auto-generated method stub
		return null;
	}
}