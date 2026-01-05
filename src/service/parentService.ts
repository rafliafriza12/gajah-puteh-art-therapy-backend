import { NotFoundError } from "../helper/response";
import Parent from "../models/Parent";
import { IChangePasswordInput, ILogoutInput } from "../types/auth.type";
import {
  IParentDocument,
  TUpdateParentInput,
  TCreateParentInput,
} from "../types/parent.type";
import bcrypt from "bcryptjs";

class ParentService {
  public create = async (
    input: TCreateParentInput
  ): Promise<IParentDocument> => {
    try {
      const existingParent = await Parent.findOne({ email: input.email });
      if (existingParent)
        throw new Error("Email ini sudah digunakan oleh akun lain.");
      const parent = new Parent(input);
      await parent.save();

      return parent;
    } catch (error) {
      throw error;
    }
  };

  public getAll = async (): Promise<IParentDocument[]> => {
    try {
      const parents = await Parent.find().sort({ fullname: 1 });
      if (parents.length < 1)
        throw new NotFoundError("Data orang tua tidak ditemukan");
      return parents;
    } catch (error) {
      throw error;
    }
  };

  public getById = async (id: string): Promise<IParentDocument> => {
    try {
      const parent = await Parent.findById(id);

      if (!parent) throw new NotFoundError("Data orang tua tidak ditemukan");

      return parent;
    } catch (error) {
      throw error;
    }
  };

  public getByEmail = async (email: string): Promise<IParentDocument> => {
    try {
      const parent = await Parent.findOne({ email });
      if (!parent) throw new Error("Email atau password salah.");
      return parent;
    } catch (error) {
      throw error;
    }
  };

  public update = async (
    id: string,
    input: TUpdateParentInput
  ): Promise<IParentDocument> => {
    try {
      const parent = await Parent.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });

      if (!parent) throw new NotFoundError("Data orang tua tidak ditemukan.");

      return parent;
    } catch (error) {
      throw error;
    }
  };

  public changePassword = async (
    input: IChangePasswordInput
  ): Promise<boolean> => {
    try {
      const parent = await Parent.findById(input.id);
      if (!parent) throw new NotFoundError("Data orang tua tidak ditemukan.");
      const isPasswordValid = bcrypt.compare(
        input.oldPassword,
        parent.password
      );
      if (!isPasswordValid) throw new Error("Password lama salah.");
      parent.password = input.newPassword;
      return true;
    } catch (error) {
      throw error;
    }
  };

  public logout = async (input: ILogoutInput): Promise<boolean> => {
    try {
      const parent = await Parent.findById(input.id);
      if (!parent) throw new NotFoundError("Data orang tua tidak ditemukan.");
      parent.accessToken = undefined;
      await parent.save();
      return true;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: string): Promise<boolean> => {
    try {
      const parent = await Parent.findByIdAndDelete(id);
      if (!parent) throw new NotFoundError("Data orang tua tidak ditemukan");

      return true;
    } catch (error) {
      throw error;
    }
  };
}

export default new ParentService();
