import React from "react";
import classes from "./FavoriteImage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const FavoriteImage = props => {
  return (
    <div className={classes.Container}>
      <div className={classes.ImageOverlay}>
        <div className={classes.EnlargeIcon} onClick={props.onClickEnlarge}>
          <FontAwesomeIcon icon={faSearchPlus} size="lg" />
        </div>
        <div className={classes.RemoveIcon} onClick={props.onRemoveFavorite}>
          <FontAwesomeIcon icon={faTimes} size="xs" />
        </div>
      </div>
      <img
        className={classes.Image}
        src={props.small}
        alt={props.alt}
        title={props.alt}
      />
    </div>
  );
};

export default FavoriteImage;
