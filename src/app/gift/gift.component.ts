import {Component, OnInit, ViewChild} from '@angular/core';
import {GiftService} from "../gift.service";
// @ts-ignore
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../user.service";


@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {

  guestListByGift: any
  admine: boolean = false;

  constructor(private giftService: GiftService, private userService: UserService) {
  }

  ngOnInit(): void {
    //calcule le nombre de page pour la taille choisi
    this.calculatePageCount();
    //on vérifie si c'est admin qui s'est connecté au chargement de la page
    this.admine = this.userService.isAdmin();

  }


//fonction appelée au click sur le bouton "show people"
  displayStyle = "none";

  openPopup(idGift: number) {
//rendre visible la div du popover
    this.displayStyle = "block";
    //avoir la liste des invités pour l'id du cadeau
    this.giftService.getGuestByGift(idGift).subscribe(result => {
      this.guestListByGift = result;
    });
  }

  // je referme la fenetre des details
  closePopup() {
    this.displayStyle = "none";
  }

  page = {
    size: 3,
    number: 0
  }

  pageCount = 0;
  pages: number[] = [];
//liste des cadeaux par page et nombre d'element(page.size)
  giftList = this.giftService.getPaginatedGifts(this.page.number, this.page.size);

  //a chaque changement de page /de taille,metAjour la liste et recalcule le nombre de pages correspondant
  onPageDetailsChange() {
    this.calculatePageCount();
    this.giftList = this.giftService.getPaginatedGifts(this.page.number, this.page.size);
  }

  //fonction qui calcule le nombre de page pour un nombre d'element(page.size)
  private calculatePageCount() {
    this.giftService.getTotalGiftsCount().subscribe(count => {
      this.pageCount = Math.ceil(count / this.page.size);
      this.pages = Array.from(Array(this.pageCount).keys());
    });
  }


}
