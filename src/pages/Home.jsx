import { useState, useEffect } from "react";
import PropCard from "../Components/PropCard";
import AddButton from "../Components/AddButton";
import axios from "axios";
import FilterDropdown from "../Components/FilterDropdown";

function Home() {
  const [myProp, setMyProp] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/").then((response) => {
      setMyProp(response.data);
    });
  }, []);

  const filterItems = (option) => {
    const newList = myProp.filter((ele) => ele.propType === option);
    setMyProp(newList);
  };

  return (
    <>
      <div className="p-2 h-full">
        <div className="absolute right-2">
          <FilterDropdown filterItems={filterItems} setMyProp={setMyProp} />
        </div>
        {myProp.length > 0 ? (
          <div className="mt-4 px-4 flex gap-5 flex-wrap  ">
            {myProp.map((ele, index) => {
              return (
                <PropCard
                  name={ele.name}
                  location={ele.location}
                  imageSrc={ele.imageSrc}
                  propType={ele.propType}
                  key={index}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-400 p-8 my-12 text-3xl font-semibold w-1/3 m-auto text-center rounded-xl bg-opacity-20">
            <p>No Properties to View.</p>
          </div>
        )}
      </div>
      <AddButton />
    </>
  );
}

export default Home;
