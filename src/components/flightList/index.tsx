import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  CircularProgress,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import { Flight } from "../utils/flights";
import { airportList } from "../../mock/airportList";
interface FlightListProps {
  loading: boolean;
  flights: Flight[];
}

const FlightList = ({ loading, flights }: FlightListProps) => {
  if (loading) {
    return <CircularProgress />;
  }

  if (flights.length === 0) {
    return <Typography>No flights available.</Typography>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <List>
      {flights.map((flight, index) => {
        const originAirport = airportList.find(
          (airport) => airport.icao === flight.origin
        );
        const destinationAirport = airportList.find(
          (airport) => airport.icao === flight.destination
        );
        const backgroundColor = index % 2 === 0 ? "lightgrey" : "white";

        return (
          <ListItem key={index} style={{ background: backgroundColor }}>
            <ListItemAvatar>
              <Avatar>
                <FlightIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${flight.airline} - ${originAirport?.name} to ${destinationAirport?.name}`}
              secondary={`Departure: ${formatDate(flight.departureDate)}, ${
                flight.departureTime
              }, Duration: ${flight.duration}`}
            />
            {flight.returnDate && flight.returnTime && (
              <ListItemText
                primary={`${flight.airline} - ${destinationAirport?.name} to ${originAirport?.name}`}
                secondary={`Departure: ${formatDate(flight.returnDate)} ${
                  flight.returnTime
                }, Duration: ${flight.duration}`}
              />
            )}
            <ListItemSecondaryAction>
              <Typography variant="subtitle1">${flight.price}</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default FlightList;
