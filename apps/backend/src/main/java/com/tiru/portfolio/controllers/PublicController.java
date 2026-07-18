package com.tiru.portfolio.controllers;

import com.tiru.portfolio.models.*;
import com.tiru.portfolio.repositories.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public")
public class PublicController {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final CertificationRepository certificationRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final AchievementRepository achievementRepository;
    private final RoadmapItemRepository roadmapItemRepository;
    private final ContactMessageRepository messageRepository;
    private final BlogPostRepository blogPostRepository;
    private final SiteSettingRepository settingRepository;
    private final AnalyticsMetricRepository analyticsRepository;

    public PublicController(ProjectRepository projectRepository, SkillRepository skillRepository,
                            CertificationRepository certificationRepository, ExperienceRepository experienceRepository,
                            EducationRepository educationRepository, AchievementRepository achievementRepository,
                            RoadmapItemRepository roadmapItemRepository, ContactMessageRepository messageRepository,
                            BlogPostRepository blogPostRepository, SiteSettingRepository settingRepository,
                            AnalyticsMetricRepository analyticsRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.certificationRepository = certificationRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.achievementRepository = achievementRepository;
        this.roadmapItemRepository = roadmapItemRepository;
        this.messageRepository = messageRepository;
        this.blogPostRepository = blogPostRepository;
        this.settingRepository = settingRepository;
        this.analyticsRepository = analyticsRepository;
    }

    @GetMapping("/projects")
    public List<Project> getProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAsc();
    }

    @GetMapping("/skills")
    public List<Skill> getSkills() {
        return skillRepository.findByVisibleTrueOrderByDisplayOrderAsc();
    }

    @GetMapping("/certifications")
    public List<Certification> getCertifications() {
        return certificationRepository.findAllByOrderByDisplayOrderAsc();
    }

    @GetMapping("/experience")
    public List<Experience> getExperience() {
        return experienceRepository.findAllByOrderByIdDesc();
    }

    @GetMapping("/education")
    public List<Education> getEducation() {
        return educationRepository.findAllByOrderByGraduationYearDesc();
    }

    @GetMapping("/achievements")
    public List<Achievement> getAchievements() {
        return achievementRepository.findAllByOrderByIdDesc();
    }

    @GetMapping("/roadmap")
    public List<RoadmapItem> getRoadmap() {
        return roadmapItemRepository.findAllByOrderByStartedDateAsc();
    }

    @GetMapping("/blog")
    public List<BlogPost> getBlogPosts() {
        return blogPostRepository.findByDraftFalseOrderByPublishDateDesc();
    }

    @GetMapping("/settings")
    public Map<String, String> getSettings() {
        List<SiteSetting> list = settingRepository.findAll();
        Map<String, String> map = new HashMap<>();
        for (SiteSetting s : list) {
            map.put(s.getConfigKey(), s.getConfigValue());
        }
        return map;
    }

    @PostMapping("/contact")
    public ResponseEntity<?> submitMessage(@RequestBody ContactMessage message) {
        messageRepository.save(message);
        return ResponseEntity.ok(Map.of("message", "Message dispatched successfully!"));
    }

    @PostMapping("/track-click")
    public ResponseEntity<?> trackClick(@RequestBody Map<String, String> payload) {
        AnalyticsMetric metric = new AnalyticsMetric();
        metric.setMetricType(payload.getOrDefault("type", "CLICK"));
        metric.setTargetId(payload.get("targetId"));
        metric.setCountry(payload.get("country"));
        metric.setDeviceType(payload.get("device"));
        metric.setReferrer(payload.get("referrer"));
        analyticsRepository.save(metric);
        return ResponseEntity.ok(Map.of("status", "tracked"));
    }
}
