import React, { useState, useEffect } from 'react';
import { ContentItem, Seat, Venue, BookingTicket } from './types';
import { api } from './api/api';
import { Header } from './components/Header';
import { DateScroller } from './components/DateScroller';
import { AgenticAssistant } from './components/AgenticAssistant';
import { MovieCatalog } from './components/MovieCatalog';
import { SeatMap } from './components/SeatMap';
import { BookingSummary } from './components/BookingSummary';
import { TicketModal } from './components/TicketModal';

export const App: React.FC = () => {
  // Theme state: false = Black & Red Cinema Theme (Default); true = Light Mode
  const [isLightMode, setIsLightMode] = useState(false);

  // Catalog & Venues
  const [catalog, setCatalog] = useState<ContentItem[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<ContentItem | null>(null);
  const [selectedVenueId, setSelectedVenueId] = useState<number>(1);
  const [selectedShowtime, setSelectedShowtime] = useState<string>('1:00 PM - 3:15 PM');

  // Date selection state
  const [selectedDateText, setSelectedDateText] = useState('Aug 05, 2026');
  const [selectedDayOffset, setSelectedDayOffset] = useState(0);

  // Seat management state: Map<seatId, Seat> for instantaneous O(1) select/deselect!
  const [selectedSeats, setSelectedSeats] = useState<Map<string, Seat>>(new Map());
  const [bookedSeats, setBookedSeats] = useState<Set<string>>(
    new Set(['A-01', 'A-02', 'A-03', 'A-04', 'A-05', 'A-09', 'A-10', 'B-08', 'B-09', 'C-01', 'C-02', 'C-03', 'C-06', 'C-07'])
  );
  const [heldSeats, setHeldSeats] = useState<Set<string>>(new Set(['D-05', 'D-06']));

  // Ticket modal
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState<BookingTicket | null>(null);

  // Load catalog and venues on mount
  useEffect(() => {
    async function loadData() {
      const cat = await api.getCatalog();
      const ven = await api.getVenues();
      setCatalog(cat);
      setVenues(ven);
      if (cat.length > 0) setSelectedMovie(cat[0]);
    }
    loadData();
  }, []);

  // Sync theme class on document.body (Default: Black & Red)
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  // Handle Seat Selection & Deselection Toggle
  const handleToggleSeat = (seat: Seat) => {
    setSelectedSeats((prev) => {
      const next = new Map(prev);
      if (next.has(seat.id)) {
        // Deselect
        next.delete(seat.id);
      } else {
        // Select
        next.set(seat.id, seat);
      }
      return next;
    });
  };

  // 1-Click Deselect from Sidebar chip [x]
  const handleDeselectSeat = (seatId: string) => {
    setSelectedSeats((prev) => {
      const next = new Map(prev);
      next.delete(seatId);
      return next;
    });
  };

  // Clear all seats
  const handleClearAllSeats = () => {
    setSelectedSeats(new Map());
  };

  // Date selection
  const handleSelectDate = (offset: number, dateObj: Date) => {
    setSelectedDayOffset(offset);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setSelectedDateText(`${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`);
    // Clear seat selection on date switch
    setSelectedSeats(new Map());
  };

  // Temporary 5-minute Seat Hold
  const handleHoldSeats = async () => {
    if (selectedSeats.size === 0) {
      alert('Please select at least 1 seat first.');
      return;
    }
    const seatIds = Array.from(selectedSeats.keys());
    await api.holdSeats(selectedMovie?.id || 1, seatIds);
    alert(`⏳ Hold Confirmed: ${seatIds.length} seat(s) reserved for 5 minutes.`);
  };

  // Proceed to Payment & Generate Ticket
  const handleProceedPayment = async () => {
    if (!selectedMovie || selectedSeats.size === 0) return;

    const seatIds = Array.from(selectedSeats.keys());
    const subTotal = Array.from(selectedSeats.values()).reduce((acc, s) => acc + s.price, 0);
    const totalAmount = subTotal + Math.round(subTotal * 0.02);

    const ticket = await api.confirmBooking({
      showId: selectedMovie.id,
      seatIds,
      totalAmount
    });

    const activeVenue = venues.find((v) => v.id === selectedVenueId)?.name || 'Cinema Stela';

    setConfirmedTicket({
      ...ticket,
      movieTitle: selectedMovie.title,
      venueName: activeVenue,
      showTime: selectedShowtime,
      date: selectedDateText,
      seats: seatIds,
      totalAmount
    });

    setIsTicketModalOpen(true);
  };

  // Close ticket modal and persist booked seats
  const handleCloseTicketModal = () => {
    setIsTicketModalOpen(false);
    setBookedSeats((prev) => {
      const next = new Set(prev);
      selectedSeats.forEach((_, key) => next.add(key));
      return next;
    });
    setSelectedSeats(new Map());
  };

  // Agentic AI helper: bulk set seats
  const handleSetSelectedSeatsByAI = (seats: Seat[]) => {
    const next = new Map<string, Seat>();
    seats.forEach((s) => next.set(s.id, s));
    setSelectedSeats(next);
  };

  if (!selectedMovie) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading BOOKIT Application...</div>;
  }

  return (
    <div className="bookit-app-container">
      {/* Topbar */}
      <Header
        isDarkMode={!isLightMode}
        onToggleTheme={() => setIsLightMode(!isLightMode)}
        selectedDateText={selectedDateText}
      />

      {/* Date Scroller Carousel */}
      <DateScroller
        selectedDayOffset={selectedDayOffset}
        onSelectDate={handleSelectDate}
      />

      {/* Agentic AI Assistant Bar */}
      <AgenticAssistant
        catalog={catalog}
        onSelectMovie={(movie) => {
          setSelectedMovie(movie);
          setSelectedSeats(new Map());
        }}
        onSetSelectedSeats={handleSetSelectedSeatsByAI}
        bookedSeats={bookedSeats}
      />

      {/* 3-Column Main Workspace */}
      <main className="app-workspace">
        {/* Left Column: Catalog */}
        <MovieCatalog
          catalog={catalog}
          selectedMovieId={selectedMovie.id}
          onSelectMovie={(movie) => {
            setSelectedMovie(movie);
            setSelectedSeats(new Map());
          }}
        />

        {/* Center Column: Seat Map */}
        <SeatMap
          movie={selectedMovie}
          selectedSeats={selectedSeats}
          bookedSeats={bookedSeats}
          heldSeats={heldSeats}
          onToggleSeat={handleToggleSeat}
        />

        {/* Right Column: Details, Showtimes, Selected List & Checkout */}
        <BookingSummary
          movie={selectedMovie}
          venues={venues}
          selectedVenueId={selectedVenueId}
          onSelectVenue={setSelectedVenueId}
          selectedShowtime={selectedShowtime}
          onSelectShowtime={setSelectedShowtime}
          selectedSeats={selectedSeats}
          onDeselectSeat={handleDeselectSeat}
          onClearAllSeats={handleClearAllSeats}
          onProceedPayment={handleProceedPayment}
          onHoldSeats={handleHoldSeats}
        />
      </main>

      {/* Ticket Modal */}
      <TicketModal
        isOpen={isTicketModalOpen}
        ticket={confirmedTicket}
        onClose={handleCloseTicketModal}
      />
    </div>
  );
};

export default App;
