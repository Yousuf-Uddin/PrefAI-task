import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };
  const navHandler = (e) => {
    return { color: e.isActive ? "lightgreen" : "" };
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center basis-1/3 gap-4">
        <button onClick={goBackHandler} className="bg-inherit p-1 items-center">
          <FaArrowLeft className="text-2xl" />
        </button>
        <h2 className="text-2xl font-semibold px-2">Waqf Property</h2>
      </div>
      <div className="flex gap-8 basis-1/2 ">
        <NavLink
          style={(e) => {
            return navHandler(e);
          }}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          style={(e) => {
            return navHandler(e);
          }}
          to="/addProp"
        >
          Add Property
        </NavLink>
        <NavLink
          className={"pointer-events-none"}
          onClick={(e) => {
            e.preventDefault();
          }}
          style={(e) => {
            return navHandler(e);
          }}
          to={`/propInfo`}
        >
          Property Info
        </NavLink>
      </div>
      <FaSearch />
    </nav>
  );
};

export default Navbar;
