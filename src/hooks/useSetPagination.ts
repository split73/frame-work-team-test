// import { useState } from "react";

// export function useSetPagination (currentPage, lastPage) {
//     const [pagination, setPagination] = useState<JSX.Element[]>([]);

//     function addPageToPagination(page: number): void {
//         if (page === currentPage) {
//           setPagination((prevState) => [
//             ...prevState,
//             <li
//               className={GaleryScss.paginationButton}
//               id={GaleryScss.activePaginationButton}
//               onClick={() => handleChangePage(page)}
//             >
//               {page}
//             </li>,
//           ]);
//         } else {
//           setPagination((prevState) => [
//             ...prevState,
//             <li
//               className={GaleryScss.paginationButton}
//               onClick={() => handleChangePage(page)}
//             >
//               {page}
//             </li>,
//           ]);
//         }
//       }
// }

