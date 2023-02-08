import React from "react";
import { useDogs } from "../providers/app.context";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { FavDogs } from "./Components/FavDogs";
import { Section } from "./Components/Section";
import { UnfavDogs } from "./Components/UnfavDogs";

export const DogsList = () => {
  const { showComponent } = useDogs();

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section>
        {showComponent === "all-dogs" && <Dogs />}
        {showComponent === "favorite-dogs" && <FavDogs />}
        {showComponent === "unfavorite-dogs" && <UnfavDogs />}
        {showComponent === "create-dog-form" && <CreateDogForm />}
      </Section>
    </div>
  );
};
