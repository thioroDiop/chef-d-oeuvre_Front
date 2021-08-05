import {WeddingTable} from "./WeddingTable";
import {Role} from "./role";
import {RelationShip} from "./relationShip";
import {BridalCouple} from "./bridalCouple";

export interface Guest{
  id:number;
 firstName: string;
   lastName: string;
   email : string;
   accommodation: string;
   task: Task;
   table:WeddingTable;
   relationShip:RelationShip;
  role:  Role;
   bridal: BridalCouple
}
