import { useEffect, useRef, useState } from "react";
import paginationArrowIcon from "../../assets/pagination_arrow_icon.svg";
import GaleryScss from "../Galery/Galery.module.scss";
type Props = {
  lastPageLink: string | null | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ lastPageLink, currentPage, setCurrentPage }: Props) => {
  const indexLastPageSubstring = lastPageLink.indexOf('rel="last"');
  const [lastPage, setLastPage] = useState<number>(
    parsePaginationLinks(lastPageLink, indexLastPageSubstring)
  );
  const [pagination, setPagination] = useState<JSX.Element[]>([]);
  const isFirstRender = useRef(true);

  function isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }
  function parsePaginationLinks(
    linkString: string | null | undefined,
    characterIndex: number | undefined
  ): number {
    if (characterIndex === -1 || !linkString) {
      return 0;
    }

    let result = "";
    let iterator = linkString.lastIndexOf("_page=", characterIndex) + 6;

    for (iterator; isNumeric(linkString[iterator]); iterator++) {
      result += linkString[iterator];
    }

    return Number(result);
  }

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeacreaseCurrentPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    }
  };

  const handleIncreaseCurrentPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }

    function addPageToPagination(page: number): void {
      if (page === currentPage) {
        setPagination((prevState) => [
          ...prevState,
          <li
            className={GaleryScss.paginationButton}
            id={GaleryScss.activePaginationButton}
            onClick={() => handleChangePage(page)}
          >
            {page}
          </li>,
        ]);
      } else {
        setPagination((prevState) => [
          ...prevState,
          <li
            className={GaleryScss.paginationButton}
            onClick={() => handleChangePage(page)}
          >
            {page}
          </li>,
        ]);
      }
    }

    setPagination([]);
    if (lastPage <= 5) {
      for (let i = 1; i <= lastPage; i++) {
        addPageToPagination(i);
      }
    } else {
      if (currentPage < 4) {
        for (let i = 1; i <= 4; i++) {
          addPageToPagination(i);
        }
        setPagination((prevState) => [
          ...prevState,
          <li
            className={`${GaleryScss.paginationButton} ${GaleryScss.excessPage}`}
          >
            ...
          </li>,
        ]);
        setPagination((prevState) => [
          ...prevState,
          <li
            className={GaleryScss.paginationButton}
            onClick={() => handleChangePage(lastPage)}
          >
            {lastPage}
          </li>,
        ]);
      } else if (currentPage >= lastPage - 2) {
        setPagination((prevState) => [
          ...prevState,
          <li
            className={GaleryScss.paginationButton}
            onClick={() => handleChangePage(1)}
          >
            {1}
          </li>,
        ]);
        setPagination((prevState) => [
          ...prevState,
          <li
            className={`${GaleryScss.paginationButton} ${GaleryScss.excessPage}`}
          >
            ...
          </li>,
        ]);
        for (let i = lastPage - 3; i <= lastPage; i++) {
          addPageToPagination(i);
        }
      } else {
        setPagination((prevState) => [
          ...prevState,
          <li
            className={GaleryScss.paginationButton}
            onClick={() => handleChangePage(1)}
          >
            {1}
          </li>,
        ]);
        setPagination((prevState) => [
          ...prevState,
          <li
            className={`${GaleryScss.paginationButton} ${GaleryScss.excessPage}`}
          >
            ...
          </li>,
        ]);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          addPageToPagination(i);
        }
        setPagination((prevState) => [
          ...prevState,
          <li
            className={`${GaleryScss.paginationButton} ${GaleryScss.excessPage}`}
          >
            ...
          </li>,
        ]);
        setPagination((prevState) => [
          ...prevState,
          <li
            className={GaleryScss.paginationButton}
            onClick={() => handleChangePage(lastPage)}
          >
            {lastPage}
          </li>,
        ]);
      }
    }
  }, [currentPage]);
  return (
    <div style={{ color: "white" }}>
      <ul id={GaleryScss.paginationList}>
        <li className={GaleryScss.paginationButton} onClick={handleDeacreaseCurrentPage}>
          <img id={GaleryScss.paginationLeftArrow} src={paginationArrowIcon}></img>
        </li>
        {pagination}
        <li className={GaleryScss.paginationButton} onClick={handleIncreaseCurrentPage}>
          <img src={paginationArrowIcon} />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
