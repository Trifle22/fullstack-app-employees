import { userInfo } from "os";

interface Employee {
  id: String;
  firstName: String
  lastName: String
  age: String
  address: String
  user: User;
  userId: String
}


export interface User {
  id: String;
  email:    String
  password: String
  name:     String
  createdEmployee?: Employee[]
}