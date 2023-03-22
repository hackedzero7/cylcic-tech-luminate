import axios from "axios";

const setAuthCookie = token => {
  console.log(token);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common[
      "Access-Control-Allow-Origin"
    ] = `http://localhost:5173`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthCookie;
