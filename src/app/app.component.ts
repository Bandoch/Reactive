import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateUrl } from './validators/url.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  rForm:FormGroup;
  post:any;
  description:string = '';
  name:string = '';
  url:string = '';
  cnpj:any;
  titleAlert:string ='Esse campo é obrigatório.';
  titleAlert2:string = 'Você precisa adicionar uma descrição entre 20 e 300 caracteres';
  titleAlert3:string = 'Você precisa fornecer sua URL.'
  
  constructor(private fb:FormBuilder) {
  
    this.rForm = fb.group ({
       
       url: ['', [Validators.required, ValidateUrl]],
      'name': [null, Validators.required],
      'description': [null,Validators.compose ([Validators.required, Validators.minLength(20), Validators.maxLength(300)])],
      'validate' : ''
    });
  }
  ngOnInit() {
      

    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = 'Você precisa especificar ao menos 3 caracteres.'
        }
        else {
          this.rForm.get('name').setValidators(Validators.required);
        }
        this.rForm.get('name').updateValueAndValidity();
      }
    )
  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
    this.cnpj = post.cnpj;
  }
}

