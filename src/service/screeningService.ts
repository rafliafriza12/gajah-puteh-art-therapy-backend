import { Types } from "mongoose";
import Screening from "../models/Screening";
import {
  IScreeningDocument,
  TCreateScreeningInput,
  TUpdateScreeningInput,
} from "../types/screening.type";
import { NotFoundError } from "../helper/response";

class ScreeningService {
  public create = async (
    input: TCreateScreeningInput
  ): Promise<IScreeningDocument> => {
    try {
      const screening = new Screening(input);
      await screening.save();
      return screening;
    } catch (error) {
      throw error;
    }
  };

  public getById = async (id: string): Promise<IScreeningDocument> => {
    try {
      const screening = await Screening.findById(id);
      if (!screening)
        throw new NotFoundError("Data screening tidak ditemukan.");
      return screening;
    } catch (error) {
      throw error;
    }
  };

  public getByTherapyId = async (
    therapyId: string
  ): Promise<IScreeningDocument | null> => {
    try {
      const id = new Types.ObjectId(therapyId);
      const screening = await Screening.findOne({ therapyId: id });
      if (!screening) return null;
      return screening;
    } catch (error) {
      throw error;
    }
  };

  public update = async (
    id: string,
    input: TUpdateScreeningInput
  ): Promise<IScreeningDocument> => {
    try {
      const screening = await Screening.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });
      if (!screening) throw new NotFoundError("Data screening tidak ditemukan");
      return screening;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: string): Promise<boolean> => {
    try {
      const screening = await Screening.findByIdAndDelete(id);
      if (!screening) throw new NotFoundError("Data screening tidak ditemukan");
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export default new ScreeningService();
