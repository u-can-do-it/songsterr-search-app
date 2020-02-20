import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import TabList from "./TabList";
import Pagination from "./Pagination";

const DataList = ({ data = [], itemsPerPage = 10, initialPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [data, initialPage]);

  return (
    <>
      <TabList list={currentItems} />
      <Pagination
        totalItems={data.length}
        onPageSelect={setCurrentPage}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default DataList;

DataList.props = {
  data: PropTypes.array,
  itemsPerPage: PropTypes.number,
  initialPage: PropTypes.number
};
