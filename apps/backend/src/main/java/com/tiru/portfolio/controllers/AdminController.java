package com.tiru.portfolio.controllers;

import com.tiru.portfolio.aspect.LogActivity;
import com.tiru.portfolio.models.*;
import com.tiru.portfolio.repositories.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

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
    private final AdminActivityLogRepository activityLogRepository;

    public AdminController(ProjectRepository projectRepository, SkillRepository skillRepository,
                           CertificationRepository certificationRepository, ExperienceRepository experienceRepository,
                           EducationRepository educationRepository, AchievementRepository achievementRepository,
                           RoadmapItemRepository roadmapItemRepository, ContactMessageRepository messageRepository,
                           BlogPostRepository blogPostRepository, SiteSettingRepository settingRepository,
                           AnalyticsMetricRepository analyticsRepository, AdminActivityLogRepository activityLogRepository) {
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
        this.activityLogRepository = activityLogRepository;
    }

    // --- Projects CRUD ---
    @PostMapping("/projects")
    @LogActivity("Created project profile")
    public Project createProject(@RequestBody Project p) { return projectRepository.save(p); }

    @PutMapping("/projects/{id}")
    @LogActivity("Modified project profile")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project p) {
        if (!projectRepository.existsById(id)) return ResponseEntity.notFound().build();
        p.setId(id);
        return ResponseEntity.ok(projectRepository.save(p));
    }

    @DeleteMapping("/projects/{id}")
    @LogActivity("Removed project profile")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (!projectRepository.existsById(id)) return ResponseEntity.notFound().build();
        projectRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Skills CRUD ---
    @PostMapping("/skills")
    @LogActivity("Registered tech skill card")
    public Skill createSkill(@RequestBody Skill s) { return skillRepository.save(s); }

    @PutMapping("/skills/{id}")
    @LogActivity("Updated tech skill card parameters")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody Skill s) {
        if (!skillRepository.existsById(id)) return ResponseEntity.notFound().build();
        s.setId(id);
        return ResponseEntity.ok(skillRepository.save(s));
    }

    @DeleteMapping("/skills/{id}")
    @LogActivity("Deleted tech skill card node")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        if (!skillRepository.existsById(id)) return ResponseEntity.notFound().build();
        skillRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Certifications CRUD ---
    @PostMapping("/certifications")
    @LogActivity("Uploaded verified certificate")
    public Certification createCert(@RequestBody Certification c) { return certificationRepository.save(c); }

    @PutMapping("/certifications/{id}")
    @LogActivity("Modified verified certificate data")
    public ResponseEntity<Certification> updateCert(@PathVariable Long id, @RequestBody Certification c) {
        if (!certificationRepository.existsById(id)) return ResponseEntity.notFound().build();
        c.setId(id);
        return ResponseEntity.ok(certificationRepository.save(c));
    }

    @DeleteMapping("/certifications/{id}")
    @LogActivity("Removed verified certificate packet")
    public ResponseEntity<Void> deleteCert(@PathVariable Long id) {
        if (!certificationRepository.existsById(id)) return ResponseEntity.notFound().build();
        certificationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Experience CRUD ---
    @PostMapping("/experience")
    @LogActivity("Registered internship milestone")
    public Experience createExp(@RequestBody Experience e) { return experienceRepository.save(e); }

    @PutMapping("/experience/{id}")
    @LogActivity("Updated internship milestone details")
    public ResponseEntity<Experience> updateExp(@PathVariable Long id, @RequestBody Experience e) {
        if (!experienceRepository.existsById(id)) return ResponseEntity.notFound().build();
        e.setId(id);
        return ResponseEntity.ok(experienceRepository.save(e));
    }

    @DeleteMapping("/experience/{id}")
    @LogActivity("Removed internship milestone")
    public ResponseEntity<Void> deleteExp(@PathVariable Long id) {
        if (!experienceRepository.existsById(id)) return ResponseEntity.notFound().build();
        experienceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Learning Roadmap CRUD ---
    @PostMapping("/roadmap")
    @LogActivity("Created learning track goals")
    public RoadmapItem createRoadmap(@RequestBody RoadmapItem r) { return roadmapItemRepository.save(r); }

    @PutMapping("/roadmap/{id}")
    @LogActivity("Updated learning progress index")
    public ResponseEntity<RoadmapItem> updateRoadmap(@PathVariable Long id, @RequestBody RoadmapItem r) {
        if (!roadmapItemRepository.existsById(id)) return ResponseEntity.notFound().build();
        r.setId(id);
        return ResponseEntity.ok(roadmapItemRepository.save(r));
    }

    @DeleteMapping("/roadmap/{id}")
    @LogActivity("Removed learning goal module")
    public ResponseEntity<Void> deleteRoadmap(@PathVariable Long id) {
        if (!roadmapItemRepository.existsById(id)) return ResponseEntity.notFound().build();
        roadmapItemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Blog Post CRUD ---
    @PostMapping("/blog")
    @LogActivity("Created blog article draft")
    public BlogPost createBlogPost(@RequestBody BlogPost b) { return blogPostRepository.save(b); }

    @PutMapping("/blog/{id}")
    @LogActivity("Updated blog article contents")
    public ResponseEntity<BlogPost> updateBlogPost(@PathVariable Long id, @RequestBody BlogPost b) {
        if (!blogPostRepository.existsById(id)) return ResponseEntity.notFound().build();
        b.setId(id);
        return ResponseEntity.ok(blogPostRepository.save(b));
    }

    @DeleteMapping("/blog/{id}")
    @LogActivity("Removed blog article node")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable Long id) {
        if (!blogPostRepository.existsById(id)) return ResponseEntity.notFound().build();
        blogPostRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Inbox & Messages CRUD ---
    @GetMapping("/contact-messages")
    public List<ContactMessage> getMessages() { return messageRepository.findAllByOrderByReceivedDateDesc(); }

    @PutMapping("/contact-messages/{id}")
    @LogActivity("Updated contact message status")
    public ResponseEntity<ContactMessage> updateMessage(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        ContactMessage msg = messageRepository.findById(id).orElse(null);
        if (msg == null) return ResponseEntity.notFound().build();
        msg.setStatus(payload.getOrDefault("status", "READ"));
        return ResponseEntity.ok(messageRepository.save(msg));
    }

    @DeleteMapping("/contact-messages/{id}")
    @LogActivity("Removed message entry")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        if (!messageRepository.existsById(id)) return ResponseEntity.notFound().build();
        messageRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Settings Manager ---
    @PutMapping("/settings")
    @LogActivity("Updated layout site settings")
    public ResponseEntity<?> saveSettings(@RequestBody Map<String, String> settings) {
        for (Map.Entry<String, String> entry : settings.entrySet()) {
            SiteSetting setting = settingRepository.findByConfigKey(entry.getKey())
                    .orElse(new SiteSetting(entry.getKey(), ""));
            setting.setConfigValue(entry.getValue());
            settingRepository.save(setting);
        }
        return ResponseEntity.ok(Map.of("message", "Settings saved"));
    }

    // --- Analytics API Endpoint ---
    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalVisitors", analyticsRepository.countByMetricType("VISITOR"));
        data.put("totalDownloads", analyticsRepository.countByMetricType("DOWNLOAD"));
        data.put("totalClicks", analyticsRepository.countByMetricType("CLICK"));
        data.put("trafficLogs", analyticsRepository.findAllByOrderByTimestampDesc());
        return ResponseEntity.ok(data);
    }

    // --- System Action Log ---
    @GetMapping("/activity-logs")
    public List<AdminActivityLog> getLogs() { return activityLogRepository.findAllByOrderByTimestampDesc(); }
}
