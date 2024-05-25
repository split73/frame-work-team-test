import "./galery.scss";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import filterIcon from "../assets/filter_icon.svg";
import searchIcon from "../assets/search_icon.svg";
import smallCloseIcon from "../assets/small_close_icon.svg";
import paginationArrowIcon from "../assets/pagination_arrow_icon.svg";
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
  const [lastPage, setLastPage] = useState<number>(9);
  const [imagesPerPage, setImagesPerPage] = useState<number>(1);
  const [pagination, setPagination] = useState<JSX.Element[]>([]);
  const [searchInput, setSearchInput] = useState("" )
  const BaseUrl = "https://test-front.framework.team";
  
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeacreaseCurrentPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    }
  };

  const handleIncreaseCurrentPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };

  const hadnleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredCardData = cardData.filter((el) => (
      el.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setCardData(filteredCardData)
    console.log(e.target.value)
  }

  useEffect(() => {
    // axios.get(`${BaseUrl}/paintings?_page=1&_limit=6`).then((res) => {
    //   console.log(res.headers.link);
    //   setCardData(res.data);
    // });

    function addPageToPagination(page: number): void {
      if (page === currentPage) {
        setPagination((prevState) => [
          ...prevState,
          <li
            className="paginationButton"
            id="activePaginationButton"
            onClick={() => handleChangePage(page)}
          >
            {page}
          </li>,
        ]);
      } else {
        setPagination((prevState) => [
          ...prevState,
          <li
            className="paginationButton"
            onClick={() => handleChangePage(page)}
          >
            {page}
          </li>,
        ]);
      }
    }

    function paginate() {
      setPagination([]);
      if (lastPage <= 5) {
        for (let i = 1; i <= lastPage; i++) {
          addPageToPagination(i);
        }
      } else {
        if (currentPage < 4) {
          for (let i = 1; i <= 4; i++) {
            addPageToPagination(i);
          }
          setPagination((prevState) => [
            ...prevState,
            <li className="paginationButton excessPage">...</li>,
          ]);
          setPagination((prevState) => [
            ...prevState,
            <li
              className="paginationButton"
              onClick={() => handleChangePage(lastPage)}
            >
              {lastPage}
            </li>,
          ]);
        } else if (currentPage >= lastPage - 2) {
          setPagination((prevState) => [
            ...prevState,
            <li
              className="paginationButton"
              onClick={() => handleChangePage(1)}
            >
              {1}
            </li>,
          ]);
          setPagination((prevState) => [
            ...prevState,
            <li className="paginationButton excessPage">...</li>,
          ]);
          for (let i = lastPage - 3; i <= lastPage; i++) {
            addPageToPagination(i);
          }
        } else {
          setPagination((prevState) => [
            ...prevState,
            <li
              className="paginationButton"
              onClick={() => handleChangePage(1)}
            >
              {1}
            </li>,
          ]);
          setPagination((prevState) => [
            ...prevState,
            <li className="paginationButton excessPage">...</li>,
          ]);
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            addPageToPagination(i);
          }
          setPagination((prevState) => [
            ...prevState,
            <li className="paginationButton excessPage">...</li>,
          ]);
          setPagination((prevState) => [
            ...prevState,
            <li
              className="paginationButton"
              onClick={() => handleChangePage(lastPage)}
            >
              {lastPage}
            </li>,
          ]);
        }
      }
    }

    paginate();
  }, [currentPage]);

  return (
    <div style={{ backgroundColor: "#121212"}}>
      
      <div id="galleryWrapper" >
      <Header />
        <label id="searchBar">
          <img id="searchIcon" src={searchIcon}></img>
          <input placeholder="Placeholder" onChange={(e) => hadnleSearchInput(e)}></input>
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
          <ul id="paginationList">
            <li
              className="paginationButton"
              onClick={handleDeacreaseCurrentPage}
            >
              <img id="paginationLeftArrow" src={paginationArrowIcon}></img>
            </li>
            {pagination}
            <li
              className="paginationButton"
              onClick={handleIncreaseCurrentPage}
            >
              <img src={paginationArrowIcon} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Galery;
