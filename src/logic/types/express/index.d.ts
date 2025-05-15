import { UserAuth } from '../request/UserAuth';

declare global {
  namespace Express {
    interface Request {
      user?: UserAuth;
    }
  }
}
