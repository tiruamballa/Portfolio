package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.SiteSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SiteSettingRepository extends JpaRepository<SiteSetting, Long> {
    Optional<SiteSetting> findByConfigKey(String configKey);
}
