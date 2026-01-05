import jwt from "jsonwebtoken";
import {
  IChangePasswordInput,
  IGetCurrentUserInput,
  IJWTPayload,
  ILogoutInput,
} from "../types/auth.type";
import bcrypt from "bcryptjs";

import {
  ICounselorDocument,
  TLoginCounselorInput,
  TCreateCounselorInput,
  ILoginCounselorResponse,
} from "../types/counselor.type";
import {
  IParentDocument,
  TLoginParentInput,
  TCreateParentInput,
  ILoginParentResponse,
} from "../types/parent.type";
import counselorService from "./counselorService";
import parentService from "./parentService";

class AuthService {
  private generateAccessToken = (payload: IJWTPayload): string => {
    const secret: string = process.env.JWT_SECRET as string;

    return jwt.sign(payload, secret, {
      expiresIn: "1d",
    } as jwt.SignOptions);
  };

  public registerCounselor = async (
    input: TCreateCounselorInput
  ): Promise<ICounselorDocument> => {
    try {
      const counselor = await counselorService.create(input);
      return counselor;
    } catch (error) {
      throw error;
    }
  };

  public loginCounselor = async (
    input: TLoginCounselorInput
  ): Promise<ILoginCounselorResponse> => {
    try {
      const counselor = await counselorService.getByEmail(input.email);

      const isPasswordValid = bcrypt.compare(
        input.password,
        counselor.password
      );

      if (!isPasswordValid) throw new Error("Email atau password salah.");

      const payload: IJWTPayload = {
        id: counselor._id.toString(),
        email: counselor.email,
        role: "counselor",
      };

      const token = this.generateAccessToken(payload);

      counselor.accessToken = token;
      await counselor.save();

      return { user: counselor, token: token };
    } catch (error) {
      throw error;
    }
  };

  public registerParent = async (
    input: TCreateParentInput
  ): Promise<IParentDocument> => {
    try {
      const parent = await parentService.create(input);
      return parent;
    } catch (error) {
      throw error;
    }
  };

  public loginParent = async (
    input: TLoginParentInput
  ): Promise<ILoginParentResponse> => {
    try {
      const parent = await parentService.getByEmail(input.email);

      const isPasswordValid = bcrypt.compare(input.password, parent.password);

      if (!isPasswordValid) throw new Error("Email atau password salah.");

      const payload: IJWTPayload = {
        id: parent._id.toString(),
        email: parent.email,
        role: "parent",
      };

      const token = this.generateAccessToken(payload);

      parent.accessToken = token;

      await parent.save();

      return { user: parent, token };
    } catch (error) {
      throw error;
    }
  };

  public getCurrentUser = async (
    input: IGetCurrentUserInput
  ): Promise<ICounselorDocument | IParentDocument> => {
    try {
      if (input.role === "counselor") {
        const counselor = await counselorService.getById(input.id);
        return counselor;
      } else {
        const parent = await parentService.getById(input.id);
        return parent;
      }
    } catch (error) {
      throw error;
    }
  };

  public changePassword = async (
    input: IChangePasswordInput
  ): Promise<boolean> => {
    try {
      if (input.role === "counselor") {
        const result = await counselorService.changePassword(input);
        return result;
      } else {
        const result = await parentService.changePassword(input);
        return result;
      }
    } catch (error) {
      throw error;
    }
  };

  public logout = async (input: ILogoutInput): Promise<boolean> => {
    try {
      if (input.role === "counselor") {
        const result = await counselorService.logout(input);
        return result;
      } else {
        const result = await parentService.logout(input);
        return result;
      }
    } catch (error) {
      throw error;
    }
  };
}

export default new AuthService();
