import jwtDecode from "jwt-decode";
import { AUTH_TOKEN } from "../constants";
function validate() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  if (!authToken) {
    return null;
  }
  const decodedToken = jwtDecode(authToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(AUTH_TOKEN);
    return null;
  }

  return authToken;
}
export default validate;
