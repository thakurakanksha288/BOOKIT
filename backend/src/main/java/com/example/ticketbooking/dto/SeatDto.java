package com.example.ticketbooking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import com.example.ticketbooking.model.SeatCategory;
import com.example.ticketbooking.model.SeatState;

@Data
public class SeatDto {
    private Long id;

    @NotBlank(message = "Row label is required")
    private String rowLabel;

    @NotNull(message = "Seat number is required")
    private Integer seatNumber;

    @NotNull(message = "Category is required")
    private SeatCategory category;

    @NotNull(message = "Price is required")
    private Double price;

    @NotNull(message = "State is required")
    private SeatState state;
}
