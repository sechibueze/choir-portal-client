import jwtDecode from 'jwt-decode';
import { AUTH_TOKEN } from '../constants';
export default function(){
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (!authToken) {
        return null
    }
    const decodedToken = jwtDecode(authToken);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem(AUTH_TOKEN)
        return null
    }

    return authToken;
}