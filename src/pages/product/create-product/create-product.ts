import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductServiceProvider } from '../../../providers/product-service/product-service';
import { Product } from '../../../models/Product/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsPage } from '../products/products';
import { GLOBAL } from '../../../providers/global';

declare var $:any;

/**
 * Generated class for the CreateProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
  providers: [ProductServiceProvider]
})
export class CreateProductPage {

  

  public titulo: string;
  public producto: Array<Product>;
  public filesToUpload;
  public resultUpload;
  public is_edit;


  constructor
  (
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _productoService:ProductServiceProvider,
  )
  {
    this.titulo = 'Crear un nuevo producto';
    this.producto = new Array<Product>();
    this.is_edit = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
  }

  // private createMyForm(){
  //   return this.formBuilder.group({
  //     name: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: ['', Validators.required],
  //     dateBirth: ['', Validators.required],
  //     passwordRetry: this.formBuilder.group({
  //       password: ['', Validators.required],
  //       passwordConfirmation: ['', Validators.required]
  //     }),
  //     gender: ['', Validators.required],
  //   });
  // }


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
          this.saveProducto();  
        }, (error) =>{
          console.log(error);
        });
      }else{
        this.saveProducto();	
      }
    }
  }

  saveProducto(){
    //console.log(this.producto);
  this._productoService.addProducto(this.producto).subscribe(
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



