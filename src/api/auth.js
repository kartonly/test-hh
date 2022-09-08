const axios = require("axios").default;
const URL_BASE = "http://localhost:8080/";
const requestHeaders = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};
export const login = (user) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${URL_BASE}api/v1/login`, user, requestHeaders)
      .then(function (resp) {
        const token = resp.data[1];
        localStorage.setItem("token", token);
        resolve(resp);
      })
      .catch(function (err) {
        localStorage.removeItem("token");
        reject(err);
      });
  });
export const logout = () => {
    localStorage.removeItem("token");
  };