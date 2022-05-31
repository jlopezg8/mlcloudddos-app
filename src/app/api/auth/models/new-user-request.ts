/* tslint:disable */
/* eslint-disable */
export interface NewUserRequest {
  email: string;
  emailVerified?: boolean;
  id?: string;
  password: string;
  realm?: string;
  username?: string;
  verificationToken?: string;

  [key: string]: any;
}
