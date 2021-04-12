import React from "react";

const FilterButton = ({ name, pressed, setFilter }) => {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => setFilter(name)}
    >
      {name}
    </button>
  );
};

export default FilterButton;
