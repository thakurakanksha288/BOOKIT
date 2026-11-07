import React from 'react';
import { ContentItem, Seat, Venue } from '../types';

interface BookingSummaryProps {
  movie: ContentItem;
  venues: Venue[];
  selectedVenueId: number;
  onSelectVenue: (venueId: number) => void;
  selectedShowtime: string;
  onSelectShowtime: (time: string) => void;
  selectedSeats: Map<string, Seat>;
  onDeselectSeat: (seatId: string) => void;
  onClearAllSeats: () => void;
  onProceedPayment: () => void;
  onHoldSeats: () => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  movie,
  venues,
  selectedVenueId,
  onSelectVenue,
  selectedShowtime,
  onSelectShowtime,
  selectedSeats,
  onDeselectSeat,
  onClearAllSeats,
  onProceedPayment,
  onHoldSeats
}) => {
  const showtimes = [
    '1:00 PM - 3:15 PM',
    '3:00 PM - 5:15 PM',
    '5:00 PM - 7:15 PM',
    '7:00 PM - 9:15 PM'
  ];

  const selectedList = Array.from(selectedSeats.values());
  const count = selectedList.length;

  const subTotal = selectedList.reduce((sum, s) => sum + s.price, 0);
  const convenienceFee = count > 0 ? Math.round(subTotal * 0.02) : 0;
  const totalAmount = subTotal + convenienceFee;

  return (
    <aside className="column-card">
      {/* Movie Title & Genre Badges */}
      <div className="selected-movie-info">
        <h1 className="movie-headline">{movie.title}</h1>
        <div className="genre-tag-list">
          {movie.genres.map((g) => (
            <span key={g} className="genre-tag">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Venue Selector */}
      <div className="section-subtitle">
        <span>Select Venue</span>
      </div>
      <select
        className="venue-select"
        value={selectedVenueId}
        onChange={(e) => onSelectVenue(Number(e.target.value))}
      >
        {venues.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name} ({v.screenName})
          </option>
        ))}
      </select>

      {/* Showtime Selection Chips */}
      <div className="section-subtitle">
        <span>Select Showtime</span>
      </div>
      <div className="showtime-chips">
        {showtimes.map((st) => (
          <button
            key={st}
            className={`time-chip ${selectedShowtime === st ? 'active' : ''}`}
            onClick={() => onSelectShowtime(st)}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Selected Seats Interactive List with 1-Click Deselection [x] */}
      <div className="section-subtitle">
        <span>Selected Seats ({count})</span>
        {count > 0 && (
          <button
            onClick={onClearAllSeats}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Clear
          </button>
        )}
      </div>

      <div className="selected-chips-container">
        {count === 0 ? (
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '8px 0' }}>
            No seats selected. Click any available seat on the map.
          </div>
        ) : (
          selectedList.map((seat) => (
            <div key={seat.id} className="selected-seat-chip">
              <div className="seat-chip-info">
                <span>Row {seat.rowLabel} · Seat {seat.seatNumber}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  ({seat.category})
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="seat-chip-price">₹{seat.price}</span>
                <button
                  className="seat-remove-btn"
                  title="Deselect this seat"
                  onClick={() => onDeselectSeat(seat.id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Price Breakdown */}
      <div className="price-breakdown">
        <div className="price-row">
          <span>{count} Ticket{count === 1 ? '' : 's'}</span>
          <span>₹{subTotal.toFixed(2)}</span>
        </div>
        <div className="price-row">
          <span>Booking Convenience (2%)</span>
          <span>₹{convenienceFee.toFixed(2)}</span>
        </div>
        <div className="price-row total">
          <span>Total Amount</span>
          <span className="total-amount">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-group">
        <button
          className="primary-btn"
          disabled={count === 0}
          onClick={onProceedPayment}
        >
          {count > 0 ? `Pay ₹${totalAmount.toFixed(2)} (Confirm)` : 'Select Seats to Book'}
        </button>
        <button className="secondary-btn" onClick={onHoldSeats}>
          Hold Seats (5 Mins)
        </button>
      </div>
    </aside>
  );
};
