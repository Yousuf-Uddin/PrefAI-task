/* eslint-disable react/prop-types */

import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";

function FilterDropdown({ filterItems, setMyProp }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [allProps, setAllProps] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/").then((response) => {
      setAllProps(response.data);
    });
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleFilter = (e) => {
    filterItems(e.target.id);
  };

  const handleFilterAll = () => {
    setMyProp(allProps);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="w-22">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-gray-600  text-sm font-medium text-slate-100 hover:bg-gray-50 focus:outline-none"
          id="menu-button"
          onClick={handleMenuToggle}
        >
          <FaFilter />
        </button>
      </div>

      {menuOpen && (
        <div
          className="origin-top-right right-0 absolute  w-fit  focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <button
              id="All"
              className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              onClick={handleFilterAll}
            >
              All
            </button>
            <button
              id="Land"
              className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              onClick={handleFilter}
            >
              Land
            </button>
            <button
              id="Mosque"
              className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              onClick={handleFilter}
            >
              Mosque
            </button>
            <button
              id="School"
              className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              onClick={handleFilter}
            >
              School
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
