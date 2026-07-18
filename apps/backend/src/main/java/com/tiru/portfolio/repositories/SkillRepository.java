package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllByOrderByDisplayOrderAsc();
    List<Skill> findByVisibleTrueOrderByDisplayOrderAsc();
    List<Skill> findByCategoryAndVisibleTrueOrderByDisplayOrderAsc(String category);
}
