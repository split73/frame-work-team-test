import { memo, useEffect, useState } from "react";
import paginationArrowIcon from "../../assets/svg/pagination_arrow_icon.svg";
import GaleryScss from "../Galery/Galery.module.scss";
import { useAppDispatch } from "../../hooks/redux";
import { setPage } from "../../store/reducers/gallerySlice";

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
          className={GaleryScss.paginationButton}
          id={GaleryScss.activePaginationButton}
          onClick={() => handleChangePage(page)}
        >
          {page}
        </li>
      );
    }
    return (
      <li
        className={GaleryScss.paginationButton}
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
  function managePagination(): void {
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
        tmpPagination.push(
          <li
            className={`${GaleryScss.paginationButton} ${GaleryScss.excessPage}`}
          >
            ...
          </li>
        );
        tmpPagination.push(
          <li
            className={GaleryScss.paginationButton}
            onClick={() => handleChangePage(lastPage)}
          >
            {lastPage}
          </li>
        );
      } else if (currentPage >= lastPage - 2) {
        tmpPagination.push(
          <li
            className={GaleryScss.paginationButton}
            onClick={() => handleChangePage(1)}
          >
            1
          </li>
        );

        tmpPagination.push(
          <li
            className={`${GaleryScss.paginationButton} ${GaleryScss.excessPage}`}
          >
            ...
          </li>
        );

        for (let i = lastPage - 3; i <= lastPage; i++) {
          tmpPagination.push(addPageToPagination(i));
        }
      } else {
        tmpPagination.push(
          <li
            className={GaleryScss.paginationButton}
            onClick={() => handleChangePage(1)}
          >
            1
          </li>
        );

        tmpPagination.push(
          <li
            className={`${GaleryScss.paginationButton} ${GaleryScss.excessPage}`}
          >
            ...
          </li>
        );

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          tmpPagination.push(addPageToPagination(i));
        }
        tmpPagination.push(
          <li
            className={`${GaleryScss.paginationButton} ${GaleryScss.excessPage}`}
          >
            ...
          </li>
        );

        tmpPagination.push(
          <li
            className={GaleryScss.paginationButton}
            onClick={() => handleChangePage(lastPage)}
          >
            {lastPage}
          </li>
        );
      }
    }
    setPagination(tmpPagination);
  }

  useEffect(() => {
    console.log("useState", count);
    setPagination([]);
    managePagination();
  }, [currentPage, paginationLinks, isFetching]);
  return (
    <div style={{ color: "white" }}>
      <ul id={GaleryScss.paginationList}>
        <li
          className={GaleryScss.paginationButton}
          onClick={handleDeacreaseCurrentPage}
        >
          <img
            id={GaleryScss.paginationLeftArrow}
            src={paginationArrowIcon}
          ></img>
        </li>
        {pagination && pagination}
        <li
          className={GaleryScss.paginationButton}
          onClick={handleIncreaseCurrentPage}
        >
          <img src={paginationArrowIcon} />
        </li>
      </ul>
    </div>
  );
};

export default memo(Pagination);
