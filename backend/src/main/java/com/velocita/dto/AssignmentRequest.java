package com.velocita.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AssignmentRequest {
    private String title;
    private String description;
    private String element;       // AIR, FIRE, WATER, VOID, EARTH
    private String artifactType;  // SPELL_BOOK, SCROLL, CRYSTAL, RUNE
}
