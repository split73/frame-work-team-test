import GaleryScss from "./Galery.module.scss";
import Card from "../Card/Card";
import { useState } from "react";
import Header from "../Header/Header";
import filterIcon from "../../assets/filter_icon.svg";
import searchIcon from "../../assets/search_icon.svg";
import smallCloseIcon from "../../assets/small_close_icon.svg";
import FilterOverlay from "../FilterOverlay/FilterOverlay";
import { cardAPI } from "../../services/CardService";
import Pagination from "../Pagination/Pagination";

const Galery = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState("");
  const {
    data: cards,
    error,
    isFetching,
  } = cardAPI.useFetchPaintingsQuery({
    page: currentPage,
    limit: 6,
    filterParam: searchInput,
  });

  const [showFilterOverlay, setShowFilterOverlay] = useState<boolean>(true);

  const hadnleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPage(1)
    console.log(e.target.value);
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
            value={searchInput}
          ></input>
          <img id={GaleryScss.smallCloseIcon} src={smallCloseIcon}></img>
        </label>
        <button
          id={GaleryScss.filterButton}
          onClick={handleToggleFilterOverlay}
        >
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
              searchInput={searchInput}
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
