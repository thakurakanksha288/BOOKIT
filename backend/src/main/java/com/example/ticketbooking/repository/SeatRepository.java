package com.example.ticketbooking.repository;

import com.example.ticketbooking.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {}
