import { Flight } from '../types';

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  image: string;
  minPrice: number;
  code: string;
}

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    tagline: 'The City of Light',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH30BGIzS8M1lJnhBwUaLC-xgPfzJOkklwgyIvCzqx41REwxswTgiK995as4BX9rAcQUb_46DTZ0YQRokz4kEYTVcKLe2QVz_lLRujAAYRY7p-6HUqrplTBYG_Xe7aNy3Khc8s_ziTDWyDQb7uCnUvW8h4OMKfzxwO9zo21g_0tvedgRKssmXkHkFC2H5J_ODSebFxzm2c_kbmztneL9lEd1KvfiS524ibRgxQJBNm8peqa8phiIgAASKQA8hryHCrsKMqsbD3Lm6A',
    minPrice: 499,
    code: 'CDG'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    tagline: 'Fusion of Tradition & Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsWxGEHd2ngZdUgyHCVU3-oW4z6VzHRsMORiZjZENmy3AoJYnlglHo9gGY22wCD6o_tLhaRGy7oFKMHBgyPwEvs_nzvpTOk-v6j8WM2doSxH2LH2YtffJHwR1n4m4D_ZsAxc3AxbBK2jyJQtQTBUaj19PphBfTxvVypHZO0RrTi8aXMcBhwqLOdHzjv3sp3FDuRbQNC8Wd0sRt--VQb0C_sd9YuFcrlYRQjppaN-_kptcVLDKQNC4VVSdZRubBcc5qCtsnsdYsBiBf',
    minPrice: 720,
    code: 'NRT'
  },
  {
    id: 'bali',
    name: 'Bali',
    tagline: 'Island Paradise',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBse02XD2czcFALsZaxi4_DcXGRyxVnN7dqSAItVKFix57o4audOjRRP93Rfu1JcvVaCs4LtX8S_SKevV7IW5g6CnitH9AOZYh7VrgaEcKk2_kDkvpFu57CXeZ8o-yL8EIepC1lfUsHXn-KrV9DZfVvTDeXTW4IWWyBmtD8ZghQFxkDQ3Ez6_GM1h-hsxyFKGwbhjVbnwGSutPx6Mgw7u0ebTMoWXBxFA82yLM-s1IzaCoPQciQ6jZr8mqDrjv4ilXDbASW2hgvsi3V',
    minPrice: 580,
    code: 'DPS'
  },
  {
    id: 'new-york',
    name: 'New York',
    tagline: 'The Big Apple',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyrwUKac-QTKSVj4nBcAm7NI8FOYST_5QEAR_Bznlgz6WcuU0sXPbRclIl-i7jXf7X7HhC20-FofhQV5HIg_S8fqanVvwiIUdbvbLBd4gqcOGGTwCB2ngLcMxZwhAyEb5kL10ZlaJIjjsGNGktJJYgraavoTzV3dg5eO8I69VRgUykrbE9w8vJNAemB1KaMyjd2V0cmLIwhFsglYigGR23EEYi9in4zZnJ7IUv80ntpKKBKvbp6ZEMRZ-Jr_YKrzjVUZTVj3H39c-j',
    minPrice: 350,
    code: 'JFK'
  }
];

export interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

export const AIRPORTS: Airport[] = [
  { code: 'JFK', city: 'New York', country: 'United States', name: 'John F. Kennedy International Airport' },
  { code: 'LAX', city: 'Los Angeles', country: 'United States', name: 'Los Angeles International Airport' },
  { code: 'SFO', city: 'San Francisco', country: 'United States', name: 'San Francisco International Airport' },
  { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle Airport' },
  { code: 'LHR', city: 'London', country: 'United Kingdom', name: 'Heathrow Airport' },
  { code: 'NRT', city: 'Tokyo', country: 'Japan', name: 'Narita International Airport' },
  { code: 'HND', city: 'Tokyo', country: 'Japan', name: 'Haneda Airport' },
  { code: 'DPS', city: 'Bali', country: 'Indonesia', name: 'Ngurah Rai International Airport' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Changi Airport' },
  { code: 'SYD', city: 'Sydney', country: 'Australia', name: 'Kingsford Smith Airport' },
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates', name: 'Dubai International Airport' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', name: 'Amsterdam Airport Schiphol' }
];

const AIRLINES = [
  { name: 'GlobalFlights Airlines', code: 'GF' },
  { name: 'Delta Air Lines', code: 'DL' },
  { name: 'United Airlines', code: 'UA' },
  { name: 'Japan Airlines', code: 'JL' },
  { name: 'Air France', code: 'AF' },
  { name: 'Singapore Airlines', code: 'SQ' },
  { name: 'Emirates', code: 'EK' },
  { name: 'British Airways', code: 'BA' }
];

export function getAirportByCode(code: string): Airport {
  return AIRPORTS.find(a => a.code.toUpperCase() === code.toUpperCase()) || {
    code: code.toUpperCase(),
    city: code,
    country: 'Unknown',
    name: `${code} Airport`
  };
}

export function searchAirports(query: string): Airport[] {
  const clean = query.toLowerCase().trim();
  if (!clean) return [];
  return AIRPORTS.filter(
    a => a.code.toLowerCase().includes(clean) ||
         a.city.toLowerCase().includes(clean) ||
         a.country.toLowerCase().includes(clean) ||
         a.name.toLowerCase().includes(clean)
  );
}

// Consistently generates realistic flights for any combination of origin & destination
export function generateFlights(fromCode: string, toCode: string, dateStr: string): Flight[] {
  const from = getAirportByCode(fromCode);
  const to = getAirportByCode(toCode);
  
  // Use a string hash to seed values so they look consistent for the same search
  const seedString = `${fromCode}-${toCode}-${dateStr}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const absHash = Math.abs(hash);
  
  // Generate 5 flights
  const flights: Flight[] = [];
  const airlinesCount = AIRLINES.length;
  
  const basePrices: Record<string, number> = {
    'CDG-JFK': 490, 'JFK-CDG': 490,
    'NRT-JFK': 720, 'JFK-NRT': 720,
    'DPS-JFK': 810, 'JFK-DPS': 810,
    'SIN-JFK': 850, 'JFK-SIN': 850,
    'CDG-NRT': 650, 'NRT-CDG': 650,
    'CDG-DPS': 580, 'DPS-CDG': 580,
    'LHR-CDG': 120, 'CDG-LHR': 120,
    'SFO-LAX': 89,  'LAX-SFO': 89,
    'SYD-SIN': 450, 'SIN-SYD': 450
  };
  
  const routeKey = `${fromCode.toUpperCase()}-${toCode.toUpperCase()}`;
  const reverseRouteKey = `${toCode.toUpperCase()}-${fromCode.toUpperCase()}`;
  const basePrice = basePrices[routeKey] || basePrices[reverseRouteKey] || 350 + (absHash % 400);

  const times = [
    { dep: '06:15 AM', arr: '11:30 AM', dur: '5h 15m' },
    { dep: '08:45 AM', arr: '02:00 PM', dur: '5h 15m' },
    { dep: '11:30 AM', arr: '05:40 PM', dur: '6h 10m' },
    { dep: '03:15 PM', arr: '08:30 PM', dur: '5h 15m' },
    { dep: '07:20 PM', arr: '11:55 PM', dur: '4h 35m' },
    { dep: '10:00 PM', arr: '05:15 AM', dur: '7h 15m' }
  ];

  for (let i = 0; i < 5; i++) {
    const flightSeed = absHash + i * 13;
    const airline = AIRLINES[flightSeed % airlinesCount];
    const timeIndex = flightSeed % times.length;
    
    // Vary details slightly
    const priceVariance = (flightSeed % 150) - 75; // -75 to +75
    const finalPrice = Math.max(79, Math.round(basePrice + priceVariance));
    
    // Direct or stops
    const stops = (flightSeed % 4 === 0) ? 1 : 0;
    
    // Create custom duration based on stops
    let duration = times[timeIndex].dur;
    let arrTime = times[timeIndex].arr;
    if (stops === 1) {
      duration = `${parseInt(duration) + 2}h 45m`;
      // adjust arrival time slightly for display
      const [hourStr, minAndAmPm] = times[timeIndex].dep.split(':');
      const [minStr, ampm] = minAndAmPm.split(' ');
      let depHour = parseInt(hourStr);
      if (ampm === 'PM' && depHour !== 12) depHour += 12;
      if (ampm === 'AM' && depHour === 12) depHour = 0;
      
      const flightHours = parseInt(duration);
      const flightMins = 45;
      
      const arrTotalMins = (depHour * 60) + parseInt(minStr) + (flightHours * 60) + flightMins;
      const arrHour24 = Math.floor(arrTotalMins / 60) % 24;
      const arrMin = arrTotalMins % 60;
      const arrAmPm = arrHour24 >= 12 ? 'PM' : 'AM';
      const arrHour12 = arrHour24 % 12 === 0 ? 12 : arrHour24 % 12;
      
      arrTime = `${arrHour12.toString().padStart(2, '0')}:${arrMin.toString().padStart(2, '0')} ${arrAmPm}`;
    }

    const flightNum = `${airline.code}${300 + (flightSeed % 699)}`;

    flights.push({
      id: `${flightNum}-${i}-${dateStr}`,
      airline: airline.name,
      airlineCode: airline.code,
      flightNumber: flightNum,
      origin: fromCode.toUpperCase(),
      originCity: from.city,
      destination: toCode.toUpperCase(),
      destinationCity: to.city,
      departureTime: times[timeIndex].dep,
      arrivalTime: arrTime,
      duration: duration,
      price: finalPrice,
      stops: stops,
      class: 'Economy'
    });
  }

  // Sort initially by cheapest
  return flights.sort((a, b) => a.price - b.price);
}
