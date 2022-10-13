import Pagination from "react-bootstrap/Pagination";
import { RiSkipBackMiniLine } from "react-icons/ri";
import { MdOutlineSkipNext } from "react-icons/md";
import "./PaginationCustom.scss";
import { useEffect, useState } from "react";

const countNumberOfPage = (numberElement, elementPerPage) => {
  if (numberElement % elementPerPage == 0) {
    return numberElement / elementPerPage;
  } else {
    return Math.floor(numberElement / elementPerPage) + 1;
  }
};

function PaginationCustom(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState(
    countNumberOfPage(props.numberOfElement, props.elementPerPage)
  );

  const choosePage = (num) => {
    setCurrentPage(num);
    props.setCurrentPage(num);
  };
  if (currentPage != props.currentPage) setCurrentPage(props.currentPage);
  useEffect(() => {
    setNumberOfPage(
      countNumberOfPage(props.numberOfElement, props.elementPerPage)
    );
    choosePage(1);
  }, [props.numberOfElement]);

  return (
    <div className="pagination-wrapper">
      <Pagination>
        <Pagination.Item
          className="next-pre-btn"
          disabled={currentPage === 1}
          onClick={() => choosePage(currentPage - 1)}
        >
          <RiSkipBackMiniLine />
        </Pagination.Item>
        <div className="list-page">
          {Array.from({ length: numberOfPage }).map((_, idx) =>
            currentPage === idx + 1 ? (
              <Pagination.Item active key={idx}>
                {idx + 1}
              </Pagination.Item>
            ) : currentPage === idx + 3 && idx !== 0 ? (
              <Pagination.Ellipsis key={idx} />
            ) : currentPage === idx - 1 && idx + 1 !== numberOfPage ? (
              <Pagination.Ellipsis key={idx} />
            ) : currentPage === idx + 2 ||
              currentPage === idx ||
              idx === 0 ||
              idx + 1 === numberOfPage ? (
              <Pagination.Item key={idx} onClick={() => choosePage(idx + 1)}>
                {idx + 1}
              </Pagination.Item>
            ) : (
              <div key={idx}></div>
            )
          )}
        </div>
        <Pagination.Item
          className="next-pre-btn"
          disabled={currentPage === numberOfPage}
          onClick={() => choosePage(currentPage + 1)}
        >
          <MdOutlineSkipNext />
        </Pagination.Item>
      </Pagination>
    </div>
  );
}
export { PaginationCustom };
