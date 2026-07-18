package com.tiru.portfolio.controllers;

import com.tiru.portfolio.aspect.LogActivity;
import com.tiru.portfolio.models.Media;
import com.tiru.portfolio.repositories.MediaRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/media")
public class MediaController {

    private final MediaRepository mediaRepository;

    @Value("${uploads.dir}")
    private String uploadsDir;

    public MediaController(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    @PostMapping("/upload")
    @LogActivity("Uploaded media asset")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                        @RequestParam(value = "altText", required = false) String altText) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Uploaded file is empty");
        }

        try {
            File directory = new File(uploadsDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String originalFileName = file.getOriginalFilename();
            String extension = "";
            if (originalFileName != null && originalFileName.contains(".")) {
                extension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            
            String uniqueFileName = UUID.randomUUID().toString() + extension;
            Path filePath = Paths.get(uploadsDir).resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath);

            Media media = new Media();
            media.setFileName(originalFileName);
            media.setUrl("/uploads/" + uniqueFileName);
            media.setFileType(file.getContentType());
            media.setFileSize(file.getSize());
            media.setAltText(altText != null ? altText : originalFileName);
            media.setUploadedDate(LocalDateTime.now());

            Media saved = mediaRepository.save(media);
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
        }
    }
}
