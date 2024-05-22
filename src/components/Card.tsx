import { FC } from "react";
import "./card.scss";
import { CardType } from "./Galery";
import arrowIcon from "../assets/arrow_icon.svg";

const Card: FC<CardType> = (props) => {
  return (
    <li className="productCard">
      <div className="imageWrapper">
        <img
          className="imageCard"
          src={"https://test-front.framework.team" + props.imageUrl}
        />
      </div>
      <div className="cardInfoWrapper">
        <div className="imageInfo">{props.name}</div>
        <button className="arrowButton">
          <img src={arrowIcon}></img>
        </button>
      </div>
    </li>
  );
};

export default Card;
