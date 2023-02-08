import { useDogs } from "../../providers/app.context";
import { DogCard } from "./DogCard";
export const UnfavDogs = () => {
  const { dogs, deleteDog, unfavoriteDog, favoriteDog } = useDogs();
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogs
        .filter((dog) => !dog.isFavorite)
        .map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => deleteDog(dog.id)}
            onHeartClick={() => unfavoriteDog(dog.id)}
            onEmptyHeartClick={() => favoriteDog(dog.id)}
          />
        ))}
    </>
  );
};
