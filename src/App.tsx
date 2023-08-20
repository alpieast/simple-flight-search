import { useState } from "react";
import "./App.css";
import Layout from "./layout";
import SearchBar from "./components/searchBar";
import { airportList } from "./mock/airportList";
import { Flight } from "./components/utils/flights";
import FlightList from "./components/flightList";
import { SnackbarProvider } from "notistack";

function App() {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);

  return (
    <SnackbarProvider maxSnack={3}>
      <Layout>
        <SearchBar
          airports={airportList}
          setLoading={setLoading}
          setFlights={setFlights}
        />
        <FlightList loading={loading} flights={flights} />
      </Layout>
    </SnackbarProvider>
  );
}

export default App;
