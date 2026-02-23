package com.velocita.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dashboards")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Dashboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(length = 500)
    private String description;

    private String icon;

    private Integer sortOrder;

    @Column(nullable = false)
    private Boolean isActive;

    @PrePersist
    protected void onCreate() {
        if (this.isActive == null) {
            this.isActive = true;
        }
    }
}
