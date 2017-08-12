import { autoinject, bindable } from 'aurelia-framework';
import { User, IProjectLocation } from '../../services/user';
import { Project } from '../../infrastructure/todoist';
import { GeopositionTools } from '../../services/geopositionTools';

@autoinject
export class Settings {
    fullName: string;
    
    @bindable projectLocations: IProjectLocation[];

    editProjectLocations = false;

    selectedProject: Project;

    projects: Project[];

    activeProjectVal: number | string;

    selectedProjectLocation: IProjectLocation;

    constructor() {
        
    }

    bind() {

    }

    // private async init() {
    //     await this.getUser();
    //     await this.getProjects();
    //     console.log(this.user.projectLocations);
    //     this.projectLocations = this.user.projectLocations;
    // }

    // async getProjects() {
    //     this.projects = await this.todoService.getProjects();
    //     console.log(this.projects);
    // }

    // async getUser() {
    //     const userData = await this.todoService.getUser();
    //     this.fullName = userData.full_name;
    // }

    // editProject(projectLocation: IProjectLocation) {
    //     this.selectedProjectLocation = projectLocation;
    // }

    // async addProjectLocation() {
    //     const names = this.projectLocations.map( pl => pl.name).filter(name => name.substring(0) === "New Project Group");
    //     //TODO: Regex validation on a name that will not conflict!!!
        
    //     const currentPosition = await GeopositionTools.getCurrentLocation();

    //     const newProject = { name: "New Project Group", projects: [], location: currentPosition };
    //     this.projectLocations.push(newProject);

    //     this.editProjectLocations = true;
    //     this.selectedProjectLocation = newProject;
    // }

    // addProject() {
    //     if(this.selectedProject) {
    //         this.projectLocations = this.user.addProjectLocation(this.selectedProject.id, this.selectedProject.name);
    //     }
    // }

    // deleteProject(id: number) {
    //     if(id) {
    //         this.projectLocations = this.user.removeProjectLocation(id);
    //     }
    // }

    get activeProject() {
        return undefined;
    }
}