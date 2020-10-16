import { USER_CREATE, USER_LOGIN,USER_LOGOUT ,} from "../actionTypes";

const userState = {
  user: JSON.parse(localStorage.getItem('user')) || null
};

const userReducer = (state = userState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_CREATE:
      return { ...state, ...state.user.push(payload) };
    case USER_LOGIN:
      const userJSON = JSON.stringify(payload)
      localStorage.setItem('user', userJSON)
      return { ...state, user: payload };
    case USER_LOGOUT:
      localStorage.removeItem('user')
      return {...state, user: null}
    default:
      return state;
  }
};

export default userReducer;
