const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { 
  getCurrentUserPlanId,
  setCurrentUserPlanId,
  removeCurrentUserPlanId
} = require("../controller/currentPlanController");


const router = express.Router();

router.use(verifyToken);

router.get("/", getCurrentUserPlanId);

router.post("/", setCurrentUserPlanId);

router.delete("/", removeCurrentUserPlanId);

module.exports.currentPlanRouter = router;