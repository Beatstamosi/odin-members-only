import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.js";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
