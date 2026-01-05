import { Types } from "mongoose";
import Pretest from "../models/Pretest";
import {
  IPretestDocument,
  TCreatePretestInput,
  TUpdatePretestInput,
} from "../types/pretest.type";
import { NotFoundError } from "../helper/response";

class PretestService {
  public create = async (
    input: TCreatePretestInput
  ): Promise<IPretestDocument> => {
    try {
      const pretest = new Pretest(input);
      await pretest.save();
      return pretest;
    } catch (error) {
      throw error;
    }
  };

  public getById = async (id: string): Promise<IPretestDocument> => {
    try {
      const pretest = await Pretest.findById(id);
      if (!pretest) throw new NotFoundError("Data pretest tidak ditemukan.");
      return pretest;
    } catch (error) {
      throw error;
    }
  };

  public getByTherapyId = async (
    therapyId: string
  ): Promise<IPretestDocument | null> => {
    try {
      const id = new Types.ObjectId(therapyId);
      const pretest = await Pretest.findOne({ therapyId: id });
      if (!pretest) return null;
      return pretest;
    } catch (error) {
      throw error;
    }
  };

  public update = async (
    id: string,
    input: TUpdatePretestInput
  ): Promise<IPretestDocument> => {
    try {
      const pretest = await Pretest.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });
      if (!pretest) throw new NotFoundError("Data pretest tidak ditemukan.");
      return pretest;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: string): Promise<boolean> => {
    try {
      const pretest = await Pretest.findByIdAndDelete(id);
      if (!pretest) throw new NotFoundError("Data pretest tidak ditemukan");
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export default new PretestService();
