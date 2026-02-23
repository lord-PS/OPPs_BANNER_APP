package com.velocita.controller;

import com.velocita.dto.AssignmentRequest;
import com.velocita.service.JourneyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/journey")
public class JourneyController {

    private final JourneyService journeyService;

    public JourneyController(JourneyService journeyService) {
        this.journeyService = journeyService;
    }

    @GetMapping("/assignments")
    public ResponseEntity<List<Map<String, Object>>> getAssignments(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(journeyService.getAssignments(userDetails.getUsername()));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(journeyService.getStats(userDetails.getUsername()));
    }

    @PostMapping("/assignments")
    public ResponseEntity<Map<String, Object>> createAssignment(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody AssignmentRequest request) {
        return ResponseEntity.ok(journeyService.createAssignment(userDetails.getUsername(), request));
    }
}
