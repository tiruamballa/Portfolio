package com.tiru.portfolio.models;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "experience")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String role;
    
    @Column(length = 1500)
    private String description;
    
    private String duration;

    @ManyToOne
    @JoinColumn(name = "logo_media_id")
    private Media logoMedia;

    @ManyToMany
    @JoinTable(
        name = "experience_skill",
        joinColumns = @JoinColumn(name = "experience_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> skillsUsed;

    public Experience() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public Media getLogoMedia() { return logoMedia; }
    public void setLogoMedia(Media logoMedia) { this.logoMedia = logoMedia; }

    public Set<Skill> getSkillsUsed() { return skillsUsed; }
    public void setSkillsUsed(Set<Skill> skillsUsed) { this.skillsUsed = skillsUsed; }
}
