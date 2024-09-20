/* eslint-disable no-undef */
const propModel = require("../models/propModel");

const getAllProps = async (req, res) => {
    try {
        const allProps = await propModel.find();
        res.status(200);
        res.json(allProps);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send("Internal Server Error");
    }
};
const getProp = async (req, res) => {
    try {
        let propName = req.params.id;
        // console.log(propName);
        const selectedProp = await propModel.findOne({ name: propName }).exec();
        res.status(200);
        res.json(selectedProp);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send("Internal Server Error");
    }
};

const addProp = async (req, res) => {
    try {
        const data = req.body.data;
        // console.log(data, data.name);
        data.createdAt = Date.now();
        const newProp = new propModel(data);
        await newProp.save();
        res.status(201);
        res.send("Prop Added");
        console.log("Prop added to db");
    } catch (e) {
        console.log(e);
    }
};
const updateProp = async (req, res) => {
    try {
        const propName = req.params.id;
        const data = req.body.data;
        await propModel.updateOne(
            { name: propName },
            { $set: { ...data } },
            { new: true, }
        );
        res.send("Sucessfully updated");
    } catch (error) {
        res.status(500);
        console.log(error);
        res.send("Internal Sever Error");
    }
};

const deleteProp = async (req, res) => {
    try {
        const name = req.params.id;
        await propModel.findOneAndDelete({ name: name });
        res.status(200);
        res.send("Deleted Successfully");
    } catch (error) {
        res.status(500);
        res.send("Internal Server Error", error);
    }
};


module.exports = {
    getAllProps,
    addProp,
    getProp,
    updateProp,
    deleteProp,

};