var express = require("express");
var router = express.Router();
var forumContoller = require("../controllers/forum");
router.get("/", forumContoller.getForum);
router.post("/", forumContoller.createForum);
router.put("/:_id", forumContoller.editForum);
router.delete("/:_id", forumContoller.deleteForum);
module.exports = router;
