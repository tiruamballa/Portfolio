package com.tiru.portfolio.models;

import jakarta.persistence.*;

@Entity
@Table(name = "achievement")
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category; // HACKATHONS, COMPETITIONS, LEADERSHIP, CLUBS, AWARDS, VOLUNTEERING
    
    @Column(length = 1000)
    private String description;
    
    private String dateString;

    public Achievement() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDateString() { return dateString; }
    public void setDateString(String dateString) { this.dateString = dateString; }
}
