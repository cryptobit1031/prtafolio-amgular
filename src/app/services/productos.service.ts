import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  // info: InfoProducto = {};
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();
    // this.buscarProducto( termino);
   }

  private cargarProductos() {

    return new Promise ( (resolve, reject) => {

    this.http.get('https://angular-html-751fc.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {

          this.productos = resp;
          this.cargando = false;
          resolve();
    });

  });

  }


  getProducto(id: string) {

    return this.http.get(`https://angular-html-751fc.firebaseio.com/productos/${ id }.json`);
  }


  buscarProducto( termino: string ) {

    if ( this.productos.length ) {

      // Cargar productos
      this.cargarProductos().then( () => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });
    } else {

      // Aplicar filtro
        this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string ) {

    this.productosFiltrado = [];

    // Covertir termino en minuscula
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {

        // Covertir termino en minuscula
        const tituloLower = prod.titulo.toLocaleLowerCase();

        if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {

          this.productosFiltrado.push( prod );

        }
    });

  }

}
