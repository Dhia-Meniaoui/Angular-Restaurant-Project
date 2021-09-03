import { Component, OnInit, Inject } from '@angular/core';
import { leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animation/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  lead !:  leader[]  ;
  errMess!: string;


  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL : String) { }

  ngOnInit(): void {

    this.leaderService.getLeaders()
  .subscribe(leaders => this.lead=leaders,
  errmess => this.errMess = <any>errmess);
  }

}
