import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Platform} from "ionic-angular";

@Injectable()
export class HttpRequestHandler {
    private header = new HttpHeaders({'Content-Type' : 'application/json'});
    constructor(private http: HttpClient, public platform: Platform) {
    }
    public get(requestUri: string): Observable<any> {
        return this.http.get(`${requestUri}`)
    }

    public post(requestUri: string, data: any, headers: any): Observable<any> {
        // console.log(btoa(data.username +':'+ data.password))
        // const headers = {'Authorization': 'Basic ' + btoa(data.username +':'+ data.password)};
        return this.http.post(`${requestUri}`, data, {headers: headers});
    }

    public getPrivate(requestUri: string, header): Observable<any> {
        return this.http.get(`${requestUri}`, {headers: header})
    }
}
