import axios from "axios";
const host = `https://localhost:8000/api`;

export default axios.create({
	baseURL: host,
	withCredentials: true,
});

export const loginRoute = `/login`;
export const usersRoute = `/users`;
export const refreshTokenRoute = `/token/refresh`;

// export const axiosPrivate = axios.create({
// 	baseURL: host,
// 	withCredentials: true,
// });
