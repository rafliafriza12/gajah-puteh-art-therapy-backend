import { Types } from "mongoose";
import Observation from "../models/Observation";
import {
  IObservationDocument,
  TCreateObservationInput,
  TUpdateObservationInput,
} from "../types/observation.type";
import { NotFoundError } from "../helper/response";

class ObservationService {
  public create = async (
    input: TCreateObservationInput
  ): Promise<IObservationDocument> => {
    try {
      const observation = new Observation(input);
      await observation.save();
      return observation;
    } catch (error) {
      throw error;
    }
  };

  public getById = async (id: string): Promise<IObservationDocument> => {
    try {
      const observation = await Observation.findById(id);
      if (!observation)
        throw new NotFoundError("Data observasi tidak ditemukan");
      return observation;
    } catch (error) {
      throw error;
    }
  };

  public getByTherapyId = async (
    therapyId: string
  ): Promise<IObservationDocument | null> => {
    try {
      const id = new Types.ObjectId(therapyId);
      const observation = await Observation.findOne({ therapyId: id });
      if (!observation) return null;
      return observation;
    } catch (error) {
      throw error;
    }
  };

  public update = async (
    id: string,
    input: TUpdateObservationInput
  ): Promise<IObservationDocument> => {
    try {
      const observation = await Observation.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });
      if (!observation)
        throw new NotFoundError("Data observasi tidak ditemukan.");
      return observation;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: string): Promise<boolean> => {
    try {
      const observation = await Observation.findByIdAndDelete(id);
      if (!observation)
        throw new NotFoundError("Data observasi tidak ditemukan");
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export default new ObservationService();
