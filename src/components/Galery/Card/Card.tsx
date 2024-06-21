import { FC, useState } from "react";
import CardScss from "./Card.module.scss";
import arrowIcon from "../../../assets/svg/arrow_icon.svg";
import { ICardData } from "../../../models/ICard";

interface CardProps {
  cardData: ICardData;
  author: string;
  location: string;
}
let count = 0;

const Card: FC<CardProps> = ({ cardData, author, location }) => {
  count++;
  console.log(count, cardData.name);
  const [showContent, setShownContent] = useState(true);
  return (
    <li
      className={CardScss.productCard}
      onMouseEnter={() => setShownContent(false)}
      onMouseLeave={() => setShownContent(true)}
    >
      <div className={CardScss.imageWrapper}>
        <img
          loading="lazy"
          className={CardScss.imageCard}
          src={"https://test-front.framework.team" + cardData.imageUrl}
        />
      </div>
      <div className={CardScss.cardInfoWrapper}>
        {showContent && (
          <div className={CardScss.imageInfo}>
            <span className={CardScss.infoText}>{cardData.name}</span>
            <span className={CardScss.infoText}>{cardData.created}</span>
          </div>
        )}
        {!showContent && (
          <div className={CardScss.imageInfo}>
            <span className={CardScss.infoText}>{author}</span>
            <span className={CardScss.infoText}>{location}</span>
          </div>
        )}
        {showContent && <button className={CardScss.arrowButton}>
          <img src={arrowIcon}></img>
        </button>}
      </div>
    </li>
  );
};

export default Card;
