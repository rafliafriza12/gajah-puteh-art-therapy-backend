import { Types } from "mongoose";
import Child from "../models/Child";
import {
  IChildDocument,
  TCreateChildInput,
  TUpdateChildInput,
} from "../types/child.type";
import { NotFoundError } from "../helper/response";

class ChildService {
  public create = async (
    parentId: string,
    input: TCreateChildInput
  ): Promise<IChildDocument> => {
    try {
      const inputDocument = {
        parentId: new Types.ObjectId(parentId),
        ...input,
      };
      const child = new Child(inputDocument);
      return await child.save();
    } catch (error) {
      throw error;
    }
  };

  public getByParentId = async (
    parentId: string
  ): Promise<IChildDocument[]> => {
    try {
      const childs = await Child.find({
        parentId: new Types.ObjectId(parentId),
      }).sort({ childOrder: 1 });
      if (childs.length < 1)
        throw new NotFoundError("Data anak tidak ditemukan");
      return childs;
    } catch (error) {
      throw error;
    }
  };

  public getByChildId = async (childId: string): Promise<IChildDocument> => {
    try {
      const child = await Child.findById(childId);
      if (!child) throw new NotFoundError("Data anak tidak ditemukan");
      return child;
    } catch (error) {
      throw error;
    }
  };

  public update = async (
    id: string,
    input: TUpdateChildInput
  ): Promise<IChildDocument> => {
    try {
      const child = await Child.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });
      if (!child) throw new NotFoundError("Data anak tidak ditemukan");
      return child;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: string): Promise<boolean> => {
    try {
      const child = await Child.findByIdAndDelete(id);
      if (!child) throw new NotFoundError("Data anak tidak ditemukan");
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export default new ChildService();
