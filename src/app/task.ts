import {Guest} from "./guest";

export interface Task{
  id: number;
  description: string;
  guestList:Guest[];
}
