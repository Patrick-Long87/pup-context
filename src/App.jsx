import { AppProvider } from "../providers/app.context";
import "./App.css";
import { DogsList } from "./DogsList";

import "./fonts/RubikBubbles-Regular.ttf";

function App() {
  return (
    <AppProvider>
      <DogsList />
    </AppProvider>
  );
}

export default App;
