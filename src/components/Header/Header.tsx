import logo from "../../assets/svg/logo.svg";
import lightIcon from "../../assets/svg/light_icon.svg";
import HeaderScss from "./Header.module.scss";

const Header = () => {
  return (
    <header >
      <img id={HeaderScss.logo} src={logo} ></img>
      <button id={HeaderScss.lightIcon}>
        <img src={lightIcon}></img>
      </button>
    </header>
  );
};

export default Header;
