package com.velocita.controller;

import com.velocita.dto.ChatRequest;
import com.velocita.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ChatRequest request) {
        Map<String, String> response = aiService.chat(userDetails.getUsername(), request.getMessage());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<Map<String, Object>>> history(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<Map<String, Object>> history = aiService.getHistory(userDetails.getUsername());
        return ResponseEntity.ok(history);
    }
}
