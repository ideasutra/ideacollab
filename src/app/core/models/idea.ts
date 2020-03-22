import { User } from "./user";
import { Tag } from "./tag";

export class Idea {
  _id: string;
  _caption: string;
  description: string;
  user: User;
  companions: Array<User>;
  tags: Array<Tag>;
  rating: Number;
}
