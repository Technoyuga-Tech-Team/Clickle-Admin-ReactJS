var initialState = {
  loginCredential: null,
  userDetails: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_DATA":
      return {
        ...state,
        userDetails: action.payload,
      };

    case "TOKEN":
      return {
        ...state,
        loginCredential: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        loginCredential: null,
        userDetails: null,
      };

    default:
      return state;
  }
};
export default userReducer;