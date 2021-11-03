import {Guest} from "./guest";

export interface WeddingTable {
  id: number;
  tableName: string;
  imageUrl: string;
  guestList: Guest[];

}
