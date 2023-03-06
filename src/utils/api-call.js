import axios from "axios";
import Cookies from "js-cookie";
import { LoadingStimulate } from "./LoadingStimulate";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  //baseURL: "http://localhost:8000",
});

// const token = Cookies.get("token");

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (userData) => {
  // console.log(process.env.REACT_APP_BACKEND_URL);

  // console.log("in api call", userData);
  const { data } = await api.post(`/login`, userData).catch((e) => {
    errorHandler(e);
  });
  return data;
};

export const register = async (userData) => {
  const { data } = await api.post("/register", userData);
  return data;
};

export const getUserData = async () => {
  await LoadingStimulate(1000);
  const { data } = await api.get(`/auth`).catch((e) => {
    errorHandler(e);
  });
  return data;
};

export const findUser = async (email) => {
  const { data } = await api.post(`/findUser`, email);
  return data;
};

export const sendPassResetCode = async (email) => {
  const { data } = await api.post("/sendResetPasswordCode", email);
  return data;
};

export const validatePassResetCode = async (req) => {
  const { data } = await api.post("/validateResetCode", req);
  return data;
};

export const changePassword = async (req) => {
  const { data } = await api.post("/newpassword", req);
  return data;
};

export const createPost = async (req) => {
  const { data } = await api.post("/createPost", req);
  return data;
};

export const uploadImages = async (req, path) => {
  const { data } = await api.post("/uploadImages", req, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return data;
};

export const getAllPosts = async () => {
  await LoadingStimulate(3000);
  const { data } = await api.get("/getAllPosts");
  return data;
};

export const userProfile = async (param) => {
  const { data } = await api.get(`/${param}`);
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
