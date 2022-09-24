import { User } from "../../models/models";

export interface UserDoa {
  createUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  deleteUsername(id: string): Promise<void>;
}
