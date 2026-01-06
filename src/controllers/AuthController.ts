import { Request, Response } from "express";
import {
  responseSuccessWithData,
  identifyError,
  responseSuccessWithoutData,
} from "../helper/response";

import {
  IChangePasswordInput,
  IGetCurrentUserInput,
  IJWTPayload,
  ILogoutInput,
  IForgotPasswordInput,
  IResetPasswordInput,
} from "../types/auth.type";
import {
  ICounselorDocument,
  ILoginCounselorResponse,
  TCreateCounselorInput,
  TLoginCounselorInput,
} from "../types/counselor.type";
import authService from "../service/authService";
import {
  ILoginParentResponse,
  IParentDocument,
  TCreateParentInput,
  TLoginParentInput,
} from "../types/parent.type";
import { verifyToken } from "../middleware/auth";

declare global {
  namespace Express {
    interface Request {
      payload?: IJWTPayload;
    }
  }
}

class AuthController {
  public registerCounselor = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const input: TCreateCounselorInput = req.body as TCreateCounselorInput;
      const result: ICounselorDocument = await authService.registerCounselor(
        input
      );
      res
        .status(201)
        .json(responseSuccessWithData(201, result, "Pendaftaran berhasil."));
      return;
    } catch (error) {
      await identifyError(res, error);
      return;
    }
  };

  public loginCounselor = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const input: TLoginCounselorInput = req.body as TLoginCounselorInput;
      const result: ILoginCounselorResponse = await authService.loginCounselor(
        input
      );
      res
        .status(200)
        .json(
          responseSuccessWithData(
            200,
            result,
            "Login berhasil, sedang mengarahkan ke halaman dashboard."
          )
        );
    } catch (error) {
      await identifyError(res, error);
      return;
    }
  };

  public registerParent = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const input: TCreateParentInput = req.body as TCreateParentInput;
      const result: IParentDocument = await authService.registerParent(input);
      res
        .status(201)
        .json(responseSuccessWithData(201, result, "Pendaftaran berhasil."));
      return;
    } catch (error) {
      await identifyError(res, error);
      return;
    }
  };

  public loginParent = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: TLoginParentInput = req.body as TLoginParentInput;
      const result: ILoginParentResponse = await authService.loginParent(input);
      res
        .status(200)
        .json(
          responseSuccessWithData(
            200,
            result,
            "Login berhasil, sedang mengarahkan ke halaman dashboard."
          )
        );
      return;
    } catch (error) {
      await identifyError(res, error);
      return;
    }
  };

  public getCurrentUser = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const input: IGetCurrentUserInput = req.payload as IGetCurrentUserInput;
        const result = await authService.getCurrentUser(input);
        res
          .status(200)
          .json(responseSuccessWithData(200, result, "Data berhasil diambil"));
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public changePassword = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { id, role }: { id?: string; role?: "counselor" | "parent" } =
          req.payload as { id: string; role: "counselor" | "parent" };
        const {
          newPassword,
          oldPassword,
        }: { newPassword?: string; oldPassword?: string } = req.body as {
          newPassword: string;
          oldPassword: string;
        };

        const input: IChangePasswordInput = {
          id,
          role,
          newPassword,
          oldPassword,
        };
        const result: boolean = await authService.changePassword(input);
        res
          .status(200)
          .json(
            responseSuccessWithoutData(
              200,
              result,
              "Password berhasil diganti."
            )
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public logout = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const input: ILogoutInput = req.payload as ILogoutInput;
        const result = await authService.logout(input);
        res
          .status(200)
          .json(
            responseSuccessWithoutData(
              200,
              result,
              "Logout berhasi, mengarahkan keluar."
            )
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const input: IForgotPasswordInput = req.body as IForgotPasswordInput;

      if (!input.email || !input.role) {
        res.status(400).json({
          success: false,
          message: "Email dan role diperlukan.",
        });
        return;
      }

      const result = await authService.forgotPassword(input);
      res
        .status(200)
        .json(responseSuccessWithData(200, result, result.message));
      return;
    } catch (error) {
      await identifyError(res, error);
      return;
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: IResetPasswordInput = req.body as IResetPasswordInput;

      if (!input.token || !input.newPassword) {
        res.status(400).json({
          success: false,
          message: "Token dan password baru diperlukan.",
        });
        return;
      }

      if (input.newPassword.length < 8) {
        res.status(400).json({
          success: false,
          message: "Password minimal 8 karakter.",
        });
        return;
      }

      const result = await authService.resetPassword(input);
      res
        .status(200)
        .json(
          responseSuccessWithoutData(
            200,
            result,
            "Password berhasil direset. Silakan login dengan password baru."
          )
        );
      return;
    } catch (error) {
      await identifyError(res, error);
      return;
    }
  };
}

export default new AuthController();
