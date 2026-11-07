package com.example.ticketbooking.service;

import com.example.ticketbooking.dto.ContentDto;
import com.example.ticketbooking.model.ContentItem;
import com.example.ticketbooking.repository.ContentItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContentService {
    private final ContentItemRepository repository;

    public ContentService(ContentItemRepository repository) {
        this.repository = repository;
    }

    public List<ContentDto> getAll() {
        return repository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ContentDto create(ContentDto dto) {
        ContentItem item = new ContentItem();
        item.setTitle(dto.getTitle());
        item.setDescription(dto.getDescription());
        item.setContentType(dto.getContentType());
        item.setLanguage(dto.getLanguage());
        item.setGenre(dto.getGenre());
        item.setDurationMinutes(dto.getDurationMinutes());
        item.setPosterUrl(dto.getPosterUrl());
        item.setReleaseDate(dto.getReleaseDate());
        repository.save(item);
        return toDto(item);
    }

    private ContentDto toDto(ContentItem item) {
        ContentDto dto = new ContentDto();
        dto.setId(item.getId());
        dto.setTitle(item.getTitle());
        dto.setDescription(item.getDescription());
        dto.setContentType(item.getContentType());
        dto.setLanguage(item.getLanguage());
        dto.setGenre(item.getGenre());
        dto.setDurationMinutes(item.getDurationMinutes());
        dto.setPosterUrl(item.getPosterUrl());
        dto.setReleaseDate(item.getReleaseDate());
        return dto;
    }
}
