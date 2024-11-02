import { IUserModel } from "./User";

export interface AuthResponse {
  token: string;
  user: IUserModel;
}
