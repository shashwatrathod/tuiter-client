import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_TUIT_SERVICE_URL ||
  "https://shash-tuiter.herokuapp.com/api";
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
  withCredentials: true,
});

export const userTogglesTuitLikes = (uid, tid) =>
  api
    .post(`${USERS_API}/${uid}/likes/${tid}`)
    .then((response) => response.data);

export const hasUserLikedTheTuit = (uid, tid) => {
  return api.get(`${USERS_API}/${uid}/likes/${tid}`).then((response) => {
    return response.data?._id !== undefined;
  });
};
