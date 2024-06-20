import logo from "../../assets/svg/logo.svg";
import lightIcon from "../../assets/svg/light_icon.svg";
import HeaderScss from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { changeViewModeTheme } from "../../store/reducers/appSlice";

const Header = () => {
  const dipatch = useDispatch()
  const changeTheme = () => {
    dipatch(changeViewModeTheme())
  }
  return (
    <header >
      <img id={HeaderScss.logo} src={logo} ></img>
      <button id={HeaderScss.lightIcon} onClick={changeTheme}>
        <img src={lightIcon}></img>
      </button>
    </header>
  );
};

export default Header;
