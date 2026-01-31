import { Document, Types } from "mongoose";

export interface IScreening {
  therapyId: Types.ObjectId;
  screeningScore: number;
  counselorInterpretation: string;
  parentInterpretation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IScreeningDocument extends IScreening, Document {}

export type TCreateScreeningInput = Omit<
  IScreening,
  "createdAt" | "updatedAt" | "counselorInterpretation" | "parentInterpretation"
>;

export type TUpdateScreeningInput = Partial<IScreeningDocument>;
