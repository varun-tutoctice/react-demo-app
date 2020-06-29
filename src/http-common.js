import axios from "axios";

export default axios.create({
  baseURL: "https://service.accelerate-dev.com/acc-api",
  headers: {
    "Content-type": "application/json"
  }
});