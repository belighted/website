import React from "react";
import classNames from "classnames";
import LocalizedLink from "../links/LocalizedLink";

const Pagination = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : `/blog/${(currentPage - 1).toString()}`;
  const nextPage = `/blog/${(currentPage + 1).toString()}`;
  return (
    <ul className="o-wrapper c-pagination">
      {!isFirst && (
        <LocalizedLink to={prevPage} rel="prev">
          ← Previous Page
        </LocalizedLink>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <li
          key={`pagination-number${i + 1}`}
          className={"u-margin-none c-pagination__link"}
        >
          <LocalizedLink
            to={`/blog/${i === 0 ? "" : i + 1}`}
            className={classNames(
              "c-pagination-link",
              currentPage === i + 1 ? "active" : null
            )}
          >
            {i + 1}
          </LocalizedLink>
        </li>
      ))}
      {!isLast && (
        <LocalizedLink to={nextPage} rel="next">
          Next Page →
        </LocalizedLink>
      )}
    </ul>
  );
};

export default Pagination;
