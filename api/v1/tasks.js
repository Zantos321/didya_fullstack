// The tasks resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllTasks = require("../../queries/selectAllTasks");

// @route       GET api/v1/tasks
// @desc        Get all taks for a user
// @access      Public
router.get("/", (req, res) => {
   console.log(req.query);
   const { userId } = req.query;
   db.query(selectAllTasks, [userId])
      .then((dbRes) => {
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
