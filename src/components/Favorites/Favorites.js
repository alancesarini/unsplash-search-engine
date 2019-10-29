import React from "react";
import classes from "./Favorites.module.css";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import FavoriteImage from "../FavoriteImage/FavoriteImage";

const Favorites = props => {
  return (
    <Slide left>
      <div className={classes.Favorites}>
        <p className={classes.Title}>My favorites</p>
        <div className={classes.List}>
          {props.items.map(item => (
            <div key={item.urls.small} className={classes.Item}>
              <Fade>
                <FavoriteImage
                  small={item.urls.small}
                  alt={item.alt_description}
                  full={item.urls.full}
                  onClickEnlarge={() => props.onClickEnlarge(item.urls.full)}
                  onRemoveFavorite={() => props.onRemoveFavorite(item.id)}
                />
              </Fade>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default Favorites;
