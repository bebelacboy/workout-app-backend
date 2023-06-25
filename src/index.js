const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/users');
const { workoutPlanRouter } = require('./routes/workoutPlan');
const { currentPlanRouter } = require('./routes/currentPlan');
const { workoutSessionRouter } = require('./routes/workoutSession');

const app = express();

dotenv.config();

const allowedOrigins = [process.env.CLIENT_URL]

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    // Check if the request origin is in the allowed origins list
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use("/auth", userRouter);
app.use("/workout-plan", workoutPlanRouter);
app.use("/current-plan", currentPlanRouter);
app.use("/workout-session", workoutSessionRouter);

mongoose.connect(
  `${process.env.DB_URL}`
  )
app.listen(process.env.PORT, "0.0.0.0", () => console.log("Server is running..."));

module.exports = app;
