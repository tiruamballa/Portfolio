package com.tiru.portfolio.repositories;

import com.tiru.portfolio.models.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByDraftFalseOrderByPublishDateDesc();
    List<BlogPost> findAllByOrderByPublishDateDesc();
    Optional<BlogPost> findBySlug(String slug);
}
