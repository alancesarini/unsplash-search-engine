import React from "react";
import CustomImage from "../CustomImage/CustomImage";
import classes from "./SearchResults.module.css";
import Fade from "react-reveal/Fade";

const SearchResults = props => {
  return (
    <Fade>
      <div className={classes.Container}>
        <div className={classes.Results}>
          {props.images.map((item, i) => (
            <CustomImage
              key={item.urls.small}
              small={item.urls.small}
              alt={item.alt_description}
              full={item.urls.full}
              isFavorite={item.favorite}
              onClickEnlarge={() => props.onClickEnlarge(item.urls.full)}
              onClickFavorite={() => props.onClickFavorite(item.id)}
            />
          ))}
        </div>
      </div>
    </Fade>
  );
};

export default SearchResults;
