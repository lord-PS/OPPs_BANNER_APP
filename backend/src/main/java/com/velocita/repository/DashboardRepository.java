package com.velocita.repository;

import com.velocita.model.Dashboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DashboardRepository extends JpaRepository<Dashboard, Long> {
    List<Dashboard> findByIsActiveTrueOrderBySortOrderAsc();
    Optional<Dashboard> findBySlug(String slug);
}
