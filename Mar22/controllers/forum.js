const { body, validationResult } = require("express-validator");
const Forum = require("../models/forum");

function getForum(req, res) {
  Forum.find((err, Forums_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(Forums_list);
    }
  });
}

const createForum = [
  body("title")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("title should have length min 10 ,max 100 chars"),
  body("forumBody")
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage("forum body should have range between 50 and 500"),
  body("author")
    .trim()
    .isAlphanumeric()
    .withMessage(
      "only alpha numeric author name should not contain special characters"
    )
    .isLength({ min: 5, max: 50 })
    .withMessage("author name should have range from 5 to 50 chars"),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      console.log(req.body);
      let { title, doc, forumbody, author } = req.body;
      let ForumObject = new Forum({ title, doc, forumbody, author });
      ForumObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: "adding Forum completed" });
        }
      });
    }
  },
];
const editForum = [
  body("title")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("title should have length min 10 ,max 100 chars"),
  body("forumBody")
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage("forum body should have range between 50 and 500"),
  body("author")
    .trim()
    .isAlphanumeric()
    .withMessage(
      "only alpha numeric author name should not contain special characters"
    )
    .isLength({ min: 5, max: 50 })
    .withMessage("author name should have range from 5 to 50 chars"),
  (req, res) => {
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_errors: errors });
    } else {
      let newData = { $set: req.body };
      console.log(newData);
      Forum.findByIdAndUpdate(req.params._id, newData, function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json(`Forum with _id as ${req.params._id} is edited`);
        }
      });
    }
  },
];

function deleteForum(req, res) {
  Forum.findByIdAndDelete(req.params._id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`Forum with _id as ${req.params._id} is removed`);
    }
  });
}
module.exports = { getForum, createForum, deleteForum, editForum };
