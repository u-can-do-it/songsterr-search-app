import React from "react";
import TabListItem from "./TabListItem";
import PropTypes from "prop-types";
import styles from "./styles/TabList.module.css";

const TabList = ({ list }) => {
  const items = list.map(({ id, artist, title, tabTypes }) => (
    <TabListItem
      artist={artist.name}
      title={title}
      tabTypes={tabTypes}
      key={id}
      id={id}
    />
  ));
  return <ul className={styles.list}>{items}</ul>;
};
export default TabList;

TabList.props = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};
