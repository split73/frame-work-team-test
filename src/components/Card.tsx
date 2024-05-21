import { FC } from "react";
import "./card.scss";
import { CardType } from "./Galery";

const Card:FC<CardType> = (props) => {
  return (
    <div className="wrapper">
      <img src={props.imageUrl} />
      <div className="imageInfo">{props.name}qweqw</div>
    </div>
  );
};

export default Card;
