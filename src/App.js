import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useSearch from "./components/useSearch";
import MainPage from "./components/MainPage";
import LaunchPage from "./components/LaunchPage";
import "./css/main.css";

export default function App() {
  const [phrase, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const { launches, hasMore, loading, error } = useSearch(phrase, pageNumber);

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(0);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              launches={launches}
              hasMore={hasMore}
              loading={loading}
              error={error}
              phrase={phrase}
              handleSearch={handleSearch}
              setPageNumber={setPageNumber}
            />
          }
        />
        {launches.map((launch) => {
          return (
            <Route
              key={launch.id}
              path={"/" + launch.id}
              element={<LaunchPage launchId={launch.id} />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}
