import { Document, Types } from "mongoose";

export interface IPretest {
  therapyId: Types.ObjectId;
  totalDifficultiesScore: number;
  totalDifficultiesInterpretation: string;
  emotionalSymptomsScore: number;
  emotionalSymptomsInterpretation: string;
  conductProblemScore: number;
  conductProblemInterpretation: string;
  hyperactivityScore: number;
  hyperactivityInterpretation: string;
  peerProblemScore: number;
  peerProblemInterpretation: string;
  prosocialBehaviourScore: number;
  prosocialBehaviourInterpretation: string;
  totalPretestScore: number;
  totalPretestInterpretation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPretestDocument extends IPretest, Document {}

export type TCreatePretestInput = Omit<IPretest, "createdAt" | "updatedAt">;

export type TUpdatePretestInput = Partial<IPretestDocument>;
