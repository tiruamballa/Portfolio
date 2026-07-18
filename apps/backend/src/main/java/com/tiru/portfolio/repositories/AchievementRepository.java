package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    List<Achievement> findAllByOrderByIdDesc();
    List<Achievement> findByCategory(String category);
}
