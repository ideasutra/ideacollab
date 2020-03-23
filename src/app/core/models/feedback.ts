import { User } from "./user";

export class Feedback {
  _id: string;
  _idea_id: string;
  _user: User;
  content: string;
  rating: Number;
}
