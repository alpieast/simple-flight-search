export interface Flight {
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  returnDate?: string;
  returnTime?: string;
  duration: string;
  price: number;
  airline: string;
  airlineIcon: string;
}

const getRandomTime = (): string => {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const airlines = [
  { name: "Delta Air Lines", icon: "https://example.com/delta-icon.png" },
  { name: "American Airlines", icon: "https://example.com/american-icon.png" },
  { name: "United Airlines", icon: "https://example.com/united-icon.png" },
  { name: "Lufthansa", icon: "https://example.com/lufthansa-icon.png" },
  {
    name: "British Airways",
    icon: "https://example.com/british-airways-icon.png",
  },
  { name: "Air France", icon: "https://example.com/air-france-icon.png" },
  { name: "Emirates", icon: "https://example.com/emirates-icon.png" },
  { name: "Qatar Airways", icon: "https://example.com/qatar-airways-icon.png" },
  {
    name: "Singapore Airlines",
    icon: "https://example.com/singapore-airlines-icon.png",
  },
  {
    name: "Cathay Pacific",
    icon: "https://example.com/cathay-pacific-icon.png",
  },
  {
    name: "Japan Airlines",
    icon: "https://example.com/japan-airlines-icon.png",
  },
  {
    name: "KLM Royal Dutch Airlines",
    icon: "https://example.com/klm-icon.png",
  },
  {
    name: "Turkish Airlines",
    icon: "https://example.com/turkish-airlines-icon.png",
  },
  {
    name: "Virgin Atlantic Airways",
    icon: "https://example.com/virgin-atlantic-icon.png",
  },
  { name: "Etihad Airways", icon: "https://example.com/etihad-icon.png" },
  { name: "Qantas", icon: "https://example.com/qantas-icon.png" },
  {
    name: "Southwest Airlines",
    icon: "https://example.com/southwest-icon.png",
  },
  { name: "Ryanair", icon: "https://example.com/ryanair-icon.png" },
  { name: "Air Canada", icon: "https://example.com/air-canada-icon.png" },
  { name: "Alaska Airlines", icon: "https://example.com/alaska-icon.png" },
];

export const generateRandomFlights = (
  origin: string,
  destination: string,
  departureDate: string,
  returnDate?: string
): Flight[] => {
  if (Math.random() < 0.2) {
    return [];
  }
  const flights: Flight[] = [];

  for (let i = 0; i < 10; i++) {
    const departureTime = getRandomTime();
    const returnTime = returnDate ? getRandomTime() : undefined;
    const duration = `${Math.floor(Math.random() * 12) + 1}h ${Math.floor(
      Math.random() * 60
    )}m`;
    const price = Math.floor(Math.random() * 500) + 100;
    const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];

    flights.push({
      origin,
      destination,
      departureDate,
      departureTime,
      returnDate,
      returnTime,
      duration,
      price,
      airline: randomAirline.name,
      airlineIcon: randomAirline.icon,
    });
  }

  return flights;
};
