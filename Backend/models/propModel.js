/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propSchema = new Schema({
    imageSrc: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    propType: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        // required: true,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("WAQF", propSchema);