import React from 'react';

const SelectCategories = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div>
      <select
        className="select-c bg-body-tertiary"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All categories</option>
        <option value="T-Shirt">T-Shirt</option>
        <option value="Jeans">Jeans</option>
        <option value="Jackets">Jackets</option>
        <option value="Shoes">Shoes</option>
        <option value="Tracksuit">Tracksuit</option>
      </select>
    </div>
  );
};

export default SelectCategories;
