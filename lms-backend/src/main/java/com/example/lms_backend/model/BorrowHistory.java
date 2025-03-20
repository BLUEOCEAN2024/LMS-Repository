package com.example.lms_backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "tbl_borrow_hist")
public class BorrowHistory {
    @Id
    private int hist_id;
    private int book_id;
    private int user_id;
    private Date borrow_dt;
    private Date return_dt;
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
        this.hist_id = hist_id;
        this.book_id = book_id;
        this.user_id = user_id;
        this.borrow_dt = borrow_dt;
        this.return_dt = return_dt;
        this.created_by = created_by;
        this.created_dt = created_dt;
    }
	public int getHist_id() {
		return hist_id;
	}
	public void setHist_id(int hist_id) {
		this.hist_id = hist_id;
	}
	public int getBook_id() {
		return book_id;
	}
	public void setBook_id(int book_id) {
		this.book_id = book_id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
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
    
    
    // Getters and Setters 


}
