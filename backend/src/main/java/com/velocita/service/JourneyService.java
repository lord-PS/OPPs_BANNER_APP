package com.velocita.service;

import com.velocita.dto.AssignmentRequest;
import com.velocita.model.Assignment;
import com.velocita.model.User;
import com.velocita.repository.AssignmentRepository;
import com.velocita.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JourneyService {

    private final AssignmentRepository assignmentRepository;
    private final UserRepository userRepository;

    public JourneyService(AssignmentRepository assignmentRepository, UserRepository userRepository) {
        this.assignmentRepository = assignmentRepository;
        this.userRepository = userRepository;
    }

    public List<Map<String, Object>> getAssignments(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Assignment> assignments = assignmentRepository.findByUserIdOrderBySubmittedAtDesc(user.getId());

        return assignments.stream().map(a -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", a.getId());
            map.put("title", a.getTitle());
            map.put("description", a.getDescription());
            map.put("status", a.getStatus().name());
            map.put("score", a.getScore());
            map.put("element", a.getElement() != null ? a.getElement().name() : null);
            map.put("artifactType", a.getArtifactType() != null ? a.getArtifactType().name() : null);
            map.put("submittedAt", a.getSubmittedAt().toString());
            return map;
        }).toList();
    }

    public Map<String, Object> getStats(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long total = assignmentRepository.countByUserId(user.getId());
        long graded = assignmentRepository.countByUserIdAndStatus(user.getId(), Assignment.Status.GRADED);
        long uploaded = assignmentRepository.countByUserIdAndStatus(user.getId(), Assignment.Status.UPLOADED);

        int xp = (int) (graded * 1000 + uploaded * 500);
        String rank;
        if (xp >= 5000) rank = "Orbital Vanguard";
        else if (xp >= 3000) rank = "Star Navigator";
        else if (xp >= 1000) rank = "Cadet Commander";
        else rank = "Rookie Pilot";

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalAssignments", total);
        stats.put("gradedAssignments", graded);
        stats.put("uploadedAssignments", uploaded);
        stats.put("xp", xp);
        stats.put("nextLevelXp", xp < 1000 ? 1000 : xp < 3000 ? 3000 : xp < 5000 ? 5000 : 10000);
        stats.put("rank", rank);
        stats.put("role", user.getRole().name());

        return stats;
    }

    public Map<String, Object> createAssignment(String username, AssignmentRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Assignment assignment = Assignment.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(Assignment.Status.UPLOADED)
                .score("PENDING")
                .element(request.getElement() != null ? Assignment.Element.valueOf(request.getElement()) : Assignment.Element.VOID)
                .artifactType(request.getArtifactType() != null ? Assignment.ArtifactType.valueOf(request.getArtifactType()) : Assignment.ArtifactType.SCROLL)
                .user(user)
                .build();

        Assignment saved = assignmentRepository.save(assignment);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id", saved.getId());
        result.put("title", saved.getTitle());
        result.put("status", saved.getStatus().name());
        result.put("message", "Assignment uploaded to the Spell Book.");
        return result;
    }
}
