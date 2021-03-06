import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


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
  cnpj:number[];
  titleAlert:string ='Esse campo é obrigatório.';
  titleAlert2:string = 'Você precisa adicionar uma descrição entre 20 e 300 caracteres';
  titleAlert3:string = 'Você precisa fornecer seu CNPJ.'
  constructor(private fb:FormBuilder) {

  
    this.rForm = fb.group ({
      'name': [null, Validators.required],
      'description': [null,Validators.compose ([Validators.required, Validators.minLength(20), Validators.maxLength(300)])],
      'cnpj':[null,Validators.compose([Validators.required, Validators.maxLength(14)])],
      'validate' : ''
    });
  }

  getCnpj() {
   

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

