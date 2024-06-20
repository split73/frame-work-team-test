import { memo } from "react";
import paginationArrowIcon from "../../assets/svg/pagination_arrow_icon.svg";
import PaginationScss from "./Pagination.module.scss";
import { useAppDispatch } from "../../hooks/redux";
import { setPage } from "../../store/reducers/gallerySlice";
import "../../assets/styles/_variables.scss";
import { useSetPagination } from "../../hooks/useSetPagination";

interface Props {
  currentPage: number;
  paginationLinks: string | null | undefined;
  isFetching: boolean;
}

let count = 0;

const Pagination = ({ currentPage, paginationLinks }: Props) => {
  count++;
  console.log("PAGI", count);
  let indexLastPageSubstring = paginationLinks?.indexOf('rel="last"');
  const lastPage = parsePaginationLinks(
    paginationLinks,
    indexLastPageSubstring
  );
  const pagination = useSetPagination(
    currentPage,
    lastPage,
    addLeftArrow,
    addRightArrow,
    addPage,
    addActivePage,
    addExcessPage
  );

  const dispatch = useAppDispatch();

  function parsePaginationLinks(
    linkString: string | null | undefined,
    characterIndex: number | undefined
  ): number {
    console.log("FUNC", count, linkString, characterIndex);
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

  function isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }

  function addActivePage(page: number, key: number): JSX.Element {
    return (
      <li
        className={PaginationScss.paginationButton}
        id={PaginationScss.activePaginationButton}
        onClick={() => handleChangePage(page)}
        key={key}
      >
        {page}
      </li>
    );
  }

  const handleChangePage = (page: number) => {
    dispatch(setPage(page));
  };

  const handleDeacreaseCurrentPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleIncreaseCurrentPage = () => {
    if (currentPage < lastPage) {
      dispatch(setPage(currentPage + 1));
    }
  };

  function addLeftArrow(key: number): JSX.Element {
    return (
      <li
        key={key}
        className={`${PaginationScss.paginationButton} ${PaginationScss.arrowButton}`}
        onClick={handleDeacreaseCurrentPage}
      >
        <img
          id={PaginationScss.paginationLeftArrow}
          src={paginationArrowIcon}
        ></img>
      </li>
    );
  }

  function addRightArrow(key: number): JSX.Element {
    return (
      <li
        key={key}
        className={`${PaginationScss.paginationButton} ${PaginationScss.arrowButton}`}
        onClick={handleIncreaseCurrentPage}
      >
        <img src={paginationArrowIcon} />
      </li>
    );
  }

  function addExcessPage(key: number) {
    return (
      <li
        className={`${PaginationScss.paginationButton} ${PaginationScss.excessPage}`}
        key={key}
      >
        ...
      </li>
    );
  }

  function addPage(page: number, key: number) {
    return (
      <li
        key={key}
        className={PaginationScss.paginationButton}
        onClick={() => handleChangePage(page)}
      >
        {page}
      </li>
    );
  }

  return <ul id={PaginationScss.pagination}>{pagination}</ul>;
};

export default memo(Pagination);
