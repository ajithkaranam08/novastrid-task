import { User } from "./server/components/user/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
