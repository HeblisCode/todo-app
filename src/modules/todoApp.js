import taskFactory from "./taskFactory";
import projectFactory from "./projectFactory";
import pubsub from "./pubsub";

const todo = (function () {
  const projects = [];

  function addProject(title, description, priority) {
    const newProject = projectFactory(title, description, priority);
    projects.push(newProject);
    pubsub.publish("todoDataChanged", projects);
  }

  function deleteProject(projID) {
    let projectIndex;
    projects.forEach((project, i) => {
      if (project.id === projID) {
        projectIndex = i;
      }
    });
    projects.splice(i, 1);
    pubsub.publish("todoDataChanged", projects);
  }

  function addTask(project, name, date) {
    const newTask = taskFactory(name, date);
    project.tasks.push(newTask);
    pubsub.publish("todoDataChanged", projects);
  }

  function deleteTask(project, taskID) {
    let taskIndex;
    project.tasks.forEach((task, i) => {
      if (task.id === taskID) {
        taskIndex = i;
      }
    });
    pubsub.publish("todoDataChanged", projects);
  }

  function restoreFromData(obj) {}

  return {
    addProject,
    deleteProject,
    deleteTask,
  };
})();

export default todo;
