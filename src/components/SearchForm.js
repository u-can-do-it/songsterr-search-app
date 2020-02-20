import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FormInput from "./FormInput";
import styles from "./styles/SearchForm.module.css";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

import { FILTER_OPTIONS } from "../const/FilterOptions";

const SearchForm = ({ onSubmit, onFilterSet, placeholder, isSearching }) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState([]);
  const [isFilterShowed, setIsFilterShowed] = useState(false);

  const handleQueryChange = event => setQuery(event.target.value);

  const handleFilterSet = event => {
    const value = event.target.value;
    const index = filter.indexOf(value);
    if (index === -1) {
      setFilter([...filter, value]);
    } else {
      filter.splice(index, 1);
      setFilter([...filter]);
    }
  };

  useEffect(() => {
    onFilterSet(filter);
  }, [filter, onFilterSet]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  const filters = Object.keys(FILTER_OPTIONS).map(key => (
    <li key={key}>
      <FormInput
        type="checkbox"
        value={key}
        label={FILTER_OPTIONS[key]}
        handleChange={handleFilterSet}
        className={styles.filterInput}
        id={FILTER_OPTIONS[key]}
      />
    </li>
  ));

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FormInput
        id="search"
        type="text"
        name="query"
        value={query}
        handleChange={handleQueryChange}
        autoComplete="off"
        required
        placeholder={placeholder}
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        <SearchIcon
          className={`${styles.submit} ${isSearching ? styles.active : null}`}
        />
      </button>
      <button
        type="button"
        className={styles.toggleFilters}
        aria-pressed={isFilterShowed}
        onClick={() => setIsFilterShowed(!isFilterShowed)}
      >
        <div></div>
      </button>

      <ul className={styles.filter}>{filters}</ul>
    </form>
  );
};
export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFilterSet: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isSearching: PropTypes.bool.isRequired
};
