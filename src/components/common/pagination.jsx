import React from "react";
import _ from "lodash";

/**
 * TODO: Pagination Refractring
 * 1. Default properties
 * 2. Properties validation
 *
 * @param {} props
 */
const Pagination = props => {
  const { totalItems: items, pageSize, currentPage, onPageChange } = props;
  const noOfPage = Math.ceil(items / pageSize);
  const pages = _.range(1, noOfPage + 1);

  if (noOfPage === 1) {
    return null;
  }
  return (
    <nav>
      <ul className="pagination pagination-sm">
        {pages.map(page => (
          <li
            className={currentPage === page ? "page-item active" : "page-item"}
            key={page}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.defaultProps = {
  pageSize: 4,
  currentPage: 1
};
export default Pagination;
