import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';
import { Product } from '../../models/Product/product';
/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {

  public url:string;

  constructor
  (
    public _http: Http
  )
  {
      this.url = GLOBAL.url;
  }

  getProductos(){
    return this._http.get(this.url + 'productos').map(res => res.json());
  }

  addProducto(producto: Product[]){
    console.log(producto);
    let json1 = Object.assign({}, producto);
		let json = JSON.stringify(json1);
    let params = 'json='+json;
        console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'productos', params, {headers: headers})
						 .map(res => res.json());
  }
  
  makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject)=>{
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('uploads[]', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			};

			xhr.open("POST", url, true);
			xhr.send(formData);
		});
	}


	editProducto(id, producto: Product[]){
		let json = JSON.stringify(producto);
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'update-producto/'+id, params, {headers: headers})
						 .map(res => res.json());
	}


	getProducto(id){
		return this._http.get(this.url + 'producto/'+id).map(res => res.json());
	}

	deleteProducto(id){
		return this._http.get(this.url+'delete-producto/'+id)
		.map(res => res.json());
	}


}
