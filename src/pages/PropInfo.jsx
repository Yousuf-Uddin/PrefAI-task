/* eslint-disable react-hooks/exhaustive-deps */
import { FaEdit, FaTrashAlt, FaPrint, FaBook } from "react-icons/fa";
import { FaLandmark, FaLocationDot, FaPlus } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
function PropInfo() {
  const [selectedProp, setselectedProp] = useState();
  const [taskList, setTaskList] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const propVal = params.propname;
  useEffect(() => {
    axios.get("http://localhost:3000/propInfo/" + propVal).then((res) => {
      setselectedProp(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/${propVal}/get`).then((res) => {
      setTaskList(res.data);
    });
  }, []);

  //Delete Button Handler
  const deleteHandler = (e) => {
    const delBtn = e.target;
    // console.log(delBtn);
    delBtn.disabled = "true";
    delBtn.style.cursor = "not-allowed";
    axios.delete("http://localhost:3000/" + propVal).then((res) => {
      console.log(res.data, res.status);
    });
    toast.success("Property Removed Sucessfully.", { autoClose: 1500 });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Handle updating the task status
  const handleStatusChange = (id, newStatus) => {
    setTaskList(
      taskList.map((task) =>
        task._id === id ? { ...task, taskStatus: newStatus } : task
      )
    );
  };

  const printHandler = (e) => {
    window.print(e);
  };

  return (
    <div className="printableArea mx-auto bg-gray-900 p-6 rounded-lg text-white">
      {selectedProp ? (
        <div>
          <div className="flex items-center">
            <img
              src={selectedProp.imageSrc}
              alt={selectedProp.name}
              className="w-64 h-64 object-cover rounded-lg mr-4"
            />
            <div className="w-full">
              <h2 className="text-3xl font-bold mb-3 pr-2">
                Property Name :
                <p className="inline text-3xl  p-2">{selectedProp.name}</p>
              </h2>
              <div className="border border-slate-700 my-2 "></div>
              <div className="flex flex-row gap-12 text-lg">
                <p className="flex gap-1">
                  <FaLocationDot className=" text-2xl" />
                  <span className="inline font-bold">Location :</span>
                  <span className="">{selectedProp.location}</span>
                </p>
                <p className="flex gap-2">
                  <FaLandmark className="text-2xl" />
                  <span className="inline font-bold">Property Type :</span>
                  <span className="px-1">{selectedProp.propType}</span>
                </p>
              </div>
              <div className="mt-6 text-sm px-1">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <FaBook className="mr-2 text-xl" /> Notes
                </h3>
                <p className="px-2 text-md  ">--{selectedProp.notes}</p>
              </div>
            </div>
          </div>
          {/* Task List */}
          <div className="my-4 w-fit">
            <h3 className="text-2xl font-bold mb-4">Tasks</h3>
            {taskList ? (
              <ul className=" flex gap-4 flex-wrap">
                {taskList.map((task, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        task.taskStatus === "Pending"
                          ? "px-6 py-4 bg-red-600 rounded-md"
                          : task.taskStatus === "Completed"
                          ? "px-6 py-4 bg-green-500 rounded-md"
                          : "px-6 py-4 bg-gray-700 rounded-md"
                      }
                    >
                      <p>
                        <strong>Task Type:</strong> {task.taskType}
                      </p>
                      <p>
                        <strong>Due Date:</strong> {task.dueDate}
                      </p>
                      <div className="mt-2">
                        <label className="text-sm font-medium mb-1 mr-2">
                          <strong>Status:</strong>
                        </label>
                        <select
                          id={task._id}
                          className="focus:outline-none p-1 bg-inherit border rounded-md shadow-sm"
                          value={task.taskStatus}
                          onChange={(e) =>
                            handleStatusChange(e.target.id, e.target.value)
                          }
                        >
                          <option
                            className="bg-slate-300 text-black"
                            value="Pending"
                          >
                            Pending
                          </option>
                          <option
                            className="bg-slate-300 text-black"
                            value="In Progress"
                          >
                            In Progress
                          </option>
                          <option
                            className="bg-slate-300 text-black"
                            value="Completed"
                          >
                            Completed
                          </option>
                        </select>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">No tasks added yet.</p>
            )}
            <div className="mt-6 text-gray-400 text-sm">
              <p>Created: {selectedProp.createdAt}</p>
              <p>Last edited: {selectedProp.updatedAt}</p>
            </div>
          </div>

          <div className="mt-2 flex justify-center gap-4">
            <Link to={`/${selectedProp.name}/addTask`}>
              <button className="flex items-center bg-gray-600 border-gray-600">
                <FaPlus className="mr-2" /> Add Task
              </button>
            </Link>
            <Link to={`/${selectedProp.name}/edit`}>
              <button className="flex items-center bg-gray-600 border-gray-600">
                <FaEdit className="mr-2" /> EDIT
              </button>
            </Link>
            <button
              onClick={deleteHandler}
              className="btnDelete flex items-center bg-gray-600 border-gray-600"
            >
              <FaTrashAlt className="mr-2" /> DELETE
            </button>
            <button
              onClick={printHandler}
              className="flex items-center bg-gray-600 border-gray-600"
            >
              <FaPrint className="mr-2" /> PRINT
            </button>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div className="bg-gray-400 p-8 my-12 text-3xl font-semibold w-1/3 m-auto text-center rounded-xl bg-opacity-20">
          <p>No Data found.</p>
        </div>
      )}
    </div>
  );
}

export default PropInfo;
