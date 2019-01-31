import React from "react";

const ListGroup = props => {
  const { listItems: items, onItemSelect } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item._id}
          onClick={() => onItemSelect(item)}
          className="list-group-item text text-secondary"
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
