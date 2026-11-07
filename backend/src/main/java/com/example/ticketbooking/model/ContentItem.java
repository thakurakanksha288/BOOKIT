package com.example.ticketbooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "content_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContentItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "content_type", nullable = false)
    private ContentType contentType;

    private String language;
    private String genre;
    private Integer durationMinutes;
    private String posterUrl;
    private java.time.LocalDate releaseDate;
}

enum ContentType {
    MOVIE,
    LIVE_EVENT
}
