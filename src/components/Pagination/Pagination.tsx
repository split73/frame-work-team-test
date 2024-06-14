import { memo, useEffect, useState } from "react";
import paginationArrowIcon from "../../assets/svg/pagination_arrow_icon.svg";
import PaginationScss from "./Pagination.module.scss";
import { useAppDispatch } from "../../hooks/redux";
import { setPage } from "../../store/reducers/gallerySlice";
import "../../assets/styles/_variables.scss";

interface Props {
  currentPage: number;
  paginationLinks: string | null | undefined;
  isFetching: boolean;
}

let count = 0;

const Pagination = ({ currentPage, paginationLinks, isFetching }: Props) => {
  count++;
  console.log("PAGI", count);
  const [pagination, setPagination] = useState<JSX.Element[]>([]);
  const dispatch = useAppDispatch();

  let indexLastPageSubstring = paginationLinks?.indexOf('rel="last"');
  const lastPage = parsePaginationLinks(
    paginationLinks,
    indexLastPageSubstring
  );

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

  function addPageToPagination(page: number): JSX.Element {
    if (page === currentPage) {
      return (
        <li
          className={PaginationScss.paginationButton}
          id={PaginationScss.activePaginationButton}
          onClick={() => handleChangePage(page)}
          key={page}
        >
          {page}
        </li>
      );
    }
    return addPage(page);
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

  const addExcessPage = () => {
    return (
      <li
        className={`${PaginationScss.paginationButton} ${PaginationScss.excessPage}`}
        key={"..."}
      >
        ...
      </li>
    );
  };

  const addPage = (page: number) => {
    return (
      <li
        key={page}
        className={PaginationScss.paginationButton}
        onClick={() => handleChangePage(page)}
      >
        {page}
      </li>
    );
  };

  function managePagination(): JSX.Element[] {
    let tmpPagination: JSX.Element[] = [];
    if (lastPage <= 5) {
      for (let i = 1; i <= lastPage; i++) {
        tmpPagination.push(addPageToPagination(i));
      }
    } else {
      if (currentPage < 4) {
        for (let i = 1; i <= 4; i++) {
          tmpPagination.push(addPageToPagination(i));
        }
        tmpPagination.push(addExcessPage());
        tmpPagination.push(addPage(lastPage));
      } else if (currentPage >= lastPage - 2) {
        tmpPagination.push(addPage(1));

        tmpPagination.push(addExcessPage());

        for (let i = lastPage - 3; i <= lastPage; i++) {
          tmpPagination.push(addPageToPagination(i));
        }
      } else {
        tmpPagination.push(addPage(1));

        tmpPagination.push(addExcessPage());

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          tmpPagination.push(addPageToPagination(i));
        }
        tmpPagination.push(addExcessPage());

        tmpPagination.push(addPage(lastPage));
      }
    }
    return tmpPagination;
  }

  useEffect(() => {
    setPagination([]);
    setPagination(managePagination());
  }, [currentPage, paginationLinks, isFetching]);

  return (
    <ul id={PaginationScss.pagination}>
      <li
        key="leftArrow"
        className={PaginationScss.paginationButton}
        onClick={handleDeacreaseCurrentPage}
      >
        <img
          id={PaginationScss.paginationLeftArrow}
          src={paginationArrowIcon}
        ></img>
      </li>
      {pagination && pagination}
      <li
        key="rightArrow"
        className={PaginationScss.paginationButton}
        onClick={handleIncreaseCurrentPage}
      >
        <img src={paginationArrowIcon} />
      </li>
    </ul>
  );
};

export default memo(Pagination);
