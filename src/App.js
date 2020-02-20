import React, { useState, useEffect } from "react";

import { search } from "./api";
import "./index.css";
import styles from "./components/styles/App.module.css";

import SearchForm from "./components/SearchForm";
import DataList from "./components/DataList";

const App = () => {
  const [list, setlist] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleSearch = async query => {
    setlist([]);
    setError(null);
    setIsFetching(true);
    try {
      const data = await search(query);
      setlist(data);
    } catch (error) {
      setError(error.message);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    const handleFilter = () => {
      if (filters.length === 0) return list;

      return list.filter(
        ({ tabTypes }) =>
          new Set(filters.concat(tabTypes)).size !==
          tabTypes.length + filters.length
      );
    };

    setFilteredData(handleFilter());
  }, [list, filters]);

  const errorMessage = error ? <p className={styles.error}>{error}</p> : null;
  return (
    <div className={styles.app} id="search-engine">
      <h1>Serch for tablature</h1>
      <div className={styles.serchContainer}>
        <SearchForm
          onSubmit={handleSearch}
          onFilterSet={setFilters}
          placeholder="Search for tabs"
          isSearching={isFetching}
        />
      </div>
      <div className={styles.dataContainer}>
        {errorMessage}
        <DataList data={filteredData} itemsPerPage={15} />
      </div>
    </div>
  );
};

export default App;
