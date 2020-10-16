import { USER_CREATE, USER_LOGIN, USER_LOGOUT } from "../actionTypes";
import Axios from "axios";

export const userCreate = (user) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      "/user/register",
      {
        ...user
      }
    );
    console.log(data)
    dispatch({ type: USER_CREATE, payload: data.user });
  } catch (err){
    console.log(err);
  }
};

export const loginUser = (user) => async (dispatch) => {
  console.log(user);
  try {
    const {
      data
    } = await Axios.post(
      `/login`,
      { ...user }
    );
    dispatch({ type: USER_LOGIN, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"))
  try {
    const {
      data
    } = await Axios.delete(
      `/logout`,
      {
        headers: {
          Authorization: user.accessToken
        }
      }
    );
    localStorage.removeItem("token")
    dispatch({ type: USER_LOGOUT, payload: data });
  } catch (err) {
    console.error(err);
  }
};
