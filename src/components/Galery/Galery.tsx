import GaleryScss from "./Galery.module.scss";
import Card from "./Card/Card";
import { useState } from "react";
import Header from "../Header/Header";
import filterIcon from "../../assets/svg/filter_icon.svg";
import searchIcon from "../../assets/svg/search_icon.svg";
import smallCloseIcon from "../../assets/svg/small_close_icon.svg";
import FilterOverlay from "../FilterOverlay/FilterOverlay";
import { galleryAPI } from "../../services/GalleryService";
import Pagination from "../Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setFilterParam, setPage } from "../../store/reducers/gallerySlice";
import { setDisplayOverlay } from "../../store/reducers/filterOverlaySlice";

let count = 0;

const Galery = () => {
  count++;
  console.log("RENDER", count)
  const fetchParams = useAppSelector((state) => state.galleryReducer);
  const filterOverlayParams = useAppSelector(
    (state) => state.filterOverlayReducer
  );
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState("");
  const {
    data: cards,
    error,
    isFetching,
  } = galleryAPI.useFetchPaintingsQuery({
    page: fetchParams.page,
    limit: fetchParams.limit,
    filterParam: searchInput,
    authorIdFilter: filterOverlayParams.filterByAuthorQuery,
    locationIdFilter: filterOverlayParams.filterByLocationQuery,
  });

  const hadnleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    dispatch(setFilterParam(e.target.value))
    dispatch(setPage(1));
    console.log(e.target.value);
  };

  const handleToggleFilterOverlay = () => {
    dispatch(setDisplayOverlay());
  };

  // useEffect(() => {
  //   dispatch(fetchPaintings());
  // }, [currentPage]);

  return (
    <div style={{ backgroundColor: "#121212" }}>
      <div id={GaleryScss.galleryWrapper}>
        <Header />
        {<FilterOverlay/>}

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
          {!isFetching && (
            <Pagination
              currentPage={fetchParams.page}
              paginationLinks={cards?.paginationLastPageLink}
              isFetching={isFetching}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Galery;
