import todo from "./modules/todoApp";
import taskFactory from "./modules/taskFactory";
import pubsub from "./modules/pubsub";
import view from "./modules/view";

pubsub.subscribe("todoDataChanged", deleteSecond);
todo.addProject(
  "test1",
  "adsoifhsduioghasfiuoghsdifhusidghsuighdsgushsaduighsuig",
  "4"
);
todo.addProject(
  "test2",
  "adsoifhsduioghasfiuoghsdifhusidghsuighdsgushsaduighsuig",
  "4"
);
todo.addProject(
  "test3",
  "adsoifhsduioghasfiuoghsdifhusidghsuighdsgushsaduighsuig",
  "4"
);
