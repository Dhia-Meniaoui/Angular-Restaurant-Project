import { FormBuilder, FormGroup, Validators , FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewChild  , Input , Inject} from '@angular/core';
import {Dish} from '../shared/dish';
import {Comment} from '../shared/Comment';
import { switchMap } from 'rxjs/operators';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { visibility, flyInOut ,expand } from '../animation/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})






export class DishdetailComponent implements OnInit {

  @ViewChild('form') feedbackFormDirective! : FormGroupDirective;
  commentForm!: FormGroup;
  comment!: Comment ;
    @Input()
  dish! :  Dish | any ;
  dishIds!: string ;
  prev!: string;
  next!: string;
  dishcopy : Dish | any;
  visibility='shown';
  errMess: string | undefined;


  
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;
  star = 0;

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    this.value = value;
    this.star = this.value;
     

    return value;
  }

  
  changeValue(event : any) {
    this.star = event.value;
}


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL : String) {
      this.createForm();
     }



     dater:string = new Date().toString();
     get author() {
      return (this.commentForm.get('author')?.value);
    }
    get commentt() {
      return (this.commentForm.get('comment')?.value);
    }
    get rating(){
      return (this.commentForm.get('rating')?.value);
    }


    ngOnInit() {
      this.createForm();

      this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
      
    this.route.params
      .pipe(switchMap((params: Params) => {this.visibility ='hidden';return this.dishservice.getDish(params['id']);}))
      .subscribe(dish => { this.dish = dish; this.dishcopy=dish; this.setPrevNext(dish.id);this.visibility='shown'; },
        errmess=>this.errMess=<any> errmess);
 

setTimeout(() => {
  console.log(this.dish);
}, 3000);

     
    }


    setPrevNext(dishId : string) {
      if (dishId != null) {
        const index = this.dishIds?.indexOf(dishId);
        this.prev = this.dishIds?.[(this.dishIds?.length + index! - 1) % this.dishIds?.length];
        this.next = this.dishIds?.[(this.dishIds?.length + index! + 1) % this.dishIds?.length];
      }
      
    }


 
    goBack(): void {
      this.location.back();
    }





  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required],Validators.minLength(2)  ],
      rating: [0, [Validators.required] ],
      comment: ['', [Validators.required] ]
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }


  formErrors = {
    'author': ''
  };

  validationMessages = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.'
    }
  };



  onSubmit() {
    this.comment =this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish ; this.dishcopy= dish;
      },
      errmis => {
        this.dish = null ; this.dishcopy = null
      });
    this.feedbackFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 0,
      comment: ''
    });
    
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;

    }
}
