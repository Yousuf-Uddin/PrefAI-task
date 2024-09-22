/* eslint-disable no-undef */
const taskModel = require("../models/taskModel");
const addtask = async (req, res) => {
    try {
        const data = req.body.data;
        console.log(data);
        data.createdAt = Date.now();
        const newTask = new taskModel(data);
        await newTask.save();
        res.status(201);
        res.send("Task Added");
        console.log("Task added to db");
    } catch (e) {
        console.log(e);
    }
};


const getTask = async (req, res) => {
    try {
        let propName = req.params.id;
        const alltask = await taskModel.find({ propName });
        res.status(200);
        res.json(alltask);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send("Internal Server Error");
    }
};

module.exports = {
    addtask,
    getTask,
};