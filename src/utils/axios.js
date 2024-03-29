import axios from "axios";
export const host = `https://api.quasiquiz.fr`;
// export const host = `https://localhost:8000`;

export default axios.create({
	baseURL: host,
	withCredentials: true,
});

export const loginRoute = `/api/login`;
export const usersRoute = `/api/users`;
export const gamesRoute = "/api/games";
export const gameQuestions = "/api/game_has_questions";
export const mediaRoute = "/api/media";
export const questionsRoute = "/api/questions";
export const messagesRoute = "/api/messages";
export const userAnswersRoute = "/api/user_answers";
export const scoresRoute = "/api/scores";
export const gameHasUsersRoute = "/api/game_has_users";
export const refreshTokenRoute = `/api/token/refresh`;
export const logoutToken = `/api/token/invalidate`;
export const multiAvatarAPIKey = "27JS9MXha6pgzn";
export const multiAvatarRoute = "https://api.multiavatar.com/`";
//export const mercureHubUrl =
// "https://n1f0rt.stackhero-network.com/.well-known/mercure";
// export const mercureHubUrl = "http://localhost:3000/.well-known/mercure";
export const mercureHubUrl =
	"https://quasiquiz.org/mercure/.well-known/mercure";

export const axiosJWT = axios.create({
	baseURL: host,
	withCredentials: true,
});

//? à utiliser pour le PATCH:
// { headers: { "Content-Type": "application/merge-patch+json" } }
