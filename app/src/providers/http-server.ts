import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the HttpServer provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpServer {
  constructor(public http: Http) {}
  // public doGet(url: string) {
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.get(url, options).toPromise()
  //     .then(res => res.json())
  //     .catch(err => {
  //       this.handleError(err);
  //     });
  // }
    public doGet(url: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options).toPromise()
      .then(res => res.json())
      .catch(err => {
        console.log(err);
      });
  }
    public doPosts(url: string, body: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options).toPromise()
      .then(res =>res.json())
      .catch(err => {
        console.log(err);
      });
  }
  // private handleError(error: Response) {
  //   console.log(error);
  //   return Observable.throw(error.json().error||'Server Error');
  // }

}
