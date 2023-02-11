import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.API_ENDPOINT}`,
});

export const register = async (userData) => {
  const { data } = await api.post("/register", userData).catch((e) => {
    errorHandler(e);
  });
  //     setError("");
  //     setSuccess(data.message);
  //     const { message, ...rest } = data;
  //     setTimeout(() => {
  //       dispatch({ type: "LOGIN", payload: rest });
  //       Cookies.set("user", JSON.stringify(rest));
  //       navigate("/");
  //     }, 2000);
  //   } catch (error) {
  //     setLoading(false);
  //     setSuccess("");
  //     setError(error.response.data.message);
  //   }
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
