const projectFactory = (title, description, priority) => {
  const MAX_ID_NUMBER = 999999;
  const randomID = Math.floor(Math.random() * MAX_ID_NUMBER);
  const project = {
    title,
    description,
    priority,
    id: `projID${randomID}`,
    tasks: [],
  };
  const proto = {
    pushTask(task) {
      this.tasks.push(task);
    },
    deleteTask(task) {
      const deleteIndex = this.tasks.indexOf(task);
      this.tasks.splice(deleteIndex, 1);
    },
    edit(title, description, priority) {
      this.title = title;
      this.description = description;
      this.priority = priority;
    },
  };
  return Object.assign(Object.create(proto), project);
};

export default projectFactory;
