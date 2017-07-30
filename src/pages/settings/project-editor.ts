import { autoinject, bindable } from 'aurelia-framework';
import { IProjectLocation } from '../../services/user';
import { Project } from '../../infrastructure/todoist';

@autoinject
export class ProjectEditor {

    @bindable({ attribute: 'project-location' }) projectLocation: IProjectLocation;
    @bindable save: Function;
    @bindable projects: Project[];

    availableProjects: Project[] = this.projects;

    constructor() {
        
    }

    bind() {
        this.filterProjects();
    }

    filterProjects() {
        this.availableProjects = this.projects.filter(project => this.projectLocation.projects.some(ap => ap.projectName !== project.name));
    }

    projectsPropertyChanged() {
        this.filterProjects();
    }

    saveForm() {
        this.save({ projectLocation: this.projectLocation });
    }
}