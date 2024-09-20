import { useState } from "react";

import { useParams } from "react-router-dom";

const TaskForm = () => {
  const params = useParams();
  const [tasks, setTasks] = useState([]);
  const [taskType, setTaskType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");

  // Handle the submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskType || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      id: Date.now(),
      type: taskType,
      dueDate: dueDate,
      status: taskStatus, // New status field for tasks
    };

    setTasks([...tasks, newTask]);
    localStorage.setItem(params.propname + "task", JSON.stringify(tasks));
    setTaskType("");
    setDueDate("");
    setTaskStatus("Pending"); // Reset status to default
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Task Form */}
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Type */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="taskType">
            Task Type
          </label>
          <select
            id="taskType"
            className="focus:outline-none block bg-gray-900 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
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
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Task Status */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="taskStatus"
          >
            Task Status
          </label>
          <select
            id="taskStatus"
            className="bg-gray-900 focus:outline-none block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
