import jwt from "jsonwebtoken";
import {
  IChangePasswordInput,
  IGetCurrentUserInput,
  IJWTPayload,
  ILogoutInput,
  IForgotPasswordInput,
  IForgotPasswordResponse,
  IResetPasswordInput,
  IResetTokenPayload,
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

  private generateResetToken = (payload: IResetTokenPayload): string => {
    const secret: string = process.env.JWT_SECRET as string;

    return jwt.sign(payload, secret, {
      expiresIn: "15m", // Reset token valid for 15 minutes
    } as jwt.SignOptions);
  };

  private verifyResetToken = (token: string): IResetTokenPayload => {
    const secret: string = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as IResetTokenPayload;

    if (decoded.type !== "password_reset") {
      throw new Error("Token tidak valid.");
    }

    return decoded;
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

      const isPasswordValid = await bcrypt.compare(
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

      const isPasswordValid = await bcrypt.compare(
        input.password,
        parent.password
      );

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

  public forgotPassword = async (
    input: IForgotPasswordInput
  ): Promise<IForgotPasswordResponse> => {
    try {
      let user: { _id: { toString: () => string }; email: string };

      // Find user by email based on role
      if (input.role === "counselor") {
        user = await counselorService.getByEmail(input.email);
      } else {
        user = await parentService.getByEmail(input.email);
      }

      // Generate reset token
      const payload: IResetTokenPayload = {
        id: user._id.toString(),
        email: user.email,
        role: input.role,
        type: "password_reset",
      };

      const resetToken = this.generateResetToken(payload);

      // In production, you would send this token via email
      // For now, we return it in the response
      return {
        message:
          "Link reset password telah dikirim. Token valid selama 15 menit.",
        resetToken: resetToken,
      };
    } catch (error) {
      throw error;
    }
  };

  public resetPassword = async (
    input: IResetPasswordInput
  ): Promise<boolean> => {
    try {
      // Verify the reset token
      const decoded = this.verifyResetToken(input.token);

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(input.newPassword, salt);

      // Update password based on role
      if (decoded.role === "counselor") {
        await counselorService.updatePassword(decoded.id, hashedPassword);
      } else {
        await parentService.updatePassword(decoded.id, hashedPassword);
      }

      return true;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new Error(
          "Token reset password sudah kedaluwarsa. Silakan request ulang."
        );
      }
      if (error.name === "JsonWebTokenError") {
        throw new Error("Token reset password tidak valid.");
      }
      throw error;
    }
  };
}

export default new AuthService();
