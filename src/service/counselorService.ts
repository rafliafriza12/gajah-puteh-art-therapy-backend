import { NotFoundError } from "../helper/response";
import Counselor from "../models/Counselor";
import { IChangePasswordInput, ILogoutInput } from "../types/auth.type";
import {
  ICounselorDocument,
  TCreateCounselorInput,
  TUpdateCounselorInput,
} from "../types/counselor.type";
import bcrypt from "bcryptjs";

class CounselorService {
  public create = async (
    input: TCreateCounselorInput
  ): Promise<ICounselorDocument> => {
    try {
      const existtingCounselor = await Counselor.findOne({
        email: input.email,
      });
      if (existtingCounselor)
        throw new Error("Email ini sudah digunakan oleh akun lain.");
      const counselor = new Counselor(input);
      await counselor.save();
      return counselor;
    } catch (error) {
      throw error;
    }
  };

  public getByEmail = async (email: string): Promise<ICounselorDocument> => {
    try {
      const counselor = await Counselor.findOne({ email });
      if (!counselor) throw new Error("Email atau password salah.");
      return counselor;
    } catch (error) {
      throw error;
    }
  };

  public getById = async (id: string): Promise<ICounselorDocument> => {
    try {
      const counselor = await Counselor.findById(id);
      if (!counselor) throw new NotFoundError("Data konselor tidak ditemukan");
      return counselor;
    } catch (error) {
      throw error;
    }
  };

  public getAll = async (): Promise<ICounselorDocument[]> => {
    try {
      const counselors = await Counselor.find().sort({ fullname: 1 });
      if (counselors.length < 1)
        throw new NotFoundError("Data konselor tidak ditemukan");
      return counselors;
    } catch (error) {
      throw error;
    }
  };

  public update = async (
    id: string,
    input: TUpdateCounselorInput
  ): Promise<ICounselorDocument> => {
    try {
      // Use findById + save() instead of findByIdAndUpdate
      // because mongoose validators with 'this' context don't work properly with findByIdAndUpdate
      const counselor = await Counselor.findById(id);
      if (!counselor) throw new NotFoundError("Data konselor tidak ditemukan");

      // Update fields
      if (input.fullname !== undefined) counselor.fullname = input.fullname;
      if (input.email !== undefined) counselor.email = input.email;
      if (input.phone !== undefined) counselor.phone = input.phone;
      if (input.address !== undefined) counselor.address = input.address;
      if (input.isStudent !== undefined) counselor.isStudent = input.isStudent;

      // Update education
      if (input.education) {
        if (!counselor.education) {
          counselor.education = {} as any;
        }
        if (input.education.university !== undefined) {
          counselor.education.university = input.education.university;
        }
        if (input.education.stage !== undefined) {
          counselor.education.stage = input.education.stage;
        }
        if (input.education.majority !== undefined) {
          counselor.education.majority = input.education.majority;
        }
        // Handle semester based on student status
        if (input.isStudent === true || counselor.isStudent === true) {
          counselor.education.semester =
            input.education.semester ?? counselor.education.semester;
        } else {
          counselor.education.semester = null;
        }
      }

      // Handle practiceLicenseNumber and work based on student status
      const isStudentStatus = input.isStudent ?? counselor.isStudent;
      if (isStudentStatus) {
        // Students should not have these fields
        counselor.practiceLicenseNumber = undefined;
        counselor.work = undefined;
      } else {
        // Professionals need these fields
        if (input.practiceLicenseNumber !== undefined) {
          counselor.practiceLicenseNumber =
            input.practiceLicenseNumber || undefined;
        }
        if (input.work !== undefined) {
          counselor.work = input.work || undefined;
        }
      }

      await counselor.save();
      return counselor;
    } catch (error) {
      throw error;
    }
  };

  public changePassword = async (
    input: IChangePasswordInput
  ): Promise<boolean> => {
    try {
      const counselor = await Counselor.findById(input.id);
      if (!counselor) throw new NotFoundError("Data konselor tidak ditemukan.");
      const isPasswordValid = await bcrypt.compare(
        input.oldPassword,
        counselor.password
      );
      if (!isPasswordValid) throw new Error("Password lama salah.");
      counselor.password = input.newPassword;
      await counselor.save();
      return true;
    } catch (error) {
      throw error;
    }
  };

  public logout = async (input: ILogoutInput): Promise<boolean> => {
    try {
      const counselor = await Counselor.findById(input.id);
      if (!counselor) throw new NotFoundError("Data konselor tidak ditemukan.");
      counselor.accessToken = undefined;
      await counselor.save();
      return true;
    } catch (error) {
      throw error;
    }
  };

  public updatePassword = async (
    id: string,
    hashedPassword: string
  ): Promise<boolean> => {
    try {
      // Use findByIdAndUpdate to bypass pre-save hook (password already hashed)
      const counselor = await Counselor.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );
      if (!counselor) throw new NotFoundError("Data konselor tidak ditemukan.");
      return true;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: string): Promise<boolean> => {
    try {
      const counselor = await Counselor.findByIdAndDelete(id);
      if (!counselor) throw new NotFoundError("Data konselor tidak ditemukan");
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export default new CounselorService();
