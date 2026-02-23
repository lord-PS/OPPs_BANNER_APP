package com.velocita.repository;

import com.velocita.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByUserIdOrderBySubmittedAtDesc(Long userId);
    List<Assignment> findByStatus(Assignment.Status status);
    long countByUserId(Long userId);
    long countByUserIdAndStatus(Long userId, Assignment.Status status);
}
