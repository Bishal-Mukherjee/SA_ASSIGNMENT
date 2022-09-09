import axios from "axios";
const URL = process.env.REACT_APP_SERVER_URL;

export const addQuestions = async ({ questions }) => {
  const { email } = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await axios({
      url: `${URL}/api/questions/addQuestions`,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "POST",
      data: JSON.stringify({ email, questions }),
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllQuestionIds = async () => {
  const { email } = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await axios({
      url: `${URL}/api/questions/getAllQuestionIds`,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "POST",
      data: JSON.stringify({ email }),
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getQuestionById = async ({ questionPaperId }) => {
  try {
    const response = await axios({
      url: `${URL}/api/questions/getQuestionById`,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "POST",
      data: JSON.stringify({ questionPaperId }),
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
