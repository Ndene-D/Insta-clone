export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  if (actionTypes.SET_USER) {
    return { ...state, user: action.user };
  } else {
    return state;
  }
};

export default reducer;
