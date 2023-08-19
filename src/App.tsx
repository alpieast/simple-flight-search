import React from "react";
import "./App.css";
import Layout from "./layout";
import SearchBar from "./components/searchBar";
import { airportList } from "./mock/airportList";

function App() {
  return (
    <Layout>
      <SearchBar airports={airportList} />
    </Layout>
  );
}

export default App;
