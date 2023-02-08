import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { addDogToDb } from "../src/fetch/add-dog";
import { API_CONFIG } from "../src/fetch/config";
import { deleteDogFromDb } from "../src/fetch/delete-dog-from-db";
import { updateFavoriteForDog } from "../src/fetch/update-favorite";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState("all-dogs");
  const [dogs, setDogs] = useState([]);
  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);
  const [favoriteDogCount, setFavoriteDogCount] = useState(favorited.length);
  const [unfavoriteDogCount, setUnfavoriteDogCount] = useState(
    unfavorited.length
  );
  const refetchDogs = () => {
    fetch(API_CONFIG.baseUrl)
      .then((response) => response.json())
      .then(setDogs);
  };

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    }).then(() => {
      refetchDogs();
    });
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId).then(() => refetchDogs());
  };

  const unfavoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: false }).then(() => {
      refetchDogs();
    });
  };

  useEffect(() => {
    setUnfavoriteDogCount(unfavorited.length);
  }, [unfavorited]);
  useEffect(() => {
    setFavoriteDogCount(favorited.length);
  }, [favorited]);

  const favoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: true }).then(() => refetchDogs());
  };

  let filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("favorite-dogs");
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("unfavorite-dogs");
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("create-dog-form");
  };

  useEffect(() => {
    refetchDogs();
  }, []);
  return (
    <AppContext.Provider
      value={{
        onClickCreateDog,
        onClickFavorited,
        onClickUnfavorited,
        filteredDogs,
        favoriteDog,
        addDog,
        deleteDog,
        unfavoriteDog,
        showComponent,
        dogs,
        favoriteDogCount,
        unfavoriteDogCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useDogs = () => {
  return useContext(AppContext);
};
