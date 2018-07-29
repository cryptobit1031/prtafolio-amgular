import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfopaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: object = [];

  // Lo utilizamos para conectarnos al json
  constructor( private http: HttpClient ) {

    this.cargarInfo();
    this.cargarEquipo();
   }

   private cargarInfo() {

    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
          this.cargada = true;
          this.info = resp;
      });
   }

   private cargarEquipo() {

      this.http.get('https://angular-html-751fc.firebaseio.com/equipo.json')
      .subscribe( (resp: object[]) => {
          this.cargada = true;
          this.equipo = resp;
      });

   }

}
