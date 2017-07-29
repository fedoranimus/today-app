import { Access } from '../access';
import { autoinject } from 'aurelia-framework';

@autoinject
export class Activate {
    keyInput: string;

    constructor(private access: Access) {

    }

    async registerApiKey() {
        this.access.registerApiKey(this.keyInput);
    }
}