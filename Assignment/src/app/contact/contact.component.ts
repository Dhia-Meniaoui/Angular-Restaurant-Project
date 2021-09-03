import { FormBuilder, FormGroup, Validators , FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { visibility, flyInOut , visibilityform} from '../animation/app.animation';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      visibility(),
      flyInOut(),
      visibilityform()
    ]
})
export class ContactComponent implements OnInit { 
  @ViewChild('fform') feedbackFormDirective! : FormGroupDirective;
  feedbackForm!: FormGroup;
  feedback!: Feedback|any ;
  contactType = ContactType;
  visibility='hidden';
  visibilityform= 'hidden';
  feedbackcopy!: Feedback|any ;


 formErrors = {
  'firstname': '',
  'lastname': '',
  'telnum': '',
  'email': ''
};

validationMessages = {
  'firstname': {
    'required':      'First Name is required.',
    'minlength':     'First Name must be at least 2 characters long.',
    'maxlength':     'FirstName cannot be more than 25 characters long.'
  },
  'lastname': {
    'required':      'Last Name is required.',
    'minlength':     'Last Name must be at least 2 characters long.',
    'maxlength':     'Last Name cannot be more than 25 characters long.'
  },
  'telnum': {
    'required':      'Tel. number is required.',
    'pattern':       'Tel. number must contain only numbers.'
  },
  'email': {
    'required':      'Email is required.',
    'email':         'Email not in valid format.'
  },
};


  constructor(private FeedbackService: FeedbackService,private fb: FormBuilder,private route: ActivatedRoute) {
    this.createForm();
   }

  ngOnInit(): void {
    this.feedbackForm.reset({title: 'new value'});

    this.route.params
    .pipe(switchMap((params: Params) => {this.visibility ='shown'; this.visibilityform ='hidden';return this.FeedbackService.getfeedback(params['id']);}))
    .subscribe(feedback => { this.feedback = feedback; this.feedbackcopy=feedback; this.visibility='shown'; this.visibilityform ='hidden'; });
  }


  get firstname() {
    return (this.feedbackForm.get('firstname')?.value);
  }
  get lastname() {
    return (this.feedbackForm.get('lastname')?.value);
  }
  get telnum(){
    return (this.feedbackForm.get('telnum')?.value);
  }
  get email() {
    return (this.feedbackForm.get('email')?.value);
  }
  get agree(){
    return (this.feedbackForm.get('agree')?.value);
  }
  get message(){
    return (this.feedbackForm.get('message')?.value);
  }


  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now

}

 


  onSubmit() {
    this.feedback =this.feedbackForm.value;

    this.FeedbackService.postfeedback(this.feedback)
      .subscribe(feedback => {
        this.feedback = feedback ;
        this.feedbackcopy=feedback; 
        this.visibilityform ='shown';
        this.visibility='hidden';
        
        console.log(this.feedback);
      },
      errmis => {
        this.feedback = null 
      });
    this.feedbackFormDirective.resetForm();



/*     this.feedback = this.feedbackForm.value;
    console.log(this.feedback); */
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.feedback) { return; }

    }
  }