import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setFilterByYear } from "../../../store/reducers/filterOverlaySlice";
import { useState } from "react";
import { IYears } from "../../../models/IYears";
import { DefaultMinusIcon } from "../../SvgIcons/DefaultMinusIcon";
import FilterByYearsScss from "./FilterByYears.module.scss";
import TextInput from "../../ui/TextInput/TextInput";
import { DropDown } from "../../ui/DropDown/DropDown";
import { DefaultPlusIcon } from "../../SvgIcons/DefaultPlusIcon";

interface IFilterByYears {
  primaryGrayColor: string;
  minusIconColor: string;
}

export const FilterByYears = ({ primaryGrayColor, minusIconColor }: IFilterByYears) => {
  const dispatch = useAppDispatch();
  const filterOverlayData = useAppSelector(
    (state) => state.filterOverlayReducer
  );
  const [displayFilterInput, setDisplayFilterInput] = useState(false);
  const [inputsFIlterByYears, setInputsFIlterByYears] = useState<IYears>({
    greaterThen: filterOverlayData.filterByYears.greaterThen,
    lessThen: filterOverlayData.filterByYears.lessThen,
  });

  const hadnleSetFilterByYearInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateToChange: "greaterThen" | "lessThen"
  ) => {
    setInputsFIlterByYears({
      ...inputsFIlterByYears,
      [stateToChange]: e.target.value,
    });
    dispatch(
      setFilterByYear({
        ...inputsFIlterByYears,
        [stateToChange]: e.target.value,
      })
    );
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
      setInputsFIlterByYears({
        ...inputsFIlterByYears,
        [inputProperty]: tmpEventValue,
      });
      dispatch(
        setFilterByYear({
          ...inputsFIlterByYears,
          [inputProperty]: tmpEventValue,
        })
      );
    }
  };

  const handleToggleFilterInput = () => {
    setDisplayFilterInput(!displayFilterInput);
  };
  return (
    <div>
      <DropDown
        name="YEARS"
        iconComponent={
          !displayFilterInput ? (
            <DefaultPlusIcon fill={primaryGrayColor} />
          ) : (
            <DefaultMinusIcon fill={primaryGrayColor} />
          )
        }
        onClick={handleToggleFilterInput}
      />
      {displayFilterInput && (
        <div className={FilterByYearsScss.yearsInputs}>
          <TextInput
            value={inputsFIlterByYears.greaterThen}
            onChange={(e) => hadnleSetFilterByYearInput(e, "greaterThen")}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleRedactInput(e, "greaterThen")
            }
            placeholder="From"
            width="66px"
            type="number"
          />
          <DefaultMinusIcon fill={minusIconColor} margin="8px" />
          <TextInput
            value={inputsFIlterByYears.lessThen}
            onChange={(e) => hadnleSetFilterByYearInput(e, "lessThen")}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleRedactInput(e, "lessThen")
            }
            placeholder="  To"
            width="66px"
            type="number"
          />
        </div>
      )}
    </div>
  );
};
