import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddButton = () => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/addProp");
  };
  return (
    <button
      onClick={navigateHandler}
      className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg"
    >
      <FaPlus className="text-2xl" />
    </button>
  );
};

export default AddButton;
