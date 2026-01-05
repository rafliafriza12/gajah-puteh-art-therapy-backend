import { Document } from "mongoose";

export interface IEducation {
  university: string;
  stage: "D3" | "D4" | "S1" | "S2" | "S3";
  majority: string;
  semester?: number | null;
}

export interface ICounselor {
  email: string;
  fullname: string;
  address: string;
  phone: string;
  isStudent: boolean;
  education: IEducation;
  password: string;
  practiceLicenseNumber?: string | null;
  work?: string | null;
  accessToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICounselorDocument extends ICounselor, Document {}

export type TCreateCounselorInput = Omit<
  ICounselor,
  "accessToken" | "createdAt" | "updatedAt"
>;

export type TUpdateCounselorInput = Partial<ICounselorDocument>;

export type TLoginCounselorInput = Pick<ICounselor, "email" | "password">;

export interface ILoginCounselorResponse {
  user: Omit<
    ICounselorDocument,
    "password" | "accessToken" | "createdAt" | "updatedAt"
  >;
  token: string;
}
