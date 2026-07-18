package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.AnalyticsMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnalyticsMetricRepository extends JpaRepository<AnalyticsMetric, Long> {
    List<AnalyticsMetric> findAllByOrderByTimestampDesc();
    long countByMetricType(String metricType);
}
