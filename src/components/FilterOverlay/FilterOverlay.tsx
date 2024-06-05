import FilterOverlayScss from "./FilterOverlay.module.scss";
import defaultCloseIcon from "../../assets/default_close_icon.svg";
import FilterOption from "./FilterOption/FilterOption";
import { filterServiceAPI } from "../../services/FilterService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setDisplayOverlay } from "../../store/reducers/filterOverlaySlice";

const FilterOverlay = () => {
  const dispatch = useAppDispatch();
  const { data: authors } = filterServiceAPI.useFetchAuthorsQuery();
  const { data: locatoins } = filterServiceAPI.useFetchLocationsQuery();
  const filterOverlayData = useAppSelector(state => state.filterOverlayReducer)

  const hadnleToggleOverlay = () => {
    dispatch(setDisplayOverlay());
  };

  return (
    <div id={FilterOverlayScss.overlayWrapper}>
      <button
        className={FilterOverlayScss.closeFiltersButton}
        onClick={hadnleToggleOverlay}
      >
        <img src={defaultCloseIcon}></img>
      </button>
      <div id={FilterOverlayScss.dropDownFIltersWrapper}>
        <div className={FilterOverlayScss.dropDown}>
          <FilterOption name={"ARTIST"} filterOptionAuthor={authors} filterInput={filterOverlayData.filterByAuthor.name}/>
        </div>
        <div className={FilterOverlayScss.dropDown}>
          <FilterOption name={"LOCATION"} filterOptionLocation={locatoins} filterInput={filterOverlayData.filterByLocation.location}/>
        </div>
        <div className={FilterOverlayScss.dropDown}>
          <FilterOption name={"YEARS"} filterInput={""}/>
        </div>
      </div>
    </div>
  );
};

export default FilterOverlay;
