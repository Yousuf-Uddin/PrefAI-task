/* eslint-disable no-undef */
var cors = require('cors');
require('dotenv').config({ path: '.env' });
const express = require("express");
const propRoute = require("./routes/propRoute");
const mongoose = require("mongoose");

const app = express();
app.listen(3000);
app.use(express.json({ limit: '10mb' }));
app.use(cors());

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });


app.use("/", propRoute);