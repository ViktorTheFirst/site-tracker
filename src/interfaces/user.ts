import type { Status } from './general';

interface IUser {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  isDisabled: boolean;
}

interface ILoginResponse {
  status: Status;
  message: string;
  user: IUser;
}

export type { IUser, ILoginResponse };
