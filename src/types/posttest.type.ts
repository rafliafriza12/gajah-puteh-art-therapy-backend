import { Document, Types } from "mongoose";

export interface IPosttest {
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
  totalPosttestScore: number;
  totalPosttestInterpretation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPosttestDocument extends IPosttest, Document {}

export type TCreatePosttestInput = Omit<IPosttest, "createdAt" | "updatedAt">;

export type TUpdatePosttestInput = Partial<IPosttestDocument>;
