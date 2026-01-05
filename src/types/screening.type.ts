import { Document, Types } from "mongoose";

export interface IScreening {
  therapyId: Types.ObjectId;
  depressionScore: number;
  depressionInterpretation: string;
  anxietyScore: number;
  anxietyInterpretation: string;
  stressScore: number;
  stressInterpretation: string;
  totalScreeningScore: number;
  totalScreeningInterpretation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IScreeningDocument extends IScreening, Document {}

export type TCreateScreeningInput = Omit<IScreening, "createdAt" | "updatedAt">;

export type TUpdateScreeningInput = Partial<IScreeningDocument>;
