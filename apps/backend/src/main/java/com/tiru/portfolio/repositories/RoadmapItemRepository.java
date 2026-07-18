package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.RoadmapItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoadmapItemRepository extends JpaRepository<RoadmapItem, Long> {
    List<RoadmapItem> findByTrackTypeOrderByStartedDateAsc(String trackType);
    List<RoadmapItem> findAllByOrderByStartedDateAsc();
}
