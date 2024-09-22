/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const propCtrl = require("../controller/propCtrl");
const { addtask, getTask } = require("../controller/taskCtrl");

router.get("/", propCtrl.getAllProps);
router.get("/propInfo/:id", propCtrl.getProp);
router.post("/addProp", propCtrl.addProp);
router.put("/:id/edit", propCtrl.updateProp);
router.get("/prodInfo/:id", propCtrl.getProp);
router.delete("/:id", propCtrl.deleteProp);

router.post("/:propName/addTask", addtask);
router.get("/:id/get", getTask);
module.exports = router;