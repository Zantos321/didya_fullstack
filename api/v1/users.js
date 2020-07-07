// The users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse } = require("../../utils/helpers");

// @route       GET api/v1/users
// @desc        Get a valid user based via email and password
// @access      Public
router.get("/", (req, res) => {
   db.query(
      selectUser("eljoe1985@gmail.com", "2abdd486-4d8f-482e-b35d-f6eba05f9a7a")
   )
      .then((dbRes) => {
         const user = toSafeParse(toJson(dbRes))[0];
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
