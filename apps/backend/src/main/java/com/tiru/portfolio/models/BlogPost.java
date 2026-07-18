package com.tiru.portfolio.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog_post")
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime publishDate;
    private boolean draft;

    @ManyToOne
    @JoinColumn(name = "cover_media_id")
    private Media coverMedia;

    public BlogPost() {
        this.publishDate = LocalDateTime.now();
        this.draft = true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getPublishDate() { return publishDate; }
    public void setPublishDate(LocalDateTime publishDate) { this.publishDate = publishDate; }

    public boolean isDraft() { return draft; }
    public void setDraft(boolean draft) { this.draft = draft; }

    public Media getCoverMedia() { return coverMedia; }
    public void setCoverMedia(Media coverMedia) { this.coverMedia = coverMedia; }
}
