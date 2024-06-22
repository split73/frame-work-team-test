import FilterOptionScss from "./FilterOption.module.scss";
import { IAuthor } from "../../../models/IAuthor";
import { ILocation } from "../../../models/ILocation";
import { FC, memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setFilterByAuthor,
  setFilterByLocation,
} from "../../../store/reducers/filterOverlaySlice";
import { DefaultPlusIcon } from "../../SvgIcons/DefaultPlusIcon";
import { ExpandIcon } from "../../SvgIcons/ExpandIcon";
import TextInput from "../../ui/TextInput/TextInput";
import { DropDown } from "../../ui/DropDown/DropDown";
import { DefaultMinusIcon } from "../../SvgIcons/DefaultMinusIcon";

interface FilterOptionProps {
  filterOptionAuthor?: IAuthor[] | undefined;
  filterOptionLocation?: ILocation[] | undefined;
  name: string;
  filterInput: string;
  primaryGrayColor: string;
}

const FilterOption: FC<FilterOptionProps> = (props) => {
  const expadnIconColor = useAppSelector(
    (state) => state.appReducer.primaryGray
  );
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

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase());
  };

  return (
    <div>
      <DropDown
        name={props.name}
        onClick={handleToggleFilterInput}
        iconComponent={
          !displayFilterInput ? (
            <DefaultPlusIcon fill={props.primaryGrayColor} />
          ) : (
            <DefaultMinusIcon fill={props.primaryGrayColor} />
          )
        }
      />
      {displayFilterInput &&
        props.name === "ARTIST" &&
        props.filterOptionAuthor && (
          <div className={FilterOptionScss.selectOptionsWrapper}>
            <TextInput
              iconComponent={
                <ExpandIcon
                  fill={expadnIconColor}
                  className={displayDropdown ? FilterOptionScss.expandIcon : ""}
                />
              }
              onBlur={handleDisplayDropdown}
              onChange={(e) => handleInputValue(e)}
              onFocus={handleDisplayDropdown}
              placeholder="select the artist"
              value={inputValue}
            />

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
            <TextInput
              iconComponent={
                <ExpandIcon
                  fill={expadnIconColor}
                  className={displayDropdown ? FilterOptionScss.expandIcon : ""}
                />
              }
              onBlur={handleDisplayDropdown}
              onChange={(e) => handleInputValue(e)}
              onFocus={handleDisplayDropdown}
              placeholder="select the location"
              value={inputValue}

            />

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
