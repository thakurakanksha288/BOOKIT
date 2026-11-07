package com.example.ticketbooking.repository;

import com.example.ticketbooking.model.ContentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentItemRepository extends JpaRepository<ContentItem, Long> {}
