package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findAllByOrderByIdDesc();
}
