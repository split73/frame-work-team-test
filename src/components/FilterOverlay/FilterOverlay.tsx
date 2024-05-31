import FilterOverlayScss from "./FilterOverlay.module.scss";
import defaultCloseIcon from "../../assets/default_close_icon.svg";
import defaultPlusIcon from "../../assets/default_plus_icon.svg";
import { cardAPI } from "../../services/CardService";
const FilterOverlay = () => {
  const {data: authors} = cardAPI.useFetchAuthorsQuery()

  const handleLog = () => {
    console.log("Q", authors)
  }
  return (
    <div id={FilterOverlayScss.overlayWrapper}>
      <button className={FilterOverlayScss.closeFiltersButton} onClick={handleLog}>
        <img src={defaultCloseIcon}></img>
      </button>
      <div id={FilterOverlayScss.fropDownFIltersWrapper}>
        <div className={FilterOverlayScss.dropDown}>
          <p>ARTIST</p>
          <button className={FilterOverlayScss.closeFiltersButton}>
            <img src={defaultPlusIcon}></img>
          </button>
        </div>
        <select className={FilterOverlayScss.filtersSelector}>
        {
          authors && authors.map((author) => (
            <option>{author.name}</option>
          ))
          

        }
        </select>
        <div className={FilterOverlayScss.dropDown}>
          <p>LOCATION</p>
          <button className={FilterOverlayScss.closeFiltersButton}>
            <img src={defaultPlusIcon}></img>
          </button>
          {/* <div style={{ backgroundColor: "white", width: "100%"}}></div> */}
        </div>
        <div className={FilterOverlayScss.dropDown}>
          <p>YEARS</p>
          <button className={FilterOverlayScss.closeFiltersButton}>
            <img src={defaultPlusIcon}></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOverlay;
