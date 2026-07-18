package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Optional<Resume> findByIsCurrentTrue();
}
