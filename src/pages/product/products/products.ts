import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductServiceProvider } from '../../../providers/product-service/product-service';
import { Product } from '../../../models/Product/product';
import { ProductEditPage } from '../../product/product-edit/product-edit';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'products',
  templateUrl: 'products.html',
  providers: [ProductServiceProvider]
})
export class ProductsPage {

  public titulo:string;
  public productos: Product[];
  public confirmado;

  constructor
  (
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _productService: ProductServiceProvider,
  ) 
  {
    this.titulo = 'Listado de productos';
    this.confirmado = null;
    this.productos = new Array<Product>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    this.getProductos();
  }

  getProductos(){
    console.log("carga getProductos");
    this._productService.getProductos().subscribe(
        result => {
            this.productos = result.data;

            if(result.code != 200){
                console.log(result);
            }else{
                this.productos = result.data;
            }
        },
        error => {
            console.log(<any>error);
        }
    );
}

editProduct(id) {
    this.navCtrl.push(ProductEditPage, {
      idProduct: id,
    })
  }

  onDeleteProducto(id){
    this._productService.deleteProducto(id).subscribe(
      response => {
        if(response.code == 200){
            this.getProductos();
        }else{
            alert('Error al borrar producto');
        }
      },
      error => {
          console.log(<any>error);
      } 
    );
}

borrarConfirm(id){
    this.confirmado = id;
}

cancelarConfirm(id){
    this.confirmado = null;
}

}
