import axios from "axios";
const host = `https://localhost:8000/api`;

export default axios.create({
	baseURL: host,
	withCredentials: true,
});

export const loginRoute = `/login`;
export const usersRoute = `/users`;
export const gamesRoute = "/games";
export const gameHasUsersRoute = "/game_has_users";
export const refreshTokenRoute = `/token/refresh`;
export const logoutToken = `token/invalidate`;

export const multiAvatarAPIKey = "27JS9MXha6pgzn";
export const multiAvatarRoute = "https://api.multiavatar.com/`";

export const axiosJWT = axios.create({
	baseURL: host,
	withCredentials: true,
});

//? à utiliser pour le PATCH:
// { headers: { "Content-Type": "application/merge-patch+json" } }
