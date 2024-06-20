import GaleryScss from "./Galery.module.scss";
import Card from "./Card/Card";
import { useState } from "react";
import Header from "../Header/Header";
import FilterOverlay from "../FilterOverlay/FilterOverlay";
import { galleryAPI } from "../../services/GalleryService";
import Pagination from "../Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setFilterByNameParam,
  setPage,
} from "../../store/reducers/gallerySlice";
import { setDisplayOverlay } from "../../store/reducers/filterOverlaySlice";
import { FilterIcon } from "../SvgIcons/FilterIcon";
import { SearchIcon } from "../SvgIcons/SearchIcon";
import { SmallCloseIcon } from "../SvgIcons/SmallCloseIcon";

const Galery = () => {
  const primaryGray = useAppSelector((state) => state.appReducer.primaryGray);
  const fetchParams = useAppSelector((state) => state.galleryReducer);
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState("");
  const {
    data: cards,
    error,
    isFetching,
  } = galleryAPI.useFetchPaintingsQuery({
    page: fetchParams.page,
    limit: fetchParams.limit,
    filterByName: searchInput,
    filterByAuthorId: fetchParams.filterByAuthorId,
    filterByLocationId: fetchParams.filterByLocationId,
    filterByYearLessThen: fetchParams.filterByYear.greaterThen,
    filterByYearGreaterThen: fetchParams.filterByYear.lessThen,
  });

  const hadnleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    dispatch(setFilterByNameParam(e.target.value));
    dispatch(setPage(1));
  };

  const handleToggleFilterOverlay = () => {
    dispatch(setDisplayOverlay());
  };

  return (
    <div id={GaleryScss.galleryWrapper}>
      <Header />
      <FilterOverlay />

      <label id={GaleryScss.searchBar}>
        <SearchIcon fill={primaryGray} id={GaleryScss.searchIcon} />
        <input
          placeholder="Placeholder"
          onChange={(e) => hadnleSearchInput(e)}
          value={searchInput}
        ></input>
        {searchInput && (
          <SmallCloseIcon fill={primaryGray} id={GaleryScss.smallCloseIcon} />
        )}
      </label>
      <button id={GaleryScss.filterButton} onClick={handleToggleFilterOverlay}>
        <FilterIcon fill={primaryGray} />
      </button>

      <main>
        {error && <h1 style={{ color: "white" }}>error</h1>}
        {isFetching && <h1 style={{ color: "white" }}>loading</h1>}
        <ul id={GaleryScss.cardsWrapper}>
          {!isFetching &&
            cards &&
            cards.data.map((cardData) => (
              <Card key={cardData.id} cardData={cardData} />
            ))}
        </ul>
      </main>

      {!isFetching && (
        <Pagination
          currentPage={fetchParams.page}
          paginationLinks={cards?.paginationLastPageLink}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

export default Galery;
