import { Document, Types } from "mongoose";

export interface IObservation {
  therapyId: Types.ObjectId;
  sessionOne: string;
  sessionTwo: string;
  sessionThree: string;
  sessionFour: string;
  sessionFive: string;
  sessionSix: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IObservationDocument extends IObservation, Document {}

export type TCreateObservationInput = Omit<
  IObservation,
  "createdAt" | "updatedAt"
>;

export type TUpdateObservationInput = Partial<IObservationDocument>;
