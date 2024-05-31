import GaleryScss from "./Galery.module.scss";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import filterIcon from "../../assets/filter_icon.svg";
import searchIcon from "../../assets/search_icon.svg";
import smallCloseIcon from "../../assets/small_close_icon.svg";
import FilterOverlay from "../FilterOverlay/FilterOverlay";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPaintings } from "../../store/reducers/ActionCreators";
import { cardAPI } from "../../services/CardService";
import Pagination from "../Pagination/Pagination";

const Galery = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: cards,
    error,
    isFetching,
  } = cardAPI.useFetchPaintingsQuery({page: currentPage, limit: 6, filterParam: ""});

  const [searchInput, setSearchInput] = useState("");
  const [showFilterOverlay, setShowFilterOverlay] = useState<boolean>(false);

  const hadnleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const filteredCardData = cardData.filter((el) =>
    //   el.name.toLowerCase().includes(e.target.value.toLowerCase())
    // );
    // setCardData(filteredCardData);
    // console.log(e.target.value);
  };

  const handleToggleFilterOverlay = () => {
    setShowFilterOverlay(!showFilterOverlay);
    console.log(cards);
  };

  // useEffect(() => {
  //   dispatch(fetchPaintings());
  // }, [currentPage]);

  return (
    <div style={{ backgroundColor: "#121212" }}>
      <div id={GaleryScss.galleryWrapper}>
        <Header />
        {showFilterOverlay ? <FilterOverlay /> : null}

        <label id={GaleryScss.searchBar}>
          <img id={GaleryScss.searchIcon} src={searchIcon}></img>
          <input
            placeholder="Placeholder"
            onChange={(e) => hadnleSearchInput(e)}
          ></input>
          <img id={GaleryScss.smallCloseIcon} src={smallCloseIcon}></img>
        </label>
        <button id={GaleryScss.filterButton} onClick={handleToggleFilterOverlay}>
          <img src={filterIcon}></img>
        </button>

        <main>
          {error && <h1 style={{ color: "white" }}>error</h1>}
          {isFetching && <h1 style={{ color: "white" }}>loading</h1>}
          <ul id={GaleryScss.cardsWrapper}>
            {cards &&
              cards.data.map((cardData) => (
                <Card key={cardData.id} cardData={cardData} />
              ))}
          </ul>
        </main>
        <div id={GaleryScss.paginationWrapper}>
          {cards && (
            <Pagination
              lastPageLink={cards.paginationLastPageLink}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Galery;
