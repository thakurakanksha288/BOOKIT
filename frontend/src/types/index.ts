/**
 * BOOKIT TypeScript Definitions
 * Clean, descriptive data models matching the backend database schema.
 */

export type ContentType = 'MOVIE' | 'LIVE_EVENT';
export type SeatCategory = 'SILVER' | 'GOLD' | 'PLATINUM';
export type SeatStatus = 'AVAILABLE' | 'SELECTED' | 'BOOKED' | 'HELD';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

// Movie or Live Show Entity
export interface ContentItem {
  id: number;
  title: string;
  description?: string;
  contentType: ContentType;
  genres: string[];
  durationMinutes: number;
  posterUrl: string;
  basePrice: number;
}

// Seat Entity
export interface Seat {
  id: string; // e.g. "B-04"
  rowLabel: string;
  seatNumber: number;
  category: SeatCategory;
  price: number;
  status: SeatStatus;
}

// Venue & Screen
export interface Venue {
  id: number;
  name: string;
  city: string;
  screenName: string;
}

// Scheduled Show
export interface Show {
  id: number;
  contentId: number;
  venueId: number;
  startTime: string; // e.g. "1:00 PM"
  endTime: string;   // e.g. "3:15 PM"
  date: string;
}

// Booking Summary & Ticket
export interface BookingTicket {
  bookingReference: string;
  movieTitle: string;
  venueName: string;
  showTime: string;
  date: string;
  seats: string[];
  totalAmount: number;
  qrCodeData: string;
}
