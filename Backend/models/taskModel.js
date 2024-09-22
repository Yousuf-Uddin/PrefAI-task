/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    propName: {
        type: String,
    },
    taskType: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    taskStatus: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        // required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Task", taskSchema);