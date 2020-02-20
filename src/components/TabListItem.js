import React from "react";
import styles from "./styles/TabListItem.module.css";
import PropTypes from "prop-types";
import { FILTER_OPTIONS } from "../const/FilterOptions";

const TabListItem = ({ artist, title, tabTypes, id }) => {
  const tabLinks = tabTypes.reduce((links, tab, i) => {
    if (FILTER_OPTIONS[tab]) {
      const link = `https://www.songsterr.com/a/wsa/${artist}-${title}-tab-s${id}t${i}`
        .split(" ")
        .join("-");
      const item = (
        <li key={FILTER_OPTIONS[tab]}>
          <a
            href={link}
            className={styles.tabLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {FILTER_OPTIONS[tab]}
          </a>
        </li>
      );

      links = [...links, item];
    }
    return links;
  }, []);

  return (
    <li className={styles.item}>
      <div className={styles.description}>
        <p className={styles.title}>{title}</p>
        <p className={styles.artist}>{artist}</p>
      </div>

      <nav>
        <ul className={styles.tabs}>{tabLinks}</ul>
      </nav>
    </li>
  );
};

export default TabListItem;

TabListItem.props = {
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tabTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired
};
