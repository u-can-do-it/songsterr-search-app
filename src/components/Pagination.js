import React from "react";
import PropTypes from "prop-types";
import styles from "./styles/Pagination.module.css";

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageSelect,
  currentPage = 1,
  maxDisplayPages = 10
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const setPagination = () => {
    const numbers = [];
    let firstIndex = 1;
    let lastIndex = totalPages;
    if (totalPages > maxDisplayPages) {
      firstIndex = Math.max(1, currentPage - 2);
      lastIndex = Math.min(maxDisplayPages - 1 + firstIndex, totalPages);

      if (totalPages >= maxDisplayPages && lastIndex >= totalPages) {
        firstIndex = totalPages - maxDisplayPages;
      }
    }

    for (let i = firstIndex; i <= lastIndex; i++) {
      numbers.push(
        <li key={i}>
          <a
            href="#search-engine"
            onClick={() => onPageSelect(i)}
            className={`${styles.number} ${
              currentPage === i ? styles.current : ""
            }`}
          >
            {i}
          </a>
        </li>
      );
    }

    if (lastIndex < totalPages)
      numbers.push(
        <li key={"total"}>
          <a
            href="#search-engine"
            onClick={() => onPageSelect(totalPages)}
            className={styles.number}
          >
            ...
          </a>
        </li>
      );

    return numbers;
  };
  const pageNumbers = setPagination();
  const prevNumber = Math.max(currentPage - 1, 1);
  const nextNumber = Math.min(currentPage + 1, totalPages);
  const pagination =
    totalPages > 1 ? (
      <nav className={styles.container}>
        <ul className={styles.pagination}>
          <li>
            <a
              href="#search-engine"
              onClick={() => onPageSelect(prevNumber)}
              className={styles.number}
            >
              &#8592;
            </a>
          </li>
          {pageNumbers}
          <li onClick={() => onPageSelect(nextNumber)}>
            <a
              href="#search-engine"
              onClick={() => onPageSelect(prevNumber)}
              className={styles.number}
            >
              &#8594;
            </a>
          </li>
        </ul>
      </nav>
    ) : null;
  return <>{pagination}</>;
};

export default Pagination;

Pagination.props = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageSelect: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  maxDisplayedPages: PropTypes.number
};
