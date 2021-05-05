function combineReduce(reducerMap) {
  return function (state = {}, action) {
    let finaleState = {};
    for (let name in reducerMap) {
      finaleState[name] = reducerMap[name].call(null, state[name], action);
    }
    return finaleState;
  };
}

function createStore(reducer, defaultState) {
  let state = defaultState,
    listeners = [],
    subscribe = (callback) => {
      listeners.push(callback);
    },
    dispatch = (action) => {
      state = reducer.call(null, state, action);
      listeners.forEach((l) => l.call(null, action));
    },
    getState = () => state;

  return {
    subscribe,
    dispatch,
    getState,
  };
}

export { combineReduce };
export default createStore;
