import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductServiceProvider} from './../../../providers/product-service/product-service';
import {ProductEditPageModule} from './../product-edit/product-edit.module';
import {GLOBAL} from '../../../providers/global';
import { Product } from '../../../models/Product/product';
import { ProductsPage } from '../../product/products/products';

declare var $:any;

/**
 * Generated class for the ProductEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-edit',
  templateUrl: '../../product/create-product/create-product.html',
  providers: [ProductServiceProvider]
})
export class ProductEditPage {
  public titulo: string;
  public producto: Array<Product>;
  public filesToUpload;
  public resultUpload;
  public is_edit;
  public idProduct;

  constructor
  (
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _productoService:ProductServiceProvider
  )
  {
    this.titulo = 'Crear un nuevo producto';
    this.producto = new Array<Product>();
    this.is_edit = true;
    this.idProduct = navParams.get("idProduct");
  }

  getProducto(){
        this._productoService.getProducto(this.idProduct).subscribe(
            response =>{
                if(response.code == 200){
                    this.producto = response.data;
                }else{
                  this.navCtrl.push(ProductsPage);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductEditPage');
    this.getProducto();
  }

  validar(){
    $('#frm').validate({
      rules: {
          nombre: {
              required: true
          },
          precio: {
            required: true,
            number: true
        }
      }
  });
    if( $("#frm").valid() )
    {
      if(this.filesToUpload && this.filesToUpload.length >= 1){
        this._productoService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
          //console.log(result);
  
          this.resultUpload = result;
          this.producto['imagen'] = this.resultUpload.filename;
          this.updateProducto();  
        }, (error) =>{
          console.log(error);
        });
      }else{
        this.updateProducto();	
      }
    }
  }

  updateProducto(){
			this._productoService.editProducto(this.idProduct, this.producto).subscribe(
				response => {
					if(response.code == 200){
            this.navCtrl.push(ProductsPage);
					}else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
  }
  
  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}

}
