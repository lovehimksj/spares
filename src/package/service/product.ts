import {Injectable} from "@angular/core";
import {HttpRequestHandler} from "../http/httpRequestHandler";
import {HttpClient} from "@angular/common/http";
import {Platform} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'

@Injectable()

export class ProductService extends HttpRequestHandler {
    constructor(http: HttpClient, platform: Platform) {
        super(http, platform);
    }

    public getAllCategory(): Observable<any> {
        return this.get('http://172.104.32.57:8181/public/getallcategory')
            .map(value => {
                return value;
            })
    }

    public getProductByCategoryId(catid: any): Observable<any> {
        return this.get(`http://172.104.32.57:8181/public/getproduct/${catid}`)
            .map(value => {
                return value;
            })
    }

    public getAllProduct(): Observable<any> {
        return this.get(`http://172.104.32.57:8181/public/getallproduct`)
            .map(value => {
                return value;
            })
    }
}
