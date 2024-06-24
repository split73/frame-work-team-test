import { useEffect, useState } from "react";

export function useSetPagination(
  currentPage: number,
  lastPage: number,
  addLeftArrow: (key: number) => JSX.Element,
  addRightArrow: (key: number) => JSX.Element,
  addPage: (page: number, key: number) => JSX.Element,
  addActivePage: (page: number, key: number) => JSX.Element,
  addExcessPage: (key: number) => JSX.Element
) {
  const [pagination, setPagination] = useState<JSX.Element[]>([]);

  let tmpPagination: JSX.Element[] = [];

  useEffect(() => {
    setPagination([]);
    if (currentPage > 1 && lastPage > 1) {
      tmpPagination.push(addLeftArrow(0));
    }
    if (lastPage <= 5) {
      for (let i = 1; i <= lastPage; i++) {
        if (i === currentPage) {
          tmpPagination.push(addActivePage(i, i));
        } else {
          tmpPagination.push(addPage(i, i));
        }
      }
    } else {
      if (currentPage < 4) {
        for (let i = 1; i <= 4; i++) {
          if (i === currentPage) {
            tmpPagination.push(addActivePage(i, i));
          } else {
            tmpPagination.push(addPage(i, i));
          }
        }
        tmpPagination.push(addExcessPage(lastPage + 1));
        tmpPagination.push(addPage(lastPage, lastPage));
      } else if (currentPage >= lastPage - 2) {
        tmpPagination.push(addPage(1, 1));

        tmpPagination.push(addExcessPage(2));

        for (let i = lastPage - 3; i <= lastPage; i++) {
          if (i === currentPage) {
            tmpPagination.push(addActivePage(i, i));
          } else {
            tmpPagination.push(addPage(i, i));
          }
        }
      } else {
        tmpPagination.push(addPage(1, 1));

        tmpPagination.push(addExcessPage(2));

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          if (i === currentPage) {
            tmpPagination.push(addActivePage(i, i));
          } else {
            tmpPagination.push(addPage(i, i));
          }
        }
        tmpPagination.push(addExcessPage(lastPage - 1));

        tmpPagination.push(addPage(lastPage, lastPage));
      }
    }
    if (lastPage !== currentPage && lastPage !== 0) {
      tmpPagination.push(addRightArrow(lastPage + 2));
    }
    setPagination(tmpPagination);
  }, [currentPage, lastPage]);

  return pagination;
}
