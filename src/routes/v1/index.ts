import express from "express";
const router = express.Router();

router.get("/ping", (req, res) => {
  res.send("PING Success");
});

export default router;
