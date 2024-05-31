import { FC } from "react";
import CardScss from "./Card.module.scss";
import arrowIcon from "../../assets/arrow_icon.svg";
import { ICardData } from "../../models/ICard";

interface CardProps {
  cardData: ICardData;
}

const Card: FC<CardProps> = ({ cardData }) => {
  return (
    <li className={CardScss.productCard}>
      <div className={CardScss.imageWrapper}>
        <img
          className={CardScss.imageCard}
          src={"https://test-front.framework.team" + cardData.imageUrl}
        />
      </div>
      <div className={CardScss.cardInfoWrapper}>
        <div className={CardScss.imageInfo}>{cardData.name}</div>
        <button className={CardScss.arrowButton}>
          <img src={arrowIcon}></img>
        </button>
      </div>
    </li>
  );
};

export default Card;
