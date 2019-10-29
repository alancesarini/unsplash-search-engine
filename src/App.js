import React, { useState, useRef } from "react";
import classes from "./App.module.css";
import ImageSearch from "./components/ImageSearch/ImageSearch";
import SearchResults from "./components/SearchResults/SearchResults";
import Loader from "react-loader-spinner";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Navigation from "./components/Navigation/Navigation";
import RecentSearches from "./components/RecentSearches/RecentSearches";
import Favorites from "./components/Favorites/Favorites";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItems, setSearchItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fullImageLoaded, setFullImageLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteImages, setFavoriteImages] = useState([]);

  const searchInputEl = useRef(null);

  const accessKey =
    "0c7e4444c25a807728561dae204061f45ecc7bcd05e31ea9a0218d4fa8e6702f";

  const searchImages = async (value, page) => {
    setSearchText(value);
    setIsLoading(true);
    const response = await fetch(
      "https://api.unsplash.com/search/photos?page=" + page + "&query=" + value,
      {
        headers: new Headers({
          Authorization: "Client-ID " + accessKey
        })
      }
    );
    const unpacked = await response.json();
    setImages(unpacked.results);
    setIsLoading(false);

    const items = [...searchItems];
    const found = items.find(
      item => item.toUpperCase().trim() === value.toUpperCase().trim()
    );
    if (found === undefined) {
      items.push(value);
      setSearchItems(items);
    }
    searchInputEl.current.value = "";
  };

  const imageClickHandler = async src => {
    const response = await fetch(src);
    const imageBlob = await response.blob();
    const objectURL = URL.createObjectURL(imageBlob);
    setFullImageLoaded(objectURL);
  };

  const prevClickHandler = () => {
    let page = currentPage;
    if (page > 1) {
      page--;
    }
    setCurrentPage(page);
    searchImages(searchText, page);
  };

  const nextClickHandler = () => {
    const page = currentPage + 1;
    setCurrentPage(page);
    searchImages(searchText, page);
  };

  const recentClickHandler = item => {
    const page = 1;
    setCurrentPage(page);
    searchImages(item, page);
  };

  const removeClickHandler = item => {
    const updatedRecent = searchItems.filter(recentItem => recentItem !== item);
    setSearchItems(updatedRecent);
  };

  const addFavoriteHandler = id => {
    const updatedFavorites = [...favoriteImages];
    const favorite = images.find(image => image.id === id);
    const found = updatedFavorites.find(item => item.id === id);
    if (found === undefined) {
      updatedFavorites.push(favorite);
      setFavoriteImages(updatedFavorites);
    }
  };

  const removeFavoriteHandler = id => {
    const updatedFavorites = favoriteImages.filter(item => item.id !== id);
    setFavoriteImages(updatedFavorites);
  };

  const startSearchHandler = () => {
    const page = 1;
    setCurrentPage(page);
    searchImages(searchInputEl.current.value, page);
  };

  let searchTitle = "";
  if (searchText !== "") {
    searchTitle = <h3>Images found for "{searchText}"</h3>;
  }

  let fullImageElement = "";
  if (fullImageLoaded) {
    fullImageElement = (
      <div className={classes.OverlayContainer}>
        <div className={classes.Overlay}></div>
        <Fade>
          <div className={classes.FullImageText}>Click image to close</div>
        </Fade>
        <div className={classes.FullImageContainer}>
          <Zoom>
            <img
              src={fullImageLoaded}
              alt=""
              className={classes.FullImage}
              onClick={() => setFullImageLoaded(false)}
            />
          </Zoom>
        </div>
      </div>
    );
  }

  const imagesWithFavoriteAttribute = [...images];
  imagesWithFavoriteAttribute.forEach((item, index) => {
    const found = favoriteImages.find(fav => fav.id === item.id);
    if (found === undefined) {
      item.favorite = false;
    } else {
      item.favorite = true;
    }
    imagesWithFavoriteAttribute[index] = item;
  });

  let searchResults = (
    <SearchResults
      images={imagesWithFavoriteAttribute}
      onClickEnlarge={imageClickHandler}
      onClickFavorite={addFavoriteHandler}
    />
  );

  const navigation =
    images.length > 0 ? (
      <Navigation
        page={currentPage}
        onPrev={prevClickHandler}
        onNext={nextClickHandler}
      />
    ) : null;

  if (fullImageElement !== "") {
    searchResults = "";
  }

  return (
    <div className={classes.App}>
      {fullImageElement}
      <div className={classes.Sidebar}>
        {searchItems.length > 0 ? (
          <RecentSearches
            items={searchItems}
            onRecentClick={recentClickHandler}
            onRemoveClick={removeClickHandler}
          />
        ) : (
          ""
        )}

        {favoriteImages.length > 0 ? (
          <Favorites
            items={favoriteImages}
            onClickEnlarge={imageClickHandler}
            onRemoveFavorite={removeFavoriteHandler}
          />
        ) : (
          ""
        )}
      </div>
      <div className={classes.Content}>
        <h1 className={classes.AppTitle}>Unsplash Search Engine</h1>
        <ImageSearch onSearch={startSearchHandler} inputRef={searchInputEl} />
        {searchTitle}
        {navigation}
        {isLoading ? <Loader type="Rings" /> : searchResults}
      </div>
    </div>
  );
}

export default App;
