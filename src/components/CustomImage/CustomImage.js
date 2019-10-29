import React, { useState } from "react";
import classes from "./CustomImage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchPlus,
  faSpinner,
  faHeart
} from "@fortawesome/free-solid-svg-icons";

const CustomImage = props => {
  const [isLoading, setIsLoading] = useState(false);

  const loadFullImage = () => {
    setIsLoading(true);
    props.onClickEnlarge();
  };

  const favoriteIconClass = props.isFavorite
    ? classes.FavoriteIconActive
    : classes.FavoriteIcon;

  return (
    <div className={classes.Container} onMouseEnter={props.onMouseEnter}>
      <div className={classes.ImageOverlay}>
        <div className={classes.EnlargeIcon} onClick={loadFullImage}>
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin size="lg" />
          ) : (
            <FontAwesomeIcon icon={faSearchPlus} size="lg" />
          )}
        </div>
        <div className={favoriteIconClass} onClick={props.onClickFavorite}>
          <FontAwesomeIcon icon={faHeart} size="xs" />
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

export default CustomImage;
