import React from "react";
import classes from "./RecentSearches.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";

const RecentSearches = props => {
  return (
    <Slide left>
      <div className={classes.RecentSearches}>
        <p className={classes.Title}>Recent searches</p>
        <ul className={classes.List}>
          {props.items.map(item => (
            <Fade key={item}>
              <li className={classes.Item}>
                <button
                  className={classes.RemoveItem}
                  onClick={() => props.onRemoveClick(item)}
                >
                  <FontAwesomeIcon icon={faTimes} size="xs" />
                </button>
                <button
                  className={classes.ReuseItem}
                  onClick={() => props.onRecentClick(item)}
                >
                  {item}
                </button>
              </li>
            </Fade>
          ))}
        </ul>
      </div>
    </Slide>
  );
};

export default RecentSearches;
