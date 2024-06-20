import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setFilterByYear } from "../../../store/reducers/filterOverlaySlice";
import { useState } from "react";
import { IYears } from "../../../models/IYears";
import { DefaultMinusIcon } from "../../SvgIcons/DefaultMinusIcon";

export const FilterByYears = () => {
  const primaryGrayColor = useAppSelector(
    (state) => state.appReducer.primaryGray
  );
  const dispatch = useAppDispatch();
  const filterOverlayData = useAppSelector(
    (state) => state.filterOverlayReducer
  );

  const [inputsFIlterByYears, setInputsFIlterByYears] = useState<IYears>({
    greaterThen: filterOverlayData.filterByYears.greaterThen,
    lessThen: filterOverlayData.filterByYears.lessThen,
  });

  const hadnleSetFilterByYearInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateToChange: "greaterThen" | "lessThen"
  ) => {
    console.log(inputsFIlterByYears);
    setInputsFIlterByYears({
      ...inputsFIlterByYears,
      [stateToChange]: e.target.value,
    });
    console.log(e.target.value);
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
  return (
    <div>
      <p>YEARS</p>
      <input
        value={inputsFIlterByYears.greaterThen}
        onChange={(e) => hadnleSetFilterByYearInput(e, "greaterThen")}
        onBlur={(e) => handleRedactInput(e, "greaterThen")}
      ></input>
      <DefaultMinusIcon fill={primaryGrayColor} />
      <input
        value={inputsFIlterByYears.lessThen}
        onChange={(e) => hadnleSetFilterByYearInput(e, "lessThen")}
        onBlur={(e) => handleRedactInput(e, "lessThen")}
      ></input>
    </div>
  );
};
