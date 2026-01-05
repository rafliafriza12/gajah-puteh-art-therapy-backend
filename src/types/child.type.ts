import { Document, Types } from "mongoose";

export interface IChildEducation {
  stage: "SD" | "SMP" | "SMA";
  class: number;
}

export interface IChild {
  parentId: Types.ObjectId;
  nik: string;
  fullname: string;
  gender: boolean;
  age: number;
  biologicalMotherName: string;
  birth: Date;
  childOrder: number;
  education: IChildEducation;
  createdAt: Date;
  updatedAt: Date;
}

export type TCreateChildInput = Omit<
  IChild,
  "parentId" | "createdAt" | "updatedAt"
>;

export type TUpdateChildInput = Partial<IChildDocument>;

export interface IChildDocument extends IChild, Document {}
