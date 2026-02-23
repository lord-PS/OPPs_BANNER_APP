package com.velocita.repository;

import com.velocita.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByUserIdOrderByTimestampAsc(Long userId);
    List<ChatMessage> findTop50ByUserIdOrderByTimestampDesc(Long userId);
    void deleteByUserId(Long userId);
}
