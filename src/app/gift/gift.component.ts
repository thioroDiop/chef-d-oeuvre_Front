import {Component, OnInit, ViewChild} from '@angular/core';
import {GiftService} from "../gift.service";
// @ts-ignore
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  giftList: any;
  guestListByGuest: any
  detailGift: boolean=false;

  constructor(private giftService: GiftService) {

  }




  ngOnInit(): void {
    this.giftService.getAllGift().subscribe(result => {
      this.giftList = result;
    });
    console.log(this.giftList);
  }

//fonction appelée au click sur une photo
  onclick(idGift: number) {
    this.detailGift = true;
    this.giftService.getGuestByGift(idGift).subscribe(result => {
      this.guestListByGuest = result;
    });
  }

// je referme la fenetre des details
  closeDetail() {
    this.detailGift = false;
  }


  displayStyle = "none";
  openPopup(idGift: number) {
    this.displayStyle = "block";
    this.detailGift = true;
    this.giftService.getGuestByGift(idGift).subscribe(result => {
      this.guestListByGuest = result;
    });
  }
  closePopup() {
    this.displayStyle = "none";
  }


}
