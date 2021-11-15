import { Component, OnInit } from '@angular/core';
import { CreditCardService } from './credit-card.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  fechaHoy = new Date();
  validator : boolean = false;
  dataCreditCards: any = [];
  dataClients: any = [];
  dataClientsActive: any = [];
  dataBankAccount: any = [];
  mp1: any;
  searchUser:any
  tableUser:any
  itempageUsers:any= 5;

  mp: any;
  searchAccount:any
  tableAccounts:any
  itempageAccount:any= 5;

  mp2: any;
  searchCards:any
  tableCards:any
  itempageCards:any= 5;

  client:any = true 
  card:any = false 
  account:any = false 
  validateInput:any = true
  validateInput1:any = true
  validateInput2:any = true
  typesDocuments: any = [{
    name:"Cedula de Ciudadania",
    id:"1"
  },
  {
    name:"Cedula de Extranjeria",
    id:"2"
  },
  {
    name:"NIT",
    id:"3"
  }];

  dataStatusAccount: any = [{
    name:"Moroso",
    id:"1"
  },
  {
    name:"Paz y salvo",
    id:"2"
  }];

  dataTypeAccount: any = [{
    name:"Corriente",
    id:"1"
  },
  {
    name:"Ahorros",
    id:"2"
  }];

  dataCardType: any = [{
    name:"Visa",
    id:"1"
  },
  {
    name:"MasterCard",
    id:"2"
  }];

  user: any={};
  accountNumber:any = {};
  cardCredit:any = {};
  dataAccounts:any = {};

  constructor(
    private creditCardService: CreditCardService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    console.log("DAS");
    this.getClients();
    this.getClientsActive();
    this.getCreditCards();
    
    this.getBankAccount(); 
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validatorClient(){
    this.client=true
    this.card = false 
    this.account = false 
  }

  validatorAccount(){
    this.client=false
    this.card = false 
    this.account = true 
  }

  validatorCard(){
    this.client=false
    this.card = true 
    this.account = false 
  }


  getClientsActive(){
    this.creditCardService.getCreditCardsActive().subscribe(data => {
      console.log('resp', data);
      this.dataClientsActive = data;
      this.dataClientsActive.sort((a:any, b:any) => (a.name < b.name ? -1 : 1));
    })
  }

  getClients(){
    this.creditCardService.getClients().subscribe(data => {
      console.log('resp', data);
      this.dataClients = data;
      
      this.dataClients.sort((a:any, b:any) => (a.name < b.name ? -1 : 1));
    })
  }

  getBankAccount(){
    this.creditCardService.getBankAccount().subscribe(data => {
      console.log('resp', data);
      this.dataBankAccount = data;
    })
  }

  getCreditCards(){
    this.creditCardService.getCreditCards().subscribe(data => {
      console.log('resp', data);
      this.dataCreditCards = data;
    })
  }

  cancel(){
    this.user={}
  }

  saveUser(variable:any){
    this.creditCardService.postSave(variable).subscribe(data => {
      this.getClients();
      this.user={}
    },err => {
      this.toastr.error(err.error);
    })
  }

  inactivateAndActiveUser(variable:any){
    console.log("inactivar", variable);
    if(variable.status){
      this.creditCardService.putInactivateUser(variable.id).subscribe(data => {
        this.getClients();
      })
    }else{
      this.creditCardService.putActivateUser(variable.id).subscribe(data => {
        this.getClients();
      })
    }
  }

  updateUser(variable:any){
    this.user.name = variable.name
    this.user.documentType = variable.documentType
    this.user.birthDate = variable.birthDate
    this.user.documentNumber = variable.documentNumber
    this.validator = true;
    this.validateInput = false;
    this.user.id = variable.id
  }

  updateUsers(variable:any){
    this.creditCardService.putUpdate(variable).subscribe(data => {
      this.getClients();
      this.user={}
    },err => {
      this.toastr.error(err.error);
    })
  }

  deleteUser(variable:any){
    console.log("eliminar", variable);
    this.creditCardService.deleteUser(variable.id).subscribe(data => {
      console.log('resp', data);
      this.getClients();
    },err => {
      this.toastr.error(err.error);
    })
  }


  saveAccount(variable: any ){
      console.log(variable);
      let client = { 'id' : variable.client}
      variable.client = client
      console.log(variable);
      this.creditCardService.postSaveAccount(variable).subscribe(data => {
        this.getBankAccount();
        this.user={}
      },err => {
        this.toastr.error(err.error);
      })
  }

  updateAccount(variable: any){
    console.log(variable);
    this.accountNumber = variable
    this.accountNumber.client = variable.client.id
    this.validator = true;
    this.validateInput1 = false;
  }

  updateAccountNumber(variable: any){
    console.log(variable);
    let client = { 'id' : variable.client}
      variable.client = client
    this.creditCardService.updateAccountNumber(variable).subscribe(data => {
      this.getBankAccount();
      this.user={}
    },err => {
      this.toastr.error(err.error);
    })
  }

  deleteAccount(variable: any){
    this.creditCardService.deleteAccount(variable.id).subscribe(data => {
      console.log('resp', data);
      this.getClients();
    },err => {
      this.toastr.error(err.error);
    })
  }

  saveCardCredit(variable: any){

    console.log(variable);
    let idAccount = { 'id' : variable.idAccount}
    variable.idAccount = idAccount

    this.creditCardService.postSaveCard(variable).subscribe(data => {
      this.getCreditCards();
      this.cardCredit={}
    },err => {
      this.toastr.error(err.error);
    })
  }

  updateCardCredit(variable: any){
    console.log(variable);
    let idAccount = { 'id' : variable.idAccount}
    variable.idAccount = idAccount
    this.creditCardService.updateCardCredit(variable).subscribe(data => {
      this.getCreditCards();
      this.cardCredit={}
    },err => {
      this.toastr.error(err.error);
    })
  }

  loadCard(variable: any){
    console.log(variable);

    variable.idClients = variable.idAccount.client.id
    this.getAccountsClient(variable.idClients)
    variable.idAccount = variable.idAccount.id
    this.cardCredit = variable
    this.validator = true;
    console.log(this.cardCredit)
    this.validateInput2 = false;
  }

  deleteCard(variable: any){
    this.creditCardService.deleteCardCredit(variable.id).subscribe(data => {
      console.log('resp', data);
      this.getCreditCards();
    },err => {
      this.toastr.error(err.error);
    })
  }

  loadAccounts(idClients:any){
    console.log(idClients);
    if(idClients!=undefined){
      this.getAccountsClient(idClients)
    }
    
  }


  
  getAccountsClient(idAccount:any){
    this.creditCardService.getAccountsClient(idAccount).subscribe(data => {
      console.log('resp', data);
      this.dataAccounts = data;
    })
  }
}
