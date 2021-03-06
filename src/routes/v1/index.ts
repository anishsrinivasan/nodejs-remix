import express from "express";
import userRoute from "./user/userRoute";

const router = express.Router();

router.use("/user", userRoute);

router.get("/ping", (req, res) => {
  res.send("PING Success");
});

export default router;
