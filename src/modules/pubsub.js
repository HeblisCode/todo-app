const pubsub = (function () {
  const _events = {};

  function _checkEventName(name) {
    if (_events[name] === undefined) {
      console.log(`PubSub says: "${name}" hasn't been published yet!`);
      return false;
    }
    return true;
  }

  function _checkHandler(name, handler) {
    if (_events[name].indexOf(handler) < 0) {
      console.log(`PubSub says: no such handler found`);
      return false;
    }
    return true;
  }

  function subscribe(eventName, handler) {
    if (_events[eventName] === undefined) {
      _events[eventName] = [];
    }
    _events[eventName].push(handler);
    console.log(_events);
  }

  function unsubscribe(eventName, handler) {
    if (!_checkEventName(eventName) || !_checkHandler(eventName, handler)) {
      return;
    }
    const handlerIndex = _events[eventName].indexOf(handler);
    _events[eventName].splice(handlerIndex, 1);
    console.log(_events);
  }

  function publish(eventName, arg) {
    if (!_checkEventName(eventName)) return;
    _events[eventName].forEach((element) => element(arg));
  }

  return {
    subscribe,
    unsubscribe,
    publish,
  };
})();

export default pubsub;
