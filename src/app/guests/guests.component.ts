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
  guestOrganised = true;
  listeDesTaches=true;
  task: Task | undefined;
  table: WeddingTable | undefined;
  role: Role | undefined;
  guestList: any;
  guestToPlace: Guest[] = [];
  taskList: Task[] = [];
  tableList: any;
  roleList: any;
// Je déclare mon attribut newGuest qui me permettra de voir le guest édité dans la vue
  newGuest: Guest | undefined;
  guestUpdated: Guest | undefined;



  constructor(private guestService: GuestService, private taskService: TaskService, private formBuilder: FormBuilder,
              private tableService: TableService, private  bridalService: BridalService,
              private relationService: RelationService, private roleService: RoleService,
              ) {
  }


  filterGuestForm = this.formBuilder.group({
    role: null,
    task: null, //la value  de l'option du formulaire par defaut
    firstName: '',
    accommodation: '',
    lastName: '',
    email: '',
    table: null,//par defaut la valeur est à 0
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
    //affiche seulement les tables qui ont moins de 4 invités
    this.tableService.getTableNotFull().subscribe(result => {
      this.tableList = result;
    })
    /*  this.bridalService.getBridalCouple().subscribe(result => {
        this.bridalCouple = result;
      })*/
    this.roleService.getAllRole().subscribe(result => {
      this.roleList = result;
      console.log(this.roleList);
    })

  }

  /**
   * methode pour ouvrir le formulaire pou ajouter ou modifier un invité
   * @constructor
   */
  AddGuest() {
    this.changeText = false;

  }

  /**
   * lorsque l'on choisi le nom d'une tache  , on le recupére de task concerné
   */
  onTaskChange() {
    if (this.filterGuestForm.get('task')?.value != 0) {
      this.task = this.filterGuestForm.get('task')?.value;
      console.log(this.task);
    }
  }


  /**
   * on récupére la table choisie dans le formulaire dans la variable table
   */
  onTableChange() {
    if (this.filterGuestForm.get('table')?.value != 0)
    { this.table = this.filterGuestForm.get('table')?.value;
      console.log(this.table);
    }
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


  /**
   * Methode pour recupérer les valeurs du formulaire.
   * @param guest
   */
  updateGuest(guest: Guest) {
    this.changeText = false;
    //Gestion de l'événement clic sur "Modifier" ==> je remplis les champs du formulaire
    this.filterGuestForm.patchValue({
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email,
      accommodation: guest.accommodation,
      task: guest.task,
      table: guest.table,
      role: guest.role,
    });
    this.guestUpdated = guest;
  }

  /**
   * fonction pour enregister un nouveau invité dans la BDD ou met à jour si l'invité existe déja
   */
  saveGuest() {
    // Si ma propriété GuestUpdated est défini ou existe déja, alors je peux le mettre à jour
    if (this.guestUpdated) {
      this.guestUpdated = this.filterGuestForm.value;
      console.log(this.guestUpdated);

      this.guestService.updateGuest(this.guestUpdated).subscribe(() => {
        //je met a jour la liste de guest
        this.guestService.getAllGuest().subscribe(result => {
          this.guestList = result;
        });
        //je met a jour la liste de guest à placer
        this.guestService.organiseGuest().subscribe(result => {
          this.guestToPlace = result;
        });
        //Je met a jour la liste de tables qui peut changer
        this.tableService.getTableNotFull().subscribe(result => {
          this.tableList = result;
        })
      });
      console.log("Le guest a bien été mis à jour");
      // je vide mon objet guestUpdated
      this.guestUpdated = undefined;
      //je vide le formulaire
      this.filterGuestForm.reset();
      //je referme le formulaire
      this.changeText = true;
      //je referme la table et la div des invités à organiser qui peut aussi faire une modif
      this.guestOrganised = true;
    }

    // Sinon, alors je peux créer un nouveau guest
    else {
      // Création d'un nouvel objet
      console.log("je suis dans la fonction create");
      this.newGuest = this.filterGuestForm.value;
      // @ts-ignore
      this.newGuest?.table = this.filterGuestForm.get('table')?.value;
      this.guestService.createGuest(this.newGuest).subscribe(() => {
        console.log("l'invité a bien été crée");
        //je met a jour la liste de guest
        this.guestService.getAllGuest().subscribe(result => {
          this.guestList = result;
        });
        //Je met a jour la liste de tables qui peut changer
        this.tableService.getTableNotFull().subscribe(result => {
          this.tableList = result;
        })
      });
      //je vide le formulaire
      this.filterGuestForm.reset();
      //je referme le formulaire
      this.changeText = true;
    }
  }


//methode to delete a guest on the list
  deleteGuest(guestId: number) {
    this.guestService.deleteGuest(guestId).subscribe(() => {
      console.log("L'invité " + guestId + " a bien été supprimé");
      //je met a jour la liste des invités
      this.guestService.getAllGuest().subscribe(result => {
        this.guestList = result;
      });
      //je met a jour la liste de guest à placer
      this.guestService.organiseGuest().subscribe(result => {
        this.guestToPlace = result;
      });
    });
  }

  /**
   * methode qui permet d'ouvrir la tables des invités à organiser
   */
  organiseGuest() {
//au clic ouvre ou ferme
    if (this.guestOrganised == true) {
      this.guestOrganised = false;
    } else
      this.guestOrganised = true;
    //mettre a jour la liste des personnes à positionner
    this.guestService.organiseGuest().subscribe(result => {
      this.guestToPlace = result;
    });
  }


  OpenTaskList() {
    if (this.listeDesTaches == true) {
      this.listeDesTaches = false;
    } else
      this.listeDesTaches = true;

  }


}
