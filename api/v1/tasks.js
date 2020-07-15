// The tasks resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllTasks = require("../../queries/selectAllTasks");
const validateJwt = require("../../utils/validateJwt");

// @route       GET api/v1/tasks
// @desc        Get all taks for a user
// @access      Private
router.get("/", validateJwt, (req, res) => {
   console.log(req.query);
   const { userId } = req.user.id;
   db.query(selectAllTasks, [userId])
      .then((tasks) => {
         const camelCaseTasks = tasks.map((task) => {
            return {
               id: task.id,
               text: task.text,
               userId: task.user_id,
               isCompleted: task.is_completed,
               lastDoneAt: task.last_done_at,
               timesCompleted: task.times_completed,
            };
         });
         res.json(camelCaseTasks);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
