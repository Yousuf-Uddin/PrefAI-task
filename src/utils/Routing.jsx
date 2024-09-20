import { Route, Routes } from "react-router-dom";
import AddPropForm from "../pages/AddPropForm";
import Home from "../pages/Home";
import PropInfo from "../pages/PropInfo";
import TaskManagement from "../pages/TaskManagement";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addprop" element={<AddPropForm />} />
      <Route path="/propInfo" element={<propInfo />} />
      <Route path="/propInfo/:propname" element={<PropInfo />} />
      <Route path="/:propname/edit" element={<AddPropForm />} />
      <Route path="/:propname/addTask" element={<TaskManagement />} />
    </Routes>
  );
}

export default Routing;
