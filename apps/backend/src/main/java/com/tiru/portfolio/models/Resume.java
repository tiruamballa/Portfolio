package com.tiru.portfolio.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resume")
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String version;
    private LocalDateTime uploadDate;
    private boolean isCurrent;

    @ManyToOne
    @JoinColumn(name = "media_id")
    private Media media;

    private int downloadCount;

    public Resume() {
        this.uploadDate = LocalDateTime.now();
        this.downloadCount = 0;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public LocalDateTime getUploadDate() { return uploadDate; }
    public void setUploadDate(LocalDateTime uploadDate) { this.uploadDate = uploadDate; }

    public boolean isCurrent() { return isCurrent; }
    public void setCurrent(boolean current) { isCurrent = current; }

    public Media getMedia() { return media; }
    public void setMedia(Media media) { this.media = media; }

    public int getDownloadCount() { return downloadCount; }
    public void setDownloadCount(int downloadCount) { this.downloadCount = downloadCount; }
}
