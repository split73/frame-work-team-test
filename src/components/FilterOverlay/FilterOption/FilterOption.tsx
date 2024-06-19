import FilterOptionScss from "./FilterOption.module.scss";
import defaultPlusIcon from "../../../assets/svg/default_plus_icon.svg";
import { IAuthor } from "../../../models/IAuthor";
import { ILocation } from "../../../models/ILocation";
import { FC, memo, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";

import {
  setFilterByAuthor,
  setFilterByLocation,
} from "../../../store/reducers/filterOverlaySlice";

interface FilterOptionProps {
  filterOptionAuthor?: IAuthor[] | undefined;
  filterOptionLocation?: ILocation[] | undefined;
  name: string;
  filterInput: string;
}

const FilterOption: FC<FilterOptionProps> = (props) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const [displayFilterInput, setDisplayFilterInput] = useState(false);
  const [inputValue, setInputValue] = useState(props.filterInput);

  const handleAddAuthorToFetchingFilter = (filetrParam: IAuthor) => {
    setInputValue(filetrParam.name);
    dispatch(setFilterByAuthor(filetrParam));  
  };

  const handleAddLocationToFetchingFilter = (filetrParam: ILocation) => {
    setInputValue(filetrParam.location);
    dispatch(setFilterByLocation(filetrParam));
  };

  const handleDisplayDropdown = () => {
    setDisplayDropdown(!displayDropdown);
  };

  const handleToggleFilterInput = () => {
    setDisplayFilterInput(!displayFilterInput);
  };

  return (
    <div>
      <div
        className={FilterOptionScss.dropDown}
        onClick={handleToggleFilterInput}
      >
        <p>{props.name}</p>
        <button className={FilterOptionScss.closeFiltersButton}>
          <img src={defaultPlusIcon}></img>
        </button>
      </div>
      {displayFilterInput &&
        props.name === "ARTIST" &&
        props.filterOptionAuthor && (
          <div className={FilterOptionScss.selectOptionsWrapper}>
            <input
              value={inputValue}
              className={FilterOptionScss.optionSelector}
              onFocus={handleDisplayDropdown}
              onBlur={handleDisplayDropdown}
              placeholder="Select the artist"
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            ></input>
            {displayDropdown && (
              <ul className={FilterOptionScss.dropDownOptions}>
                {props.filterOptionAuthor
                  .filter((author) =>
                    author.name.toLowerCase().includes(inputValue)
                  )
                  .map((author) => (
                    <li
                      className={FilterOptionScss.dropDownOption}
                      onMouseDown={() =>
                        handleAddAuthorToFetchingFilter({
                          id: author.id,
                          name: author.name,
                        })
                      }
                    >
                      {author.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}

      {displayFilterInput &&
        props.name === "LOCATION" &&
        props.filterOptionLocation && (
          <div className={FilterOptionScss.selectOptionsWrapper}>
            <input
              value={inputValue}
              className={FilterOptionScss.optionSelector}
              onFocus={handleDisplayDropdown}
              onBlur={handleDisplayDropdown}
              placeholder="Select the location"
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
            {displayDropdown && (
              <ul className={FilterOptionScss.dropDownOptions}>
                {props.filterOptionLocation
                  .filter((location) =>
                    location.location.toLowerCase().includes(inputValue)
                  )
                  .map((location) => (
                    <li
                      className={FilterOptionScss.dropDownOption}
                      onMouseDown={() =>
                        handleAddLocationToFetchingFilter({
                          id: location.id,
                          location: location.location,
                        })
                      }
                    >
                      {location.location}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
    </div>
  );
};

export default memo(FilterOption);
