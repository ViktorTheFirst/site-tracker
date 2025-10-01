import type { Status } from './general';

const Role = {
  USER: 'user',
  ADMIN: 'admin',
  DEV_ADMIN: 'dev-admin',
} as const;

type Role = (typeof Role)[keyof typeof Role];

const UserStatus = {
  INVITED: 'invited',
  CANCELED: 'canceled',
  ACCEPTED: 'accepted',
} as const;

type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

interface IUser {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  createdAt?: string;
  isDisabled: boolean;
  role: Role;
  allowedSiteIds: number[];
  status: UserStatus;
}

interface ILoginResponse {
  status: Status;
  message: string;
  user: IUser;
}

interface ILogoutResponse {
  status: Status;
  message: string;
}

interface IInviteUserRequest {
  emails: string[];
  allowedSiteIds: string[];
}

interface IInviteUserResponse {
  status: Status;
  message: string;
  id: number;
}

interface IGetUsersResponse {
  status: Status;
  data: IUser[];
}

interface IVerifyTokenResponse {
  status: Status;
  email: string;
  role: Role;
  exp: number;
  iat: number;
}

interface IVerifyTokenRequest {
  token: string;
}

interface IEditUserRequest {
  name: string;
  password: string;
  firstTimeSetup: boolean;
  email: string;
}

export {
  type IUser,
  type ILoginResponse,
  Role,
  type IInviteUserRequest,
  type IInviteUserResponse,
  type ILogoutResponse,
  type IGetUsersResponse,
  UserStatus,
  type IVerifyTokenRequest,
  type IVerifyTokenResponse,
  type IEditUserRequest,
};
