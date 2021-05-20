import pubsub from "./pubsub";
const storage = (function () {
  function set(data) {
    localStorage.setItem("Heb.doAppProjects", JSON.stringify(data));
  }

  function get() {
    return JSON.parse(localStorage.getItem("Heb.doAppProjects"));
  }

  pubsub.subscribe("todoDataChanged", set);
  pubsub.publish("init", get());
})();
