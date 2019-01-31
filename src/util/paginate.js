import _ from "lodash";

/*
    [1,2,3,4,5,6,7,8,9,10]
    [ 1,  2,  3,  4,  5]
*/
export const paginate = function(items, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
};
