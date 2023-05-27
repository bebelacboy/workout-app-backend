const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);

mongoose.connect(
  "mongodb+srv://achmadhafiz99:nutritionapp@nutrition.cwwixot.mongodb.net/nutrition?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("Server is running..."))