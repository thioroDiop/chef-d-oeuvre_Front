import { Component, OnInit } from '@angular/core';
import {GuestService} from "../guest.service";
import {Guest} from "../guest";
import {TaskService} from "../task.service";
import {FormBuilder} from "@angular/forms";
import {TableService} from "../table.service";
import {WeddingTable} from "../WeddingTable";
import {BridalService} from "../bridal.service";
import {BridalCouple} from "../bridalCouple";
import {RelationShip} from "../relationShip";
import {Role} from "../role";
import {RelationService} from "../relation.service";
import {RoleService} from "../role.service";

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {

  changeText = true;
  task: Task | undefined;
  table: WeddingTable | undefined;
  bridal: BridalCouple | undefined;
  relationShip: RelationShip | undefined;
  role: Role | undefined;
  guestList: any;
  taskList: any;
  tableList: any;
  bridalCouple: any;
  relationShipList: any;
  roleList: any;
// Je déclare mon attribut newGuest qui me permettra de voir le guest édité dans la vue
  newGuest: Guest | undefined;

  constructor(private guestService: GuestService, private taskService: TaskService, private formBuilder: FormBuilder,
              private tableService: TableService, private  bridalService: BridalService,
              private relationService: RelationService, private roleService: RoleService) {
  }

  // Je crée mon objet JS qui représente le formulaire d'édition de mon guest
  filterForm = this.formBuilder.group({
    taskSelect: 0, //la value  de l'option du formulaire par defaut
    firstName: '', accommodation: '', lastName: '', email: '',
    tableSelect: 0,//par defaut la valeur est à 0
    coupleSelect: 0,
    relationSelect: 0,
    roleSelect: 0
  })


  ngOnInit(): void {

    this.guestService.getAllGuest().subscribe(result => {
      this.guestList = result;

    })
  }

  deleteGuest(guest: Guest) {

  }

  AddGuest() {
    this.changeText = false;
    this.taskService.getAllTask().subscribe(result => {
      this.taskList = result;
    })
    this.tableService.getAllTable().subscribe(result => {
      this.tableList = result;
    })
    this.bridalService.getBridalCouple().subscribe(result => {
      this.bridalCouple = result;
    })
    this.roleService.getAllRole().subscribe(result => {
      this.roleList = result;

    })
    this.relationService.getAllRelation().subscribe(result => {
      this.relationShipList = result;
    })
  }


  updateGuest(guest: Guest) {

  }

//lorsque 'lon choisi un nom  , on le recupére de task grace à  l'id
  onTaskChange() {
    if (this.filterForm.get('taskSelect')?.value != 0) {
      //apell de la fonction qui retoure un task, l'id est recupére avec la valeur du filterForm
      this.taskService.getTaskById(this.filterForm.get('taskSelect')?.value).subscribe(result => {
        this.task = result;
      });


    }
  }

  //on recupére la table choisie
  onTableChange() {
    if (this.filterForm.get('tableSelect')?.value != 0) {
      this.tableService.getTableById(this.filterForm.get('tableSelect')?.value).subscribe(result => {
        this.table = result;
      })
    }
  }

  //on recupére le marié qui a invité
  onCoupleChange() {
    if (this.filterForm.get('coupleSelect')?.value != 0) {
      this.bridalService.getCoupleById(this.filterForm.get('coupleSelect')?.value).subscribe(result => {
        this.bridal = result;
      })
    }
  }

//on recupére le type de relation avec les mariées
  onRelationChange() {
    if (this.filterForm.get('relationSelect')?.value != 0) {
      this.relationService.getRelationById(this.filterForm.get('relationSelect')?.value).subscribe(result => {
        this.relationShip = result;
      })
    }
  }

  //on recupére le type de role
  onRoleChange() {
    if (this.filterForm.get('roleSelect')?.value != 0) {
      this.roleService.getRoleById(this.filterForm.get('roleSelect')?.value).subscribe(result => {
        this.role = result;
        console.log('roleid :' + this.filterForm.get('roleSelect')?.value);
      })
    }
  }

  saveGuest() {
    this.changeText = true;
    console.log("je ne rentre pas");
    if (this.newGuest!=null) {
    console.log("je rentre");
    this.newGuest.firstName = this.filterForm.get('firstName')?.value;
      this.newGuest.lastName = this.filterForm.get('lastName')?.value;
      this.newGuest.email = this.filterForm.get('email')?.value;
      this.newGuest.accommodation = this.filterForm.get('hebergement')?.value;

        if (this.role) {
          this.newGuest.role = this.role;
        };
      if (this.bridal) {
        this.newGuest.bridal = this.bridal;
      };
      if (this.table) {
        this.newGuest.table = this.table;
      };
      if (this.task) {
        this.newGuest.task = this.task;
      };
      if (this.relationShip) {
        this.newGuest.relationShip = this.relationShip;
      };

      this.guestService.createGuest(this.newGuest).subscribe(saveGuest=>{
        console.log("le timeline a bien été mis à jour");

      })
      console.log("fonction de sauvegarde");
    }

/*
  saveGuest() {
    this.newGuest = this.filterForm.value;
    this.guestService.createGuest(this.newGuest).subscribe();
    console.log("bonjour");
*/
  }
}
