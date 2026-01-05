import { Document, Types } from "mongoose";

export interface ITherapy {
  counselorId: Types.ObjectId;
  childId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITherapyDocument extends ITherapy, Document {}

export type TCreateTherapyInput = Omit<ITherapy, "createdAt" | "updatedAt">;

export type TUpdateTherapyInput = Partial<ITherapyDocument>;
