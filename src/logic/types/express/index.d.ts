import { User } from 'src/database/entities';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
