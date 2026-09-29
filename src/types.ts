export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
  class: 'Economy' | 'Business' | 'First';
}

export interface Booking {
  id: string;
  flight: Flight;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  seatNumber: string;
  bookingDate: string;
  status: 'active' | 'cancelled';
  departureDate: string;
  returnDate?: string;
  pricePaid: number;
}

export interface SearchQuery {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
}
