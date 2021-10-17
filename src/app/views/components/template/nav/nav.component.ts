import { Component, OnInit } from '@angular/core';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private service: TecnicoService) { }

  ngOnInit(): void {
  }

  flag : any = false;

  btnClick(){
      this.flag = true;
  }

  icon(){
    if(true){
      return this.service.message('O CPF deve ter entre 11 e 15 caracteres!');
    }
    return false;
  }

}
