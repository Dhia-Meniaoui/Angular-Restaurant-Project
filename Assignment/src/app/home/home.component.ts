import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { DISHES } from '../shared/diches'; 
import { PROMOTIONS } from '../shared/promotions';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  dish: Dish= DISHES[0];
  promotion: Promotion= PROMOTIONS[0];
  lead :  leader = LEADERS[0];

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService) { }

  ngOnInit() {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.lead = this.leaderService.getFeaturedLeader();
  }

}
