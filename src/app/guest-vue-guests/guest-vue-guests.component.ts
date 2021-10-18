import {Component, OnInit} from '@angular/core';
import {WeddingTable} from "../WeddingTable";
import {BridalCouple} from "../bridalCouple";
import {RelationShip} from "../relationShip";
import {Role} from "../role";
import {Gift} from "../gift";
import {Guest} from "../guest";
import {GuestService} from "../guest.service";
import {FormBuilder} from "@angular/forms";
import {TableService} from "../table.service";
import {BridalService} from "../bridal.service";
import {RelationService} from "../relation.service";
import {GiftService} from "../gift.service";

@Component({
  selector: 'app-guest-vue-guests',
  templateUrl: './guest-vue-guests.component.html',
  styleUrls: ['./guest-vue-guests.component.css']
})
export class GuestVueGuestsComponent implements OnInit {

  changeText = true;
  ajoutCadeau = true;
  ajoutMontant = true;
  table: WeddingTable | undefined;
  bridal: BridalCouple | undefined;
  relationShip: RelationShip | undefined;
  role: Role | undefined;
  guestList: any;
  giftList: Gift[] = [];
  giftAndAmountList: any;//liste des cadeaux avec le montant de participation pour chaque gift
  bridalCouple: any;
  relationShipList: any;

// Je déclare mon attribut newGuest
  newGuest: Guest | undefined;


  constructor(private guestService: GuestService, private formBuilder: FormBuilder,
              private tableService: TableService, private  bridalService: BridalService,
              private relationService: RelationService,
              private giftService: GiftService) {
  }


  //initialise mon formulaire
  filterGuestForm = this.formBuilder.group({
    relationShip: null,
    choixCadeau: '',
    firstName: '',
    lastName: '',
    email: '',
    amountParticipation: '',
    bridal: null,
    gift: null,
    id: 0,
    giftChoice: null,
  });

  //j'appelle les listes dont j'ai besoin dans le formulaire au chargement de la page
  ngOnInit(): void {
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

  //methode qui ouvre le formulaire de saisie
  AddGuest() {
    this.changeText = false;
  }


  //on recupére le marié qui a invité le guest
  onCoupleChange() {
    if (this.filterGuestForm.get('bridal')?.value != 0) {
      this.bridalService.getBridalCouple().subscribe(result => {
        this.bridal = this.filterGuestForm.get('bridal')?.value;
        console.log(this.bridal);
      });
    }
  }

//on recupére le type de relation avec les mariées
  onRelationChange() {
    this.relationService.getAllRelation().subscribe(() => {
//je recupere le detail le relation selectionné
      this.relationShip = this.filterGuestForm.get('relationShip')?.value;

    });
  }

//fonction pour choisir de participer ou non à la liste de mariage
  onGiftChange() {
    //si on répond oui pour participer aux cadeaux ,la suite du formulaire de saisie s'affiche
    if (this.filterGuestForm.get('giftChoice')?.value == "Oui") {
      this.ajoutCadeau = false;
    } else {
      //si on ne participe pas la liste de mariage on cache les inputs pour la liste des cadeaux et le montant de participation
      this.ajoutCadeau = true;
      this.ajoutMontant = true
    }
  }

//apres le choix d'un cadeau ouvre le formulaire de saisie du montant participation
  onGiftChoice() {
    this.ajoutMontant = false;
  }


  //fonction pour la Création d'un nouvel objet dans la BDD
  saveGuest() {

    this.newGuest = this.filterGuestForm.value;
    // @ts-ignore
    this.newGuest?.amountParticipation = this.filterGuestForm.get('amountParticipation')?.value;
    this.guestService.createGuest(this.newGuest).subscribe(() => {
      //je met a jour la liste de guest
      this.guestService.getAllGuest().subscribe(result => {
        this.guestList = result;
      });
      //je met a jour la liste de gift avec le champ montant
      this.giftService.getGiftAndAmount().subscribe(result => {
        this.giftAndAmountList = result;
      });
      //je referme les input des cadeaux
      this.ajoutCadeau = true;
      this.ajoutMontant = true;
    });
    //j'envoie un popup à l'enregistrement si l'invité  a participé
    if (this.filterGuestForm.get('giftChoice')?.value == "Oui") {
      window.alert('Merci pour votre participation');
    }

    //je vide le formulaire
    this.filterGuestForm.reset();
    //je referme le formulaire
    this.changeText = true;
  }


}
