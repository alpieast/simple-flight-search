import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid } from "@mui/material";

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
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ airports }) => {
  const [origin, setOrigin] = useState<IAirport | null>(null);
  const [destination, setDestination] = useState<IAirport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

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
    // Perform the flight search using the selected options
    console.log("Search options:", {
      origin,
      destination,
      departureDate,
      returnDate,
      isRoundTrip,
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
              onChange={(event, newValue) => setOrigin(newValue)}
              renderInput={(params) => <TextField {...params} label="Origin" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
            <Autocomplete
              options={airports}
              getOptionLabel={(airport) => airport.name}
              value={destination}
              onChange={(event, newValue) => setDestination(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Destination" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
            <DatePicker
              label="Departure Date"
              value={departureDate}
              onChange={(newValue) => setDepartureDate(newValue)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
            <DatePicker
              label="Return Date"
              value={returnDate}
              onChange={(newValue) => setReturnDate(newValue)}
              disabled={!isRoundTrip}
              sx={{ width: "100%" }}
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
