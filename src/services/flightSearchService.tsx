import { generateRandomFlights } from "../components/utils/flights";

const fetchFlights = (
  origin: string,
  destination: string,
  departureDate: string,
  returnDate?: string
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const flights = generateRandomFlights(
        origin,
        destination,
        departureDate,
        returnDate
      );

      resolve(flights);
    }, 1000);
  });
};

export default fetchFlights;
