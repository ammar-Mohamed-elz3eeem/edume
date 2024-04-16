import { IUser } from '..';

declare global {
  namespace Express {
    export interface User extends IUser {
      id: string | number;
    }
  }
}
