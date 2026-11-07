import React from 'react';
import { BookingTicket } from '../types';

interface TicketModalProps {
  isOpen: boolean;
  ticket: BookingTicket | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  ticket,
  onClose
}) => {
  if (!isOpen || !ticket) return null;

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`}>
      <div className="ticket-modal">
        <div className="ticket-header">
          <div className="ticket-brand">BOOKIT OFFICIAL E-TICKET</div>
          <h3 className="ticket-movie-title">{ticket.movieTitle}</h3>
        </div>

        <div className="ticket-body">
          <div className="ticket-details-grid">
            <div className="ticket-data-item">
              <div className="t-label">Venue</div>
              <div className="t-val">{ticket.venueName}</div>
            </div>
            <div className="ticket-data-item">
              <div className="t-label">Date & Time</div>
              <div className="t-val">{ticket.date} · {ticket.showTime}</div>
            </div>
            <div className="ticket-data-item">
              <div className="t-label">Seats</div>
              <div className="t-val">{ticket.seats.join(', ')}</div>
            </div>
            <div className="ticket-data-item">
              <div className="t-label">Amount Paid</div>
              <div className="t-val">₹{ticket.totalAmount.toFixed(2)}</div>
            </div>
          </div>

          {/* Dynamic SVG QR Code */}
          <div className="qr-container">
            <svg width="140" height="140" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="#ffffff"/>
              <rect x="5" y="5" width="25" height="25" fill="#000000"/>
              <rect x="9" y="9" width="17" height="17" fill="#ffffff"/>
              <rect x="13" y="13" width="9" height="9" fill="#000000"/>
              <rect x="70" y="5" width="25" height="25" fill="#000000"/>
              <rect x="74" y="9" width="17" height="17" fill="#ffffff"/>
              <rect x="78" y="13" width="9" height="9" fill="#000000"/>
              <rect x="5" y="70" width="25" height="25" fill="#000000"/>
              <rect x="9" y="74" width="17" height="17" fill="#ffffff"/>
              <rect x="13" y="78" width="9" height="9" fill="#000000"/>
              <rect x="36" y="10" width="6" height="6" fill="#000000"/>
              <rect x="48" y="10" width="6" height="6" fill="#000000"/>
              <rect x="36" y="22" width="6" height="6" fill="#000000"/>
              <rect x="54" y="28" width="6" height="6" fill="#000000"/>
              <rect x="15" y="42" width="6" height="6" fill="#000000"/>
              <rect x="42" y="42" width="6" height="6" fill="#000000"/>
              <rect x="66" y="42" width="6" height="6" fill="#000000"/>
              <rect x="36" y="78" width="6" height="6" fill="#000000"/>
              <rect x="54" y="78" width="6" height="6" fill="#000000"/>
            </svg>
          </div>

          <div className="ticket-reference">REF: {ticket.bookingReference}</div>

          <button className="primary-btn" onClick={onClose} style={{ width: '100%' }}>
            Done & Save Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
