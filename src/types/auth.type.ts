export interface IJWTPayload {
  id: string;
  email: string;
  role: "counselor" | "parent";
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
