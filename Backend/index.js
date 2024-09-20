/* eslint-disable no-undef */
var cors = require('cors');
const express = require("express");
const propRoute = require("./routes/propRoute");
const mongoose = require("mongoose");
// const propModel = require('./models/propModel');

const app = express();
app.listen(3000);
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const DB_URL = "mongodb://localhost:27017/WaqfTask";

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

// app.get("/addProp", async (req, res) => {
//     res.json({ name: "adminland", location: "1-1-1,admin-admin", type: "land", notes: "adminadmin" });
//     let data = JSON.parse(JSON.stringify(req.body));
//     console.log(req.body);
//     console.log(data.name);
//     // let user1 = await new Users({
//     //     name: data.userName, email: data.email, password: data.password, isActive: false, role: 1
//     // });
//     // user1.save();
// });


app.use("/", propRoute);