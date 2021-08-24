import {Component, OnInit} from '@angular/core';
import {GuestService} from "../guest.service";
import {Guest} from "../guest";
import {TaskService} from "../task.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TableService} from "../table.service";
import {WeddingTable} from "../WeddingTable";
import {BridalService} from "../bridal.service";
import {BridalCouple} from "../bridalCouple";
import {RelationShip} from "../relationShip";
import {Role} from "../role";
import {Task} from "../task";
import {RelationService} from "../relation.service";
import {RoleService} from "../role.service";
import {Output, EventEmitter} from '@angular/core';
import {Gift} from "../gift";
import {GiftService} from "../gift.service";

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
  b: any;
  taskList: Task[] = [];
  giftList: Gift[] = [];
  tableList: any;
  bridalCouple: any;
  relationShipList: any;
  roleList: any;
// Je déclare mon attribut newGuest qui me permettra de voir le guest édité dans la vue
  newGuest: Guest | undefined;
  guestUpdated: Guest | undefined;

//decalaration d'un Output qui gére les événements (Emission d'évenements vers le parent)


  constructor(private guestService: GuestService, private taskService: TaskService, private formBuilder: FormBuilder,
              private tableService: TableService, private  bridalService: BridalService,
              private relationService: RelationService, private roleService: RoleService,
              private giftService: GiftService) {
  }


  filterGuestForm = this.formBuilder.group({
    relationShip: null,
    role: null,
    task: null, //la value  de l'option du formulaire par defaut
    firstName: '',
    accommodation: '',
    lastName: '',
    email: '',
    table: null,//par defaut la valeur est à 0
    bridal: null,
    gift: null,
    id: 0,
  });

  // Je crée mon objet JS qui représente le formulaire d'édition de mon guest


  ngOnInit(): void {

    this.guestService.getAllGuest().subscribe(result => {
      this.guestList = result;
      console.log(this.guestList);
    })

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
      console.log(this.roleList);
    })
    this.relationService.getAllRelation().subscribe(result => {
      this.relationShipList = result;
    })
    this.giftService.getAllGift().subscribe(result => {
      this.giftList = result;
    })
  }


  AddGuest() {
    this.changeText = false;

  }


  /*updateGuest(guest: Guest) {
    console.log(guest);
    this.guestService.updateGuest(guest).subscribe(() => {
      console.log("L'invité " + guest.id + " a bien été mise à jour");
      this.guestList = this.guestService.getAllGuest();
    });
  }*/


//lorsque 'lon choisi un nom  , on le recupére de task grace à  l'id
  onTaskChange() {
    if (this.filterGuestForm.get('task')?.value != 0) {
      //apell de la fonction qui retoure un task, l'id est recupére avec la valeur du filterForm
      this.taskService.getAllTask().subscribe(result => {
        this.task = this.filterGuestForm.get('task')?.value;
        console.log(this.task);
      });


    }
  }

  //on recupére la table choisie
  onTableChange() {
    if (this.filterGuestForm.get('table')?.value != 0) {
      this.tableService.getAllTable().subscribe(result => {
        this.table = this.filterGuestForm.get('table')?.value;
        console.log(this.table);
      })
    }
  }

  //on recupére le marié qui a invité
  onCoupleChange() {
    if (this.filterGuestForm.get('bridal')?.value != 0) {
      this.bridalService.getBridalCouple().subscribe(result => {
        this.bridal = this.filterGuestForm.get('bridal')?.value;
        console.log(this.bridal);
      })
    }
  }

//on recupére le type de relation avec les mariées
  onRelationChange() {
    this.relationService.getAllRelation().subscribe(() => {
      console.log('Detail de mon objet relation selectionnée');
//je recupere le detail le relation selectionné
      this.relationShip = this.filterGuestForm.get('relationShip')?.value;
      console.log(this.relationShip);
    });
  }


  //on recupére le type de role

  onRoleChange() {
    this.roleService.getAllRole().subscribe(() => {
      console.log('Detail de mon objet Role selectionné');
//je recupere le detail le role selectionné
      this.role = this.filterGuestForm.get('role')?.value;
      console.log(this.role);
    });

  }

  onGiftChange() {
    this.giftService.getAllGift().subscribe(() => {
      console.log('Detail de mon objet gift selectionné');
//je recupere le detail le gift selectionné
      console.log(this.filterGuestForm.get('gift')?.value);
    });
  }

  submit() {

  }

  /*saveGuest() {
    console.log("Form Submitted")
    console.log( this.filterGuestForm.get('roleSelectForm')?.value);

    this.changeText = true;
    console.log("je ne suis pas encore rentré");

    // @ts-ignore
    this.newGuest = {


      firstName: this.filterGuestForm.get('firstName')?.value,
      lastName: this.filterGuestForm.get('lastName')?.value,
      email: this.filterGuestForm.get('email')?.value,
      accommodation: this.filterGuestForm.get('accommodation')?.value,
      role: this.filterGuestForm.get('roleSelectForm')?.value==0?,
     bridal:  this.filterGuestForm.get('relationSelect')?.value==0? null : this.filterGuestForm.get('relationSelect')?.value,
      //this.newGuest.task: this.task,
      task: this.filterGuestForm.get('taskSelect')?.value,
      relationShip: this.filterGuestForm.get('relationSelect')?.value,
      table: this.filterGuestForm.get('tableSelect')?.value
    };
   */
  updateGuest(guest: Guest) {
    this.changeText = false;
    this.filterGuestForm.patchValue({
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email,
      accommodation: guest.accommodation,
      task: guest.task,
      table: guest.table,
      relationShip: guest.relationShip,
      role: guest.role,
      bridal: guest.bridal,
      gift: guest.gift
    });
    this.guestUpdated = guest;
  }


  saveGuest() {

    // Gestion de l'événement clic sur "Modifier" ==> je remplis les champs du formulaire
    // Si ma propriété GuestUpdated est défini, alors je peux le mettre à jour
    if (this.guestUpdated) {

      this.guestUpdated = this.filterGuestForm.value;
      console.log(this.guestUpdated);
      // Remplissage de l'attribut guestUpdated
      // this.guestUpdated = guest;
      this.guestService.updateGuest(this.guestUpdated).subscribe(()=>{
        this.guestService.getAllGuest().subscribe(result => {
          this.guestList = result;
        });
      });


      console.log(this.guestUpdated?.id);
      console.log(this.guestUpdated?.firstName);

      console.log("Le guest a bien été mis à jour");

      // je vide mon objet guestUpdated
      this.guestUpdated = undefined;
      //je vide le formulaire
      this.filterGuestForm.reset();
      //je met a jour la liste de guest

    }
    // Sinon, alors je peux créer un nouveau guest
    else {

      // Création d'un nouvel objet
      console.log("je suis dans la fonction create");
      this.newGuest = this.filterGuestForm.value;
      this.guestService.createGuest(this.newGuest).subscribe(() => {
        console.log("l'invité a bien été crée");
        //je met a jour la liste de guest
        this.guestService.getAllGuest().subscribe(result => {
          this.guestList = result;
        });
      });
      //je referme le formulaire
      this.changeText = true;
    }
  }


//methode to delete a guest on the list
  deleteGuest(guestId: number) {
    this.guestService.deleteGuest(guestId).subscribe(() => {
      console.log("L'invité " + guestId + " a bien été supprimé");
      this.guestService.getAllGuest().subscribe(result => {
        this.guestList = result;
      });
    });
  }


}
