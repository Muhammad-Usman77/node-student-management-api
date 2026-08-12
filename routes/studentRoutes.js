const express = require("express");
const {
  handlegetAllstudent,
  handlegetStudentById,
  handlegetStudnetBySearch,
  handleUpdateUserByPatch,
  hanldeCreteStudent,
  deleteStudentById,
  handleUpdateStudent,
} = require("../controller/studentController");
const router = express.Router();
// let users = [];
//get all users

router.route("/").get(handlegetAllstudent).post(hanldeCreteStudent);
router.route("/search").get(handlegetStudnetBySearch);
router
  .route("/:id")
  .patch(handleUpdateUserByPatch)
  .delete(deleteStudentById)
  .put(handleUpdateStudent)
  .get(handlegetStudentById);

module.exports = router;
