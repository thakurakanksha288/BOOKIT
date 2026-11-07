import React from 'react';
import { Seat, ContentItem } from '../types';

interface SeatMapProps {
  movie: ContentItem;
  selectedSeats: Map<string, Seat>;
  bookedSeats: Set<string>;
  heldSeats: Set<string>;
  onToggleSeat: (seat: Seat) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  movie,
  selectedSeats,
  bookedSeats,
  heldSeats,
  onToggleSeat
}) => {
  // Row layout structure (no hardcoding, dynamic multiplier)
  const rows = [
    { label: 'A', category: 'PLATINUM' as const, multiplier: 1.5 },
    { label: 'B', category: 'GOLD' as const, multiplier: 1.25 },
    { label: 'C', category: 'GOLD' as const, multiplier: 1.25 },
    { label: 'D', category: 'SILVER' as const, multiplier: 1.0 },
    { label: 'E', category: 'SILVER' as const, multiplier: 1.0 },
    { label: 'F', category: 'SILVER' as const, multiplier: 1.0 },
    { label: 'G', category: 'SILVER' as const, multiplier: 1.0 },
  ];

  const seatsPerRow = 10;
  const aisleGapAfter = 5;

  const renderSeatBtn = (rowLabel: string, seatNum: number, category: 'SILVER' | 'GOLD' | 'PLATINUM', multiplier: number) => {
    const numStr = seatNum.toString().padStart(2, '0');
    const seatId = `${rowLabel}-${numStr}`;
    const price = Math.round(movie.basePrice * multiplier);

    const isBooked = bookedSeats.has(seatId);
    const isHeld = heldSeats.has(seatId);
    const isSelected = selectedSeats.has(seatId);

    let className = 'seat-btn';
    if (isBooked) className += ' booked';
    else if (isHeld) className += ' held';
    else if (isSelected) className += ' selected';
    else className += ' available';

    const seatObj: Seat = {
      id: seatId,
      rowLabel,
      seatNumber: seatNum,
      category,
      price,
      status: isSelected ? 'SELECTED' : isBooked ? 'BOOKED' : isHeld ? 'HELD' : 'AVAILABLE'
    };

    return (
      <button
        key={seatId}
        className={className}
        disabled={isBooked || isHeld}
        title={`Seat ${seatId} (${category} - ₹${price})`}
        onClick={() => onToggleSeat(seatObj)}
      >
        <span>{seatNum}</span>
        <div className={`seat-cat-dot seat-cat-${category.toLowerCase()}`} />
      </button>
    );
  };

  return (
    <section className="column-card">
      <div className="seat-map-wrapper">
        <div className="screen-header">
          <h2 className="screen-title">Select Seat for {movie.title}</h2>
          <div className="cinema-screen" />
        </div>

        <div className="seats-grid-container">
          {rows.map((row) => (
            <div key={row.label} className="seat-row">
              <div className="row-label">{row.label}</div>

              {/* Group 1: Left of aisle (1 to 5) */}
              <div className="seats-row-group">
                {Array.from({ length: aisleGapAfter }, (_, i) =>
                  renderSeatBtn(row.label, i + 1, row.category, row.multiplier)
                )}
              </div>

              {/* Center Aisle */}
              <div className="aisle-gap" />

              {/* Group 2: Right of aisle (6 to 10) */}
              <div className="seats-row-group">
                {Array.from({ length: seatsPerRow - aisleGapAfter }, (_, i) =>
                  renderSeatBtn(row.label, aisleGapAfter + i + 1, row.category, row.multiplier)
                )}
              </div>

              <div className="row-label">{row.label}</div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="seat-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: 'var(--seat-available)', border: '1px solid #ccc' }} />
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: 'var(--seat-selected)' }} />
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: 'var(--seat-booked)' }} />
            <span>Booked</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: 'var(--seat-held)' }} />
            <span>Held (5m)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
