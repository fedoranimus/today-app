import { Access } from '../access';
import { autoinject } from 'aurelia-framework';

@autoinject
export class Activate {
    keyInput: string = "";

    constructor(private access: Access) {

    }

    async registerApiKey() {
        this.access.registerApiKey(this.keyInput);
    }

    get isKeyValid() {
        return this.keyInput.length === 40 ? true : false;
    }
}