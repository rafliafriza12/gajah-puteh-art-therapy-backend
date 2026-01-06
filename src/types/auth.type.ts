export interface IJWTPayload {
  id: string;
  email: string;
  role: "counselor" | "parent";
}

export interface IResetTokenPayload {
  id: string;
  email: string;
  role: "counselor" | "parent";
  type: "password_reset";
}

export interface IForgotPasswordInput {
  email: string;
  role: "counselor" | "parent";
}

export interface IForgotPasswordResponse {
  message: string;
  resetToken: string; // In production, this would be sent via email
}

export interface IResetPasswordInput {
  token: string;
  newPassword: string;
}

export interface IChangePasswordInput {
  id: string;
  role: "counselor" | "parent";
  oldPassword: string;
  newPassword: string;
}

export interface IGetCurrentUserInput {
  id: string;
  role: "counselor" | "parent";
}

export interface ILogoutInput {
  id: string;
  role: "counselor" | "parent";
}
