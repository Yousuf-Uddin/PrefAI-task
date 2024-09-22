/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ImageUpload from "../Components/ImageUpload";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PropForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const propVal = params.propname;
  const [editProp, seteditProp] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/propInfo/" + propVal).then((res) => {
      seteditProp(res.data);
    });
  }, []);

  const [formData, setformData] = useState({
    name: "",
    location: "",
    propType: "",
    notes: "",
    imageSrc: null,
  });
  //Adding Data to DB//
  const submitData = async (data) => {
    try {
      await axios
        .post("http://localhost:3000/addProp", {
          data,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response.data);
          console.log(response.message, response.status);
        });
    } catch (err) {
      console.log(err.response.status);
    }
  };

  const updateData = async (data) => {
    try {
      await axios
        .put(`http://localhost:3000/${editProp.name}/edit`, {
          data,
        })
        .then(function (response) {
          console.log(response.data, response.status);
        });
    } catch (err) {
      console.log(err.response.status);
    }
  };

  //Edit Prop logic//
  useEffect(() => {
    editProp ? setformData({ ...editProp }) : setformData({ ...formData });
  }, [editProp]);
  //Add Prop Logic
  const formHandler = (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector(".btnSubmit");
    submitBtn.disabled = "true";
    submitBtn.style.cursor = "not-allowed";
    // console.log(formData);
    editProp ? updateData(formData) : submitData(formData);
    editProp
      ? toast.success("Property Edited Sucessfully.", { autoClose: 1500 })
      : toast.success("Property Added to DataBase.", { autoClose: 1500 });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleInputs = (e) => {
    let inputfinder = e.target.id;
    setformData({ ...formData, [inputfinder]: e.target.value });
  };

  return (
    <div className="min-h-screen text-white p-8 w-[98.5vw] ">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={formHandler}>
          <ImageUpload
            formData={editProp ? editProp : formData}
            setformData={setformData}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-md font-semibold">
                Property Name
              </label>
              {editProp ? (
                <input
                  id="name"
                  disabled
                  value={formData.name}
                  onChange={handleInputs}
                  type="text"
                  className="w-full focus:outline-none cursor-not-allowed bg-gray-900 p-2 border-b  mt-1"
                />
              ) : (
                <input
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleInputs}
                  type="text"
                  className="w-full focus:outline-none bg-gray-900 p-2 border-b  mt-1"
                />
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-md font-semibold">Location</label>
              <input
                type="text"
                id="location"
                required
                value={formData.location}
                onChange={handleInputs}
                className="w-full focus:outline-none bg-gray-900 p-2 border-b mt-1"
                rows="3"
              ></input>
            </div>

            <div className="col-span-2">
              <label className="block text-md font-semibold">
                Property Type
              </label>
              <select
                onChange={handleInputs}
                id="propType"
                value={formData.propType}
                className="w-full bg-gray-900 p-2 focus:outline-none border-b mt-2 "
              >
                <option value={""}>Choose Property Type.</option>
                <option value="Land">Land</option>
                <option value="Mosque">Mosque</option>
                <option value="School">School</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-md font-semibold">Notes</label>
              <input
                type="text"
                id="notes"
                value={formData.notes}
                onChange={handleInputs}
                className="w-full bg-gray-900 p-2 focus:outline-none border-b  mt-2"
                rows="2"
              ></input>
            </div>
          </div>
          <ToastContainer position="top-right" />

          <button className="btnSubmit bg-blue-700 focus:outline-none hover:bg-blue-500 w-full mt-6 p-2">
            {editProp ? "SAVE" : "CREATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropForm;
