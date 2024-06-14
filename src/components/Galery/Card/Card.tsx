import { FC } from "react";
import CardScss from "./Card.module.scss";
import arrowIcon from "../../../assets/svg/arrow_icon.svg";
import { ICardData } from "../../../models/ICard";

interface CardProps {
  cardData: ICardData;
}
let count = 0;

const Card: FC<CardProps> = ({ cardData }) => {
  count++;
  console.log(count, cardData.name)
  return (
    <li className={CardScss.productCard}>
      <div className={CardScss.imageWrapper}>
        <img
          loading="lazy"
          className={CardScss.imageCard}
          src={"https://test-front.framework.team" + cardData.imageUrl}
        />
      </div>
      <div className={CardScss.cardInfoWrapper}>
        <div className={CardScss.imageInfo}>
          <span className={CardScss.infoText}>{cardData.name}</span>
          <span className={CardScss.infoText}>{cardData.created}</span>
        </div>
        <button className={CardScss.arrowButton}>
          <img src={arrowIcon}></img>
        </button>
      </div>
    </li>
  );
};

export default Card;
