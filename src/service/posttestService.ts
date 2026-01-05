import { Types } from "mongoose";
import Posttest from "../models/Posttest";
import {
  IPosttestDocument,
  TCreatePosttestInput,
  TUpdatePosttestInput,
} from "../types/posttest.type";
import { NotFoundError } from "../helper/response";

class PosttestService {
  public create = async (
    input: TCreatePosttestInput
  ): Promise<IPosttestDocument> => {
    try {
      const posttest = new Posttest(input);
      await posttest.save();
      return posttest;
    } catch (error) {
      throw error;
    }
  };

  public getById = async (id: string): Promise<IPosttestDocument> => {
    try {
      const posttest = await Posttest.findById(id);
      if (!posttest) throw new NotFoundError("Data posttest tidak ditemukna.");
      return posttest;
    } catch (error) {
      throw error;
    }
  };

  public getByTherapyId = async (
    therapyId: string
  ): Promise<IPosttestDocument | null> => {
    try {
      const id = new Types.ObjectId(therapyId);
      const posttest = await Posttest.findOne({ therapyId: id });
      if (!posttest) return null;
      return posttest;
    } catch (error) {
      throw error;
    }
  };

  public update = async (
    id: string,
    input: TUpdatePosttestInput
  ): Promise<IPosttestDocument> => {
    try {
      const posttest = await Posttest.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });
      if (!posttest) throw new NotFoundError("Data posttest tidak ditemukan.");
      return posttest;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: string): Promise<boolean> => {
    try {
      const posttest = await Posttest.findByIdAndDelete(id);
      if (!posttest) throw new NotFoundError("Data posttest tidak ditemukan.");
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export default new PosttestService();
