import axios from "axios";

const httpdefault = () => {
  return axios.create({ 
    baseURL: "https://localhost:44348/api",
    headers: {
      "Content-type": "application/json"
  }
})
};


export default {
  httpdefault
};
