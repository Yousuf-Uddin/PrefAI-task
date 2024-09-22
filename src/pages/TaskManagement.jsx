import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const TaskForm = () => {
  const params = useParams();
  const propName = params.propname;
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    propName: propName,
    taskType: "",
    dueDate: "",
    taskStatus: "Pending",
  });
  const addTask = async (data) => {
    try {
      await axios
        .post(`http://localhost:3000/${propName}/addTask`, {
          data,
        })
        .then(function (response) {
          console.log(response.status);
        });
    } catch (err) {
      console.log(err.response.status);
    }
  };
  const handleInput = (e) => {
    let inputfinder = e.target.id;
    setTaskData({ ...taskData, [inputfinder]: e.target.value });
  };

  // Handle the submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector(".btnSubmit");
    submitBtn.disabled = "true";
    submitBtn.style.cursor = "not-allowed";

    if (!taskData.taskType || !taskData.dueDate) {
      alert("Please fill all fields");
      return;
    }
    addTask(taskData); //adding task to DB
    toast.success("Task Added.", { autoClose: 1500 });
    setTimeout(() => {
      navigate("/propInfo/" + propName);
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Task Form */}
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="dueDate">
            Prop Name:
          </label>
          <input
            id="propName"
            type="text"
            disabled
            className=" bg-gray-900 text-gray-400 hover:cursor-not-allowed focus:outline-none block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={propName}
          />
        </div>
        {/* Task Type */}

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="taskType">
            Task Type
          </label>

          <select
            id="taskType"
            className="focus:outline-none block bg-gray-900 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={taskData.taskType}
            onChange={handleInput}
          >
            <option value="">Select a task type</option>
            <option value="Collect Rent">Collect Rent</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Legal Follow-Up">Follow-up on Legal Issue</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            className="bg-gray-900 focus:outline-none block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={taskData.dueDate}
            onChange={handleInput}
          />
        </div>

        {/* Task Status */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="taskDatatatus"
          >
            Task Status
          </label>
          <select
            id="taskStatus"
            className="bg-gray-900 focus:outline-none block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={taskData.taskDatatatus}
            onChange={handleInput}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <ToastContainer position="top-right" />
        <div>
          <button
            type="submit"
            className="btnSubmit w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
