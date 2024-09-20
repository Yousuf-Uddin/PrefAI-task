/* eslint-disable react/prop-types */
import { FaLandmark, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
const PropCard = ({ name, location, propType, imageSrc }) => {
  return (
    <Link to={`/propInfo/${name}`}>
      <div className=" bg-gray-800 rounded-lg overflow-hidden shadow-lg w-72 min-h-full">
        <img src={imageSrc} alt={name} className="w-full h-60 object-cover" />
        <div className="p-4 flex flex-col justify-around">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-400">
            <FaLocationDot className="inline mr-2" />
            {location}
          </p>
          <p className="text-gray-500 ">
            <FaLandmark className="inline mr-2 text-center" /> {propType}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropCard;
