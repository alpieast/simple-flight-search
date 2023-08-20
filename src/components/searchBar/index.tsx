import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid } from "@mui/material";
import fetchFlights from "../../services/flightSearchService";
import { enqueueSnackbar } from "notistack";

export interface IAirport {
  icao: string;
  iata: string;
  name: string;
  city: string;
  state: string;
  country: string;
  elevation: number;
  lat: number;
  lon: number;
  tz: string;
}

interface FlightSearchFormProps {
  airports: IAirport[];
  setLoading: (loading: boolean) => void;
  setFlights: (flights: any[]) => void;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  airports,
  setLoading,
  setFlights,
}) => {
  const [origin, setOrigin] = useState<IAirport | null>(null);
  const [destination, setDestination] = useState<IAirport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const [originError, setOriginError] = useState(false);
  const [destinationError, setDestinationError] = useState(false);
  const [departureDateError, setDepartureDateError] = useState(false);
  const [returnDateError, setReturnDateError] = useState(false);

  const handleRoundTripChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsRoundTrip(event.target.checked);
    if (!event.target.checked) {
      setReturnDate(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !origin ||
      !destination ||
      !departureDate ||
      (isRoundTrip && !returnDate)
    ) {
      if (!origin) setOriginError(true);
      if (!destination) setDestinationError(true);
      if (!departureDate) setDepartureDateError(true);
      if (isRoundTrip && !returnDate) setReturnDateError(true);

      enqueueSnackbar("Please fill out all required fields.", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    fetchFlights(
      origin?.icao || "",
      destination?.icao || "",
      departureDate?.toISOString() || "",
      returnDate?.toISOString() || ""
    )
      .then((res: any) => {
        setFlights(res);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid
          container
          spacing={2}
          sx={{ padding: "20px", alignItems: "center" }}
        >
          <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
            <Autocomplete
              options={airports}
              getOptionLabel={(airport) => airport.name}
              value={origin}
              onChange={(event, newValue) => {
                setOrigin(newValue);
                setOriginError(false);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Origin" error={originError} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
            <Autocomplete
              options={airports}
              getOptionLabel={(airport) => airport.name}
              value={destination}
              onChange={(event, newValue) => {
                setDestination(newValue);
                setDestinationError(false);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  error={destinationError}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
            <DatePicker
              label="Departure Date"
              value={departureDate}
              onChange={(newValue) => {
                setDepartureDate(newValue);
                setDepartureDateError(false);
              }}
              sx={{
                width: "100%",
              }}
              slotProps={{ textField: { error: departureDateError } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
            <DatePicker
              label="Return Date"
              value={returnDate}
              onChange={(newValue) => {
                setReturnDate(newValue);
                setReturnDateError(false);
              }}
              disabled={!isRoundTrip}
              sx={{ width: "100%" }}
              slotProps={{ textField: { error: returnDateError } }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRoundTrip}
                  onChange={handleRoundTripChange}
                />
              }
              label="Round Trip"
            />

            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </form>
  );
};

export default FlightSearchForm;
