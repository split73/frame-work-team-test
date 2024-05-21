import logo from "../assets/logo.svg";
import lightIcon from "../assets/light_icon.svg";
import "./galery.scss";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";

export type CardType = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};

const Galery = () => {
  const [cardData, setCardData] = useState<CardType[]>([]);
  const handleToggleDarkMode = () => {
    console.log("Q", cardData);
  };



  useEffect(() => {
    axios.get('https://test-front.framework.team/paintings?_limit=6')
      .then((res) => {
        console.log(res)
        setCardData(res.data);
      })
  }, [])

  return (
    <div>
      <header>
        <img id="logo" src={logo}></img>{" "}
        <button id="lightIcon">
          <img src={lightIcon} onClick={handleToggleDarkMode}></img>
        </button>
      </header>
      <ul id="cardWrapper">
        {cardData && cardData.map((el) => (
          <li><Card {...el}/></li>
        ))}
      </ul>
    </div>
  );
};

export default Galery;

