import FilterOverlayScss from "./FilterOverlay.module.scss";
import defaultCloseIcon from "../../assets/svg/default_close_icon.svg";
import FilterOption from "./FilterOption/FilterOption";
import { filterServiceAPI } from "../../services/FilterService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setDisplayOverlay,
  setFilterByYear,
} from "../../store/reducers/filterOverlaySlice";
import { memo, useState } from "react";
import {
  setFilterByAuthorIdParam,
  setFilterByLoactionIdParam,
  setFilterByYearParam,
} from "../../store/reducers/gallerySlice";
import defaultMinusIcon from "../../assets/svg/default_minus_icon.svg";
import { IYears } from "../../models/IYears";
const FilterOverlay = () => {
  const dispatch = useAppDispatch();
  const { data: authors } = filterServiceAPI.useFetchAuthorsQuery();
  const { data: locatoins } = filterServiceAPI.useFetchLocationsQuery();
  const filterOverlayData = useAppSelector(
    (state) => state.filterOverlayReducer
  );
  const [filterByYearInput, setFilterByYearInput] = useState<IYears>({
    greaterThen: filterOverlayData.filterByYears.greaterThen,
    lessThen: filterOverlayData.filterByYears.lessThen,
  });

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

  //filterBYear must be > 999
  const hadnleSetFilterByYearInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputProperty: "greaterThen" | "lessThen"
  ) => {
    setFilterByYearInput({
      ...filterByYearInput,
      [inputProperty]: event.target.value,
    });
    dispatch(
      setFilterByYear({
        ...filterByYearInput,
        [inputProperty]: event.target.value,
      })
    );
    console.log(filterByYearInput);
  };

  const handleRedactInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputProperty: "greaterThen" | "lessThen"
  ) => {
    let tmpEventValue = event.target.value;
    if (tmpEventValue.length < 4 && tmpEventValue.length !== 0) {
      while (tmpEventValue.length < 4) {
        tmpEventValue += "0";
      }
      setFilterByYearInput({
        ...filterByYearInput,
        [inputProperty]: tmpEventValue,
      });
      dispatch(
        setFilterByYear({
          ...filterByYearInput,
          [inputProperty]: tmpEventValue,
        })
      );
    }
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
        <img src={defaultCloseIcon}></img>
      </button>
      <div id={FilterOverlayScss.dropDownFIltersWrapper}>
        <div className={FilterOverlayScss.dropDown}>
          <FilterOption
            name={"ARTIST"}
            filterOptionAuthor={authors}
            filterInput={filterOverlayData.filterByAuthor.name}
          />
        </div>
        <div className={FilterOverlayScss.dropDown}>
          <FilterOption
            name={"LOCATION"}
            filterOptionLocation={locatoins}
            filterInput={filterOverlayData.filterByLocation.location}
          />
        </div>
        <div className={FilterOverlayScss.dropDown}>
          <div>
            <p>YEARS</p>
            <input
              value={filterByYearInput.greaterThen}
              onChange={(e) => hadnleSetFilterByYearInput(e, "greaterThen")}
              onBlur={(e) => handleRedactInput(e, "greaterThen")}
            ></input>
            <img src={defaultMinusIcon}></img>
            <input
              value={filterByYearInput.lessThen}
              onChange={(e) => hadnleSetFilterByYearInput(e, "lessThen")}
              onBlur={(e) => handleRedactInput(e, "lessThen")}
            ></input>
          </div>
        </div>
        <button onClick={handleApplyFilter}>APPLY FILTER</button>
      </div>
    </div>
  );
};

export default memo(FilterOverlay);
