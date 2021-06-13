import { combineReducers } from "redux";
import { signInType, signOutType, userInfoType } from "./actionTypes";

export const signInReduser = (state = false, action: any) => {
  switch (action.type) {
    case signInType.type:
      return action.user;
    case signOutType.type:
      return null;
    default:
      return state;
  }
};

export const getUserInfo = (state = null, action: any) => {
  switch (action.type) {
    case userInfoType.type:
      return action.info;
    case signOutType.type:
      return null;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  userInfo: getUserInfo,
  user: signInReduser,
});
