import Galery from "./components/Galery/Galery";
import "./assets/styles/_variables.scss";
import { useAppSelector } from "./hooks/redux";
import AppScss from "./App.module.scss";

function App() {
  let currentTheme = useAppSelector((state) => state.appReducer);
  console.log(currentTheme);

  return (
    <div
      id={AppScss.appWrapper}
      data-theme={currentTheme.viewModeTheme}

    >
      <Galery />
    </div>
  );
}

export default App;
