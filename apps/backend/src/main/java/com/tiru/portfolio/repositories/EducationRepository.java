package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findAllByOrderByGraduationYearDesc();
}
