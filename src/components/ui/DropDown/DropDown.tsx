import DropwDownScss from "./DropDown.module.scss";

interface IDropDown {
  name: string;
  onClick: () => void;
  iconComponent?: React.ReactNode;
}

export const DropDown = ({ name, onClick, iconComponent }: IDropDown) => {
  return (
    <div className={DropwDownScss.dropDown} onClick={onClick}>
      <p className={DropwDownScss.filterName}>{name}</p>
      <button className={DropwDownScss.closeFiltersButton}>{iconComponent}</button>
    </div>
  );
};
