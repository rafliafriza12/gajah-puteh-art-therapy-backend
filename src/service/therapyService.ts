import { Types } from "mongoose";
import Therapy from "../models/Therapy";
import Child from "../models/Child";
import {
  ITherapyDocument,
  TCreateTherapyInput,
  TUpdateTherapyInput,
} from "../types/therapy.type";
import { NotFoundError } from "../helper/response";

class TherapyService {
  public create = async (
    input: TCreateTherapyInput
  ): Promise<ITherapyDocument> => {
    try {
      const therapy = new Therapy(input);
      await therapy.save();
      return therapy;
    } catch (error) {
      throw error;
    }
  };

  public getAll = async (): Promise<ITherapyDocument[]> => {
    try {
      const therapies = await Therapy.find().sort({ createdAt: -1 });
      if (therapies.length < 1)
        throw new NotFoundError("Data terapi tidak ditemukan");
      return therapies;
    } catch (error) {
      throw error;
    }
  };

  public getById = async (id: string): Promise<ITherapyDocument> => {
    try {
      const therapy = await Therapy.findById(id);
      if (!therapy) throw new NotFoundError("Data terapi tidak ditemukan");
      return therapy;
    } catch (error) {
      throw error;
    }
  };

  public getByCounselorId = async (
    counselorId: string
  ): Promise<ITherapyDocument[]> => {
    try {
      const id = new Types.ObjectId(counselorId);
      const therapies = await Therapy.find({ counselorId: id }).sort({
        createdAt: -1,
      });
      if (therapies.length < 1)
        throw new NotFoundError("Data terapi tidak ditemukan");
      return therapies;
    } catch (error) {
      throw error;
    }
  };

  public getByChildId = async (
    childId: string
  ): Promise<ITherapyDocument[]> => {
    try {
      const id = new Types.ObjectId(childId);
      const therapies = await Therapy.find({ childId: id }).sort({
        createdAt: -1,
      });
      if (therapies.length < 1)
        throw new NotFoundError("Data terapi tidak ditemukan");

      return therapies;
    } catch (error) {
      throw error;
    }
  };

  public update = async (
    id: string,
    input: TUpdateTherapyInput
  ): Promise<ITherapyDocument> => {
    try {
      const therapy = await Therapy.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });
      if (!therapy) throw new NotFoundError("Data terapi tidak ditemukan");
      return therapy;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: string): Promise<boolean> => {
    try {
      const therapy = await Therapy.findByIdAndDelete(id);
      if (!therapy) throw new NotFoundError("Data terapi tidak ditemukan");
      return true;
    } catch (error) {
      throw error;
    }
  };

  public getByParentId = async (
    parentId: string
  ): Promise<ITherapyDocument[]> => {
    try {
      console.log(
        "🔍 [TherapyService] Fetching therapies for parent:",
        parentId
      );

      const id = new Types.ObjectId(parentId);

      // Find all children of this parent
      const children = await Child.find({ parentId: id });
      console.log("👶 [TherapyService] Found children:", children.length);

      // If no children, return empty array
      if (children.length === 0) {
        console.log("⚠️ [TherapyService] No children found for this parent");
        return [];
      }

      const childIds = children.map((child) => child._id);
      console.log("🔑 [TherapyService] Child IDs:", childIds);

      // Find all therapies for these children
      const therapies = await Therapy.find({
        childId: { $in: childIds },
      }).sort({ createdAt: -1 });

      console.log("💉 [TherapyService] Found therapies:", therapies.length);

      return therapies;
    } catch (error) {
      console.error("❌ [TherapyService] Error:", error);
      throw error;
    }
  };
}

export default new TherapyService();
