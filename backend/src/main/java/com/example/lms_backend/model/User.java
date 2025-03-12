package com.example.lms_backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_users")
public class User {
    @Id
    private int user_id;
    private String user_name;
    private String identity_id;
    private String email;
    private String phone;
    private Date member_effective_from;
    private String created_by;
    private Date created_dt;

    // Constructors
    public User() {}
    public User(int id,
			     String user_name,
			     String identity_id,
			     String email,
			     String phone,
			     Date member_effective_from,
			     String created_by,
			     Date created_dt) 
    {
        this.user_id = id;
        this.user_name = user_name;
        this.identity_id = identity_id;
        this.email = email;
        this.phone = phone;
        this.member_effective_from = member_effective_from;
        this.created_by = created_by;
        this.created_dt = created_dt;
    }
    
    
    // Getters and Setters 
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getIdentity_id() {
		return identity_id;
	}
	public void setIdentity_id(String identity_id) {
		this.identity_id = identity_id;
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
	public Date getMember_effective_from() {
		return member_effective_from;
	}
	public void setMember_effective_from(Date member_effective_from) {
		this.member_effective_from = member_effective_from;
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


}