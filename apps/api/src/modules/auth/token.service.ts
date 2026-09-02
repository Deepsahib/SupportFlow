import jwt from "jsonwebtoken";
import { AppError } from "../../common/errors/AppError.js";

export const generateAccessToken = (
  userId: string | number
): string => {
  const secret = process.env.JWT_ACCESS_SECRET;
  const expiresIn = process.env.JWT_ACCESS_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error("JWT env variables are missing");
  }

  return jwt.sign(
    { userId },
    secret,
    { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] }
  );
};

export const verifyJwt=(token:string)=>{
    
      const secret = process.env.JWT_ACCESS_SECRET;
    
      if (!secret) {
        return (AppError("JWT secret missing", 500));
      }
    
      return jwt.verify(token,secret)
}

export const verifyRefreshToken = (token: string) => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw AppError("JWT refresh secret missing", 500);
  }

  return jwt.verify(token, secret);
};

export const generateRefreshToken = (userId: string): string => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw AppError("JWT secret missing", 500);
  }

  const expires = process.env.JWT_REFRESH_EXPIRES_IN;

  if (!expires) {
    throw AppError("Expire time is missing", 500);
  }

  const token = jwt.sign(
    { userId },
    secret,
    {
      expiresIn: expires as jwt.SignOptions["expiresIn"],
    }
  );

  return token;
};