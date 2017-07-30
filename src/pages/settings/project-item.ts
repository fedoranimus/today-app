import { autoinject, bindable } from 'aurelia-framework';
import { IProjectLocation } from '../../services/user';

@autoinject
export class ProjectItem {
    @bindable projectLocation: IProjectLocation;
    @bindable activeProject: IProjectLocation;

    constructor() {

    }
}