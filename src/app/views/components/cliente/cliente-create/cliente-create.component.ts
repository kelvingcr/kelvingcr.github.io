import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])


  constructor(private router: Router,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  cancel():void{
    this.router.navigate(['clientes'])
  }

  create():void{
    this.clienteService.create(this.cliente).subscribe(resposta => {
      this.router.navigate(['clientes']);
      this.clienteService.message('Cliente criado com sucesso.');
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.clienteService.message(err.error.error)
      }else if(err.error.erros[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.clienteService.message("CPF inválido.")
      }
    })
  }

  errorValidName(){
    if(this.nome.invalid){
      return 'O nome deve ter entre 5 e 100 caracteres!';
    }
    return false;
  }
  errorValidCPF(){
    if(this.cpf.invalid){
      return 'O CPF deve ter entre 11 e 15 caracteres!';
    }
    return false;
  }
  errorValidTelefone(){
    if(this.telefone.invalid){
      return 'O telefone deve ter entre 11 e 18 caracteres!';
    }
    return false;
  }

}
