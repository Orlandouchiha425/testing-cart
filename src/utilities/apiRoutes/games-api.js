import { sendRequest } from "../send-request";

const BASE_URL = "/api/games";

export async function createGames(gameData) {
  return sendRequest(`${BASE_URL}`, "POST", gameData);
}

export async function deleteGames(gameId) {
  return sendRequest(`${BASE_URL}/${gameId}`, "DELETE");
}

export async function findAllGames() {
  return sendRequest(BASE_URL);
}

export async function editGames(gameEdit, edits) {
  return sendRequest(`${BASE_URL}/${gameEdit}`, "PUT", edits);
}

// export async function getGames(gameOneGame){
//     return sendRequest(`${BASE_URL}/${gameOneGame}`,'GET')
// }

export function getUserGames(usersGames) {
  return sendRequest(`${BASE_URL}/${usersGames}`, "GET", null);
}

export function getClearanceGames() {
  return sendRequest(`${BASE_URL}/clearance`); ///  return sendRequest(api/games/clearance)
}

export async function findOnegameById(gameId) {
  return sendRequest(`${BASE_URL}/home/${gameId}`, "GET");
}

export function createImage(gameCreated) {
  return sendRequest(`${BASE_URL}`, "POST", gameCreated);
}
