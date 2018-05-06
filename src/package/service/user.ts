import {Injectable} from "@angular/core";
import {HttpRequestHandler} from "../http/httpRequestHandler";
import {Platform} from "ionic-angular";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'

@Injectable()

export class UserService extends HttpRequestHandler {

    constructor(http: HttpClient, platform: Platform) {
        super(http, platform);
    }

    public register(request): Observable<any> {
        console.log(JSON.stringify(request));
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        };
        return this.post(`http://172.104.32.57:8181/public/register`, JSON.stringify(request), headers)
            .map(value => {
                return value;
            })
    }

    public login(request: any): Observable<any> {
        const header = {'Authorization': 'Basic ' + btoa(request.username + ':' + request.password)};
        return this.post(`http://172.104.32.57:8181/api/login`, '', header)
            .map(value => {
                return value;
            })
    }

    public checkOutProcess(data, request) {
        const headers = {'Authorization': 'Basic ' + btoa(request.email + ':' + request.password)};
        return this.post(`http://172.104.32.57:8181/api/checkout`, data, headers)
            .map(value => {
                return value;
            })
    }

    getOrdersByUser(userInfo: any) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + btoa(userInfo.email + ':' + userInfo.password)
        };
        return this.getPrivate(`http://172.104.32.57:8181/api/getorders`, headers)
            .map(value => {
                return value;
            })
    }
}
