import axios from "axios";
import { useDispatch } from "react-redux";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  //baseURL: "http://localhost:8000",
});

export const login = async (userData) => {
  console.log(process.env.REACT_APP_BACKEND_URL);

  console.log("in api call", userData);
  const { data } = await api.post(`/login`, userData).catch((e) => {
    errorHandler(e);
  });
  return data;
};

export const register = async (userData) => {
  const { data } = await api.post("/register", userData).catch((e) => {
    errorHandler(e);
  });
  return data;
};

//handle all errors
function errorHandler(error) {
  if (error.response) {
    console.log("error from api call");

    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw error.response;
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  console.log(error.config);
}
