package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.AdminActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdminActivityLogRepository extends JpaRepository<AdminActivityLog, Long> {
    List<AdminActivityLog> findAllByOrderByTimestampDesc();
}
