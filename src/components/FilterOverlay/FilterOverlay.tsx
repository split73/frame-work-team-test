import FilterOverlayScss from "./FilterOverlay.module.scss";
import FilterOption from "./FilterOption/FilterOption";
import { filterServiceAPI } from "../../services/FilterService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setDisplayOverlay } from "../../store/reducers/filterOverlaySlice";
import { memo } from "react";
import {
  setFilterByAuthorIdParam,
  setFilterByLoactionIdParam,
  setFilterByYearParam,
} from "../../store/reducers/gallerySlice";

import { FilterByYears } from "./FIleterByYears.tsx/FilterByYears";
import { DefaultCloseIcon } from "../SvgIcons/DefaultCloseIcon";
const FilterOverlay = () => {
  console.log("RENDER");
  const primaryGrayColor = useAppSelector(
    (state) => state.appReducer.primaryGray
  );
  const dispatch = useAppDispatch();
  const { data: authors } = filterServiceAPI.useFetchAuthorsQuery();
  const { data: locatoins } = filterServiceAPI.useFetchLocationsQuery();
  const filterOverlayData = useAppSelector(
    (state) => state.filterOverlayReducer
  );

  const hadnleToggleOverlay = () => {
    dispatch(setDisplayOverlay());
  };

  const handleApplyFilter = () => {
    dispatch(setFilterByAuthorIdParam(filterOverlayData.filterByAuthorQuery));
    dispatch(
      setFilterByLoactionIdParam(filterOverlayData.filterByLocationQuery)
    );
    dispatch(setFilterByYearParam(filterOverlayData.filterByYearsQuery));
  };

  const classHidden = !filterOverlayData.displayOverlay
    ? FilterOverlayScss.overlayHidden
    : "";

  return (
    <div id={FilterOverlayScss.overlayWrapper} className={`${classHidden}`}>
      <button
        className={FilterOverlayScss.closeFiltersButton}
        onClick={hadnleToggleOverlay}
      >

        <DefaultCloseIcon fill={primaryGrayColor} />
      </button>
      <div id={FilterOverlayScss.dropDownFIltersWrapper}>
        <div className={FilterOverlayScss.dropDown}>
          <FilterOption
            name="ARTIST"
            filterOptionAuthor={authors}
            filterInput={filterOverlayData.filterByAuthor.name}
            primaryGrayColor={primaryGrayColor}
          />
        </div>
        <div className={FilterOverlayScss.dropDown}>
          <FilterOption
            name="LOCATION"
            filterOptionLocation={locatoins}
            filterInput={filterOverlayData.filterByLocation.location}
            primaryGrayColor={primaryGrayColor}
          />
        </div>
        <div className={FilterOverlayScss.dropDown}>
          <FilterByYears />
        </div>
        <button onClick={handleApplyFilter}>APPLY FILTER</button>
      </div>
    </div>
  );
};

export default memo(FilterOverlay);
