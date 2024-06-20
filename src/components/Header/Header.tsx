import lightIcon from "../../assets/svg/light_icon.svg";
import darkIcon from "../../assets/svg/dark_icon.svg";
import HeaderScss from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { changeViewModeTheme } from "../../store/reducers/appSlice";
import { useAppSelector } from "../../hooks/redux";
import { Logo } from "../SvgIcons/Logo";

const Header = () => {
  const appTheme = useAppSelector((state) => state.appReducer);
  const dipatch = useDispatch();
  const changeTheme = () => {
    dipatch(changeViewModeTheme());
  };
  return (
    <header>
      <Logo id={HeaderScss.logo} fill={appTheme.primaryGray} />
      <button id={HeaderScss.lightIcon} onClick={changeTheme}>
        {appTheme.viewModeTheme === "dark" && <img src={lightIcon}></img>}
        {appTheme.viewModeTheme === "light" && <img src={darkIcon}></img>}
      </button>
    </header>
  );
};

export default Header;
