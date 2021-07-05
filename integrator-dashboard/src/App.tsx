import React from "react";
import Navigation from "./Components/Navigation/Navigation";
import { AlertProvider } from "./Context/AlertService";

const App: React.FC = () => {
  return (
    <AlertProvider>
      <Navigation />
    </AlertProvider>
  );
};

export default App;
