import { JwtPayload, verify } from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants";

export const isValidJwt = (jwt: string): Boolean => {
  try {
    const token = verify(jwt, TOKEN_SECRET);
  
    console.log(token)
  
    const currentTimestamp = Math.floor(Date.now() / 1000);
    console.log(currentTimestamp);
  
    // @ts-ignore
      if (token.iat <= currentTimestamp) {
        console.log('El token ha expirado');
        return false;
      } else {
        console.log('El token está vigente');
        return true;
      }
  } catch {
    return false;
  }
}
