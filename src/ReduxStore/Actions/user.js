export const getUserDataAction = (payload) => ({
    type: "GET_USER_DATA",
    payload,
  });

export const logoutAction = () => ({
    type: "LOGOUT",
  });

  export const tokenAction = (payload) => ({
    type: "TOKEN",
    payload,
  });