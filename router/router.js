let express = require("express");
const router = express.Router();
let controller = require("../controller/usercontroller");
let econtroller = require("../controller/empController");
const auth = require("../middleware/Authentication");

router.post("/register", controller.Register);
router.post("/login", controller.loginUser);

router.post("/addEmployee", auth, econtroller.createNote);
router.post("/getEmployeeDetails", auth, econtroller.getAllNotes);
router.post("/updateEmployee", auth, econtroller.updateNotesController);
router.post("/deleteEmployee", auth, econtroller.deleteForeverNote);

module.exports = router;
