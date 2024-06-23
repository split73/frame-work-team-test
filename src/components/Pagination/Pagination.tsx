import { memo } from "react";
import PaginationScss from "./Pagination.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setPage } from "../../store/reducers/gallerySlice";
import "../../assets/styles/_variables.scss";
import { useSetPagination } from "../../hooks/useSetPagination";
import { PaginationArrowIcon } from "../SvgIcons/PaginationArrowIcon";

interface Props {
  currentPage: number;
  paginationLinks: string | null | undefined;
  isFetching: boolean;
}

let count = 0;

const Pagination = ({ currentPage, paginationLinks }: Props) => {
  count++;
  console.log("PAGI", count);
  let arrowColor = useAppSelector((state) => state.appReducer.primaryGray);
  console.log(arrowColor)
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

  function addLeftArrow(key: number): JSX.Element {
    return (
      <li
        key={key}
        className={`${PaginationScss.paginationButton} ${PaginationScss.arrowButton}`}
        onClick={handleDeacreaseCurrentPage}
      >
        <PaginationArrowIcon
          id={PaginationScss.paginationLeftArrow}
          fill={arrowColor}
        />
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
        <PaginationArrowIcon fill={arrowColor} />
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

  return <ul id={PaginationScss.pagination}>{pagination}</ul>;
};

export default memo(Pagination);