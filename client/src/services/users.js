const axios = require("axios");
const URL = process.env.REACT_APP_SERVER_URL;

export const userLogin = async ({ email, password }) => {
  const response = await axios({
    url: `${URL}/api/auth/login`,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    data: JSON.stringify({ email, password }),
  });
  return response.data;
};

export const userRegistration = async ({ name, email, password }) => {
  const response = await axios({
    url: `${URL}/api/auth/register`,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    data: JSON.stringify({ name, email, password }),
  });
  return response.data;
};
