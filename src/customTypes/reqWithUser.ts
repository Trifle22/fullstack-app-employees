import { Request } from "express";

interface User {
  
}

export interface CustomRequest extends Request {
  user: User;
}