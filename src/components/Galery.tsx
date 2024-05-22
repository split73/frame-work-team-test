import "./galery.scss";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import filterIcon from "../assets/filter_icon.svg";
import searchIcon from "../assets/search_icon.svg";
import smallCloseIcon from "../assets/small_close_icon.svg";
export type CardType = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};

const Galery = () => {
  const [cardData, setCardData] = useState<CardType[]>([
    {
      authorId: 4,
      created: "1889",
      id: 7,
      imageUrl: "/images/Summer_night_Inger_on_the_beach.jpg",
      locationId: 7,
      name: "The",
    },
    {
      authorId: 4,
      created: "1916",
      id: 8,
      imageUrl: "/images/The_sun.jpeg",
      locationId: 8,
      name: "The sun",
    },
    {
      authorId: 6,
      created: "1890",
      id: 9,
      imageUrl: "/images/Field_with_poppies.jpeg",
      locationId: 9,
      name: "Field with poppies",
    },
    {
      authorId: 7,
      created: "1483",
      id: 10,
      imageUrl: "/images/The_Story_of_Nastagio_Degli_Onesti_IV.jpeg",
      locationId: 10,
      name: "The Story of Nastagio Degli Onesti, part four",
    },
    {
      authorId: 5,
      created: "1665",
      id: 11,
      imageUrl: "/images/TheJewishBride.jpg",
      locationId: 5,
      name: "The Jewish Bride",
    },
    {
      authorId: 5,
      created: "1613",
      id: 12,
      imageUrl: "/images/The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg",
      locationId: 11,
      name: "The Anatomy Lesson of Dr. Nicolaes Tulp",
    },
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(5);
  const [imagesPerPage, setImagesPerPage] = useState<number>(1);
  const [pagination, setPagination] = useState<JSX.Element[]>([]);
  const BaseUrl = "https://test-front.framework.team";

  const handleChangePage = (page: number) => {
    console.log(page);
  };

  useEffect(() => {
    // axios.get(`${BaseUrl}/paintings?_page=1&_limit=6`).then((res) => {
    //   console.log(res.headers.link);
    //   setCardData(res.data);
    // });

    function paginate() {
      if (lastPage <= 5) {
        for (let i = 1; i <= lastPage; i++) {
          if (i === currentPage) {
            setPagination((prevState) => [
              ...prevState,
              <li
                className="page-item active"
                onClick={() => handleChangePage(i)}
              >
                {i}
              </li>,
            ]);
          } else {
            setPagination((prevState) => [
              ...prevState,
              <li className="page-item" onClick={() => handleChangePage(i)}>
                {i}
              </li>,
            ]);
          }
        }
      }
    }

    paginate();
  }, []);

  return (
    <div>
      <Header />
      <div id="galleryWrapper">
        <label id="searchBar">
          <img id="searchIcon" src={searchIcon}></img>
          <input placeholder="Placeholder"></input>
          <img id="smallCloseIcon" src={smallCloseIcon}></img>
        </label>
        <button id="filterButton">
          <img src={filterIcon}></img>
        </button>

        <main>
          <ul id="cardsWrapper">
            {cardData && cardData.map((el) => <Card {...el} />)}
          </ul>
        </main>
        <div id="paginationWrapper">
          <ul>{pagination}</ul>
        </div>
      </div>
    </div>
  );
};

export default Galery;
