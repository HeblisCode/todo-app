const taskFactory = (name, date) => {
  const task = {
    name,
    date,
    isDone: false,
  };

  const proto = {
    done() {
      this.isDone = true;
    },
    notDone() {
      this.isDone = false;
    },
    edit(name, date) {
      this.name = name;
      this.date = date;
    },
  };
  return Object.assign(Object.create(proto), task);
};

export default taskFactory;
