import pubsub from "./pubsub";
const storage = (function () {
  function set(data) {
    localStorage.set(JSON.stringify(data));
  }
  function get(data) {
    console.log(JSON.parse(localStorage.get(data)));
  }

  pubsub.subscribe("todoDataChanged", set);
  pubsub.subscribe("todoDataChanged", get);
})();
