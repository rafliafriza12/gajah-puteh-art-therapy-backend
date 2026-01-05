import { Document } from "mongoose";

export interface IParent {
  email: string;
  fullname: string;
  address: string;
  phone: string;
  work: string;
  age: number;
  password: string;
  accessToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IParentDocument extends IParent, Document {}

export type TUpdateParentInput = Partial<IParentDocument>;

export type TCreateParentInput = Omit<
  IParent,
  "accessToken" | "createdAt" | "updatedAt"
>;

export type TLoginParentInput = Pick<IParent, "email" | "password">;

export interface ILoginParentResponse {
  user: Omit<
    IParentDocument,
    "password" | "accessToken" | "createdAt" | "updatedAt"
  >;
  token: string;
}
