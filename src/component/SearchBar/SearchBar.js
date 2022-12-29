import React, { useState } from "react";
import { fetchWeather } from "../../api";
import { TOAST } from "../../constants";
import { emitToast } from "../../helpers";
import "./searchbar.css";

function SearchBar({ setWeather, setLoading }) {
  const [query, setQuery] = useState("");

  const search = async () => {
    setLoading(true);
    try {
      const data = await fetchWeather({ q: query });
      setWeather(data);
    } catch (e) {
      console.log(e);
      emitToast(TOAST.ERROR, e.message);
    }
    setQuery("");
    setLoading(false);
  };

  return (
    <div class="wrapper">
      <div class="container">
        <form role="search" method="get" class="search-form form" action="">
          <label>
            <span class="screen-reader-text">Search for...</span>
            <input
              type="search"
              class="search-field"
              placeholder="Type something..."
              value={query}
              onKeyPress={async (e) => {
                if (e.key === "Enter") {
                  search();
                  e.target.blur();
                }
              }}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <input
            type="submit"
            class="search-submit button"
            value="🔍"
            onClick={async (e) => {
              e.preventDefault();
              search();
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
