import { User } from './models'; // Importe o tipo User ou outro tipo apropriado para userId

declare module 'express' {
  interface Request {
    userId?: User;
  }
}
