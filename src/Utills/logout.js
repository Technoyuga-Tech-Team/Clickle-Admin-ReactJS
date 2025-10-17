import { logoutAction } from "../ReduxStore/Actions/user";
import { store } from "../ReduxStore/Store/store";

export const logout = () => {
  store.dispatch(logoutAction());
  localStorage.clear();
};
