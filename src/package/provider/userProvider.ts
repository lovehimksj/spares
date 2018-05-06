import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";

@Injectable()

export class UserProvider {
    isUserLoggedIn;
    HAS_LOGGED_IN = 'hasLoggedIn';

    constructor(private storage: Storage) {
    }

    hasLoggedIn(): Promise<boolean> {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value === true;
        });
    };
}
