import React from "react";
import _ from "lodash";

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
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//Pagination.defaultProps = {};

console.dir(Pagination);
/**
 *  TODO:
 *  Default Parameter
 *  Properties types
 */

export default Pagination;
