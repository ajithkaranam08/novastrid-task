import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export function isAuthorized() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header("authorization");

    if (!authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authorization.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Token missing in authorization header" });
    }

    try {
      const decoded = jwt.verify(token, "8c35d720f5672e204eae080d539517f616799a5bdf5427d2ae9d5fc76e2f1b97") as { userId: string }; // Example structure
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
}
