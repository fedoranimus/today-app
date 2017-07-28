import { autoinject } from 'aurelia-framework';
import { OAuthService } from 'aurelia-oauth';

@autoinject
export class Home {

    constructor(oauthService: OAuthService) {
        oauthService.login();
    }
    message: string;
}