import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  
  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }
  gePromotion(id: string): Promotion {
    return PROMOTIONS.filter((Promotion) => (Promotion.id === id))[0];
  }

  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((Promotion) => Promotion.featured)[0];
  }
  constructor() { }
}
