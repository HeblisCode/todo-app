import pubsub from "./pubsub";
const taskFactory = (name, date) => {
  const MAX_ID_NUMBER = 999999;
  const randomID = Math.floor(Math.random() * MAX_ID_NUMBER);
  const task = {
    name,
    date,
    isDone: false,
    id: `taskID${randomID}`,
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
