package com.velocita.service;

import com.velocita.model.ChatMessage;
import com.velocita.model.User;
import com.velocita.repository.ChatMessageRepository;
import com.velocita.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final WebClient webClient;

    @Value("${app.ai.api-key:}")
    private String apiKey;

    @Value("${app.ai.provider:gemini}")
    private String provider;  // "gemini" or "llama"

    private static final String SYSTEM_PROMPT = 
        "You are Velocita, an elite AI co-pilot aboard a deep-space vessel. " +
        "You speak in a concise, tactical tone. You help the user with their coding assignments, " +
        "provide guidance on Java OOP concepts, data structures, and algorithms. " +
        "You reference the mission-like theme: assignments are 'missions', scores are 'engagement ratings', " +
        "and the user is ascending through ranks. Keep responses under 200 words unless asked for detail.";

    public AIService(ChatMessageRepository chatMessageRepository,
                     UserRepository userRepository,
                     WebClient.Builder webClientBuilder) {
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
        this.webClient = webClientBuilder.build();
    }

    public Map<String, String> chat(String username, String userMessage) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Save user message
        ChatMessage userMsg = ChatMessage.builder()
                .role(ChatMessage.MessageRole.USER)
                .content(userMessage)
                .user(user)
                .build();
        chatMessageRepository.save(userMsg);

        // Get AI response
        String aiResponse;
        if (apiKey != null && !apiKey.isBlank()) {
            aiResponse = callExternalAI(username, userMessage);
        } else {
            aiResponse = generateFallbackResponse(userMessage);
        }

        // Save AI response
        ChatMessage aiMsg = ChatMessage.builder()
                .role(ChatMessage.MessageRole.ASSISTANT)
                .content(aiResponse)
                .user(user)
                .build();
        chatMessageRepository.save(aiMsg);

        return Map.of("response", aiResponse, "status", "success");
    }

    public List<Map<String, Object>> getHistory(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return chatMessageRepository.findByUserIdOrderByTimestampAsc(user.getId())
                .stream()
                .map(msg -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("role", msg.getRole().name().toLowerCase());
                    m.put("content", msg.getContent());
                    m.put("timestamp", msg.getTimestamp().toString());
                    return m;
                })
                .collect(Collectors.toList());
    }

    private String callExternalAI(String username, String userMessage) {
        try {
            if ("gemini".equalsIgnoreCase(provider)) {
                return callGeminiAPI(userMessage);
            } else {
                return callLlamaAPI(userMessage);
            }
        } catch (Exception e) {
            return generateFallbackResponse(userMessage) + 
                   " [AI service temporarily unavailable: " + e.getMessage() + "]";
        }
    }

    private String callGeminiAPI(String userMessage) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("role", "user", "parts", List.of(
                    Map.of("text", SYSTEM_PROMPT + "\n\nUser: " + userMessage)
                ))
            )
        );

        String responseJson = webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Parse Gemini response — extract text from candidates[0].content.parts[0].text
        if (responseJson != null && responseJson.contains("\"text\"")) {
            int textStart = responseJson.indexOf("\"text\"") + 9;
            int textEnd = responseJson.indexOf("\"", textStart);
            if (textEnd > textStart) {
                return responseJson.substring(textStart, textEnd)
                        .replace("\\n", "\n")
                        .replace("\\\"", "\"");
            }
        }
        return generateFallbackResponse(userMessage);
    }

    private String callLlamaAPI(String userMessage) {
        // Llama via Groq (most common free provider)
        String url = "https://api.groq.com/openai/v1/chat/completions";

        Map<String, Object> requestBody = Map.of(
            "model", "llama-3.3-70b-versatile",
            "messages", List.of(
                Map.of("role", "system", "content", SYSTEM_PROMPT),
                Map.of("role", "user", "content", userMessage)
            ),
            "max_tokens", 500
        );

        String responseJson = webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + apiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Parse OpenAI-compatible response
        if (responseJson != null && responseJson.contains("\"content\"")) {
            int contentStart = responseJson.indexOf("\"content\"") + 12;
            int contentEnd = responseJson.indexOf("\"", contentStart);
            if (contentEnd > contentStart) {
                return responseJson.substring(contentStart, contentEnd)
                        .replace("\\n", "\n")
                        .replace("\\\"", "\"");
            }
        }
        return generateFallbackResponse(userMessage);
    }

    private String generateFallbackResponse(String userMessage) {
        String lower = userMessage.toLowerCase();
        if (lower.contains("assignment") || lower.contains("mission")) {
            return "Commander, your mission data is being analyzed. " +
                   "Navigate to the Spell Book dashboard to view your current assignments. " +
                   "Each uploaded artifact brings you closer to the next rank.";
        } else if (lower.contains("help") || lower.contains("how")) {
            return "Velocita AI standing by. I can assist with: " +
                   "1) Assignment analysis 2) OOP concept review " +
                   "3) Algorithm strategy 4) Code debugging. " +
                   "State your objective, pilot.";
        } else if (lower.contains("score") || lower.contains("rank")) {
            return "Your engagement ratings are tracked in the Flight Log. " +
                   "Each graded mission earns 1000 XP. " +
                   "Current trajectory: ascending through the ranks.";
        }
        return "Velocita AI acknowledges: '" + userMessage + "'. " +
               "Processing request. All systems nominal. " +
               "Note: Connect an AI_API_KEY for enhanced intelligence capabilities.";
    }
}
