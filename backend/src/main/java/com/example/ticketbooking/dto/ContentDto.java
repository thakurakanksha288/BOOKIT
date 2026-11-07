package com.example.ticketbooking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import com.example.ticketbooking.model.ContentType;
import java.time.LocalDate;

@Data
public class ContentDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Content type is required")
    private ContentType contentType;

    private String language;
    private String genre;
    private Integer durationMinutes;
    private String posterUrl;
    private LocalDate releaseDate;
}
