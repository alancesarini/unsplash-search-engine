import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Navigation.module.css";

const Navigation = props => {
  let prevPage = "";

  if (props.page > 1) {
    prevPage = (
      <button onClick={props.onPrev} className={classes.NavButton}>
        <FontAwesomeIcon icon={faArrowCircleLeft} size="lg" />
      </button>
    );
  }

  return (
    <div>
      {prevPage}
      <span className={classes.NavText}>{props.page}</span>
      <button onClick={props.onNext} className={classes.NavButton}>
        <FontAwesomeIcon icon={faArrowCircleRight} size="lg" />
      </button>
    </div>
  );
};

export default Navigation;
