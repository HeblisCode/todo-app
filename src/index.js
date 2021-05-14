import projectFactory from "./modules/projectFactory";
import taskFactory from "./modules/taskFactory";

const projectOne = projectFactory(
  "Progetto Uno",
  "Breve descrizione del progetto",
  "3"
);

console.table(projectOne);
console.table(projectOne.pushTask(taskFactory("prova1", "22/10/1003")));
console.table(projectOne.pushTask("4"));
console.table(projectOne.pushTask("5"));
console.table(projectOne.pushTask("6"));
console.table(projectOne.deleteTask("5"));
console.table(
  projectOne.edit(
    "Progetto DUE",
    "Breve descrizione del progetto",
    "22/03/2020",
    "3"
  )
);
console.log(projectOne.getTasks());
projectOne.tasks[0].done();
