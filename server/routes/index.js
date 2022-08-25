const router = require("express").Router();

const {
  loginUser,
  registerUser,
  getUserInfo,
  logoutUser,
} = require("../controllers/user");

const {
  getCollections,
  addCollection,
  updateCollectionName,
  deleteCollection,
} = require("../controllers/collections");

const {
  getTasks,
  updateTaskStatus,
  addTask,
  deleteTask,
} = require("../controllers/tasks");

const { isAuth, authenticate } = require("../middleware/auth");

router.post(
  "/login", //TODO: change redirects
  authenticate,
  loginUser
);

router.post("/register", registerUser);

router.get("/user", isAuth, getUserInfo);

router.post("/logout", logoutUser);

// router.get("/", (req, res) => {
//   res.send("home");
// });

router.use(isAuth);

router.get("/collections", getCollections);

router.post("/collections", addCollection);

router.delete("/collections", deleteCollection);

router.patch("/collections", isAuth, updateCollectionName);

router.get("/tasks", getTasks);

router.patch("/tasks", updateTaskStatus);

router.post("/tasks", addTask);

router.delete("/tasks", deleteTask);

module.exports = router;
