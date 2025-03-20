package com.example.lms_backend.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "tbl_borrow_hist")
public class BorrowHistory {
    @Id
    @Column(name = "hist_id")
    private int histid;
    @Column(name = "book_id")
    private int bookid;
    @Column(name = "user_id")
    private int userid;
    private Date borrow_dt;
    private Date return_dt;
    private String status;
    private String created_by;
    private Date created_dt;

    // Constructors
    public BorrowHistory() {}
    public BorrowHistory(int hist_id, int book_id, int user_id
    	    , Date borrow_dt
    	    , Date return_dt
    	    , String created_by
    	    , Date created_dt
    	    ) 
    {
        this.histid = hist_id;
        this.bookid = book_id;
        this.userid = user_id;
        this.borrow_dt = borrow_dt;
        this.return_dt = return_dt;
        this.created_by = created_by;
        this.created_dt = created_dt;
    }
	public int getHist_id() {
		return histid;
	}
	public void setHist_id(int hist_id) {
		this.histid = hist_id;
	}
	public int getBook_id() {
		return bookid;
	}
	public void setBook_id(int book_id) {
		this.bookid = book_id;
	}
	public int getUser_id() {
		return userid;
	}
	public void setUser_id(int user_id) {
		this.userid = user_id;
	}
	public Date getBorrow_dt() {
		return borrow_dt;
	}
	public void setBorrow_dt(Date borrow_dt) {
		this.borrow_dt = borrow_dt;
	}
	public Date getReturn_dt() {
		return return_dt;
	}
	public void setReturn_dt(Date return_dt) {
		this.return_dt = return_dt;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
    
    
    // Getters and Setters 


}
