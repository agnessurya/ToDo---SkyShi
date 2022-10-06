const route = require("express").Router();
const errorHandler = require("../middleware/errorHandler");
const ActivityController = require("../controllers/activityController");
const TodoController = require("../controllers/todoController");

//for activities
route.post("/activities", ActivityController.createActivity);
route.get("/activities", ActivityController.getActivity);
route.get("/activities/:id", ActivityController.getActivityById);
route.put("/activities/:id", ActivityController.updateActivity);
route.delete("/activities/:id", ActivityController.deleteActivity);

//for todolists
route.post("/todolists/:activityID", TodoController.createTodos);
route.get("/todolists", TodoController.getTodos);
route.get("/todolists/:activityID", TodoController.getTodosByActivityId);
route.get("/todolists-detail/:id", TodoController.getTodosById)
route.put("/todolists/:id", TodoController.updateTodos);
route.delete("/todolists/:id", TodoController.deleteTodos)


route.use(errorHandler);
module.exports = route;
