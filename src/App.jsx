import { BrowserRouter } from "react-router-dom";
import BaseNavigator from "./baseNavigator/baseNavigtor";

function App() {
  return (
    <>
      <BrowserRouter>
        <BaseNavigator />
      </BrowserRouter>
    </>
  );
}

export default App;
