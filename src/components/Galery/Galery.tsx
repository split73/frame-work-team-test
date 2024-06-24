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
import { filterServiceAPI } from "../../services/FilterService";

const Galery = () => {
  const primaryGray = useAppSelector((state) => state.appReducer.primaryGray);
  const fetchParams = useAppSelector((state) => state.galleryReducer);
  const { data: authors } = filterServiceAPI.useFetchAuthorsQuery();
  const { data: locations } = filterServiceAPI.useFetchLocationsQuery();
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

  const handleGetAuthorById = (id: number) => {
    if (!authors) {
      return "err";
    }
    return authors[authors.findIndex((obj) => obj.id === id)].name;
  };

  const handleGetLocationById = (id: number) => {
    if (!locations) {
      return "err";
    }

    return locations[locations.findIndex((obj) => obj.id === id)].location;
  };

  const handleClearInput = () => {
    setSearchInput("");
    dispatch(setFilterByNameParam(""));
  };

  return (
    <div id={GaleryScss.galleryWrapper}>
      <Header />
      <FilterOverlay />

      <label id={GaleryScss.searchBar}>
        <SearchIcon fill={primaryGray} id={GaleryScss.searchIcon} />
        <input
          placeholder="Painting title"
          onChange={(e) => hadnleSearchInput(e)}
          value={searchInput}
        ></input>
        {searchInput && (
          <button id={GaleryScss.clearInput} onClick={handleClearInput}>
            <SmallCloseIcon fill={primaryGray} id={GaleryScss.smallCloseIcon} />
          </button>
        )}
      </label>
      <button id={GaleryScss.filterButton} onClick={handleToggleFilterOverlay}>
        <FilterIcon fill={primaryGray} />
      </button>

      <main>
        {error && <h1 className={GaleryScss.errorMessage}>error</h1>}
        {isFetching && <h1 className={GaleryScss.fetchingMessage}>loading</h1>}
        <ul id={GaleryScss.cardsWrapper}>
          {!isFetching &&
            cards &&
            cards.data.map((cardData) => (
              <Card
                key={cardData.id}
                cardData={cardData}
                author={handleGetAuthorById(cardData.authorId)}
                location={handleGetLocationById(cardData.locationId)}
              />
            ))}
        </ul>
        {!isFetching && !cards?.data.length && (
          <div id={GaleryScss.noResultsMessage}>
            <h1>
              No matches for <span>{searchInput}</span>
            </h1>
            <p>Please try again with different spelling or keywords.</p>
          </div>
        )}
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
