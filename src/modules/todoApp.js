import taskFactory from "./taskFactory";
import projectFactory from "./projectFactory";
import pubsub from "./pubsub";
import createNavBarProject from "./HTMLGenerators/createNavBar";

const todo = (function () {
  const projects = [];

  function findProjectIndex(id) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === id) return i;
    }
  }

  function findTaskIndex(project, id) {
    for (let i = 0; i < project.tasks.length; i++) {
      if (project.tasks[i].id === id) return i;
    }
  }

  function addProject(title) {
    const newProject = projectFactory(title, "", "");
    projects.push(newProject);
    pubsub.publish("todoDataChanged", projects);
  }

  function deleteProject(projID) {
    const index = findProjectIndex(projID);
    projects.splice(index, 1);
    pubsub.publish("todoDataChanged", projects);
  }

  function editProject(obj) {
    const index = findProjectIndex(obj.projId);
    projects[index].edit(obj.title, obj.description, obj.priority);
    pubsub.publish("todoDataChanged", projects);
  }

  function addTask(obj) {
    const newTask = taskFactory(obj.name, obj.date);
    const projIndex = findProjectIndex(obj.id);
    projects[projIndex].tasks.push(newTask);
    pubsub.publish("todoDataChanged", projects);
  }

  function deleteTask(obj) {
    const taskIndex = findTaskIndex(obj.project, obj.id);
    const projectIndex = findProjectIndex(obj.project.id);
    projects[projectIndex].tasks.splice(taskIndex, 1);
    pubsub.publish("todoDataChanged", projects);
  }

  function editTask(obj) {
    const projIndex = findProjectIndex(obj.project.id);
    const taskIndex = findTaskIndex(obj.project, obj.taskId);
    projects[projIndex].tasks[taskIndex].edit(obj.name, obj.date);
    pubsub.publish("todoDataChanged", projects);
  }

  function completeTask(obj) {
    const projIndex = findProjectIndex(obj.projId);
    const taskIndex = findTaskIndex(projects[projIndex], obj.taskId);
    projects[projIndex].tasks[taskIndex].done();
    pubsub.publish("todoDataChanged", projects);
  }

  function incompleteTask(obj) {
    const projIndex = findProjectIndex(obj.projId);
    const taskIndex = findTaskIndex(projects[projIndex], obj.taskId);
    projects[projIndex].tasks[taskIndex].notDone();
    pubsub.publish("todoDataChanged", projects);
  }

  function restoreFromData(obj) {}

  pubsub.subscribe("addProject", addProject);
  pubsub.subscribe("deleteProject", deleteProject);
  pubsub.subscribe("deleteTask", deleteTask);
  pubsub.subscribe("completeTask", completeTask);
  pubsub.subscribe("incompleteTask", incompleteTask);
  pubsub.subscribe("editProject", editProject);
  pubsub.subscribe("editTask", editTask);

  return {
    addProject,
  };
})();

export default todo;