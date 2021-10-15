import {Component, OnInit, ViewChild} from '@angular/core';
import {GiftService} from "../gift.service";
// @ts-ignore
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../user.service";


@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {

  guestListByGift: any
  admine:boolean=false;

  constructor(private giftService: GiftService,private userService:UserService) {
  }

  ngOnInit(): void {
   /* this.giftService.getAllGift().subscribe(result => {
      this.giftList = result;
    });
    console.log(this.giftList);*/
    this.calculatePageCount();
  }


//fonction appelée au click sur le bouton "show people"
  displayStyle = "none";
  openPopup(idGift: number) {

    this.displayStyle = "block";
    this.giftService.getGuestByGift(idGift).subscribe(result => {
      this.guestListByGift = result;
      // @ts-ignore
     // if(result==0){window.alert('Personne n\'a partcipé à ce cadeau');}
    });
console.log(idGift);
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

  giftList = this.giftService.getPaginatedGifts(this.page.number, this.page.size);

  onPageDetailsChange() {
    this.calculatePageCount();
    this.giftList = this.giftService.getPaginatedGifts(this.page.number, this.page.size);
  }

  private calculatePageCount() {
    this.giftService.getTotalGiftsCount().subscribe(count => {
      this.pageCount = Math.ceil(count / this.page.size);
      this.pages = Array.from(Array(this.pageCount).keys());
    });
  }

  onNotify() {
    window.alert('Personne n\'a partcipé à ce cadeau');
  }

isadmin():boolean{
    this.admine=this.userService.isAdmin();
    return this.admine;
    console.log("coucou "+this.admine);
}

}
