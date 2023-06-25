import { verify } from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants";

export const isValidJwt = (jwt: string): Boolean => {
  try {
    const token = verify(jwt, TOKEN_SECRET);
    const currentTimestamp = Math.floor(Date.now() / 1000);
  
    // @ts-ignore
      if (token.iat <= currentTimestamp) {
        return false;
      } else {
        return true;
      }
  } catch {
    return false;
  }
}
