const projectFactory = (title, description, priority) => {
  const project = {
    title,
    description,
    priority,
    completed: false,
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
    getTasks() {
      return this.tasks;
    },
  };
  return Object.assign(Object.create(proto), project);
};

export default projectFactory;
