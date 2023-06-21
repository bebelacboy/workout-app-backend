const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/users');
const { workoutPlanRouter } = require('./routes/workoutPlan');

const app = express();

dotenv.config()

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/workout-plan", workoutPlanRouter)

mongoose.connect(
  `${process.env.DB_URL}`
  )

app.listen(3001, () => console.log("Server is running..."))