const express = require("express");
const router = express();
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.route("/").get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);
// "/:id" must go below because otherwise the route "showMe" generates a conflict
router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
