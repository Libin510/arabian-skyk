import axios from "axios";

const API = {

    HOST: 'http://localhost:3033/',


  //login
  LOGIN: { url: "login", method: "POST" },
  SIGNUP: { url: "signup", method: "POST" },

  //Career
  GET_CAREER: { url: "career/get", method: "POST" },
  ADD_CAREER: { url: "career/add", method: "POST" },
  UPDATE_CAREER: { url: "career/update", method: "POST" },
  DELETE_CAREER: { url: "career/delete", method: "POST" },
    APPLY_JOB: { url: "career/job/apply", method: "POST" },
    GET_JOB_APPLICATIONS: { url: "career/job/list", method: "POST" },

  //Order
  GET_ORDER: { url: "order/get", method: "POST" },
  ADD_ORDER: { url: "order/add", method: "POST" },
  UPDATE_ORDER: { url: "order/update", method: "POST" },
  DELETE_ORDER: { url: "order/delete", method: "POST" },

  //Service
  GET_SERVICE: { url: "service/get", method: "POST" },
  ADD_SERVICE: { url: "service/add", method: "POST" },
  UPDATE_SERVICE: { url: "service/update", method: "POST" },
  DELETE_SERVICE: { url: "service/delete", method: "POST" },

    //Dasboard
    GET_DASHBOARD: { url: "dashboard/get", method: "POST" },

    //Contact
    ADD_CONTACT: { url: "contact", method: "POST" },


};

export default API;

// const token = (localStorage.getItem("token"));

const BASE_URL = `${API.HOST}`;

const action = async (endpoint, payload = {}, { headers = {} } = {}) => {
  const { url, method } = endpoint;
  const fullUrl = `${BASE_URL}${url}`;
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }
  const defaultHeaders = {
    " x-access-token": token,
    ...headers,
  };

  try {
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(fullUrl, {
          params: payload,
          headers: defaultHeaders,
        });
        break;
      case "POST":
        response = await axios.post(fullUrl, payload, {
          headers: defaultHeaders,
        });
        break;
      case "PUT":
        response = await axios.put(fullUrl, payload, {
          headers: defaultHeaders,
        });
        break;
      case "DELETE":
        response = await axios.delete(fullUrl, {
          headers: defaultHeaders,
          payload,
        });
        break;
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export { action };
