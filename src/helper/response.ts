import mongoose from "mongoose";
import { Response } from "express";

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Data tidak ditemukan") {
    super(404, message);
  }
}

export const responseSuccessWithData = <T>(
  status: number,
  data: T,
  message: string
): { status: number; data: T; message: string } => ({
  status,
  data,
  message,
});

export const responseSuccessWithoutData = (
  status: number,
  success: boolean,
  message: string
): { status: number; success: boolean; message: string } => ({
  status,
  success,
  message,
});

export const responseError = (
  status: number,
  message: string
): { status: number; message: string } => ({ status, message });

export const identifyError = async (
  res: Response,
  error: any
): Promise<void> => {
  // 1️⃣ VALIDATION ERROR (required, match, minlength, dll)
  if (error instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(error.errors).map((err) => err.message);

    res.status(400).json(responseError(400, messages.join(", ")));
    return;
  }

  // 2️⃣ DUPLICATE KEY ERROR (email / phone)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];

    res.status(409).json(responseError(409, `${field} sudah digunakan.`));
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.status).json(responseError(error.status, error.message));
    return;
  }

  // 3️⃣ PASSWORD ERROR / CUSTOM ERROR
  if (error instanceof Error) {
    res.status(400).json(responseError(400, error.message));
    return;
  }

  // 4️⃣ FALLBACK (SERVER ERROR)
  res.status(500).json(responseError(500, "Server internal error."));
  return;
};
