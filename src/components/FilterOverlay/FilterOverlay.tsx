import FilterOverlayScss from "./FilterOverlay.module.scss";
import defaultCloseIcon from "../../assets/default_close_icon.svg";
import defaultPlusIcon from "../../assets/default_plus_icon.svg";
const FilterOverlay = () => {
  return (
    <div id={FilterOverlayScss.overlayWrapper}>
      <button className={FilterOverlayScss.closeFiltersButton}>
        <img src={defaultCloseIcon}></img>
      </button>
      <div>
        <div>
          <p>ARTIST</p>
          <button className={FilterOverlayScss.closeFiltersButton}>
            <img src={defaultPlusIcon}></img>
          </button>
        </div>
        <div>
          <p>ARTIST</p>
          <button className={FilterOverlayScss.closeFiltersButton}>
            <img src={defaultPlusIcon}></img>
          </button>
        </div>
        <div>
          <p>ARTIST</p>
          <button className={FilterOverlayScss.closeFiltersButton}>
            <img src={defaultPlusIcon}></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOverlay;
