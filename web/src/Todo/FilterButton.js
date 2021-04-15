import React from "react";

const FilterButton = ({ name, pressed, setFilter }) => {
  return (
    <button
      className={`${pressed ? "filterActive" : ""} filterBtn`}
      type="button"
      aria-pressed={pressed}
      onClick={() => setFilter(name)}
    >
      {name}
    </button>
  );
};

export default FilterButton;
// filterActive
