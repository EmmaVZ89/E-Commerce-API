const express = require("express");
const router = express();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);
router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);
// "/:id" must go below because otherwise the route "showMe" generates a conflict
router.route("/:id").get(getSingleUser);


module.exports = router;
