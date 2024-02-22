// reducers.js
const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        // this will not modify the old state,
        // and the object returned include a new state.count,
        // which will replace the old state.count but has no negative effect on the old state
        // the updated state will return as a new object
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default counterReducer;
