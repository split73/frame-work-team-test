import Galery from "./components/Galery/Galery";
import "./assets/styles/_variables.scss";
import { useAppSelector } from "./hooks/redux";

function App() {
  let currentTheme = useAppSelector((state) => state.appReducer);
  console.log(currentTheme);

  return (
    <div
      data-theme={currentTheme.viewModeTheme}
      style={{ backgroundColor: "black" }}
    >
      <Galery />
    </div>
  );
}

export default App;
