import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from './mail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cartub';
  year = new Date().getFullYear();
  showModal: boolean;
  contactUsForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,public http: MailService) { }
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.contactUsForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(6)]],
        message:['', [Validators.required, Validators.minLength(3)]],
    });
}
// convenience getter for easy access to form fields
get f() { return this.contactUsForm.controls; }
onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.contactUsForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.http.sendEmail("https://mysterious-sea-27887.herokuapp.com/sendmail", this.contactUsForm.value).subscribe(
        data => {
          let res:any = data; 
          console.log(
            ` ${this.contactUsForm.value.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
          );
        },
        err => {
          console.log(err);
        },() => {
        }
      );
    }
      this.showModal = false;
    }
  }

