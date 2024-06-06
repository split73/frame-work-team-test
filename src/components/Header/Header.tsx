import logo from "../../assets/svg/logo.svg";
import lightIcon from "../../assets/svg/light_icon.svg";
import "./Header.scss";
const Header = () => {
  return (
    <header>
      <img id="logo" src={logo}></img>
      <button id="lightIcon">
        <img src={lightIcon}></img>
      </button>
    </header>
  );
};

export default Header;
