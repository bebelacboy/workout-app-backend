const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { 
  getCurrentUserPlanId,
  setCurrentUserPlanId
} = require("../controller/currentPlanController");


const router = express.Router();

router.use(verifyToken);

router.get("/", getCurrentUserPlanId);

router.post("/", setCurrentUserPlanId);

module.exports.currentPlanRouter = router;