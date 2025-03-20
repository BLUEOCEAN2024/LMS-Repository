package com.example.lms_backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "tbl_users")
public class User {
    @Id
    private int user_id;
    private String name;
    private String pwd;
    private String identity;
    private String email;
    private String phone;
    private String role;
    private String created_by;
    private Date created_dt;

    // Constructors
    public User() {}
    public User(int id,
			     String name,
			     String pwd,
			     String identity,
			     String email,
			     String phone,
			     String role,
			     String created_by,
			     Date created_dt) 
    {
        this.user_id = id;
        this.name = name;
        this.pwd = pwd;
        this.identity = identity;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.created_by = created_by;
        this.created_dt = created_dt;
    }
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getIdentity() {
		return identity;
	}
	public void setIdentity(String identity) {
		this.identity = identity;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
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
    

	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	// Getters and Setters 
	public User orElse(Object object) {
		// TODO Auto-generated method stub
		return null;
	}

}