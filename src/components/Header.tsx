import logo from "../assets/logo.svg";
import lightIcon from "../assets/light_icon.svg";
import "./header.scss"
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