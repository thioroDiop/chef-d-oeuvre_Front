import { Component, OnInit } from '@angular/core';
import {Task} from "../task";
import {WeddingTable} from "../WeddingTable";
import {BridalCouple} from "../bridalCouple";
import {RelationShip} from "../relationShip";
import {Role} from "../role";
import {Gift} from "../gift";
import {Guest} from "../guest";
import {GuestService} from "../guest.service";
import {TaskService} from "../task.service";
import {FormBuilder} from "@angular/forms";
import {TableService} from "../table.service";
import {BridalService} from "../bridal.service";
import {RelationService} from "../relation.service";
import {RoleService} from "../role.service";
import {GiftService} from "../gift.service";

@Component({
  selector: 'app-guest-vue-guests',
  templateUrl: './guest-vue-guests.component.html',
  styleUrls: ['./guest-vue-guests.component.css']
})
export class GuestVueGuestsComponent implements OnInit {

  changeText = true;
  ajoutCadeau=true;
  ajoutMontant=true;
  task: Task | undefined;
  table: WeddingTable | undefined;
  bridal: BridalCouple | undefined;
  relationShip: RelationShip | undefined;
  role: Role | undefined;
  guestList: any;
  b: any;
  taskList: Task[] = [];
  giftList: Gift[] = [];
  giftAndAmountList:any;
  tableList: any;
  bridalCouple: any;
  relationShipList: any;
  roleList: any;
// Je déclare mon attribut newGuest qui me permettra de voir le guest édité dans la vue
  newGuest: Guest | undefined;
  guestUpdated: Guest | undefined;

//decalaration d'un Output qui gére les événements (Emission d'évenements vers le parent)


  constructor(private guestService: GuestService, private formBuilder: FormBuilder,
              private tableService: TableService, private  bridalService: BridalService,
              private relationService: RelationService,
              private giftService: GiftService) {
  }



  filterGuestForm = this.formBuilder.group({
    relationShip: null,
    choixCadeau: '',

    firstName: '',

    lastName: '',
    email: '',
    amountParticipation:'',
    bridal: null,
    gift: null,
    id: 0,
    giftChoice:null,
  });

  // Je crée mon objet JS qui représente le formulaire d'édition de mon guest


  ngOnInit(): void {

    this.guestService.getAllGuest().subscribe(result => {
      this.guestList = result;
      console.log(this.guestList);
    })

    this.bridalService.getBridalCouple().subscribe(result => {
      this.bridalCouple = result;
    })

    this.relationService.getAllRelation().subscribe(result => {
      this.relationShipList = result;
    })
    this.giftService.getAllGift().subscribe(result => {
      this.giftList = result;
    })
    this.giftService.getGiftAndAmount().subscribe(result => {
      this.giftAndAmountList = result;
    })
  }



  AddGuest() {
    this.changeText = false;

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


  onGiftChange() {
    //si on répond oui pour participer aux cadeaux , les formulaires en dessous s'affiche
    if (this.filterGuestForm.get('giftChoice')?.value=="Oui"){
      this.ajoutCadeau=false;
    }
    else {
      //si on ne participe pas la liste de mariage on cache les input pour la liste des cadeaux et le montant de participation
      this.ajoutCadeau=true;
      this.ajoutMontant=true}
  }


  onGiftChoice(){
    this.ajoutMontant = false;
  }


  saveGuest() {
    // Création d'un nouvel objet
    console.log("je suis dans la fonction create");
    this.newGuest = this.filterGuestForm.value;
    // @ts-ignore
    this.newGuest?.amountParticipation = this.filterGuestForm.get('amountParticipation')?.value;
    this.guestService.createGuest(this.newGuest).subscribe(() => {
      console.log("l'invité a bien été crée");
      //je met a jour la liste de guest
      this.guestService.getAllGuest().subscribe(result => {
        this.guestList = result;
      });
//je met a jour la liste de gift avec un montant
      this.giftService.getGiftAndAmount().subscribe(result => {
        this.giftAndAmountList = result;
      });
      //je referme les input des cadeaux
      this.ajoutCadeau = true;
      this.ajoutMontant = true
      //j'envoie un popup à l'enregistrement si l'invité participe


    });
    if (this.filterGuestForm.get('giftChoice')?.value == "Oui") {
      window.alert('Merci pour votre participation');
    }
    console.log(this.newGuest);
    //je vide le formulaire
    this.filterGuestForm.reset();
    //je referme le formulaire
    this.changeText = true;
  }



}
