package com.tiru.portfolio.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "roadmap_item")
public class RoadmapItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String trackType; // AI, DATA_ANALYTICS, PROGRAMMING
    private String name;
    private String currentTopic;
    private int progressPercentage;
    private String status;
    private LocalDate startedDate;
    private LocalDate targetDate;

    public RoadmapItem() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTrackType() { return trackType; }
    public void setTrackType(String trackType) { this.trackType = trackType; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCurrentTopic() { return currentTopic; }
    public void setCurrentTopic(String currentTopic) { this.currentTopic = currentTopic; }

    public int getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(int progressPercentage) { this.progressPercentage = progressPercentage; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getStartedDate() { return startedDate; }
    public void setStartedDate(LocalDate startedDate) { this.startedDate = startedDate; }

    public LocalDate getTargetDate() { return targetDate; }
    public void setTargetDate(LocalDate targetDate) { this.targetDate = targetDate; }
}
