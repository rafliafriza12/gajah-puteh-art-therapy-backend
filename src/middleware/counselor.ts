import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IJWTPayload } from "../types/auth.type";

declare global {
  namespace Express {
    interface Request {
      payload?: IJWTPayload;
    }
  }
}

export const verifyCounselor = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (req.payload?.role !== "counselor")
      res.status(403).json({
        status: 403,
        message: "Akses ditolak.",
      });

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        status: 401,
        message: "Sesi sudah habis, silahkan login ulang.",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({
        status: 403,
        message: "Sesi tidak valid.",
      });
    } else {
      console.error("JWT verification error:", error);
      res.status(500).json({
        status: 500,
        message: "Verifikasi sesi gagal.",
      });
    }
  }
};
