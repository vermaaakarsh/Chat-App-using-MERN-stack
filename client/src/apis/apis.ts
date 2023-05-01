import axios from "axios";

const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const checkConnection = () =>
  axios.get(serverBaseUrl + "/health", {
    headers: {
      "Content-Type": "application/json",
    },
  });

export default {
  checkConnection,
};
