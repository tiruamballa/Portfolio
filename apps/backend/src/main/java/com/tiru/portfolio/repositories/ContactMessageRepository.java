package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findAllByOrderByReceivedDateDesc();
    List<ContactMessage> findByStatusOrderByReceivedDateDesc(String status);
}
