package com.tiru.portfolio.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "certification")
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String organization;
    private LocalDate issueDate;
    private String credentialId;
    private String verifyLink;

    @ManyToOne
    @JoinColumn(name = "media_pdf_id")
    private Media pdfMedia;

    @ManyToOne
    @JoinColumn(name = "media_thumbnail_id")
    private Media thumbnailMedia;

    private int displayOrder;

    @ManyToMany
    @JoinTable(
        name = "certificate_skill",
        joinColumns = @JoinColumn(name = "certification_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> skillsCovered;

    public Certification() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }

    public String getCredentialId() { return credentialId; }
    public void setCredentialId(String credentialId) { this.credentialId = credentialId; }

    public String getVerifyLink() { return verifyLink; }
    public void setVerifyLink(String verifyLink) { this.verifyLink = verifyLink; }

    public Media getPdfMedia() { return pdfMedia; }
    public void setPdfMedia(Media pdfMedia) { this.pdfMedia = pdfMedia; }

    public Media getThumbnailMedia() { return thumbnailMedia; }
    public void setThumbnailMedia(Media thumbnailMedia) { this.thumbnailMedia = thumbnailMedia; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public Set<Skill> getSkillsCovered() { return skillsCovered; }
    public void setSkillsCovered(Set<Skill> skillsCovered) { this.skillsCovered = skillsCovered; }
}
